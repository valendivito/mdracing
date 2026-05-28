/**
 * MDRACING — Envío de emails con Resend
 * - Notificación al admin (compacta, accionable)
 * - Confirmación al cliente (estilo MDRACING: rojo + blanco + cuadrículas)
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

// from por defecto = sandbox Resend. Cuando configures el dominio:
//   RESEND_FROM = "MDRACING <noreply@mdracingfundas.com>"
const DEFAULT_FROM = 'MDRACING <onboarding@resend.dev>';
const FROM = process.env.RESEND_FROM || DEFAULT_FROM;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'mdracingdv@gmail.com';
const REPLY_TO = process.env.RESEND_REPLY_TO || ADMIN_EMAIL;

// Constantes para los templates
const SITE_URL = 'https://www.mdracingfundas.com';
const LOGO_DARK_URL = SITE_URL + '/logo.png';       // logo para fondo claro
const LOGO_WHITE_URL = SITE_URL + '/logo-white.png'; // logo para fondo rojo/oscuro
const WA_NUMBER = '5491154907774';
const WA_DISPLAY = '+54 9 11 5490-7774';

// Datos bancarios MDRACING (mismos que checkout.js)
const BANK_INFO = {
  bank: 'Mercado Pago',
  alias: 'mdracing',
  cbu: '0000003100003718736706',
  holder: 'Miguel Angel Di Vito',
  cuit: '20-22862560-5',
};

// Etiqueta corta de zona (para reemplazar "GRATIS" en retiros)
const ZONE_SHORT_NAMES = {
  'retiro-fabrica': 'Fábrica Ballester',
  'retiro-local': 'Local Munro',
  'caba': 'CABA',
  'gba-norte-oeste': 'GBA Norte/Oeste',
  'gba-sur-resto-ba': 'GBA Sur',
  'interior': 'Interior',
};

function money(n) { return '$' + (Number(n) || 0).toLocaleString('es-AR'); }

function statusLabel(status) {
  const map = {
    approved: '✅ Pagado',
    pending: '⏳ Pendiente de pago',
    in_process: '⏳ En proceso',
    rejected: '❌ Rechazado',
    cancelled: '❌ Cancelado',
    refunded: '↩️ Reembolsado',
    reserved: '🔒 Reservado (pago efectivo / transferencia)',
  };
  return map[status] || status;
}

function paymentMethodLabel(method) {
  if (method === 'transfer' || method === 'cash') return 'Transferencia o efectivo (10% OFF)';
  return 'Mercado Pago (tarjeta de crédito / débito)';
}

function escapeHtml(s) {
  if (s === null || s === undefined) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function shippingLineForEmail(order) {
  const zoneShort = ZONE_SHORT_NAMES[order.shipping.zone] || order.shipping.label || 'Envío';
  const isPickup = (order.shipping.zone || '').startsWith('retiro-');
  if (isPickup) return zoneShort;
  if (order.shippingCost === 0) return 'GRATIS · ' + zoneShort;
  return money(order.shippingCost) + ' · ' + zoneShort;
}

// ───────────────────────────────────────────────────────────
// PÚBLICO
// ───────────────────────────────────────────────────────────

async function sendAdminNotification(order) {
  const resend = getResend();
  const subject = `🛒 Pedido #${order.id} — ${money(order.total)} — ${order.customer.name}`;
  return resend.emails.send({
    from: FROM,
    to: ADMIN_EMAIL,
    replyTo: order.customer && order.customer.email ? order.customer.email : REPLY_TO,
    subject,
    html: renderAdminEmail(order),
  });
}

async function sendCustomerConfirmation(order) {
  if (!order.customer || !order.customer.email) return;
  const resend = getResend();
  const subject = `Tu pedido #${order.id} en MDRACING — Confirmado`;
  return resend.emails.send({
    from: FROM,
    to: order.customer.email,
    replyTo: REPLY_TO,
    subject,
    html: renderCustomerEmail(order),
  });
}

// ───────────────────────────────────────────────────────────
// TEMPLATE: CUSTOMER (estilo MDRACING)
// ───────────────────────────────────────────────────────────

function renderCustomerEmail(order) {
  const isTransfer = order.paymentMethod === 'transfer' || order.paymentMethod === 'cash';
  const isPickup = (order.shipping.zone || '').startsWith('retiro-');
  const itemsHtml = customerItemsRows(order.items);
  const shippingDisplay = shippingLineForEmail(order);
  const waMsg = encodeURIComponent(
    `Hola! Te paso el comprobante de mi pedido #${order.id}. ` +
    `Cliente: ${order.customer.name}. ` +
    `Total $${(order.total||0).toLocaleString('es-AR')}.`
  );

  // Banner según método de pago
  let banner = '';
  if (isTransfer && isPickup) {
    banner = `
      <tr><td style="padding:18px 24px 0">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fff7d9;border:1px solid #ffe178;border-left:4px solid #d4a020;border-radius:8px">
          <tr><td style="padding:14px 16px">
            <p style="margin:0;font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:15px;color:#5a4400;letter-spacing:.5px;text-transform:uppercase">📌 Para confirmar tu pedido</p>
            <p style="margin:8px 0 0;color:#5a4400;font-size:14px;line-height:1.55;font-family:Inter,Arial,sans-serif">
              <strong>Si pagás en efectivo al retirar</strong>, escribinos por WhatsApp para coordinar el retiro.<br>
              <strong>Si elegiste transferencia</strong>, usá los datos de abajo y mandanos el comprobante. Sin el comprobante el pedido no queda confirmado.
            </p>
          </td></tr>
        </table>
      </td></tr>`;
  } else if (isTransfer) {
    banner = `
      <tr><td style="padding:18px 24px 0">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fff7d9;border:1px solid #ffe178;border-left:4px solid #d4a020;border-radius:8px">
          <tr><td style="padding:14px 16px">
            <p style="margin:0;font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:15px;color:#5a4400;letter-spacing:.5px;text-transform:uppercase">📌 Para confirmar tu pedido</p>
            <p style="margin:8px 0 0;color:#5a4400;font-size:14px;line-height:1.55;font-family:Inter,Arial,sans-serif">
              Hacé la transferencia con los datos de abajo y mandanos el comprobante por WhatsApp.<br>
              <strong>Sin el comprobante no podemos despachar el pedido.</strong>
            </p>
          </td></tr>
        </table>
      </td></tr>`;
  } else {
    // Pago con tarjeta aprobado — copy según si es retiro o envío a domicilio
    const approvedText = isPickup
      ? `Estamos preparando tu pedido. Te avisamos por WhatsApp cuando esté listo para retirar en <strong>${escapeHtml(order.shipping.label || 'el local')}</strong>.`
      : `Estamos preparando tu pedido. Te avisamos por email y WhatsApp cuando lo despachemos.`;
    banner = `
      <tr><td style="padding:18px 24px 0">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#e6f7ec;border:1px solid #c5ebd3;border-left:4px solid #22a35e;border-radius:8px">
          <tr><td style="padding:14px 16px">
            <p style="margin:0;font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:15px;color:#0a7a3c;letter-spacing:.5px;text-transform:uppercase">✅ Pago recibido</p>
            <p style="margin:8px 0 0;color:#0a7a3c;font-size:14px;line-height:1.55;font-family:Inter,Arial,sans-serif">
              ${approvedText}
            </p>
          </td></tr>
        </table>
      </td></tr>`;
  }

  // Bloque de datos bancarios (solo si transferencia)
  const bankBlock = isTransfer ? `
    <tr><td style="padding:24px 24px 0">
      <p style="margin:0 0 12px;font-family:Inter,Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:2px;color:#d10000;text-transform:uppercase">🏦 Datos para transferir</p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f6f6f8;border-radius:10px;border:1px solid rgba(10,10,10,.08)">
        <tr><td style="padding:16px 18px">
          ${bankRow('Banco', BANK_INFO.bank)}
          ${bankRow('Alias', BANK_INFO.alias, true)}
          ${bankRow('CBU / CVU', BANK_INFO.cbu, true)}
          ${bankRow('Titular', BANK_INFO.holder)}
          ${bankRow('CUIT', BANK_INFO.cuit, true)}
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:14px;padding-top:14px;border-top:1px solid rgba(10,10,10,.1)">
            <tr>
              <td style="font-family:Inter,Arial,sans-serif;font-size:14px;color:#0a0a0a;font-weight:600">Monto a transferir</td>
              <td style="text-align:right;font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:22px;color:#d10000">${money(order.total)}</td>
            </tr>
          </table>
        </td></tr>
      </table>
    </td></tr>
    <tr><td style="padding:18px 24px 0;text-align:center">
      <a href="https://wa.me/${WA_NUMBER}?text=${waMsg}" target="_blank"
        style="display:inline-block;background:#25d366;color:#ffffff;padding:16px 30px;border-radius:10px;text-decoration:none;font-family:'Barlow Condensed',Arial,sans-serif;font-weight:800;font-size:16px;letter-spacing:1.5px;text-transform:uppercase;box-shadow:0 8px 24px rgba(37,211,102,.35)">
        📱 Enviar comprobante por WhatsApp
      </a>
    </td></tr>
  ` : '';

  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Tu pedido en MDRACING</title>
</head>
<body style="margin:0;padding:0;background:#ededf0;font-family:Inter,Arial,sans-serif;color:#0a0a0a">

  <!-- Wrapper: fondo blanco con grid sutil estilo MDRACING -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
    style="background-color:#ffffff;background-image:linear-gradient(rgba(10,10,10,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(10,10,10,.04) 1px,transparent 1px);background-size:40px 40px">
    <tr><td align="center" style="padding:24px 12px">

      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0"
        style="max-width:600px;width:100%;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,.08);border:1px solid rgba(10,10,10,.06)">

        <!-- Banda roja con logo -->
        <tr><td style="background:linear-gradient(135deg,#b50000 0%,#d10000 50%,#b50000 100%);padding:28px 24px;text-align:center">
          <img src="${LOGO_WHITE_URL}" alt="MDRACING" width="170"
            style="display:inline-block;max-width:170px;height:auto;border:0;outline:none;text-decoration:none" />
          <p style="margin:14px 0 0;color:#ffffff;font-family:Inter,Arial,sans-serif;font-size:13px;font-weight:500;letter-spacing:2px;text-transform:uppercase;opacity:.92">
            ¡Tu pedido está confirmado!
          </p>
        </td></tr>

        <!-- Encabezado del pedido -->
        <tr><td style="padding:28px 24px 8px;text-align:center">
          <p style="margin:0;font-family:Inter,Arial,sans-serif;font-size:13px;color:#666;letter-spacing:.5px">PEDIDO #${escapeHtml(order.id)}</p>
          <h1 style="margin:8px 0 0;font-family:'Barlow Condensed',Arial,sans-serif;font-weight:800;font-size:30px;letter-spacing:-.5px;color:#0a0a0a;line-height:1.1">
            ¡Gracias, ${escapeHtml(order.customer.name.split(' ')[0])}!
          </h1>
          <p style="margin:10px 0 0;font-family:Inter,Arial,sans-serif;font-size:14.5px;color:#333;line-height:1.6">
            Recibimos tu pedido. A continuación los detalles.
          </p>
        </td></tr>

        ${banner}

        <!-- Productos -->
        <tr><td style="padding:24px 24px 0">
          <p style="margin:0 0 12px;font-family:Inter,Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:2px;color:#d10000;text-transform:uppercase">📦 Detalle del pedido</p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;border:1px solid rgba(10,10,10,.08);border-radius:8px;overflow:hidden">
            ${itemsHtml}
          </table>
        </td></tr>

        <!-- Totales -->
        <tr><td style="padding:18px 24px 0">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f6f6f8;border-radius:10px">
            <tr><td style="padding:14px 18px">
              ${totalsRow('Subtotal', money(order.subtotal))}
              ${order.discount && order.discount > 0
                ? totalsRow('Descuento 10% OFF', '− ' + money(order.discount), '#22a35e')
                : ''}
              ${totalsRow('Envío', shippingDisplay, isPickup || order.shippingCost === 0 ? '#22a35e' : null)}
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:10px;padding-top:10px;border-top:1px solid rgba(10,10,10,.12)">
                <tr>
                  <td style="font-family:'Barlow Condensed',Arial,sans-serif;font-weight:800;font-size:18px;color:#0a0a0a;letter-spacing:.5px;text-transform:uppercase">Total</td>
                  <td style="text-align:right;font-family:'Barlow Condensed',Arial,sans-serif;font-weight:800;font-size:22px;color:#d10000">${money(order.total)}</td>
                </tr>
              </table>
            </td></tr>
          </table>
        </td></tr>

        ${bankBlock}

        <!-- Footer -->
        <tr><td style="padding:28px 24px 24px;text-align:center;border-top:1px solid rgba(10,10,10,.08);margin-top:24px">
          <p style="margin:18px 0 6px;font-family:Inter,Arial,sans-serif;font-size:13px;color:#666">¿Consultas?</p>
          <p style="margin:0 0 12px">
            <a href="https://wa.me/${WA_NUMBER}" style="color:#d10000;text-decoration:none;font-weight:700;font-family:Inter,Arial,sans-serif;font-size:14px">📱 ${WA_DISPLAY}</a>
          </p>
          <p style="margin:0">
            <a href="https://www.instagram.com/mdracingfundas/" style="color:#666;text-decoration:none;font-family:Inter,Arial,sans-serif;font-size:12px;margin:0 8px">Instagram</a>
            <span style="color:#ccc">·</span>
            <a href="${SITE_URL}" style="color:#666;text-decoration:none;font-family:Inter,Arial,sans-serif;font-size:12px;margin:0 8px">mdracingfundas.com</a>
          </p>
          <p style="margin:18px 0 0;color:#999;font-family:Inter,Arial,sans-serif;font-size:11px;letter-spacing:.5px">
            MDRACING · Fábrica desde el año 2000 · Villa Ballester, Bs As
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body></html>`;
}

// ───────────────────────────────────────────────────────────
// TEMPLATE: ADMIN (compacto, accionable, mismo estilo)
// ───────────────────────────────────────────────────────────

function renderAdminEmail(order) {
  const isTransfer = order.paymentMethod === 'transfer' || order.paymentMethod === 'cash';
  const itemsHtml = adminItemsRows(order.items);
  const addr = order.shipping.address;
  const addrHtml = addr ? `
    <p style="margin:4px 0;font-family:Inter,Arial,sans-serif;font-size:13.5px">${escapeHtml(addr.street)}</p>
    <p style="margin:4px 0;font-family:Inter,Arial,sans-serif;font-size:13.5px;color:#666">${escapeHtml(addr.city || '')}${addr.province ? ' · ' + escapeHtml(addr.province) : ''}${addr.postal ? ' (CP ' + escapeHtml(addr.postal) + ')' : ''}</p>
  ` : '';
  const shippingDisplay = shippingLineForEmail(order);

  return `<!DOCTYPE html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="margin:0;padding:0;background:#ededf0;font-family:Inter,Arial,sans-serif;color:#0a0a0a">

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
  style="background-color:#ffffff;background-image:linear-gradient(rgba(10,10,10,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(10,10,10,.04) 1px,transparent 1px);background-size:40px 40px">
<tr><td align="center" style="padding:24px 12px">

  <table role="presentation" width="640" cellpadding="0" cellspacing="0" border="0"
    style="max-width:640px;width:100%;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,.08);border:1px solid rgba(10,10,10,.06)">

    <!-- Banda roja con # pedido -->
    <tr><td style="background:linear-gradient(135deg,#b50000 0%,#d10000 50%,#b50000 100%);padding:20px 24px">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
        <td style="font-family:'Barlow Condensed',Arial,sans-serif;font-weight:800;color:#fff;font-size:22px;letter-spacing:.5px;text-transform:uppercase">
          🛒 Pedido #${escapeHtml(order.id)}
        </td>
        <td style="text-align:right;font-family:Inter,Arial,sans-serif;color:#ffe0e0;font-size:12px">
          ${new Date(order.createdAt).toLocaleString('es-AR', { dateStyle: 'short', timeStyle: 'short' })}
        </td>
      </tr></table>
    </td></tr>

    <!-- Estado de pago destacado -->
    <tr><td style="padding:16px 24px;background:${order.paymentStatus === 'approved' ? '#e6f7ec' : '#fff7d9'};border-bottom:1px solid ${order.paymentStatus === 'approved' ? '#c5ebd3' : '#ffe178'}">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
        <td>
          <span style="font-family:Inter,Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:1.5px;color:${order.paymentStatus === 'approved' ? '#0a7a3c' : '#9a7000'};text-transform:uppercase">PAGO</span>
          <p style="margin:4px 0 0;font-family:Inter,Arial,sans-serif;font-size:15px;font-weight:600;color:${order.paymentStatus === 'approved' ? '#0a7a3c' : '#5a4400'}">
            ${escapeHtml(statusLabel(order.paymentStatus))} · ${escapeHtml(paymentMethodLabel(order.paymentMethod))}
          </p>
        </td>
        <td style="text-align:right;font-family:'Barlow Condensed',Arial,sans-serif;font-weight:800;font-size:26px;color:#0a0a0a">
          ${money(order.total)}
        </td>
      </tr></table>
      ${isTransfer ? `<p style="margin:8px 0 0;font-family:Inter,Arial,sans-serif;font-size:12px;color:#5a4400;font-style:italic">⏳ Esperar comprobante de transferencia por WhatsApp.</p>` : ''}
    </td></tr>

    <!-- Cliente -->
    <tr><td style="padding:20px 24px 0">
      <p style="margin:0 0 10px;font-family:Inter,Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:2px;color:#d10000;text-transform:uppercase">👤 Cliente</p>
      <p style="margin:0;font-family:'Barlow Condensed',Arial,sans-serif;font-weight:700;font-size:18px;color:#0a0a0a">${escapeHtml(order.customer.name)}</p>
      <p style="margin:6px 0 0;font-family:Inter,Arial,sans-serif;font-size:13.5px">
        📧 <a href="mailto:${escapeHtml(order.customer.email)}" style="color:#0a0a0a;text-decoration:none">${escapeHtml(order.customer.email)}</a>
      </p>
      <p style="margin:4px 0 0;font-family:Inter,Arial,sans-serif;font-size:13.5px">
        📱 <a href="https://wa.me/549${escapeHtml((order.customer.phone||'').replace(/\D/g,''))}" style="color:#0a0a0a;text-decoration:none">${escapeHtml(order.customer.phone || '—')}</a>
      </p>
      ${order.customer.dni ? `<p style="margin:4px 0 0;font-family:Inter,Arial,sans-serif;font-size:13px;color:#666">DNI: ${escapeHtml(order.customer.dni)}</p>` : ''}
      ${order.customer.cuit ? `<p style="margin:4px 0 0;font-family:Inter,Arial,sans-serif;font-size:13px;color:#d10000;font-weight:600">📄 CUIT: ${escapeHtml(order.customer.cuit)} (pide Factura A)</p>` : ''}
    </td></tr>

    <!-- Envío -->
    <tr><td style="padding:20px 24px 0">
      <p style="margin:0 0 10px;font-family:Inter,Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:2px;color:#d10000;text-transform:uppercase">🚚 Envío</p>
      <p style="margin:0;font-family:'Barlow Condensed',Arial,sans-serif;font-weight:700;font-size:16px;color:#0a0a0a">${escapeHtml(order.shipping.label || shippingDisplay)}</p>
      ${addrHtml}
      ${order.shipping.notes ? `<p style="margin:8px 0 0;padding:10px 14px;background:#fff7d9;border-left:3px solid #d4a020;border-radius:4px;font-family:Inter,Arial,sans-serif;font-size:13px;font-style:italic;color:#5a4400">📝 ${escapeHtml(order.shipping.notes)}</p>` : ''}
    </td></tr>

    <!-- Productos -->
    <tr><td style="padding:20px 24px 0">
      <p style="margin:0 0 10px;font-family:Inter,Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:2px;color:#d10000;text-transform:uppercase">📦 Productos</p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;border:1px solid rgba(10,10,10,.08);border-radius:8px;overflow:hidden">
        ${itemsHtml}
      </table>
    </td></tr>

    <!-- Totales -->
    <tr><td style="padding:18px 24px 24px">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f6f6f8;border-radius:10px">
        <tr><td style="padding:14px 18px">
          ${totalsRow('Subtotal', money(order.subtotal))}
          ${order.discount && order.discount > 0
            ? totalsRow('Descuento 10% OFF', '− ' + money(order.discount), '#22a35e')
            : ''}
          ${totalsRow('Envío', shippingDisplay, order.shippingCost === 0 ? '#22a35e' : null)}
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:10px;padding-top:10px;border-top:1px solid rgba(10,10,10,.12)">
            <tr>
              <td style="font-family:'Barlow Condensed',Arial,sans-serif;font-weight:800;font-size:18px;color:#0a0a0a;letter-spacing:.5px;text-transform:uppercase">Total</td>
              <td style="text-align:right;font-family:'Barlow Condensed',Arial,sans-serif;font-weight:800;font-size:22px;color:#d10000">${money(order.total)}</td>
            </tr>
          </table>
        </td></tr>
      </table>
    </td></tr>

  </table>

  <p style="margin:18px 0 0;font-family:Inter,Arial,sans-serif;font-size:11px;color:#999;text-align:center">
    MDRACING · Notificación automática de pedido
  </p>

</td></tr></table>
</body></html>`;
}

// ───────────────────────────────────────────────────────────
// Helpers de filas
// ───────────────────────────────────────────────────────────

function customerItemsRows(items) {
  return items.map((it, i) => `
    <tr style="${i > 0 ? 'border-top:1px solid rgba(10,10,10,.06);' : ''}">
      <td style="padding:14px 14px;font-family:Inter,Arial,sans-serif;font-size:14px">
        <strong style="font-family:'Barlow Condensed',Arial,sans-serif;font-weight:700;font-size:15px;color:#0a0a0a">${escapeHtml(it.name)}</strong>
        ${it.variant ? `<br><span style="font-size:12px;color:#666;font-family:Inter,Arial,sans-serif">${escapeHtml(it.variant)}</span>` : ''}
      </td>
      <td style="padding:14px 8px;text-align:center;font-family:'Barlow Condensed',Arial,sans-serif;font-weight:700;font-size:15px;color:#666;white-space:nowrap;width:60px">×${it.qty}</td>
      <td style="padding:14px 14px;text-align:right;font-family:'Barlow Condensed',Arial,sans-serif;font-weight:800;font-size:16px;color:#0a0a0a;white-space:nowrap">${money(it.unitPrice * it.qty)}</td>
    </tr>
  `).join('');
}

function adminItemsRows(items) {
  return items.map((it, i) => `
    <tr style="${i > 0 ? 'border-top:1px solid rgba(10,10,10,.06);' : ''}">
      <td style="padding:12px 14px;font-family:Inter,Arial,sans-serif;font-size:14px">
        <strong style="font-family:'Barlow Condensed',Arial,sans-serif;font-weight:700;font-size:14.5px;color:#0a0a0a">${escapeHtml(it.name)}</strong>
        ${it.variant ? `<br><span style="font-size:12px;color:#666">${escapeHtml(it.variant)}</span>` : ''}
        ${it.id ? `<br><span style="font-size:10.5px;color:#aaa;font-family:monospace">${escapeHtml(it.id)}</span>` : ''}
      </td>
      <td style="padding:12px 8px;text-align:center;font-weight:700;color:#666;white-space:nowrap;width:60px;font-family:'Barlow Condensed',Arial,sans-serif">×${it.qty}</td>
      <td style="padding:12px 14px;text-align:right;font-family:'Barlow Condensed',Arial,sans-serif;font-weight:800;font-size:15px;color:#0a0a0a;white-space:nowrap">${money(it.unitPrice * it.qty)}</td>
    </tr>
  `).join('');
}

function totalsRow(label, value, color) {
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:6px">
      <tr>
        <td style="font-family:Inter,Arial,sans-serif;font-size:13.5px;color:${color || '#333'}">${escapeHtml(label)}</td>
        <td style="text-align:right;font-family:Inter,Arial,sans-serif;font-size:14px;font-weight:600;color:${color || '#0a0a0a'}">${value}</td>
      </tr>
    </table>
  `;
}

function bankRow(label, value, mono) {
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:8px">
      <tr>
        <td style="font-family:Inter,Arial,sans-serif;font-size:12.5px;color:#666;width:38%">${escapeHtml(label)}</td>
        <td style="text-align:right;font-family:${mono ? 'monospace' : 'Inter,Arial,sans-serif'};font-size:${mono ? '13.5px' : '14px'};font-weight:700;color:#0a0a0a;word-break:break-all">${escapeHtml(value)}</td>
      </tr>
    </table>
  `;
}

/* ════════════════════════════════════════════════════════════
 * EMAILS DE RECUPERACIÓN DE CARRITO (Sprint F)
 * ════════════════════════════════════════════════════════════ */

/**
 * Renderiza la lista de items del carrito como tabla HTML.
 * Espera items con { name, qty, unitPrice } o { product_name, qty, unit_price }.
 */
function renderCartItemsHtml(items) {
  if (!Array.isArray(items) || items.length === 0) {
    return '<p style="color:#666;font-size:14px;margin:0">Tu carrito tiene productos esperándote.</p>';
  }
  const rows = items.map(it => {
    const name = it.name || it.product_name || 'Producto';
    const qty = it.qty || 1;
    const price = Number(it.unitPrice || it.unit_price || it.price || 0);
    const subtotal = price * qty;
    return `
      <tr>
        <td style="padding:12px 8px;border-bottom:1px solid #e5e5ea;font-family:Arial,sans-serif;font-size:14px;color:#0a0a0a">
          <strong style="font-weight:600">${name}</strong>
          ${qty > 1 ? `<br><span style="color:#666;font-size:13px">Cantidad: ${qty}</span>` : ''}
        </td>
        <td style="padding:12px 8px;border-bottom:1px solid #e5e5ea;font-family:Arial,sans-serif;font-size:14px;color:#0a0a0a;text-align:right;white-space:nowrap">
          ${money(subtotal)}
        </td>
      </tr>
    `;
  }).join('');
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;margin:16px 0">
      <thead>
        <tr>
          <th align="left" style="padding:8px;border-bottom:2px solid #0a0a0a;font-family:Arial,sans-serif;font-size:11px;color:#666;letter-spacing:1px;text-transform:uppercase">Producto</th>
          <th align="right" style="padding:8px;border-bottom:2px solid #0a0a0a;font-family:Arial,sans-serif;font-size:11px;color:#666;letter-spacing:1px;text-transform:uppercase">Precio</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}

/**
 * Email 1 — Recordatorio suave a las 4 horas.
 * Sin descuento. Foco: recuperar la atención del usuario.
 */
async function sendAbandonedCartReminder4h(cart) {
  if (!cart || !cart.customer_email) return { ok: false, error: 'cart sin email' };

  const items = Array.isArray(cart.items) ? cart.items : [];
  const total = Number(cart.total || 0);
  const firstName = (cart.customer_name || '').split(' ')[0] || '';
  const greeting = firstName ? `Hola ${firstName},` : 'Hola,';

  const html = `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f6f6f8;font-family:Arial,sans-serif;color:#0a0a0a">
  <span style="display:none!important;visibility:hidden;opacity:0;color:transparent;height:0;width:0;font-size:1px;line-height:1px;overflow:hidden;max-height:0;max-width:0;mso-hide:all">Lo seguís queriendo · podés terminar tu compra en 1 minuto</span>
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f6f6f8;padding:32px 16px">
    <tr><td align="center">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px;background:#ffffff;border:1px solid #e5e5ea;border-radius:8px;overflow:hidden">

        <!-- Header con logo -->
        <tr><td style="padding:24px 32px 16px;border-bottom:3px solid #d10000">
          <img src="${LOGO_DARK_URL}" alt="MDRACING" width="120" style="display:block;height:auto"/>
        </td></tr>

        <!-- Cuerpo -->
        <tr><td style="padding:32px">
          <p style="margin:0 0 8px;font-size:13px;font-weight:600;letter-spacing:2px;color:#d10000;text-transform:uppercase">Tu carrito te está esperando</p>
          <h1 style="margin:0 0 16px;font-size:28px;line-height:1.2;font-weight:800;color:#0a0a0a;letter-spacing:-0.5px">${greeting} dejaste esto sin pagar.</h1>
          <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#333">
            Vimos que estuviste eligiendo en nuestro sitio pero no llegaste a finalizar la compra. Lo guardamos para vos por si querés terminar ahora.
          </p>

          ${renderCartItemsHtml(items)}

          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-top:2px solid #0a0a0a;margin-top:8px">
            <tr>
              <td style="padding:12px 8px;font-family:Arial,sans-serif;font-size:15px;font-weight:600;color:#0a0a0a">Total estimado</td>
              <td style="padding:12px 8px;font-family:Arial,sans-serif;font-size:18px;font-weight:800;color:#d10000;text-align:right">${money(total)}</td>
            </tr>
          </table>

          <p style="margin:24px 0 8px;font-size:14px;color:#666">Recordá que pagando con transferencia o efectivo tenés <strong style="color:#0a0a0a">10% OFF</strong> sobre el total.</p>

          <!-- CTA -->
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:24px 0 8px">
            <tr><td style="background:#d10000;border-radius:6px">
              <a href="${SITE_URL}/?recover=${encodeURIComponent(cart.id)}" style="display:inline-block;padding:14px 32px;font-family:Arial,sans-serif;font-size:14px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#ffffff;text-decoration:none">Completar mi compra →</a>
            </td></tr>
          </table>

          <p style="margin:24px 0 0;font-size:13px;color:#888;line-height:1.6">
            ¿Tenés dudas sobre algún producto? Escribinos por WhatsApp al
            <a href="https://wa.me/${WA_NUMBER}" style="color:#d10000;text-decoration:none">${WA_DISPLAY}</a> y te asesoramos.
          </p>
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:24px 32px;background:#f6f6f8;border-top:1px solid #e5e5ea;font-size:12px;color:#666;font-family:Arial,sans-serif;line-height:1.6">
          <p style="margin:0">MDRACING · Fabricantes desde el año 2000<br>
          Villa Ballester, San Martín, Bs As · <a href="${SITE_URL}" style="color:#666">mdracingfundas.com</a></p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

  try {
    const res = await getResend().emails.send({
      from: FROM,
      to: cart.customer_email,
      replyTo: REPLY_TO,
      subject: 'Te quedó esto en el carrito · MDRACING',
      html,
    });
    return { ok: true, data: res };
  } catch (e) {
    console.error('[email.sendAbandonedCartReminder4h] error:', e && e.message);
    return { ok: false, error: e.message };
  }
}

/**
 * Email 2 — Última chance a las 24 horas, con cupón VOLVE5 (5% OFF).
 * Genera urgencia + incentivo.
 */
async function sendAbandonedCartReminder24h(cart) {
  if (!cart || !cart.customer_email) return { ok: false, error: 'cart sin email' };

  const items = Array.isArray(cart.items) ? cart.items : [];
  const total = Number(cart.total || 0);
  const discount = Math.round(total * 0.05);
  const finalTotal = total - discount;
  const firstName = (cart.customer_name || '').split(' ')[0] || '';
  const greeting = firstName ? `${firstName},` : 'Hola,';

  const html = `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f6f6f8;font-family:Arial,sans-serif;color:#0a0a0a">
  <span style="display:none!important;visibility:hidden;opacity:0;color:transparent;height:0;width:0;font-size:1px;line-height:1px;overflow:hidden;max-height:0;max-width:0;mso-hide:all">Cupón VOLVE5 · 5% OFF para que termines tu compra · vence en 48hs</span>
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f6f6f8;padding:32px 16px">
    <tr><td align="center">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px;background:#ffffff;border:1px solid #e5e5ea;border-radius:8px;overflow:hidden">

        <!-- Header con logo -->
        <tr><td style="padding:24px 32px 16px;border-bottom:3px solid #d10000">
          <img src="${LOGO_DARK_URL}" alt="MDRACING" width="120" style="display:block;height:auto"/>
        </td></tr>

        <!-- Cuerpo -->
        <tr><td style="padding:32px">
          <p style="margin:0 0 8px;font-size:13px;font-weight:600;letter-spacing:2px;color:#d10000;text-transform:uppercase">Última chance</p>
          <h1 style="margin:0 0 16px;font-size:28px;line-height:1.2;font-weight:800;color:#0a0a0a;letter-spacing:-0.5px">${greeting} tenemos un descuento exclusivo para que termines tu compra.</h1>
          <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#333">
            Sabemos que a veces hay que pensarlo. Por eso te dejamos un <strong>5% OFF adicional</strong> usando el código de abajo. Es válido por 48 horas y solo se puede usar una vez.
          </p>

          <!-- Cupón destacado -->
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:16px 0 24px">
            <tr><td style="background:#0a0a0a;border-radius:8px;padding:24px;text-align:center">
              <p style="margin:0 0 8px;font-size:12px;font-weight:600;letter-spacing:3px;color:#fff;text-transform:uppercase;opacity:0.7">Tu cupón</p>
              <p style="margin:0 0 8px;font-size:36px;font-weight:800;letter-spacing:4px;color:#ffffff;font-family:'Courier New',monospace">VOLVE5</p>
              <p style="margin:0;font-size:13px;color:#fff;opacity:0.8">5% OFF · válido por 48 horas</p>
            </td></tr>
          </table>

          ${renderCartItemsHtml(items)}

          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-top:1px solid #e5e5ea;margin-top:8px">
            <tr>
              <td style="padding:8px;font-family:Arial,sans-serif;font-size:14px;color:#666">Subtotal estimado</td>
              <td style="padding:8px;font-family:Arial,sans-serif;font-size:14px;color:#666;text-align:right">${money(total)}</td>
            </tr>
            <tr>
              <td style="padding:8px;font-family:Arial,sans-serif;font-size:14px;color:#d10000;font-weight:600">Descuento VOLVE5 (5%)</td>
              <td style="padding:8px;font-family:Arial,sans-serif;font-size:14px;color:#d10000;font-weight:600;text-align:right">−${money(discount)}</td>
            </tr>
            <tr>
              <td style="padding:12px 8px;font-family:Arial,sans-serif;font-size:16px;font-weight:800;color:#0a0a0a;border-top:2px solid #0a0a0a">Total con cupón</td>
              <td style="padding:12px 8px;font-family:Arial,sans-serif;font-size:20px;font-weight:800;color:#d10000;text-align:right;border-top:2px solid #0a0a0a">${money(finalTotal)}</td>
            </tr>
          </table>

          <p style="margin:24px 0 8px;font-size:14px;color:#666">Además, pagando con transferencia o efectivo tenés <strong style="color:#0a0a0a">10% OFF</strong> adicional.</p>

          <!-- CTA -->
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:24px 0 8px">
            <tr><td style="background:#d10000;border-radius:6px">
              <a href="${SITE_URL}/?recover=${encodeURIComponent(cart.id)}&coupon=VOLVE5" style="display:inline-block;padding:14px 32px;font-family:Arial,sans-serif;font-size:14px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#ffffff;text-decoration:none">Usar VOLVE5 ahora →</a>
            </td></tr>
          </table>

          <p style="margin:24px 0 0;font-size:13px;color:#888;line-height:1.6">
            Si tenés alguna duda escribinos por WhatsApp al
            <a href="https://wa.me/${WA_NUMBER}" style="color:#d10000;text-decoration:none">${WA_DISPLAY}</a>. Estamos para ayudarte.
          </p>
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:24px 32px;background:#f6f6f8;border-top:1px solid #e5e5ea;font-size:12px;color:#666;font-family:Arial,sans-serif;line-height:1.6">
          <p style="margin:0">MDRACING · Fabricantes desde el año 2000<br>
          Villa Ballester, San Martín, Bs As · <a href="${SITE_URL}" style="color:#666">mdracingfundas.com</a></p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

  try {
    const res = await getResend().emails.send({
      from: FROM,
      to: cart.customer_email,
      replyTo: REPLY_TO,
      subject: 'Última chance — 5% OFF para que termines tu compra · MDRACING',
      html,
    });
    return { ok: true, data: res };
  } catch (e) {
    console.error('[email.sendAbandonedCartReminder24h] error:', e && e.message);
    return { ok: false, error: e.message };
  }
}

module.exports = {
  sendAdminNotification,
  sendCustomerConfirmation,
  sendAbandonedCartReminder4h,
  sendAbandonedCartReminder24h,
};
