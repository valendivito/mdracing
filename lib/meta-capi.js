/**
 * MDRACING — Meta Conversions API (CAPI) helper
 *
 * Reenvía eventos al pixel server-side. Recupera el ~30-50% de eventos
 * perdidos por iOS, bloqueadores de ads y limitaciones del browser.
 *
 * Setup:
 *   - Env var: META_CAPI_ACCESS_TOKEN (generar en Events Manager → CAPI)
 *   - Env var: META_TEST_EVENT_CODE (opcional, solo para testing en Test Events)
 *   - Env var: META_PIXEL_ID (opcional, fallback al hardcoded)
 *
 * Si falta el token, las funciones loguean y retornan { ok: false } sin throw
 * (fail-soft: nunca debe romper el flujo del usuario).
 */

'use strict';

const crypto = require('crypto');
const https = require('https');

const PIXEL_ID = process.env.META_PIXEL_ID || '2253143738760070';
const ACCESS_TOKEN = process.env.META_CAPI_ACCESS_TOKEN;
const TEST_EVENT_CODE = process.env.META_TEST_EVENT_CODE || null;
const API_VERSION = 'v19.0';

/**
 * SHA256 + lower + trim, formato esperado por Meta para PII.
 * Si el value es null/undefined/empty → devuelve null.
 */
function hash(value) {
  if (!value) return null;
  return crypto.createHash('sha256')
    .update(String(value).toLowerCase().trim())
    .digest('hex');
}

/**
 * Hashea solo dígitos del teléfono (sin código de país opcional).
 * Meta acepta E.164 sin el +, ej. "5491154907774".
 */
function hashPhone(phone) {
  if (!phone) return null;
  const digits = String(phone).replace(/\D/g, '');
  if (!digits) return null;
  return crypto.createHash('sha256').update(digits).digest('hex');
}

/**
 * Construye user_data según spec Meta.
 * Todos los PII van hasheados. fbp/fbc/client_ip/client_user_agent NO.
 */
function buildUserData(userData = {}) {
  const out = {};

  // PII hasheado
  if (userData.email) out.em = [hash(userData.email)];
  if (userData.phone) out.ph = [hashPhone(userData.phone)];
  if (userData.firstName) out.fn = [hash(userData.firstName)];
  if (userData.lastName) out.ln = [hash(userData.lastName)];
  if (userData.dni) out.external_id = [hash(userData.dni)];
  if (userData.city) out.ct = [hash(userData.city)];
  if (userData.zip) out.zp = [hash(userData.zip)];
  if (userData.country) out.country = [hash(userData.country)];

  // Identificadores Meta (NO hashear)
  if (userData.fbp) out.fbp = userData.fbp;
  if (userData.fbc) out.fbc = userData.fbc;

  // Network info (NO hashear)
  if (userData.client_ip) out.client_ip_address = userData.client_ip;
  if (userData.client_user_agent) out.client_user_agent = userData.client_user_agent;

  return out;
}

/**
 * Envía un evento a Meta CAPI. Usa https nativo para evitar dependencia
 * (Vercel Functions tienen node-fetch global pero https es más confiable).
 *
 * @param {object} eventData - { event_name, event_id?, event_source_url?, user_data, custom_data, action_source? }
 * @returns {Promise<{ok: boolean, status?: number, body?: any, error?: string}>}
 */
async function sendEvent(eventData) {
  if (!ACCESS_TOKEN) {
    console.warn('[meta-capi] META_CAPI_ACCESS_TOKEN no configurado — evento NO enviado');
    return { ok: false, error: 'no-access-token' };
  }

  const event = {
    event_name: eventData.event_name,
    event_time: eventData.event_time || Math.floor(Date.now() / 1000),
    action_source: eventData.action_source || 'website',
    event_source_url: eventData.event_source_url,
    user_data: buildUserData(eventData.user_data || {}),
    custom_data: eventData.custom_data || {},
  };

  if (eventData.event_id) event.event_id = eventData.event_id;

  const payload = {
    data: [event],
  };
  if (TEST_EVENT_CODE) payload.test_event_code = TEST_EVENT_CODE;

  const body = JSON.stringify(payload);
  const url = `https://graph.facebook.com/${API_VERSION}/${PIXEL_ID}/events?access_token=${encodeURIComponent(ACCESS_TOKEN)}`;

  return new Promise((resolve) => {
    const u = new URL(url);
    const req = https.request({
      method: 'POST',
      hostname: u.hostname,
      path: u.pathname + u.search,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      },
      timeout: 5000,
    }, (res) => {
      let chunks = '';
      res.on('data', (c) => { chunks += c; });
      res.on('end', () => {
        let parsed;
        try { parsed = JSON.parse(chunks); } catch (_) { parsed = chunks; }
        const ok = res.statusCode >= 200 && res.statusCode < 300;
        if (!ok) {
          console.error('[meta-capi] Meta respondió error:', res.statusCode, parsed);
        }
        resolve({ ok, status: res.statusCode, body: parsed });
      });
    });
    req.on('error', (err) => {
      console.error('[meta-capi] HTTPS request error:', err.message);
      resolve({ ok: false, error: err.message });
    });
    req.on('timeout', () => {
      req.destroy();
      console.error('[meta-capi] Timeout');
      resolve({ ok: false, error: 'timeout' });
    });
    req.write(body);
    req.end();
  });
}

/**
 * Helper para extraer IP real del request en Vercel.
 * Vercel pasa la IP en x-forwarded-for (puede tener múltiples, agarrar la primera).
 */
function getClientIp(req) {
  const xff = req.headers['x-forwarded-for'];
  if (xff) return String(xff).split(',')[0].trim();
  return req.headers['x-real-ip'] || req.connection?.remoteAddress || null;
}

/**
 * Helper para extraer user-agent del request.
 */
function getClientUserAgent(req) {
  return req.headers['user-agent'] || null;
}

module.exports = {
  sendEvent,
  buildUserData,
  hash,
  hashPhone,
  getClientIp,
  getClientUserAgent,
  PIXEL_ID,
  API_VERSION,
};
