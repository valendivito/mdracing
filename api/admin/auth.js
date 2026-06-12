/**
 * Endpoint unificado de autenticación del admin.
 * Routea por ?action=login|logout|me para no comer 3 serverless functions
 * (el plan Hobby de Vercel limita a 12).
 *
 *   POST /api/admin/auth?action=login    Body: { password }
 *   POST /api/admin/auth?action=logout
 *   GET  /api/admin/auth?action=me
 */

const crypto = require('crypto');
const {
  generateToken,
  setSessionCookie,
  clearSessionCookie,
  verifyToken,
} = require('../../lib/admin-auth');
const { limit, reset, getClientIp } = require('../../lib/rate-limit');

function readCookieToken(req) {
  const cookieHeader = req.headers.cookie || '';
  const match = cookieHeader.match(/(?:^|;\s*)md_admin=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

/**
 * Comparación de strings timing-safe (resistente a timing attacks).
 * Devuelve true si ambos strings son IDÉNTICOS, false en otro caso.
 * Si las longitudes difieren ya devuelve false, pero igual hace una
 * comparación dummy para no leakar info de longitud.
 */
function constantTimeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  const ab = Buffer.from(a, 'utf8');
  const bb = Buffer.from(b, 'utf8');
  if (ab.length !== bb.length) {
    // dummy compare contra sí mismo para mantener constant-time
    crypto.timingSafeEqual(ab, ab);
    return false;
  }
  return crypto.timingSafeEqual(ab, bb);
}

module.exports = async (req, res) => {
  const action = (req.query && req.query.action) || '';

  try {
    // ── /api/admin/auth?action=login ──
    if (action === 'login') {
      if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

      // ── Rate limit: 5 intentos por IP cada 15 minutos ──
      const ip = getClientIp(req);
      const rl = limit('admin-login:' + ip, { max: 5, windowMs: 15 * 60 * 1000 });
      if (!rl.allowed) {
        const retryAfter = Math.ceil(rl.msUntilReset / 1000);
        console.warn(JSON.stringify({
          event: 'admin_login_rate_limited',
          ip,
          attempts: rl.count,
          retryAfterSec: retryAfter,
          ts: new Date().toISOString(),
        }));
        res.setHeader('Retry-After', String(retryAfter));
        return res.status(429).json({
          error: 'Demasiados intentos. Esperá unos minutos antes de volver a probar.',
        });
      }

      const { password } = req.body || {};
      const expected = process.env.ADMIN_PASSWORD;
      if (!expected) {
        console.error('[admin/auth] ADMIN_PASSWORD no configurada');
        return res.status(500).json({ error: 'Servidor mal configurado' });
      }
      if (!password) return res.status(400).json({ error: 'Password requerida' });

      // Timing-safe compare
      if (!constantTimeEqual(String(password), String(expected))) {
        // Delay artificial para sumar fricción al brute-force
        await new Promise(r => setTimeout(r, 700));
        // Log estructurado (sin password)
        console.warn(JSON.stringify({
          event: 'admin_login_failed',
          ip,
          attempts: rl.count,
          remaining: rl.remaining,
          ts: new Date().toISOString(),
        }));
        return res.status(401).json({ error: 'Password incorrecta' });
      }

      // Login OK → reseteamos el bucket de la IP para que no quede penalizada
      reset('admin-login:' + ip);
      console.info(JSON.stringify({
        event: 'admin_login_ok',
        ip,
        ts: new Date().toISOString(),
      }));

      const token = generateToken();
      setSessionCookie(res, token);
      return res.status(200).json({ ok: true });
    }

    // ── /api/admin/auth?action=logout ──
    if (action === 'logout') {
      if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
      clearSessionCookie(res);
      return res.status(200).json({ ok: true });
    }

    // ── /api/admin/auth?action=me ──
    if (action === 'me') {
      const tok = readCookieToken(req);
      if (!tok) return res.status(200).json({ authed: false });
      const v = verifyToken(tok);
      return res.status(200).json({ authed: v.valid, exp: v.exp || null });
    }

    return res.status(400).json({ error: 'action inválida — usar login | logout | me' });
  } catch (e) {
    console.error('[admin/auth] error:', e);
    return res.status(500).json({ error: e.message });
  }
};
