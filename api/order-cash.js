/**
 * POST /api/order-cash
 *
 * Crea un pedido reservado con pago en EFECTIVO al retiro o coordinado por WA.
 * No interactúa con Mercado Pago — solo manda los emails y confirma la reserva.
 *
 * Body: igual al de /api/checkout
 *   { items, customer, shipping }
 *
 * Devuelve: { ok: true, orderId }
 */

const { sendAdminNotification, sendCustomerConfirmation } = require('../lib/email');
const { calcShipping, priceToNumber } = require('../lib/shipping');

function generateOrderId() {
  const date = new Date();
  const datePart = date.toISOString().slice(2, 10).replace(/-/g, '');
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `MDR-${datePart}-${rand}`;
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const body = req.body || {};
    const { items, customer, shipping } = body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'items requerido' });
    }
    if (!customer || !customer.name || !customer.email || !customer.phone) {
      return res.status(400).json({ error: 'datos del cliente incompletos' });
    }
    if (!shipping || !shipping.zone) {
      return res.status(400).json({ error: 'shipping.zone requerido' });
    }
    const isPickup = String(shipping.zone).startsWith('retiro-');
    if (!isPickup) {
      const addr = shipping.address || {};
      if (!addr.street || !addr.city || !addr.province) {
        return res.status(400).json({ error: 'dirección de envío incompleta' });
      }
    }

    const normalizedItems = items.map(it => ({
      id: String(it.id || ''),
      name: String(it.name || 'Producto'),
      variant: it.variant || '',
      qty: parseInt(it.qty, 10) || 1,
      unitPrice: priceToNumber(it.unitPrice),
      freeShipping: Boolean(it.freeShipping),
    }));
    const subtotal = normalizedItems.reduce((s, it) => s + it.unitPrice * it.qty, 0);
    const shippingResult = calcShipping(normalizedItems, shipping.zone);

    // Descuento 10% si el método es 'transfer' (transferencia o efectivo)
    // Permitimos que el cliente mande `discount` calculado en frontend pero lo
    // re-calculamos en backend como seguridad.
    const requestedMethod = body.paymentMethod || 'transfer'; // 'transfer' o 'cash' = mismo flujo
    const isTransferOrCash = requestedMethod === 'transfer' || requestedMethod === 'cash';
    const discount = isTransferOrCash ? Math.round(subtotal * 0.10) : 0;
    const total = subtotal - discount + shippingResult.cost;

    const order = {
      id: generateOrderId(),
      paymentMethod: isTransferOrCash ? 'transfer' : 'cash',
      paymentStatus: 'reserved',
      createdAt: new Date().toISOString(),
      customer: {
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        dni: customer.dni || '',
        cuit: customer.cuit || '',
      },
      items: normalizedItems,
      shipping: {
        zone: shipping.zone,
        label: shippingResult.label,
        notes: shipping.notes || '',
        address: shipping.address || null,
      },
      subtotal,
      discount,
      shippingCost: shippingResult.cost,
      total,
    };

    // Notificaciones (no bloqueamos si una falla)
    try {
      await sendAdminNotification(order);
    } catch (e) { console.error('[order-cash] error admin email:', e); }
    try {
      await sendCustomerConfirmation(order);
    } catch (e) { console.error('[order-cash] error customer email:', e); }

    return res.status(200).json({ ok: true, orderId: order.id, total });
  } catch (err) {
    console.error('Error en /api/order-cash:', err);
    return res.status(500).json({ error: err.message });
  }
};
