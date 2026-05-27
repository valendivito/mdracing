/**
 * Endpoint unificado de autenticación del admin.
 * Routea por ?action=login|logout|me para no comer 3 serverless functions
 * (el plan Hobby de Vercel limita a 12).
 *
 *   POST /api/admin/auth?action=login    Body: { password }
 *   POST /api/admin/auth?action=logout
 *   GET  /api/admin/auth?action=me
 */

const {
  generateToken,
  setSessionCookie,
  clearSessionCookie,
  verifyToken,
} = require('../../lib/admin-auth');

function readCookieToken(req) {
  const cookieHeader = req.headers.cookie || '';
  const match = cookieHeader.match(/(?:^|;\s*)md_admin=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

module.exports = async (req, res) => {
  const action = (req.query && req.query.action) || '';

  try {
    // ── /api/admin/auth?action=login ──
    if (action === 'login') {
      if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
      const { password } = req.body || {};
      const expected = process.env.ADMIN_PASSWORD;
      if (!expected) {
        console.error('[admin/auth] ADMIN_PASSWORD no configurada');
        return res.status(500).json({ error: 'Servidor mal configurado' });
      }
      if (!password) return res.status(400).json({ error: 'Password requerida' });
      if (password !== expected) {
        // Pequeño delay para mitigar brute-force timing
        await new Promise(r => setTimeout(r, 700));
        return res.status(401).json({ error: 'Password incorrecta' });
      }
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
