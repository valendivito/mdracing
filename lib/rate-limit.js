/**
 * MDRACING — Rate limiter en memoria (per-instance)
 *
 * Ligero, sin dependencias. Mantiene contador por key (típicamente IP)
 * en un Map con expiración por sliding window.
 *
 * LIMITACIONES (a tener presentes):
 * - El estado vive en memoria de la Vercel Function. Cada cold-start lo
 *   resetea, y si Vercel hace scale-out cada réplica tiene su propio mapa.
 *   Para el caso de uso (anti brute-force login admin) alcanza: aunque
 *   el atacante reparta intentos entre réplicas, la latencia del cold
 *   start + 700ms delay ya hace inviable el brute force serio.
 * - Si en el futuro se necesita rate limit distribuido real (ej. proteger
 *   API pública de scraping), pasar a Upstash Ratelimit o Vercel Edge Config.
 *
 * Uso:
 *   const { limit } = require('../../lib/rate-limit');
 *   const result = limit('login:' + ip, { max: 5, windowMs: 15 * 60 * 1000 });
 *   if (!result.allowed) {
 *     res.setHeader('Retry-After', Math.ceil(result.msUntilReset / 1000));
 *     return res.status(429).json({ error: 'Demasiados intentos. Esperá unos minutos.' });
 *   }
 */

'use strict';

// Map<key, { count, resetAt }>
const buckets = new Map();

// Limpieza periódica (best-effort). En serverless puede no ejecutarse
// pero el size cap evita memory leak igual.
const MAX_KEYS = 10000;

function _gc(now) {
  if (buckets.size < MAX_KEYS) return;
  // Borrar los más viejos primero (los expirados)
  let removed = 0;
  for (const [k, v] of buckets) {
    if (v.resetAt <= now) {
      buckets.delete(k);
      removed++;
      if (buckets.size < MAX_KEYS / 2) break;
    }
  }
  // Si aún sigue lleno, dropear los más viejos sin importar reset
  if (buckets.size >= MAX_KEYS) {
    const arr = [...buckets.entries()].sort((a, b) => a[1].resetAt - b[1].resetAt);
    for (const [k] of arr.slice(0, Math.floor(MAX_KEYS / 4))) buckets.delete(k);
  }
  return removed;
}

/**
 * Aplica rate limit y devuelve el resultado.
 *
 * @param {string} key - identificador (típicamente "endpoint:ip")
 * @param {object} opts
 * @param {number} opts.max - máximo de intentos permitidos en la ventana
 * @param {number} opts.windowMs - ventana de tiempo en milisegundos
 * @returns {{allowed: boolean, remaining: number, msUntilReset: number, count: number}}
 */
function limit(key, opts) {
  const max = (opts && opts.max) || 100;
  const windowMs = (opts && opts.windowMs) || 15 * 60 * 1000;
  const now = Date.now();

  _gc(now);

  let bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    bucket = { count: 0, resetAt: now + windowMs };
    buckets.set(key, bucket);
  }

  bucket.count++;

  const remaining = Math.max(0, max - bucket.count);
  const msUntilReset = Math.max(0, bucket.resetAt - now);
  const allowed = bucket.count <= max;

  return { allowed, remaining, msUntilReset, count: bucket.count };
}

/**
 * Reset manual (útil después de un login exitoso para limpiar el bucket).
 */
function reset(key) {
  buckets.delete(key);
}

/**
 * Extrae la IP del request (Vercel pasa la IP real en x-forwarded-for).
 */
function getClientIp(req) {
  const xff = req.headers['x-forwarded-for'];
  if (xff) return String(xff).split(',')[0].trim();
  return req.headers['x-real-ip'] || req.connection?.remoteAddress || 'unknown';
}

module.exports = { limit, reset, getClientIp };
