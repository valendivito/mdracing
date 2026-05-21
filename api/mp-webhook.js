/**
 * POST /api/mp-webhook
 *
 * Mercado Pago envía notificaciones (IPN) acá cuando cambia el estado de un pago.
 * Buscamos el pago en la API de MP, construimos el pedido y mandamos los emails.
 *
 * MP envía el evento en `body.type === 'payment'` con `body.data.id` (a veces en query).
 */

const crypto = require('crypto');
const { MercadoPagoConfig, Payment } = require('mercadopago');
const { sendAdminNotification, sendCustomerConfirmation } = require('../lib/email');

function getMP() {
  const mode = (process.env.MP_MODE || 'test').toLowerCase();
  const token = mode === 'production'
    ? process.env.MP_ACCESS_TOKEN
    : process.env.MP_ACCESS_TOKEN_TEST;
  return new MercadoPagoConfig({ accessToken: token });
}

/**
 * Valida la firma del webhook de Mercado Pago.
 * MP envía headers x-signature (formato "ts=TIMESTAMP,v1=HMAC") y x-request-id.
 * El template a firmar es: id:DATA_ID;request-id:X_REQUEST_ID;ts:TIMESTAMP;
 * Se firma con HMAC-SHA256 usando MP_WEBHOOK_SECRET.
 *
 * Si MP_WEBHOOK_SECRET no está configurada, NO valida (permite el request,
 * útil durante setup inicial). Cuando se setea la env var, empieza a rechazar
 * webhooks no firmados o con firma inválida.
 *
 * Docs: https://www.mercadopago.com.ar/developers/es/docs/your-integrations/notifications/webhooks
 */
function validateMpSignature(req) {
  const secret = process.env.MP_WEBHOOK_SECRET;
  if (!secret) {
    console.warn('[mp-webhook] MP_WEBHOOK_SECRET no configurada — saltando validación');
    return { valid: true, reason: 'no-secret-configured' };
  }

  const xSignature = req.headers['x-signature'];
  const xRequestId = req.headers['x-request-id'];
  if (!xSignature || !xRequestId) {
    return { valid: false, reason: 'missing-headers' };
  }

  // Parse "ts=...,v1=..." → { ts, v1 }
  const parts = String(xSignature).split(',').reduce((acc, p) => {
    const [k, v] = p.split('=').map(s => s.trim());
    if (k && v) acc[k] = v;
    return acc;
  }, {});
  const ts = parts.ts;
  const v1 = parts.v1;
  if (!ts || !v1) return { valid: false, reason: 'invalid-signature-format' };

  // dataId: viene en query.id o body.data.id según el tipo de notificación
  const query = req.query || {};
  const body = req.body || {};
  const dataId = query['data.id'] || query.id || (body.data && body.data.id) || '';

  // Template: "id:DATA_ID;request-id:X_REQUEST_ID;ts:TIMESTAMP;"
  const manifest = `id:${dataId};request-id:${xRequestId};ts:${ts};`;
  const expected = crypto.createHmac('sha256', secret).update(manifest).digest('hex');

  // timing-safe compare
  let valid = false;
  try {
    valid = crypto.timingSafeEqual(Buffer.from(v1, 'hex'), Buffer.from(expected, 'hex'));
  } catch (e) {
    valid = false;
  }

  return { valid, reason: valid ? 'ok' : 'signature-mismatch', dataId, manifest };
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
    // ── 1. Validar firma del webhook ──
    const sig = validateMpSignature(req);
    if (!sig.valid) {
      console.error('[mp-webhook] FIRMA INVÁLIDA:', sig.reason, '- rechazando request');
      // 401 le indica a MP (y a quien sea que esté forjando webhooks) que la firma es inválida
      return res.status(401).json({ ok: false, error: 'invalid signature', reason: sig.reason });
    }
    console.log('[mp-webhook] firma OK (' + sig.reason + ')');

    const body = req.body || {};
    const query = req.query || {};

    const type = body.type || body.topic || query.type || query.topic || '';
    const dataId = (body.data && body.data.id) || query['data.id'] || query.id;

    console.log('[mp-webhook] received', { type, dataId });

    // MP también manda eventos de merchant_order, etc. Solo nos interesa "payment"
    if (type !== 'payment' || !dataId) {
      return res.status(200).json({ received: true, ignored: type });
    }

    const mp = getMP();
    const payment = await new Payment(mp).get({ id: dataId });

    const order = buildOrderFromPayment(payment);

    console.log('[mp-webhook] payment status:', payment.status, 'orderId:', order.id);

    // Solo notificar si el pago está aprobado.
    // Para "pending" (efectivo Rapipago/Pago Fácil sin pagar aún) no notificamos.
    let adminResult = null, customerResult = null;
    if (payment.status === 'approved') {
      try {
        adminResult = await sendAdminNotification(order);
        console.log('[mp-webhook] admin email enviado:', adminResult && adminResult.data && adminResult.data.id);
      } catch (e) {
        console.error('[mp-webhook] ERROR enviando admin email:', e && e.message, e);
      }
      try {
        customerResult = await sendCustomerConfirmation(order);
        console.log('[mp-webhook] customer email enviado a', order.customer.email, ':', customerResult && customerResult.data && customerResult.data.id);
      } catch (e) {
        console.error('[mp-webhook] ERROR enviando customer email:', e && e.message, e);
      }
    } else {
      console.log('[mp-webhook] pago no aprobado, no se envían emails');
    }

    return res.status(200).json({
      ok: true,
      status: payment.status,
      adminEmailSent: !!(adminResult && adminResult.data),
      customerEmailSent: !!(customerResult && customerResult.data),
    });
  } catch (err) {
    console.error('[mp-webhook] ERROR:', err);
    // Igual respondemos 200 para evitar reintentos infinitos de MP en caso de error nuestro
    return res.status(200).json({ ok: false, error: err.message });
  }
};
