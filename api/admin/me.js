/**
 * GET /api/admin/me
 * Devuelve { authed: bool, exp? } para que el frontend sepa si el admin
 * está logueado al cargar la página.
 */
const { verifyToken, getTokenFromRequest } = require('../../lib/admin-auth');

module.exports = async (req, res) => {
  // Inline porque admin-auth no exporta getTokenFromRequest individualmente
  const cookieHeader = req.headers.cookie || '';
  const match = cookieHeader.match(/(?:^|;\s*)md_admin=([^;]+)/);
  const tok = match ? decodeURIComponent(match[1]) : null;
  if (!tok) return res.status(200).json({ authed: false });
  const v = verifyToken(tok);
  return res.status(200).json({ authed: v.valid, exp: v.exp || null });
};
