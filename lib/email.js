/**
 * MDRACING — Envío de emails con Resend
 * - Notificación al admin con cada pedido
 * - Confirmación al cliente
 */

const { Resend } = require('resend');

let resendClient = null;
function getResend() {
  if (!resendClient) {
    const key = process.env.RESEND_API_KEY;
    if (!key) throw new Error('RESEND_API_KEY no configurada');
    resendClient = new Resend(key);
  }
  return resendClient;
}

// Hasta que configures el dominio en Resend, usamos el sandbox de Resend.
// Cuando configures dominio: setear RESEND_FROM = "MDRACING <pedidos@mdracingfundas.com>"
const DEFAULT_FROM = 'MDRACING <onboarding@resend.dev>';
const FROM = process.env.RESEND_FROM || DEFAULT_FROM;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'mdracingdv@gmail.com';
// reply-to: cuando el cliente responda el email, le llega al admin de Gmail
const REPLY_TO = process.env.RESEND_REPLY_TO || ADMIN_EMAIL;

function money(n) {
  return '$' + (Number(n) || 0).toLocaleString('es-AR');
}

function statusLabel(status) {
  const map = {
    approved: '✅ Pagado',
    pending: '⏳ Pendiente de pago',
    in_process: '⏳ En proceso',
    rejected: '❌ Rechazado',
    cancelled: '❌ Cancelado',
    refunded: '↩️ Reembolsado',
    reserved: '🔒 Reservado (pago efectivo / retira)',
  };
  return map[status] || status;
}

function paymentMethodLabel(method) {
  if (method === 'cash' || method === 'transfer') {
    return 'Transferencia o efectivo (10% OFF)';
  }
  return 'Mercado Pago (tarjeta de crédito / débito)';
}

/**
 * Email para el admin (vos) cuando llega un pedido nuevo
 */
async function sendAdminNotification(order) {
  const resend = getResend();
  const subject = `🛒 Pedido #${order.id} — ${money(order.total)} — ${order.customer.name}`;
  const html = renderAdminEmail(order);
  return resend.emails.send({
    from: FROM,
    to: ADMIN_EMAIL,
    replyTo: order.customer && order.customer.email ? order.customer.email : REPLY_TO,
    subject,
    html,
  });
}

/**
 * Email al cliente confirmando el pedido.
 * El replyTo va a mdracingdv@gmail.com para que las respuestas le lleguen a Valen al Gmail.
 */
async function sendCustomerConfirmation(order) {
  if (!order.customer || !order.customer.email) return;
  const resend = getResend();
  const subject = `Tu pedido #${order.id} en MDRACING — Confirmado`;
  const html = renderCustomerEmail(order);
  return resend.emails.send({
    from: FROM,
    to: order.customer.email,
    replyTo: REPLY_TO,
    subject,
    html,
  });
}

function itemsRows(items) {
  return items.map(it => `
    <tr>
      <td style="padding:10px 8px;border-bottom:1px solid #eee">
        <strong>${escapeHtml(it.name)}</strong>
        ${it.variant ? `<br><span style="font-size:12px;color:#666">${escapeHtml(it.variant)}</span>` : ''}
      </td>
      <td style="padding:10px 8px;border-bottom:1px solid #eee;text-align:center;white-space:nowrap">${it.qty}</td>
      <td style="padding:10px 8px;border-bottom:1px solid #eee;text-align:right;white-space:nowrap">${money(it.unitPrice * it.qty)}</td>
    </tr>
  `).join('');
}

function escapeHtml(s) {
  if (s === null || s === undefined) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderAdminEmail(order) {
  const itemsHtml = itemsRows(order.items);
  const addr = order.shipping.address;
  const addrHtml = addr ? `
    <p style="margin:4px 0">${escapeHtml(addr.street)}</p>
    <p style="margin:4px 0">${escapeHtml(addr.city || '')} ${addr.province ? '· ' + escapeHtml(addr.province) : ''} ${addr.postal ? '(CP ' + escapeHtml(addr.postal) + ')' : ''}</p>
  ` : '';

  return `<!DOCTYPE html>
<html lang="es"><body style="margin:0;font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif;background:#f6f6f8;color:#0a0a0a">
<div style="max-width:640px;margin:0 auto;padding:24px">

  <div style="background:#d10000;color:#fff;padding:24px 24px 20px;border-radius:10px 10px 0 0">
    <h1 style="margin:0;font-size:22px;font-weight:800;letter-spacing:.5px">🛒 NUEVO PEDIDO #${escapeHtml(order.id)}</h1>
    <p style="margin:8px 0 0;opacity:.9;font-size:14px">${new Date(order.createdAt).toLocaleString('es-AR', { dateStyle: 'full', timeStyle: 'short' })}</p>
  </div>

  <div style="background:#fff;padding:24px;border-radius:0 0 10px 10px;border:1px solid #eee;border-top:none">

    <h3 style="margin:0 0 10px;font-size:14px;color:#d10000;letter-spacing:1px;text-transform:uppercase">Cliente</h3>
    <p style="margin:4px 0;font-size:16px"><strong>${escapeHtml(order.customer.name)}</strong></p>
    <p style="margin:4px 0">📧 <a href="mailto:${escapeHtml(order.customer.email)}" style="color:#0a0a0a">${escapeHtml(order.customer.email)}</a></p>
    <p style="margin:4px 0">📱 <a href="https://wa.me/549${escapeHtml((order.customer.phone||'').replace(/\D/g,''))}" style="color:#0a0a0a">${escapeHtml(order.customer.phone || '—')}</a></p>
    ${order.customer.dni ? `<p style="margin:4px 0">DNI: ${escapeHtml(order.customer.dni)}</p>` : ''}
    ${order.customer.cuit ? `<p style="margin:4px 0"><strong>CUIT: ${escapeHtml(order.customer.cuit)}</strong> (pide factura A)</p>` : ''}

    <hr style="border:none;border-top:1px solid #eee;margin:20px 0">

    <h3 style="margin:0 0 10px;font-size:14px;color:#d10000;letter-spacing:1px;text-transform:uppercase">Envío</h3>
    <p style="margin:4px 0"><strong>${escapeHtml(order.shipping.label)}</strong></p>
    ${addrHtml}
    ${order.shipping.notes ? `<p style="margin:8px 0;padding:8px 12px;background:#fff7d9;border-radius:6px;font-size:13px;font-style:italic">📝 ${escapeHtml(order.shipping.notes)}</p>` : ''}

    <hr style="border:none;border-top:1px solid #eee;margin:20px 0">

    <h3 style="margin:0 0 10px;font-size:14px;color:#d10000;letter-spacing:1px;text-transform:uppercase">Productos</h3>
    <table style="width:100%;border-collapse:collapse;margin-top:8px;font-size:14px">
      <thead><tr style="background:#ededf0">
        <th style="padding:8px;text-align:left;font-weight:600">Producto</th>
        <th style="padding:8px;text-align:center;font-weight:600">Cant.</th>
        <th style="padding:8px;text-align:right;font-weight:600">Subtotal</th>
      </tr></thead>
      <tbody>${itemsHtml}</tbody>
    </table>

    <div style="margin-top:16px;padding:14px 16px;background:#f6f6f8;border-radius:8px">
      <p style="margin:0;display:flex;justify-content:space-between"><span>Subtotal</span><span>${money(order.subtotal)}</span></p>
      ${order.discount && order.discount > 0 ? `<p style="margin:6px 0;display:flex;justify-content:space-between;color:#22a35e;font-weight:600"><span>Descuento 10% (transferencia/efectivo)</span><span>− ${money(order.discount)}</span></p>` : ''}
      <p style="margin:6px 0;display:flex;justify-content:space-between"><span>Envío</span><span>${order.shippingCost === 0 ? '<strong style="color:#22a35e">GRATIS</strong>' : money(order.shippingCost)}</span></p>
      <p style="margin:10px 0 0;padding-top:10px;border-top:1px solid #ddd;display:flex;justify-content:space-between;font-weight:700;font-size:18px"><span>TOTAL</span><span>${money(order.total)}</span></p>
    </div>

    <hr style="border:none;border-top:1px solid #eee;margin:20px 0">

    <h3 style="margin:0 0 10px;font-size:14px;color:#d10000;letter-spacing:1px;text-transform:uppercase">Pago</h3>
    <p style="margin:4px 0">Método: <strong>${escapeHtml(paymentMethodLabel(order.paymentMethod))}</strong></p>
    <p style="margin:4px 0">Estado: <strong>${escapeHtml(statusLabel(order.paymentStatus))}</strong></p>
    ${order.mpPaymentId ? `<p style="margin:4px 0;font-size:13px;color:#666">ID Mercado Pago: ${escapeHtml(order.mpPaymentId)}</p>` : ''}
    ${order.paymentMethod === 'transfer' ? `<p style="margin:8px 0 0;font-size:13px;color:#666;font-style:italic">⏳ Esperando comprobante de transferencia por WhatsApp del cliente.</p>` : ''}

  </div>

  <p style="text-align:center;margin:20px 0 0;color:#999;font-size:12px">MDRACING · Sistema de pedidos automático</p>
</div>
</body></html>`;
}

function renderCustomerEmail(order) {
  const itemsHtml = itemsRows(order.items);
  const isTransfer = order.paymentMethod === 'transfer' || order.paymentMethod === 'cash';
  const isPickup = order.shipping && (order.shipping.zone || '').startsWith('retiro-');

  // Datos bancarios para transferencia
  // ⚠️ Estos valores deben coincidir con los del frontend (checkout.js BANK_INFO)
  const BANK_INFO = {
    bank: 'Mercado Pago',
    alias: 'MDRACING.FUNDAS',
    cbu: '0000003100012345678901',
    holder: 'MDRACING (Valentino Divito)',
    cuit: '20-XXXXXXXX-X',
  };
  const WA_NUMBER = '5491154907774';
  const waMsg = encodeURIComponent(
    `Hola! Te paso el comprobante de mi pedido #${order.id}. Cliente: ${order.customer.name}. Total $${(order.total||0).toLocaleString('es-AR')}.`
  );

  let nextStepsHtml;
  if (isTransfer && isPickup) {
    nextStepsHtml = `
      <div style="background:#fff3d9;border-left:4px solid #d4a020;padding:14px 18px;border-radius:6px;margin:16px 0">
        <p style="margin:0;font-weight:600;color:#9a7000">📍 Tu pedido quedó RESERVADO</p>
        <p style="margin:8px 0 0;font-size:14px">
          Cuando esté listo para retirar en <strong>${escapeHtml(order.shipping.label)}</strong> te avisamos por WhatsApp.<br>
          Si querés <strong>adelantar el pago por transferencia</strong>, abajo te dejamos los datos. Si vas a pagar en efectivo al retirar, no hace falta hacer nada más.
        </p>
      </div>`;
  } else if (isTransfer) {
    nextStepsHtml = `
      <div style="background:#fff3d9;border-left:4px solid #d4a020;padding:14px 18px;border-radius:6px;margin:16px 0">
        <p style="margin:0;font-weight:600;color:#9a7000">📍 Tu pedido quedó RESERVADO</p>
        <p style="margin:8px 0 0;font-size:14px">Para confirmar el envío, hacé la transferencia con los datos de abajo y mandanos el comprobante por WhatsApp.</p>
      </div>`;
  } else {
    nextStepsHtml = `
      <div style="background:#e6f7ec;border-left:4px solid #22a35e;padding:14px 18px;border-radius:6px;margin:16px 0">
        <p style="margin:0;font-weight:600;color:#0a7a3c">✅ Pago recibido</p>
        <p style="margin:8px 0 0;font-size:14px">Estamos preparando tu pedido. Te avisamos por email y WhatsApp cuando lo despachemos.</p>
      </div>`;
  }

  const bankBlock = isTransfer ? `
    <h3 style="margin:24px 0 10px;font-size:14px;color:#d10000;letter-spacing:1px;text-transform:uppercase">🏦 Datos para transferir</h3>
    <div style="background:#f6f6f8;border-radius:8px;padding:14px 16px">
      <p style="margin:4px 0;display:flex;justify-content:space-between"><span style="color:#666">Banco</span><strong>${BANK_INFO.bank}</strong></p>
      <p style="margin:4px 0;display:flex;justify-content:space-between"><span style="color:#666">Alias</span><strong style="font-family:monospace">${BANK_INFO.alias}</strong></p>
      <p style="margin:4px 0;display:flex;justify-content:space-between"><span style="color:#666">CBU / CVU</span><strong style="font-family:monospace;font-size:13px">${BANK_INFO.cbu}</strong></p>
      <p style="margin:4px 0;display:flex;justify-content:space-between"><span style="color:#666">Titular</span><strong>${BANK_INFO.holder}</strong></p>
      <p style="margin:4px 0;display:flex;justify-content:space-between"><span style="color:#666">CUIT</span><strong>${BANK_INFO.cuit}</strong></p>
      <p style="margin:10px 0 0;padding-top:10px;border-top:1px solid #ddd;display:flex;justify-content:space-between;font-weight:700;font-size:16px"><span>Monto a transferir</span><strong style="color:#d10000">${money(order.total)}</strong></p>
    </div>
    <div style="text-align:center;margin:18px 0 8px">
      <a href="https://wa.me/${WA_NUMBER}?text=${waMsg}" target="_blank"
        style="display:inline-flex;align-items:center;gap:10px;background:#25d366;color:#fff;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:700;font-size:15px;letter-spacing:.5px;box-shadow:0 6px 18px rgba(37,211,102,.3)">
        📱 Enviar comprobante por WhatsApp
      </a>
    </div>
  ` : '';

  return `<!DOCTYPE html>
<html lang="es"><body style="margin:0;font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif;background:#f6f6f8;color:#0a0a0a">
<div style="max-width:600px;margin:0 auto;padding:24px">

  <div style="background:#d10000;color:#fff;padding:28px 24px;border-radius:10px 10px 0 0;text-align:center">
    <h1 style="margin:0;font-size:28px;font-weight:800;letter-spacing:2px">MDRACING</h1>
    <p style="margin:10px 0 0;opacity:.95;font-size:15px">¡Tu pedido está confirmado!</p>
  </div>

  <div style="background:#fff;padding:24px;border-radius:0 0 10px 10px;border:1px solid #eee;border-top:none">

    <p style="margin:0 0 12px;font-size:16px">Hola <strong>${escapeHtml(order.customer.name)}</strong>,</p>
    <p style="margin:0 0 8px">Recibimos tu pedido <strong>#${escapeHtml(order.id)}</strong>. ¡Gracias por elegirnos!</p>

    ${nextStepsHtml}

    <h3 style="margin:24px 0 10px;font-size:14px;color:#d10000;letter-spacing:1px;text-transform:uppercase">Detalle del pedido</h3>
    <table style="width:100%;border-collapse:collapse;font-size:14px">
      <thead><tr style="background:#ededf0">
        <th style="padding:8px;text-align:left;font-weight:600">Producto</th>
        <th style="padding:8px;text-align:center;font-weight:600">Cant.</th>
        <th style="padding:8px;text-align:right;font-weight:600">Subtotal</th>
      </tr></thead>
      <tbody>${itemsHtml}</tbody>
    </table>

    <div style="margin-top:16px;padding:14px 16px;background:#f6f6f8;border-radius:8px">
      <p style="margin:0;display:flex;justify-content:space-between"><span>Subtotal</span><span>${money(order.subtotal)}</span></p>
      ${order.discount && order.discount > 0 ? `<p style="margin:6px 0;display:flex;justify-content:space-between;color:#22a35e;font-weight:600"><span>Descuento 10% (transferencia/efectivo)</span><span>− ${money(order.discount)}</span></p>` : ''}
      <p style="margin:6px 0;display:flex;justify-content:space-between"><span>Envío</span><span>${order.shippingCost === 0 ? '<strong style="color:#22a35e">GRATIS</strong>' : money(order.shippingCost)}</span></p>
      <p style="margin:10px 0 0;padding-top:10px;border-top:1px solid #ddd;display:flex;justify-content:space-between;font-weight:700;font-size:18px"><span>TOTAL</span><span>${money(order.total)}</span></p>
    </div>

    ${bankBlock}

    <div style="margin-top:24px;padding-top:20px;border-top:1px solid #eee;text-align:center;color:#666;font-size:13px;line-height:1.6">
      <p style="margin:0">¿Tenés alguna duda?</p>
      <p style="margin:8px 0"><a href="https://wa.me/5491154907774" style="color:#d10000;text-decoration:none;font-weight:600">📱 WhatsApp +54 9 11 5490-7774</a></p>
      <p style="margin:14px 0 0;color:#999;font-size:11px">MDRACING · Fábrica desde el año 2000 · Villa Ballester, Bs As</p>
    </div>

  </div>
</div>
</body></html>`;
}

module.exports = {
  sendAdminNotification,
  sendCustomerConfirmation,
};
