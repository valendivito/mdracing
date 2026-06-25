/**
 * MDRACING — Helper de transcripción de videos (sin dependencias pesadas)
 *
 * ESTRATEGIA (multi-source con fallback):
 *
 *   1. Detectar tipo de URL:
 *      - YouTube → usar captions oficiales (youtubei.googleapis.com player API).
 *        Funciona instantáneo si el video tiene captions (95% de YouTube).
 *      - Otros (TikTok, IG, Drive) → fallback a Whisper vía URL directa.
 *
 *   2. Si no hay captions o falla:
 *      - Intentar bajar el audio/video directo del URL del usuario.
 *        Funciona si la URL es a un MP4/MP3/WAV público (Drive con permiso
 *        "cualquier persona con el link", Dropbox público, S3 público, etc.)
 *      - Mandar a Groq Whisper.
 *
 * LIMITACIONES (a tener presentes):
 *   - TikTok privados / Instagram Reels privados: no funcionan, requieren auth.
 *   - YouTube SIN captions: no podemos transcribir (Cobalt está roto).
 *   - Drive privado: el dueño debe darle permiso "Cualquiera con el link puede ver".
 *
 * Env vars:
 *   - GROQ_API_KEY: requerida para fallback Whisper.
 *   - GROQ_WHISPER_MODEL: opcional, default 'whisper-large-v3'.
 */

'use strict';

const https = require('https');
const { URL } = require('url');

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_WHISPER_MODEL = process.env.GROQ_WHISPER_MODEL || 'whisper-large-v3';
const MAX_AUDIO_BYTES = 25 * 1024 * 1024; // Límite Groq Whisper

// ════════════════════════════════════════════════════════════
// HTTP helpers
// ════════════════════════════════════════════════════════════

function httpsRequest({ url, method = 'GET', headers = {}, body, timeout = 30000, followRedirects = true, redirectsLeft = 5 }) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const bodyBuf = body
      ? (Buffer.isBuffer(body) ? body : Buffer.from(typeof body === 'string' ? body : JSON.stringify(body), 'utf8'))
      : null;
    const req = https.request({
      method,
      hostname: u.hostname,
      path: u.pathname + u.search,
      port: u.port || 443,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; mdracing-video-analyzer/1.0)',
        'Accept': '*/*',
        ...headers,
        ...(bodyBuf ? { 'Content-Length': bodyBuf.length } : {}),
      },
      timeout,
    }, (res) => {
      // Redirects
      if (followRedirects && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        if (redirectsLeft <= 0) return reject(new Error('demasiados redirects'));
        const next = new URL(res.headers.location, url).toString();
        res.resume();
        return httpsRequest({ url: next, method, headers, body, timeout, followRedirects, redirectsLeft: redirectsLeft - 1 })
          .then(resolve, reject);
      }
      const chunks = [];
      let total = 0;
      res.on('data', (c) => {
        total += c.length;
        if (total > MAX_AUDIO_BYTES * 2) { // safety cap
          req.destroy();
          return reject(new Error('respuesta demasiado grande'));
        }
        chunks.push(c);
      });
      res.on('end', () => {
        const buf = Buffer.concat(chunks);
        resolve({ status: res.statusCode, headers: res.headers, body: buf });
      });
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('timeout HTTP')); });
    if (bodyBuf) req.write(bodyBuf);
    req.end();
  });
}

// ════════════════════════════════════════════════════════════
// Detección de tipo de URL
// ════════════════════════════════════════════════════════════

function detectUrlType(rawUrl) {
  try {
    const u = new URL(rawUrl);
    const host = u.hostname.toLowerCase().replace(/^www\./, '');
    if (host === 'youtube.com' || host === 'youtu.be' || host === 'm.youtube.com' || host.endsWith('.youtube.com')) {
      return 'youtube';
    }
    if (host === 'drive.google.com' || host.endsWith('.googleusercontent.com')) {
      return 'gdrive';
    }
    if (host === 'tiktok.com' || host.endsWith('.tiktok.com')) {
      return 'tiktok';
    }
    if (host === 'instagram.com' || host.endsWith('.instagram.com')) {
      return 'instagram';
    }
    // URL directa a un archivo de audio/video
    const ext = u.pathname.toLowerCase().match(/\.(mp4|mp3|m4a|wav|webm|mov)$/);
    if (ext) return 'direct';
    return 'unknown';
  } catch {
    return 'unknown';
  }
}

function extractYouTubeId(rawUrl) {
  try {
    const u = new URL(rawUrl);
    if (u.hostname === 'youtu.be') return u.pathname.slice(1).split('/')[0];
    if (u.pathname === '/watch') return u.searchParams.get('v');
    const m = u.pathname.match(/^\/(?:shorts|embed|live)\/([^/?#]+)/);
    if (m) return m[1];
    return null;
  } catch { return null; }
}

function extractGoogleDriveFileId(rawUrl) {
  try {
    const u = new URL(rawUrl);
    // https://drive.google.com/file/d/<ID>/view
    let m = u.pathname.match(/^\/file\/d\/([^/]+)/);
    if (m) return m[1];
    // https://drive.google.com/open?id=<ID>
    if (u.searchParams.get('id')) return u.searchParams.get('id');
    return null;
  } catch { return null; }
}

// ════════════════════════════════════════════════════════════
// Source 1: YouTube — captions oficiales (sin Cobalt, sin yt-dlp)
// ════════════════════════════════════════════════════════════
// Usa el "player" endpoint público de Youtube Innertube API. Es lo que usa
// la web de YouTube para cargar el reproductor. No requiere API key.
// Devuelve los tracks de captions disponibles. Tomamos español/auto-traducidos.

/**
 * Llama al player API de YouTube con un cliente específico.
 * Cada cliente (WEB, ANDROID, IOS) puede devolver datos ligeramente distintos.
 * Para Shorts y videos muy recientes a veces solo el cliente Android tiene
 * los captionTracks visibles.
 */
async function _ytPlayerCall(videoId, clientConfig) {
  const playerRes = await httpsRequest({
    url: 'https://www.youtube.com/youtubei/v1/player?prettyPrint=false',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Visitor-Id': '',
      'User-Agent': clientConfig.ua || 'Mozilla/5.0',
    },
    body: {
      videoId,
      context: { client: clientConfig.client },
    },
    timeout: 15000,
  });
  if (playerRes.status !== 200) return null;
  try { return JSON.parse(playerRes.body.toString('utf8')); }
  catch { return null; }
}

/**
 * Intenta obtener captions de YouTube probando múltiples clientes.
 * Devuelve { transcript, segments, duration, language, title, isAuto, description }
 *
 * IMPORTANTE: si NO encuentra captions, devuelve { transcript: '', ... } con
 * metadata útil (título + descripción + duración). El caller decide qué hacer.
 * NO tira error si no hay captions.
 */
async function fetchYouTubeCaptions(videoId) {
  const clients = [
    {
      name: 'WEB',
      ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      client: {
        clientName: 'WEB',
        clientVersion: '2.20240101.00.00',
        hl: 'es', gl: 'AR',
      },
    },
    {
      name: 'ANDROID',
      ua: 'com.google.android.youtube/19.09.37 (Linux; U; Android 14)',
      client: {
        clientName: 'ANDROID',
        clientVersion: '19.09.37',
        androidSdkVersion: 34,
        hl: 'es', gl: 'AR',
      },
    },
    {
      name: 'IOS',
      ua: 'com.google.ios.youtube/19.09.3 (iPhone16,2; U; CPU iOS 17_4 like Mac OS X;)',
      client: {
        clientName: 'IOS',
        clientVersion: '19.09.3',
        deviceModel: 'iPhone16,2',
        hl: 'es', gl: 'AR',
      },
    },
  ];

  let lastTitle = null;
  let lastDuration = null;
  let lastDescription = null;
  let foundTracks = null;
  let triedClients = [];

  for (const cli of clients) {
    triedClients.push(cli.name);
    const data = await _ytPlayerCall(videoId, cli);
    if (!data) continue;

    const vd = data.videoDetails || {};
    if (!lastTitle && vd.title) lastTitle = vd.title;
    if (!lastDuration && vd.lengthSeconds) lastDuration = parseInt(vd.lengthSeconds, 10);
    if (!lastDescription && vd.shortDescription) lastDescription = vd.shortDescription;

    const tracks = data?.captions?.playerCaptionsTracklistRenderer?.captionTracks;
    if (tracks && tracks.length) {
      foundTracks = tracks;
      break;
    }
  }

  // Si NO hay captions en ningún cliente: devolvemos metadata y dejamos que
  // el análisis trabaje con lo que tenga (best effort).
  if (!foundTracks) {
    return {
      transcript: '',
      segments: [],
      duration: lastDuration,
      language: null,
      title: lastTitle,
      description: lastDescription,
      isAuto: false,
      hasCaptions: false,
      triedClients,
    };
  }

  // Hay tracks. Preferencia: español manual > español auto > primer idioma.
  const chosen =
    foundTracks.find(t => t.languageCode === 'es' && t.kind !== 'asr')
    || foundTracks.find(t => t.languageCode === 'es')
    || foundTracks.find(t => t.languageCode && t.languageCode.startsWith('es'))
    || foundTracks[0];

  if (!chosen || !chosen.baseUrl) {
    // Tracks listados pero sin baseUrl accesible → tratamos como sin captions
    return {
      transcript: '',
      segments: [],
      duration: lastDuration,
      language: null,
      title: lastTitle,
      description: lastDescription,
      isAuto: false,
      hasCaptions: false,
      triedClients,
    };
  }

  // Bajamos el XML de captions
  try {
    const captionsRes = await httpsRequest({
      url: chosen.baseUrl,
      method: 'GET',
      timeout: 15000,
    });
    if (captionsRes.status !== 200) throw new Error('captions HTTP ' + captionsRes.status);
    const xml = captionsRes.body.toString('utf8');
    const parsed = parseYouTubeCaptionsXml(xml);
    return {
      transcript: parsed.text,
      segments: parsed.segments,
      duration: lastDuration,
      language: chosen.languageCode || 'es',
      title: lastTitle,
      description: lastDescription,
      isAuto: chosen.kind === 'asr',
      hasCaptions: true,
      triedClients,
    };
  } catch (e) {
    // Falló la descarga del XML. Devolvemos metadata sin transcript.
    return {
      transcript: '',
      segments: [],
      duration: lastDuration,
      language: null,
      title: lastTitle,
      description: lastDescription,
      isAuto: false,
      hasCaptions: false,
      triedClients,
      captionsError: e.message,
    };
  }
}

function parseYouTubeCaptionsXml(xml) {
  // YouTube devuelve `<text start="0.5" dur="1.2">...</text>` con entities HTML
  const segments = [];
  const re = /<text(?:\s+start="([^"]+)")?(?:\s+dur="([^"]+)")?[^>]*>([\s\S]*?)<\/text>/g;
  let m;
  while ((m = re.exec(xml)) !== null) {
    const start = parseFloat(m[1]) || 0;
    const dur = parseFloat(m[2]) || 0;
    const rawText = m[3] || '';
    const text = decodeHtmlEntities(rawText).replace(/\s+/g, ' ').trim();
    if (text) {
      segments.push({ start, end: start + dur, text });
    }
  }
  return {
    text: segments.map(s => s.text).join(' ').trim(),
    segments,
  };
}

function decodeHtmlEntities(s) {
  return String(s || '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(parseInt(d, 10)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCharCode(parseInt(h, 16)));
}

// ════════════════════════════════════════════════════════════
// Source 2: Google Drive — descarga directa si el file es público
// ════════════════════════════════════════════════════════════

function buildGoogleDriveDownloadUrl(fileId) {
  // Usamos el endpoint público de Drive. Solo funciona si el dueño le dio
  // permiso "Cualquiera con el link puede ver".
  return `https://drive.usercontent.google.com/download?id=${encodeURIComponent(fileId)}&export=download&confirm=t`;
}

// ════════════════════════════════════════════════════════════
// Whisper (Groq) — multipart manual sin deps
// ════════════════════════════════════════════════════════════

function transcribeBufferWithGroq(audioBuffer, hintFilename = 'audio.mp3') {
  if (!GROQ_API_KEY) {
    return Promise.reject(new Error('GROQ_API_KEY no configurada en Vercel env vars'));
  }
  return new Promise((resolve, reject) => {
    const boundary = '----MDRACINGBoundary' + Math.random().toString(36).slice(2);
    const preamble = Buffer.from(
      `--${boundary}\r\n` +
      `Content-Disposition: form-data; name="file"; filename="${hintFilename}"\r\n` +
      `Content-Type: application/octet-stream\r\n\r\n`,
      'utf8'
    );
    const postFile = Buffer.from(`\r\n--${boundary}\r\n`, 'utf8');
    const modelField = Buffer.from(
      `Content-Disposition: form-data; name="model"\r\n\r\n${GROQ_WHISPER_MODEL}\r\n--${boundary}\r\n`,
      'utf8'
    );
    const formatField = Buffer.from(
      `Content-Disposition: form-data; name="response_format"\r\n\r\nverbose_json\r\n--${boundary}--\r\n`,
      'utf8'
    );

    const fullBody = Buffer.concat([preamble, audioBuffer, postFile, modelField, formatField]);

    const req = https.request({
      method: 'POST',
      hostname: 'api.groq.com',
      path: '/openai/v1/audio/transcriptions',
      port: 443,
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
        'Content-Length': fullBody.length,
      },
      timeout: 50000,
    }, (res) => {
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => {
        const text = Buffer.concat(chunks).toString('utf8');
        if (res.statusCode !== 200) {
          return reject(new Error(`Groq Whisper status ${res.statusCode}: ${text.slice(0, 300)}`));
        }
        try {
          const json = JSON.parse(text);
          resolve({
            text: json.text || '',
            segments: (json.segments || []).map(s => ({ start: s.start, end: s.end, text: s.text })),
            duration: json.duration || null,
            language: json.language || null,
          });
        } catch (e) {
          reject(new Error('Groq devolvió JSON inválido'));
        }
      });
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('timeout Groq')); });
    req.write(fullBody);
    req.end();
  });
}

// ════════════════════════════════════════════════════════════
// Función principal — orquesta sources con fallback
// ════════════════════════════════════════════════════════════

async function transcribeVideo(videoUrl) {
  const type = detectUrlType(videoUrl);

  // ── YouTube: probamos múltiples clientes para captions ──
  // Si NO hay captions, devolvemos transcript vacío + metadata. NO tiramos
  // error — el análisis va a trabajar best-effort con título + descripción.
  if (type === 'youtube') {
    const videoId = extractYouTubeId(videoUrl);
    if (!videoId) throw new Error('No se pudo extraer ID de YouTube de la URL');

    const captions = await fetchYouTubeCaptions(videoId);

    return {
      transcript: captions.transcript || '',
      segments: captions.segments,
      duration: captions.duration,
      language: captions.language,
      title: captions.title,
      description: captions.description,
      source: captions.hasCaptions
        ? (captions.isAuto ? 'youtube-auto-captions' : 'youtube-captions')
        : 'youtube-metadata-only',
      hasCaptions: captions.hasCaptions,
      audioUrl: null,
    };
  }

  // ── Google Drive: descarga directa + Whisper ──
  if (type === 'gdrive') {
    const fileId = extractGoogleDriveFileId(videoUrl);
    if (!fileId) throw new Error('No se pudo extraer ID de Google Drive');

    const dl = await httpsRequest({
      url: buildGoogleDriveDownloadUrl(fileId),
      method: 'GET',
      timeout: 60000,
    });
    if (dl.status !== 200) {
      throw new Error(`Drive descarga falló status ${dl.status}. Verificá que el archivo tenga permiso "Cualquiera con el link puede ver".`);
    }

    // Drive devuelve HTML si hay "warning de descarga grande" o si no es público
    const ct = (dl.headers['content-type'] || '').toLowerCase();
    if (ct.includes('text/html')) {
      throw new Error('Drive devolvió HTML en vez del archivo. El video no es público o es muy grande. Cambiá permiso a "Cualquiera con el link" o subilo a YouTube como "No listado".');
    }

    if (dl.body.length > MAX_AUDIO_BYTES) {
      throw new Error(`Archivo supera 25 MB (Whisper máx). Tu video pesa ${Math.round(dl.body.length / 1024 / 1024)} MB. Subilo a YouTube "No listado" en su lugar.`);
    }

    const result = await transcribeBufferWithGroq(dl.body, 'drive-video.mp4');
    return {
      transcript: result.text,
      segments: result.segments,
      duration: result.duration,
      language: result.language,
      source: 'gdrive+whisper',
      audioUrl: null,
    };
  }

  // ── URL directa a archivo de audio/video público ──
  if (type === 'direct') {
    const dl = await httpsRequest({ url: videoUrl, method: 'GET', timeout: 60000 });
    if (dl.status !== 200) throw new Error(`Descarga directa falló status ${dl.status}`);
    if (dl.body.length > MAX_AUDIO_BYTES) {
      throw new Error(`Archivo supera 25 MB. Pesa ${Math.round(dl.body.length / 1024 / 1024)} MB.`);
    }
    const result = await transcribeBufferWithGroq(dl.body);
    return {
      transcript: result.text,
      segments: result.segments,
      duration: result.duration,
      language: result.language,
      source: 'direct+whisper',
      audioUrl: null,
    };
  }

  // ── TikTok / Instagram: por ahora no soportados (Cobalt está roto) ──
  if (type === 'tiktok' || type === 'instagram') {
    throw new Error(
      `${type === 'tiktok' ? 'TikTok' : 'Instagram'} no soportado directamente. ` +
      `Re-subí el video como "No listado" en YouTube y pasanos ese link, ` +
      `o subilo a Google Drive con permiso "Cualquiera con el link puede ver".`
    );
  }

  throw new Error(`Tipo de URL no soportado. Usá YouTube (No listado), Google Drive público, o URL directa a un MP4/MP3.`);
}

module.exports = {
  transcribeVideo,
  detectUrlType,
  extractYouTubeId,
  extractGoogleDriveFileId,
  fetchYouTubeCaptions,
  transcribeBufferWithGroq,
};
