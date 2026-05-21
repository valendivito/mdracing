/**
 * POST /api/checkout
 *
 * Recibe del frontend:
 * {
 *   items: [{ id, name, variant?, qty, unitPrice, freeShipping? }],
 *   customer: { name, email, phone, dni?, cuit? },
 *   shipping: {
 *     zone: 'retiro-fabrica' | 'retiro-local' | 'caba' | 'gba-norte-oeste' | 'gba-sur-resto-ba' | 'interior',
 *     address?: { street, city, province, postal },
 *     notes?: string
 *   }
 * }
 *
 * Devuelve:
 * {
 *   orderId: 'MDR-260520-AB12',
 *   preferenceId: '...',
 *   initPoint: 'https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=...',
 *   sandboxInitPoint: 'https://sandbox.mercadopago.com.ar/checkout/v1/redirect?pref_id=...',
 *   mode: 'test' | 'production'
 * }
 */

const { MercadoPagoConfig, Preference } = require('mercadopago');
const { calcShipping, priceToNumber } = require('../lib/shipping');

function getMP() {
  const mode = (process.env.MP_MODE || 'test').toLowerCase();
  const token = mode === 'production'
    ? process.env.MP_ACCESS_TOKEN
    : process.env.MP_ACCESS_TOKEN_TEST;
  if (!token) {
    throw new Error(`Falta configurar ${mode === 'production' ? 'MP_ACCESS_TOKEN' : 'MP_ACCESS_TOKEN_TEST'} en Vercel`);
  }
  return new MercadoPagoConfig({ accessToken: token, options: { timeout: 7000 } });
}

function generateOrderId() {
  const date = new Date();
  const datePart = date.toISOString().slice(2, 10).replace(/-/g, ''); // YYMMDD
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `MDR-${datePart}-${rand}`;
}

function getBaseUrl(req) {
  // En producción usar el host configurado
  const envUrl = process.env.PUBLIC_SITE_URL;
  if (envUrl) return envUrl.replace(/\/$/, '');
  if (req.headers.origin) return req.headers.origin;
  if (req.headers.host) return 'https://' + req.headers.host;
  return 'https://www.mdracingfundas.com';
}

module.exports = async (req, res) => {
  // CORS para llamadas desde el frontend (mismo dominio en Vercel pero por las dudas)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const body = req.body || {};
    const { items, customer, shipping } = body;

    // ── Validaciones básicas ──
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'items requerido' });
    }
    if (!customer || !customer.name || !customer.email || !customer.phone) {
      return res.status(400).json({ error: 'datos del cliente incompletos' });
    }
    if (!shipping || !shipping.zone) {
      return res.status(400).json({ error: 'shipping.zone requerido' });
    }

    // Si no es retiro, exigir dirección
    const isPickup = String(shipping.zone).startsWith('retiro-');
    if (!isPickup) {
      const addr = shipping.address || {};
      if (!addr.street || !addr.city || !addr.province) {
        return res.status(400).json({ error: 'dirección de envío incompleta' });
      }
    }

    // ── Calcular totales ──
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
    const total = subtotal + shippingResult.cost;

    if (total <= 0) {
      return res.status(400).json({ error: 'total inválido' });
    }

    const orderId = generateOrderId();
    const baseUrl = getBaseUrl(req);

    // ── Construir items para MP ──
    const mpItems = normalizedItems.map(it => ({
      id: it.id,
      title: it.name + (it.variant ? ` — ${it.variant}` : ''),
      quantity: it.qty,
      unit_price: it.unitPrice,
      currency_id: 'ARS',
    }));

    // Agregar línea de envío como item si tiene costo
    if (shippingResult.cost > 0) {
      mpItems.push({
        id: 'shipping',
        title: shippingResult.label,
        quantity: 1,
        unit_price: shippingResult.cost,
        currency_id: 'ARS',
      });
    }

    // ── Crear preferencia ──
    const preferenceBody = {
      items: mpItems,
      payer: {
        name: customer.name,
        email: customer.email,
        phone: { area_code: '11', number: String(customer.phone).replace(/\D/g, '') },
        ...(customer.dni ? { identification: { type: 'DNI', number: String(customer.dni) } } : {}),
      },
      back_urls: {
        success: `${baseUrl}/?compra=ok&id=${orderId}`,
        pending: `${baseUrl}/?compra=pending&id=${orderId}`,
        failure: `${baseUrl}/?compra=failure&id=${orderId}`,
      },
      auto_return: 'approved',
      external_reference: orderId,
      notification_url: `${baseUrl}/api/mp-webhook`,
      statement_descriptor: 'MDRACING',
      metadata: {
        order_id: orderId,
        customer_name: customer.name,
        customer_phone: customer.phone,
        shipping_zone: shipping.zone,
        shipping_label: shippingResult.label,
        ...(shipping.address ? {
          shipping_street: shipping.address.street,
          shipping_city: shipping.address.city,
          shipping_province: shipping.address.province,
          shipping_postal: shipping.address.postal || '',
        } : {}),
        ...(shipping.notes ? { shipping_notes: shipping.notes } : {}),
      },
    };

    const mp = getMP();
    const pref = await new Preference(mp).create({ body: preferenceBody });

    return res.status(200).json({
      orderId,
      preferenceId: pref.id,
      initPoint: pref.init_point,
      sandboxInitPoint: pref.sandbox_init_point,
      mode: (process.env.MP_MODE || 'test').toLowerCase(),
      summary: {
        subtotal,
        shippingCost: shippingResult.cost,
        shippingLabel: shippingResult.label,
        shippingFree: shippingResult.free,
        total,
      },
    });

  } catch (err) {
    console.error('Error en /api/checkout:', err);
    return res.status(500).json({ error: 'Error al crear pedido', detail: err.message });
  }
};
