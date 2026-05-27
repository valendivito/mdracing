/**
 * MDRACING — CORS helper
 *
 * Whitelist estricta de orígenes permitidos. Si el request viene de un
 * origen no permitido, NO se setea el header Access-Control-Allow-Origin
 * y el browser bloquea la respuesta (fail-secure).
 *
 * Uso:
 *   const { applyCors } = require('../lib/cors');
 *   module.exports = async (req, res) => {
 *     if (applyCors(req, res)) return; // OPTIONS preflight resuelto
 *     // ... resto del handler
 *   };
 */

'use strict';

const ALLOWED_ORIGINS = new Set([
  'https://www.mdracingfundas.com',
  'https://mdracingfundas.com',        // por si alguien llega al apex
  'https://mdracing.vercel.app',       // preview Vercel
]);

// En desarrollo permitimos localhost (puertos comunes del dev local)
const ALLOWED_DEV_ORIGINS = [
  /^http:\/\/localhost(:\d+)?$/,
  /^http:\/\/127\.0\.0\.1(:\d+)?$/,
];

const ALLOWED_METHODS = 'GET, POST, PATCH, DELETE, OPTIONS';
const ALLOWED_HEADERS = 'Content-Type, Authorization';
const MAX_AGE = '86400'; // 24h cache del preflight

function isAllowedOrigin(origin) {
  if (!origin) return false;
  if (ALLOWED_ORIGINS.has(origin)) return true;
  // En dev/local
  if (process.env.NODE_ENV !== 'production') {
    return ALLOWED_DEV_ORIGINS.some(rx => rx.test(origin));
  }
  return false;
}

/**
 * Aplica los headers de CORS al response.
 * Si el origen está permitido → setea Access-Control-Allow-Origin con ese valor.
 * Si NO está permitido → no setea nada (el browser bloqueará el response).
 *
 * Devuelve `true` si el método es OPTIONS (preflight) y ya respondió 204.
 * Devuelve `false` si el handler debe seguir.
 */
function applyCors(req, res) {
  const origin = req.headers.origin || '';

  if (isAllowedOrigin(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Methods', ALLOWED_METHODS);
    res.setHeader('Access-Control-Allow-Headers', ALLOWED_HEADERS);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Max-Age', MAX_AGE);
  }

  // Responder preflight inmediato
  if (req.method === 'OPTIONS') {
    res.statusCode = isAllowedOrigin(origin) ? 204 : 403;
    res.end();
    return true;
  }

  return false;
}

module.exports = { applyCors, isAllowedOrigin, ALLOWED_ORIGINS };
