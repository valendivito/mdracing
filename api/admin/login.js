/**
 * POST /api/admin/login
 * Body: { password }
 * Si matchea con ADMIN_PASSWORD, setea cookie de sesión y devuelve 200.
 */

const { generateToken, setSessionCookie } = require('../../lib/admin-auth');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { password } = req.body || {};
    const expected = process.env.ADMIN_PASSWORD;
    if (!expected) {
      console.error('[admin/login] ADMIN_PASSWORD no configurada');
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
  } catch (e) {
    console.error('[admin/login] error:', e);
    return res.status(500).json({ error: e.message });
  }
};
