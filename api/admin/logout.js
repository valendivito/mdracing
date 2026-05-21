/**
 * POST /api/admin/logout
 * Limpia la cookie de sesión.
 */
const { clearSessionCookie } = require('../../lib/admin-auth');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  clearSessionCookie(res);
  res.status(200).json({ ok: true });
};
