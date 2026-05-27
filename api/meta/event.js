/**
 * POST /api/meta/event
 *
 * Endpoint que recibe eventos del cliente y los reenvía a Meta Conversions API.
 * Usado en par con el pixel client-side (fbq) usando el mismo event_id para
 * deduplicación.
 *
 * Body esperado:
 * {
 *   event_name: 'ViewContent' | 'AddToCart' | 'InitiateCheckout' | 'Purchase' | 'Lead' | 'PageView',
 *   event_id: string,              // mismo ID que se pasó a fbq('track', ..., { eventID })
 *   event_source_url?: string,     // URL donde ocurrió el evento (default: referer)
 *   user_data?: {                  // todo opcional, mejora Event Match Quality
 *     email, phone, firstName, lastName, dni, city, zip, country,
 *     fbp,                         // cookie _fbp del browser
 *     fbc                          // cookie _fbc del browser o param fbclid
 *   },
 *   custom_data?: {                // datos del evento
 *     value, currency, content_ids, content_type, num_items, order_id, content_name
 *   }
 * }
 */

'use strict';

const { sendEvent, getClientIp, getClientUserAgent } = require('../../lib/meta-capi');
const { applyCors } = require('../../lib/cors');

module.exports = async (req, res) => {
  if (applyCors(req, res)) return;
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = req.body || {};
    const { event_name, event_id, event_source_url, user_data, custom_data } = body;

    if (!event_name || typeof event_name !== 'string') {
      return res.status(400).json({ error: 'event_name requerido' });
    }

    // Enriquecer user_data con IP + UA del server-side (mejora EMQ)
    const enrichedUserData = {
      ...(user_data || {}),
      client_ip: getClientIp(req),
      client_user_agent: getClientUserAgent(req),
    };

    const result = await sendEvent({
      event_name,
      event_id,
      event_source_url: event_source_url || req.headers.referer,
      user_data: enrichedUserData,
      custom_data: custom_data || {},
    });

    // Respuesta minimalista para no leakear info de Meta al frontend
    if (result.ok) {
      return res.status(200).json({ ok: true });
    } else {
      // Devolvemos 200 igual (fail-soft): el cliente no debe romperse por esto
      return res.status(200).json({ ok: false, reason: result.error || 'meta-error' });
    }
  } catch (err) {
    console.error('[api/meta/event] Exception:', err);
    return res.status(200).json({ ok: false, reason: 'exception' });
  }
};
