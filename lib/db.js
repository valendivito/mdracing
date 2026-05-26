/**
 * MDRACING — DB helper (Supabase)
 * Cliente con service_role key, solo para uso en backend (Vercel Functions).
 *
 * NO importar este módulo desde el frontend.
 * Las queries acá tienen permisos completos (bypass RLS).
 */

const { createClient } = require('@supabase/supabase-js');

let client = null;

function getDB() {
  if (client) return client;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) {
    throw new Error('Faltan SUPABASE_URL o SUPABASE_SERVICE_KEY en Vercel env vars');
  }
  client = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return client;
}

/**
 * Guarda un pedido completo (orden + items) de forma transaccional best-effort.
 * Si el pedido ya existe (mismo id), hace upsert para actualizar status.
 *
 * @param {object} order - estructura del order construida en el endpoint
 * @returns {Promise<{ ok: boolean, error?: string }>}
 */
async function saveOrder(order) {
  try {
    const db = getDB();

    // Normalizar item para mapping a la tabla
    const orderRow = {
      id: order.id,
      mp_payment_id: order.mpPaymentId || null,
      payment_method: order.paymentMethod,
      payment_status: order.paymentStatus,
      fulfillment_status: order.fulfillmentStatus || 'pending',
      customer_name: order.customer.name,
      customer_email: order.customer.email,
      customer_phone: order.customer.phone || null,
      customer_dni: order.customer.dni || null,
      customer_cuit: order.customer.cuit || null,
      shipping_zone: order.shipping.zone,
      shipping_label: order.shipping.label || null,
      shipping_street: (order.shipping.address && order.shipping.address.street) || null,
      shipping_city: (order.shipping.address && order.shipping.address.city) || null,
      shipping_province: (order.shipping.address && order.shipping.address.province) || null,
      shipping_postal: (order.shipping.address && order.shipping.address.postal) || null,
      shipping_notes: order.shipping.notes || null,
      subtotal: order.subtotal,
      discount: order.discount || 0,
      coupon_code: order.couponCode || null,
      coupon_discount: order.couponDiscount || 0,
      shipping_cost: order.shippingCost,
      total: order.total,
    };

    // Upsert por id (si existe, actualiza; si no, inserta)
    const { error: orderErr } = await db
      .from('orders')
      .upsert(orderRow, { onConflict: 'id' });
    if (orderErr) {
      console.error('[db.saveOrder] error orders.upsert:', orderErr);
      return { ok: false, error: orderErr.message };
    }

    // Items: borrar los viejos (en caso de upsert) e insertar nuevos
    if (Array.isArray(order.items) && order.items.length) {
      // Borrar items previos del mismo order_id (idempotencia)
      await db.from('order_items').delete().eq('order_id', order.id);

      const itemsRows = order.items.map(it => ({
        order_id: order.id,
        product_id: it.id || '',
        product_name: it.name,
        variant: it.variant || null,
        qty: it.qty,
        unit_price: it.unitPrice,
      }));
      const { error: itemsErr } = await db.from('order_items').insert(itemsRows);
      if (itemsErr) {
        console.error('[db.saveOrder] error order_items.insert:', itemsErr);
        return { ok: false, error: itemsErr.message };
      }
    }

    return { ok: true };
  } catch (e) {
    console.error('[db.saveOrder] exception:', e);
    return { ok: false, error: e.message };
  }
}

/**
 * Actualiza solo el payment_status de un order existente.
 * Útil cuando MP manda un webhook "pending" → luego "approved".
 */
async function updatePaymentStatus(orderId, paymentStatus, mpPaymentId) {
  try {
    const db = getDB();
    const patch = { payment_status: paymentStatus };
    if (mpPaymentId) patch.mp_payment_id = String(mpPaymentId);
    const { error } = await db.from('orders').update(patch).eq('id', orderId);
    if (error) {
      console.error('[db.updatePaymentStatus] error:', error);
      return { ok: false, error: error.message };
    }
    return { ok: true };
  } catch (e) {
    console.error('[db.updatePaymentStatus] exception:', e);
    return { ok: false, error: e.message };
  }
}

/**
 * Lista pedidos con filtros simples.
 * @param {object} opts
 * @param {number} opts.limit (default 50)
 * @param {number} opts.offset (default 0)
 * @param {string} opts.fulfillmentStatus (opcional, filtra por estado)
 * @param {string} opts.paymentStatus (opcional)
 * @param {string} opts.search (opcional, busca en nombre/email/id)
 */
async function listOrders(opts = {}) {
  const db = getDB();
  const limit = Math.min(opts.limit || 50, 200);
  const offset = opts.offset || 0;

  let q = db
    .from('orders')
    .select('*, items:order_items(*)', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (opts.fulfillmentStatus) q = q.eq('fulfillment_status', opts.fulfillmentStatus);
  if (opts.paymentStatus) q = q.eq('payment_status', opts.paymentStatus);
  if (opts.search) {
    const s = String(opts.search).replace(/[%_]/g, '\\$&');
    q = q.or(`customer_name.ilike.%${s}%,customer_email.ilike.%${s}%,id.ilike.%${s}%`);
  }

  const { data, error, count } = await q;
  if (error) {
    console.error('[db.listOrders] error:', error);
    return { ok: false, error: error.message };
  }
  return { ok: true, orders: data || [], total: count || 0 };
}

/**
 * Obtiene un pedido por id con sus items.
 */
async function getOrder(orderId) {
  const db = getDB();
  const { data, error } = await db
    .from('orders')
    .select('*, items:order_items(*)')
    .eq('id', orderId)
    .single();
  if (error) return { ok: false, error: error.message };
  return { ok: true, order: data };
}

/**
 * Cambia el fulfillment_status (preparing → shipped → delivered, etc).
 * Opcionalmente actualiza tracking_code o internal_notes.
 */
async function updateFulfillment(orderId, patch) {
  const db = getDB();
  const allowed = {};
  if (patch.fulfillmentStatus) allowed.fulfillment_status = patch.fulfillmentStatus;
  if (patch.trackingCode !== undefined) allowed.tracking_code = patch.trackingCode || null;
  if (patch.internalNotes !== undefined) allowed.internal_notes = patch.internalNotes || null;
  if (Object.keys(allowed).length === 0) return { ok: true };

  const { error } = await db.from('orders').update(allowed).eq('id', orderId);
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

/**
 * KPIs para el dashboard del admin.
 * Devuelve totales del día / semana / mes y conteos por estado.
 */
async function getDashboardStats() {
  const db = getDB();
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
  const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7).toISOString();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

  // Helper: suma de total y count en un periodo dado, contando solo pagos confirmados
  // (approved para MP, o reserved/approved para transfer/cash, según la lógica de tu negocio)
  async function periodStats(fromIso) {
    const { data, error } = await db
      .from('orders')
      .select('total, payment_method, payment_status')
      .gte('created_at', fromIso);
    if (error || !data) return { count: 0, revenue: 0 };
    // Considerar "ventas confirmadas": MP approved, o transfer/cash reservados
    const confirmed = data.filter(o =>
      (o.payment_method === 'mp' && o.payment_status === 'approved') ||
      (o.payment_method === 'transfer' || o.payment_method === 'cash')
    );
    const revenue = confirmed.reduce((s, o) => s + Number(o.total || 0), 0);
    return { count: confirmed.length, revenue };
  }

  const [day, week, month] = await Promise.all([
    periodStats(startOfDay),
    periodStats(startOfWeek),
    periodStats(startOfMonth),
  ]);

  // Conteo por fulfillment status (pendientes de acción)
  const { data: byStatus } = await db
    .from('orders')
    .select('fulfillment_status')
    .neq('fulfillment_status', 'delivered')
    .neq('fulfillment_status', 'cancelled');
  const pendingByStatus = (byStatus || []).reduce((acc, o) => {
    acc[o.fulfillment_status] = (acc[o.fulfillment_status] || 0) + 1;
    return acc;
  }, {});

  return { ok: true, day, week, month, pendingByStatus };
}

/**
 * Valida un cupón por código.
 * Retorna { ok, coupon } si es válido o { ok: false, error } si no.
 * NO incrementa uses_count (eso se hace al confirmar la compra).
 *
 * @param {string} code     - código del cupón (se normaliza a mayúsculas)
 * @param {number} subtotal - subtotal de la compra para validar min_order
 */
async function validateCoupon(code, subtotal) {
  try {
    const db = getDB();
    const normalized = String(code).trim().toUpperCase();
    const { data, error } = await db
      .from('coupons')
      .select('*')
      .eq('code', normalized)
      .single();

    if (error || !data) return { ok: false, error: 'Cupón no encontrado' };
    if (!data.active) return { ok: false, error: 'Cupón inactivo' };
    const now = new Date();
    if (data.starts_at && new Date(data.starts_at) > now) {
      return { ok: false, error: 'Cupón aún no activo' };
    }
    if (data.expires_at && new Date(data.expires_at) < now) {
      return { ok: false, error: 'Cupón vencido' };
    }
    if (data.max_uses !== null && data.used_count >= data.max_uses) {
      return { ok: false, error: 'Cupón agotado' };
    }
    if (data.min_order !== null && subtotal < Number(data.min_order)) {
      return {
        ok: false,
        error: `El pedido mínimo para este cupón es $${Number(data.min_order).toLocaleString('es-AR')}`,
      };
    }

    // Calcular descuento
    let discountAmount;
    if (data.type === 'percent') {
      discountAmount = Math.round(subtotal * Number(data.value) / 100);
    } else { // 'amount'
      discountAmount = Math.min(Math.round(Number(data.value)), subtotal);
    }

    return { ok: true, coupon: data, discountAmount };
  } catch (e) {
    console.error('[db.validateCoupon] exception:', e);
    return { ok: false, error: 'Error al validar cupón' };
  }
}

/**
 * Incrementa el contador de usos de un cupón.
 * Llamar al confirmar la compra (después de guardar la orden).
 */
async function incrementCouponUses(couponId) {
  try {
    const db = getDB();
    const { error } = await db.rpc('increment_coupon_uses', { coupon_id: couponId });
    if (error) {
      // Fallback: update manual (puede haber race condition pero es aceptable)
      const { data: c } = await db.from('coupons').select('used_count').eq('id', couponId).single();
      await db.from('coupons').update({ used_count: (c?.used_count || 0) + 1 }).eq('id', couponId);
    }
    return { ok: true };
  } catch (e) {
    console.error('[db.incrementCouponUses] exception:', e);
    return { ok: false };
  }
}

/** Lista todos los cupones para el admin. */
async function listCoupons() {
  const db = getDB();
  const { data, error } = await db
    .from('coupons')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) return { ok: false, error: error.message };
  return { ok: true, coupons: data || [] };
}

/** Crea un nuevo cupón. */
async function createCoupon(fields) {
  const db = getDB();
  const row = {
    code: String(fields.code).trim().toUpperCase(),
    type: fields.type,
    value: Number(fields.value),
    min_order: fields.min_order ? Number(fields.min_order) : null,
    max_uses: fields.max_uses ? Number(fields.max_uses) : null,
    active: fields.active !== false,
    starts_at: fields.starts_at || null,
    expires_at: fields.expires_at || null,
    description: fields.description || null,
  };
  const { data, error } = await db.from('coupons').insert(row).select().single();
  if (error) return { ok: false, error: error.message };
  return { ok: true, coupon: data };
}

/** Actualiza un cupón por id (patch). */
async function updateCoupon(id, patch) {
  const db = getDB();
  const allowed = {};
  if (patch.active !== undefined) allowed.active = Boolean(patch.active);
  if (patch.description !== undefined) allowed.description = patch.description || null;
  if (patch.starts_at !== undefined) allowed.starts_at = patch.starts_at || null;
  if (patch.expires_at !== undefined) allowed.expires_at = patch.expires_at || null;
  if (patch.max_uses !== undefined) allowed.max_uses = patch.max_uses ? Number(patch.max_uses) : null;
  if (patch.min_order !== undefined) allowed.min_order = patch.min_order ? Number(patch.min_order) : null;
  if (patch.value !== undefined) allowed.value = Number(patch.value);
  if (Object.keys(allowed).length === 0) return { ok: true };
  const { data, error } = await db.from('coupons').update(allowed).eq('id', id).select().single();
  if (error) return { ok: false, error: error.message };
  return { ok: true, coupon: data };
}

module.exports = {
  getDB,
  saveOrder,
  updatePaymentStatus,
  listOrders,
  getOrder,
  updateFulfillment,
  getDashboardStats,
  validateCoupon,
  incrementCouponUses,
  listCoupons,
  createCoupon,
  updateCoupon,
};
