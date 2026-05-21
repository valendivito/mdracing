/**
 * POST /api/mp-webhook
 *
 * Mercado Pago envía notificaciones (IPN) acá cuando cambia el estado de un pago.
 * Buscamos el pago en la API de MP, construimos el pedido y mandamos los emails.
 *
 * MP envía el evento en `body.type === 'payment'` con `body.data.id` (a veces en query).
 */

const { MercadoPagoConfig, Payment } = require('mercadopago');
const { sendAdminNotification, sendCustomerConfirmation } = require('../lib/email');

function getMP() {
  const mode = (process.env.MP_MODE || 'test').toLowerCase();
  const token = mode === 'production'
    ? process.env.MP_ACCESS_TOKEN
    : process.env.MP_ACCESS_TOKEN_TEST;
  return new MercadoPagoConfig({ accessToken: token });
}

function buildOrderFromPayment(payment) {
  const meta = payment.metadata || {};
  const items = (payment.additional_info && payment.additional_info.items) || [];

  // Filtramos el "item de shipping" para calcular subtotal real
  const productItems = items.filter(it => String(it.id) !== 'shipping');
  const shippingItem = items.find(it => String(it.id) === 'shipping');

  const subtotal = productItems.reduce(
    (s, it) => s + (parseFloat(it.unit_price) || 0) * (parseInt(it.quantity, 10) || 1),
    0
  );
  const shippingCost = shippingItem
    ? (parseFloat(shippingItem.unit_price) || 0) * (parseInt(shippingItem.quantity, 10) || 1)
    : 0;

  const hasAddress = meta.shipping_street && meta.shipping_city;

  return {
    id: payment.external_reference || `MP-${payment.id}`,
    mpPaymentId: payment.id,
    paymentMethod: 'mp',
    paymentStatus: payment.status,
    createdAt: payment.date_created || new Date().toISOString(),
    customer: {
      name: meta.customer_name
        || [(payment.payer && payment.payer.first_name) || '', (payment.payer && payment.payer.last_name) || ''].join(' ').trim()
        || 'Cliente',
      email: (payment.payer && payment.payer.email) || '',
      phone: meta.customer_phone || ((payment.payer && payment.payer.phone && payment.payer.phone.number) || ''),
      dni: (payment.payer && payment.payer.identification && payment.payer.identification.number) || '',
    },
    items: productItems.map(it => ({
      id: it.id,
      name: it.title,
      qty: parseInt(it.quantity, 10) || 1,
      unitPrice: parseFloat(it.unit_price) || 0,
    })),
    shipping: {
      zone: meta.shipping_zone || '',
      label: meta.shipping_label || '',
      notes: meta.shipping_notes || '',
      address: hasAddress ? {
        street: meta.shipping_street,
        city: meta.shipping_city,
        province: meta.shipping_province || '',
        postal: meta.shipping_postal || '',
      } : null,
    },
    subtotal,
    shippingCost,
    total: payment.transaction_amount || (subtotal + shippingCost),
  };
}

module.exports = async (req, res) => {
  // MP requiere responder rápido (200) para confirmar recepción
  try {
    const body = req.body || {};
    const query = req.query || {};

    const type = body.type || body.topic || query.type || query.topic || '';
    const dataId = (body.data && body.data.id) || query['data.id'] || query.id;

    console.log('[mp-webhook] received', { type, dataId, body, query });

    // MP también manda eventos de merchant_order, etc. Solo nos interesa "payment"
    if (type !== 'payment' || !dataId) {
      return res.status(200).json({ received: true, ignored: type });
    }

    const mp = getMP();
    const payment = await new Payment(mp).get({ id: dataId });

    const order = buildOrderFromPayment(payment);

    // Solo notificar si el pago está aprobado.
    // Para "pending" (efectivo Rapipago/Pago Fácil sin pagar aún) no notificamos.
    if (payment.status === 'approved') {
      try {
        await sendAdminNotification(order);
      } catch (e) { console.error('[mp-webhook] error admin email:', e); }
      try {
        await sendCustomerConfirmation(order);
      } catch (e) { console.error('[mp-webhook] error customer email:', e); }
    }

    return res.status(200).json({ ok: true, status: payment.status });
  } catch (err) {
    console.error('[mp-webhook] ERROR:', err);
    // Igual respondemos 200 para evitar reintentos infinitos de MP en caso de error nuestro
    return res.status(200).json({ ok: false, error: err.message });
  }
};
