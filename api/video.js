/**
 * /api/video — endpoint consolidado para el Video Analyzer
 *
 * Acciones (via ?action=):
 *   create  → enqueue job (admin)
 *   list    → lista jobs paginados (admin)
 *   get     → detalle de un job (admin)
 *   cron    → procesa pending jobs (cron-job.org con CRON_SECRET)
 *
 * Consolidado en 1 sola function por el límite de 12 functions de Vercel Hobby.
 */

'use strict';

const { applyCors } = require('../lib/cors');
const { isAuthed } = require('../lib/admin-auth');
const {
  createVideoJob, listVideoJobs, getVideoJob, updateVideoJob, findPendingVideoJobs,
} = require('../lib/db');
const { transcribeVideo } = require('../lib/transcribe');
const { analyzeVideo } = require('../lib/video-analysis');

function isValidUrl(s) {
  if (typeof s !== 'string') return false;
  try {
    const u = new URL(s);
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch { return false; }
}

function requireAdmin(req, res) {
  if (isAuthed(req)) return false;
  res.status(401).json({ error: 'No autenticado' });
  return true;
}

function requireCron(req, res) {
  const isVercelCron = req.headers['x-vercel-cron'] === '1' || req.headers['x-vercel-cron'] === 'true';
  if (isVercelCron) return false;
  const secret = process.env.CRON_SECRET;
  const provided = (req.headers['x-cron-secret'] || req.headers['authorization'] || '').replace(/^Bearer\s+/i, '');
  if (secret && provided && provided === secret) return false;
  res.status(401).json({ error: 'unauthorized' });
  return true;
}

// ─── Handlers ───

async function handleCreate(req, res) {
  if (requireAdmin(req, res)) return;
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { source_url, title, options } = req.body || {};
  if (!isValidUrl(source_url)) return res.status(400).json({ error: 'source_url inválido' });

  const allowed = ['transcript_clean', 'subtitles', 'structure_analysis', 'mdracing_adaptation', 'caption_ig', 'hashtags', 'hook_variants', 'summary'];
  const cleanOptions = {};
  for (const k of allowed) if (options && options[k] === true) cleanOptions[k] = true;

  const cleanTitle = typeof title === 'string' ? title.trim().slice(0, 200) : null;

  const result = await createVideoJob({ sourceUrl: source_url, title: cleanTitle, options: cleanOptions });
  if (!result.ok) return res.status(500).json({ error: result.error });
  return res.status(200).json({ ok: true, job: result.job });
}

async function handleList(req, res) {
  if (requireAdmin(req, res)) return;
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  const limit = parseInt(req.query.limit, 10) || 50;
  const offset = parseInt(req.query.offset, 10) || 0;
  const r = await listVideoJobs({ limit, offset });
  if (!r.ok) return res.status(500).json({ error: r.error });
  return res.status(200).json({ ok: true, jobs: r.jobs, total: r.total });
}

async function handleGet(req, res) {
  if (requireAdmin(req, res)) return;
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  const id = req.query.id;
  if (!id || typeof id !== 'string') return res.status(400).json({ error: 'id requerido' });
  const r = await getVideoJob(id);
  if (!r.ok) return res.status(404).json({ error: r.error });
  return res.status(200).json({ ok: true, job: r.job });
}

/** Procesa 1 job. */
async function processJob(job) {
  await updateVideoJob(job.id, {
    status: 'processing',
    started_at: new Date().toISOString(),
    attempts: (job.attempts || 0) + 1,
  });

  try {
    const tr = await transcribeVideo(job.source_url);
    await updateVideoJob(job.id, {
      transcript: tr.transcript,
      audio_url: tr.audioUrl,
      duration_sec: tr.duration ? Math.round(tr.duration) : null,
    });

    const an = await analyzeVideo({
      transcript: tr.transcript,
      segments: tr.segments,
      options: job.options || {},
      videoUrl: job.source_url,
      title: job.title,
    });
    if (!an.ok) {
      await updateVideoJob(job.id, {
        status: 'error',
        error_message: 'Análisis falló: ' + an.error,
        finished_at: new Date().toISOString(),
      });
      return { ok: false, jobId: job.id, error: an.error };
    }

    await updateVideoJob(job.id, {
      analysis: an.analysis,
      status: 'done',
      finished_at: new Date().toISOString(),
    });
    return { ok: true, jobId: job.id };
  } catch (e) {
    await updateVideoJob(job.id, {
      status: 'error',
      error_message: e.message,
      finished_at: new Date().toISOString(),
    });
    return { ok: false, jobId: job.id, error: e.message };
  }
}

async function handleCron(req, res) {
  if (requireCron(req, res)) return;

  const summary = {
    found: 0, processed: 0, errors: 0,
    startedAt: new Date().toISOString(),
    results: [],
  };

  // Máximo 3 jobs por corrida para no superar timeout 60s.
  const r = await findPendingVideoJobs(3);
  if (!r.ok) {
    console.error('[video cron] findPendingVideoJobs failed:', r.error);
    return res.status(200).json({ ok: false, error: r.error, summary });
  }

  summary.found = r.jobs.length;

  for (const job of r.jobs) {
    try {
      const result = await processJob(job);
      if (result.ok) summary.processed++;
      else summary.errors++;
      summary.results.push(result);
    } catch (e) {
      summary.errors++;
      summary.results.push({ ok: false, jobId: job.id, error: e.message });
    }
  }

  summary.finishedAt = new Date().toISOString();
  console.log('[video cron]', JSON.stringify(summary));
  return res.status(200).json({ ok: true, summary });
}

module.exports = async (req, res) => {
  if (applyCors(req, res)) return;
  const action = (req.query && req.query.action) || '';
  if (action === 'create') return handleCreate(req, res);
  if (action === 'list')   return handleList(req, res);
  if (action === 'get')    return handleGet(req, res);
  if (action === 'cron')   return handleCron(req, res);
  return res.status(400).json({ error: 'action inválida — usar create | list | get | cron' });
};

// Vercel: extender timeout al máximo del plan Hobby (60s)
module.exports.config = {
  maxDuration: 60,
};
