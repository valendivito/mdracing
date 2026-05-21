/**
 * MDRACING — Admin authentication (mini-JWT con HMAC)
 *
 * Simple para no traer una dep extra: token = base64(payload).hmacSHA256.
 * El payload solo guarda { exp: timestamp_ms_de_expiracion }.
 * El secret es ADMIN_SESSION_SECRET (o ADMIN_PASSWORD si no está set, como fallback).
 */

const crypto = require('crypto');

const COOKIE_NAME = 'md_admin';
const SESSION_TTL_HOURS = 24 * 7; // 7 días

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || 'change-me-please';
}

function b64url(buf) {
  return Buffer.from(buf).toString('base64')
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
function b64urlDecode(s) {
  s = s.replace(/-/g, '+').replace(/_/g, '/');
  while (s.length % 4) s += '=';
  return Buffer.from(s, 'base64').toString('utf8');
}

function sign(payloadStr) {
  return b64url(crypto.createHmac('sha256', getSecret()).update(payloadStr).digest());
}

/**
 * Genera un token firmado válido por SESSION_TTL_HOURS horas.
 */
function generateToken() {
  const exp = Date.now() + SESSION_TTL_HOURS * 3600 * 1000;
  const payload = JSON.stringify({ exp });
  const payloadB64 = b64url(Buffer.from(payload, 'utf8'));
  const sig = sign(payloadB64);
  return `${payloadB64}.${sig}`;
}

/**
 * Verifica un token. Devuelve { valid: bool, exp?, reason? }.
 */
function verifyToken(token) {
  if (!token || typeof token !== 'string') return { valid: false, reason: 'no-token' };
  const [payloadB64, sig] = token.split('.');
  if (!payloadB64 || !sig) return { valid: false, reason: 'malformed' };

  const expected = sign(payloadB64);
  // timing-safe compare
  if (sig.length !== expected.length) return { valid: false, reason: 'signature-length' };
  try {
    if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) {
      return { valid: false, reason: 'signature-mismatch' };
    }
  } catch (e) {
    return { valid: false, reason: 'signature-error' };
  }

  let payload;
  try {
    payload = JSON.parse(b64urlDecode(payloadB64));
  } catch (e) {
    return { valid: false, reason: 'payload-parse' };
  }
  if (!payload.exp || Date.now() > payload.exp) {
    return { valid: false, reason: 'expired' };
  }
  return { valid: true, exp: payload.exp };
}

/**
 * Lee el token de las cookies del request.
 */
function getTokenFromRequest(req) {
  const cookieHeader = req.headers.cookie || '';
  const match = cookieHeader.match(new RegExp('(?:^|;\\s*)' + COOKIE_NAME + '=([^;]+)'));
  return match ? decodeURIComponent(match[1]) : null;
}

/**
 * Devuelve true si el request está autenticado como admin.
 * Para usar al principio de cada endpoint /api/admin/*
 */
function isAuthed(req) {
  const tok = getTokenFromRequest(req);
  if (!tok) return false;
  return verifyToken(tok).valid;
}

/**
 * Setea la cookie de sesión en el response.
 */
function setSessionCookie(res, token) {
  const maxAge = SESSION_TTL_HOURS * 3600;
  const parts = [
    `${COOKIE_NAME}=${encodeURIComponent(token)}`,
    'Path=/',
    `Max-Age=${maxAge}`,
    'HttpOnly',
    'Secure',
    'SameSite=Lax',
  ];
  res.setHeader('Set-Cookie', parts.join('; '));
}

function clearSessionCookie(res) {
  res.setHeader('Set-Cookie',
    `${COOKIE_NAME}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax`);
}

/**
 * Middleware-style: si no está autenticado, responde 401 y devuelve true.
 * Para usar como guard al inicio de un endpoint:
 *   if (requireAuth(req, res)) return;
 */
function requireAuth(req, res) {
  if (isAuthed(req)) return false;
  res.status(401).json({ error: 'No autenticado' });
  return true;
}

module.exports = {
  generateToken,
  verifyToken,
  isAuthed,
  setSessionCookie,
  clearSessionCookie,
  requireAuth,
  COOKIE_NAME,
};
