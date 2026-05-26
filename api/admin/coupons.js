/**
 * GET   /api/admin/coupons        — lista todos los cupones
 * POST  /api/admin/coupons        — crea un cupón nuevo
 * PATCH /api/admin/coupons?id=XX  — actualiza un cupón (active, description, etc.)
 *
 * Requiere cookie de admin.
 */

const { requireAuth } = require('../../lib/admin-auth');
const { listCoupons, createCoupon, updateCoupon } = require('../../lib/db');

module.exports = async (req, res) => {
  if (requireAuth(req, res)) return;

  try {
    // ── GET: listar todos ──
    if (req.method === 'GET') {
      const r = await listCoupons();
      if (!r.ok) return res.status(500).json({ error: r.error });
      return res.status(200).json({ coupons: r.coupons });
    }

    // ── POST: crear cupón ──
    if (req.method === 'POST') {
      const body = req.body || {};
      const { code, type, value } = body;

      if (!code || !code.trim()) return res.status(400).json({ error: 'Código requerido' });
      if (!['percent', 'amount'].includes(type)) return res.status(400).json({ error: 'type debe ser "percent" o "amount"' });
      if (!value || isNaN(Number(value)) || Number(value) <= 0) return res.status(400).json({ error: 'value inválido' });
      if (type === 'percent' && Number(value) > 100) return res.status(400).json({ error: 'Porcentaje máximo: 100' });

      const r = await createCoupon(body);
      if (!r.ok) return res.status(400).json({ error: r.error });
      return res.status(201).json({ coupon: r.coupon });
    }

    // ── PATCH: actualizar ──
    if (req.method === 'PATCH') {
      const id = (req.query || {}).id;
      if (!id) return res.status(400).json({ error: 'id requerido en query' });
      const r = await updateCoupon(id, req.body || {});
      if (!r.ok) return res.status(400).json({ error: r.error });
      return res.status(200).json({ coupon: r.coupon });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('[admin/coupons]', err);
    return res.status(500).json({ error: err.message });
  }
};
