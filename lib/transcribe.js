/**
 * MDRACING — Helper de transcripción de videos (sin dependencias pesadas)
 *
 * Flujo:
 *   1. Recibe URL de YouTube / TikTok / Instagram Reel.
 *   2. Llama a Cobalt API (https://cobalt.tools) → devuelve URL directa
 *      del audio del video. Cobalt es open-source, gratis, sin tarjeta.
 *      Hay instancias públicas que cualquiera puede usar.
 *   3. Descarga el audio (stream binario).
 *   4. Manda el audio a Groq Whisper API → devuelve transcript con timestamps.
 *
 * Env vars:
 *   - GROQ_API_KEY: requerida. Free tier: 7200s de audio por día.
 *   - COBALT_INSTANCE: opcional. Default: https://co.wuk.sh
 *     (instancia pública confiable). Si Cobalt cae, podés cambiar a otra
 *     instancia pública sin tocar código.
 *
 * Límite Groq Whisper: archivos hasta 25 MB. Para videos largos podríamos
 * tener que pedir audio comprimido — Cobalt ya devuelve mp3 chico por default.
 */

'use strict';

const https = require('https');
const { URL } = require('url');

const COBALT_INSTANCE = process.env.COBALT_INSTANCE || 'https://co.wuk.sh';
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_WHISPER_MODEL = process.env.GROQ_WHISPER_MODEL || 'whisper-large-v3';
const MAX_AUDIO_BYTES = 25 * 1024 * 1024; // Límite Groq

/**
 * Hace POST JSON y devuelve el body parseado.
 */
function httpsJson({ url, method, headers = {}, body }) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const bodyStr = body ? JSON.stringify(body) : '';
    const req = https.request({
      method,
      hostname: u.hostname,
      path: u.pathname + u.search,
      port: u.port || 443,
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'mdracing-video-analyzer/1.0',
        ...headers,
        ...(bodyStr ? { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(bodyStr) } : {}),
      },
      timeout: 25000,
    }, (res) => {
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => {
        const text = Buffer.concat(chunks).toString('utf8');
        let parsed;
        try { parsed = JSON.parse(text); } catch { parsed = text; }
        resolve({ status: res.statusCode, body: parsed });
      });
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('timeout cobalt')); });
    if (bodyStr) req.write(bodyStr);
    req.end();
  });
}

/**
 * Descarga el audio de la URL a un Buffer en memoria, con límite de tamaño
 * para no reventar el endpoint serverless.
 */
function downloadToBuffer(url, maxBytes = MAX_AUDIO_BYTES) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const req = https.request({
      method: 'GET',
      hostname: u.hostname,
      path: u.pathname + u.search,
      port: u.port || 443,
      headers: { 'User-Agent': 'mdracing-video-analyzer/1.0' },
      timeout: 45000,
    }, (res) => {
      // Si Cobalt nos redirige (302/301), seguimos el Location
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        downloadToBuffer(res.headers.location, maxBytes).then(resolve, reject);
        return;
      }
      if (res.statusCode !== 200) {
        reject(new Error(`Descarga falló HTTP ${res.statusCode}`));
        return;
      }
      const chunks = [];
      let total = 0;
      res.on('data', (c) => {
        total += c.length;
        if (total > maxBytes) {
          req.destroy();
          reject(new Error(`Audio supera ${Math.round(maxBytes / 1024 / 1024)} MB`));
          return;
        }
        chunks.push(c);
      });
      res.on('end', () => resolve(Buffer.concat(chunks)));
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('timeout descarga audio')); });
    req.end();
  });
}

/**
 * Llama a la API de Cobalt para obtener la URL directa del audio.
 * Devuelve { audioUrl, title?, duration? }
 */
async function fetchAudioUrl(videoUrl) {
  const res = await httpsJson({
    url: COBALT_INSTANCE + '/api/json',
    method: 'POST',
    body: {
      url: videoUrl,
      isAudioOnly: true,
      aFormat: 'mp3',
      audioBitrate: '128',
      filenamePattern: 'basic',
    },
  });

  if (res.status !== 200 || !res.body || typeof res.body !== 'object') {
    throw new Error(`Cobalt respondió status ${res.status}`);
  }

  const { status, url, body, text } = res.body;

  // Cobalt puede responder con varios status: stream, redirect, picker, error
  if (status === 'error' || status === 'rate-limit') {
    throw new Error(`Cobalt error: ${text || status}`);
  }
  if (status === 'stream' && url) return { audioUrl: url };
  if (status === 'redirect' && url) return { audioUrl: url };
  if (status === 'tunnel' && url) return { audioUrl: url };
  // El picker (varios audios disponibles) no nos pasa porque pedimos isAudioOnly
  throw new Error(`Cobalt respuesta inesperada: ${JSON.stringify(res.body).slice(0, 200)}`);
}

/**
 * Manda el buffer de audio a Groq Whisper API y devuelve { text, segments }.
 * Hace multipart/form-data manual (sin dependencia FormData) para mantener
 * cero deps externas.
 */
function transcribeWithGroq(audioBuffer) {
  if (!GROQ_API_KEY) {
    return Promise.reject(new Error('GROQ_API_KEY no configurada'));
  }
  return new Promise((resolve, reject) => {
    const boundary = '----MDRACINGBoundary' + Math.random().toString(36).slice(2);
    const filename = 'audio.mp3';

    // Construyo el multipart manualmente
    const preamble = Buffer.from(
      `--${boundary}\r\n` +
      `Content-Disposition: form-data; name="file"; filename="${filename}"\r\n` +
      `Content-Type: audio/mpeg\r\n\r\n`,
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
          reject(new Error(`Groq Whisper status ${res.statusCode}: ${text.slice(0, 300)}`));
          return;
        }
        try {
          const json = JSON.parse(text);
          resolve({
            text: json.text || '',
            segments: json.segments || [],
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

/**
 * Función principal: dado un videoUrl, devuelve { transcript, segments, duration, audioUrl }.
 * Maneja errores granulares para que el caller pueda guardar el error real en DB.
 */
async function transcribeVideo(videoUrl) {
  // 1. Obtener URL del audio vía Cobalt
  const { audioUrl } = await fetchAudioUrl(videoUrl);

  // 2. Descargar audio (límite 25 MB)
  const audioBuffer = await downloadToBuffer(audioUrl);

  // 3. Transcribir con Groq Whisper
  const result = await transcribeWithGroq(audioBuffer);

  return {
    transcript: result.text,
    segments: result.segments,
    duration: result.duration,
    language: result.language,
    audioUrl, // útil para debugging
    audioBytes: audioBuffer.length,
  };
}

module.exports = {
  transcribeVideo,
  fetchAudioUrl,
  transcribeWithGroq,
};
