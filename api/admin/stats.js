/**
 * GET /api/admin/stats
 * KPIs del dashboard: ventas día/semana/mes + pedidos por estado.
 * Requiere auth.
 */

const { requireAuth } = require('../../lib/admin-auth');
const { getDashboardStats } = require('../../lib/db');

module.exports = async (req, res) => {
  if (requireAuth(req, res)) return;
  try {
    const r = await getDashboardStats();
    if (!r.ok) return res.status(500).json({ error: 'DB error' });
    return res.status(200).json(r);
  } catch (e) {
    console.error('[admin/stats]', e);
    return res.status(500).json({ error: e.message });
  }
};
