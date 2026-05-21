/**
 * GET  /api/admin/orders          — lista de pedidos con filtros
 * GET  /api/admin/orders?id=XXX   — detalle de 1 pedido
 * PATCH /api/admin/orders         — actualizar fulfillment_status / tracking / notas
 *
 * Requiere cookie de admin (auth).
 */

const { requireAuth } = require('../../lib/admin-auth');
const { listOrders, getOrder, updateFulfillment } = require('../../lib/db');

module.exports = async (req, res) => {
  // Auth: si no está autenticado, devuelve 401 y true
  if (requireAuth(req, res)) return;

  try {
    if (req.method === 'GET') {
      const q = req.query || {};
      // Detalle de 1 pedido por ID
      if (q.id) {
        const r = await getOrder(String(q.id));
        if (!r.ok) return res.status(404).json({ error: r.error || 'No encontrado' });
        return res.status(200).json({ order: r.order });
      }
      // Lista
      const r = await listOrders({
        limit: q.limit ? parseInt(q.limit, 10) : 50,
        offset: q.offset ? parseInt(q.offset, 10) : 0,
        fulfillmentStatus: q.fulfillment || undefined,
        paymentStatus: q.payment || undefined,
        search: q.q || undefined,
      });
      if (!r.ok) return res.status(500).json({ error: r.error });
      return res.status(200).json({ orders: r.orders, total: r.total });
    }

    if (req.method === 'PATCH') {
      const { orderId, fulfillmentStatus, trackingCode, internalNotes } = req.body || {};
      if (!orderId) return res.status(400).json({ error: 'orderId requerido' });
      const r = await updateFulfillment(orderId, { fulfillmentStatus, trackingCode, internalNotes });
      if (!r.ok) return res.status(500).json({ error: r.error });
      return res.status(200).json({ ok: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (e) {
    console.error('[admin/orders]', e);
    return res.status(500).json({ error: e.message });
  }
};
