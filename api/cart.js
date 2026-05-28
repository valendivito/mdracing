/**
 * /api/cart — endpoint consolidado para Sprint F (recuperación de carritos)
 *
 *   POST /api/cart?action=save
 *     Body: { email, name?, phone?, items, total }
 *     Guarda/actualiza un cart_session pendiente. Llamado desde checkout.js
 *     cada vez que el usuario completa email + tiene items.
 *
 *   POST /api/cart?action=cron
 *     Llamado por Vercel Cron cada hora. Requiere header x-cron-secret
 *     que matchee CRON_SECRET (env var). Manda recordatorios 4h y 24h.
 *
 * Consolidado en 1 sola function para respetar el límite de 12
 * serverless functions del plan Hobby de Vercel.
 */

'use strict';

const { applyCors } = require('../lib/cors');
const {
  saveCartSession,
  findCartsForReminder,
  markReminderSent,
} = require('../lib/db');
const {
  sendAbandonedCartReminder4h,
  sendAbandonedCartReminder24h,
} = require('../lib/email');

// ───────────────────────────────────────────────────────────
// Validaciones de payload
// ───────────────────────────────────────────────────────────
function isValidEmail(s) {
  if (typeof s !== 'string') return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim()) && s.trim().length <= 254;
}

function sanitizeItems(items) {
  if (!Array.isArray(items)) return [];
  // Limitamos a 20 items por seguridad y truncamos campos string
  return items.slice(0, 20).map(it => ({
    id: typeof it.id === 'string' ? it.id.slice(0, 200) : '',
    name: typeof it.name === 'string' ? it.name.slice(0, 250) : 'Producto',
    qty: Math.max(1, Math.min(99, parseInt(it.qty, 10) || 1)),
    unitPrice: Math.max(0, Number(it.unitPrice) || Number(it.price) || 0),
    image: typeof it.image === 'string' ? it.image.slice(0, 500) : (typeof it.img === 'string' ? it.img.slice(0, 500) : null),
  }));
}

// ───────────────────────────────────────────────────────────
// Acción: save (público, llamado desde el browser)
// ───────────────────────────────────────────────────────────
async function handleSave(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const body = req.body || {};
    const { email, name, phone, items, total } = body;

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'email inválido' });
    }
    const cleanItems = sanitizeItems(items);
    if (cleanItems.length === 0) {
      // Sin items no tiene sentido guardar
      return res.status(200).json({ ok: true, skipped: 'no-items' });
    }
    const cleanTotal = Math.max(0, Number(total) || 0);
    const cleanName = typeof name === 'string' ? name.trim().slice(0, 120) : null;
    const cleanPhone = typeof phone === 'string' ? phone.trim().slice(0, 40) : null;

    const result = await saveCartSession({
      email,
      name: cleanName,
      phone: cleanPhone,
      items: cleanItems,
      total: cleanTotal,
    });

    if (!result.ok) {
      console.error('[api/cart save] error:', result.error);
      // Fail-soft: el browser no debe romperse
      return res.status(200).json({ ok: false, reason: 'db-error' });
    }

    return res.status(200).json({ ok: true, created: !!result.created });
  } catch (e) {
    console.error('[api/cart save] exception:', e);
    return res.status(200).json({ ok: false, reason: 'exception' });
  }
}

// ───────────────────────────────────────────────────────────
// Acción: cron (autenticado con CRON_SECRET)
// ───────────────────────────────────────────────────────────
async function handleCron(req, res) {
  // Autenticación: Vercel Cron manda x-vercel-cron y/o nosotros agregamos
  // x-cron-secret en el config. Validamos al menos uno.
  const secret = process.env.CRON_SECRET;
  const headerSecret = req.headers['x-cron-secret'] || req.headers['authorization'];
  const isVercelCron = req.headers['x-vercel-cron'] === '1' || req.headers['x-vercel-cron'] === 'true';

  if (!isVercelCron) {
    if (!secret) {
      console.warn('[api/cart cron] CRON_SECRET no configurado y no es Vercel cron — rechazando');
      return res.status(401).json({ error: 'unauthorized' });
    }
    const provided = headerSecret && String(headerSecret).replace(/^Bearer\s+/i, '');
    if (provided !== secret) {
      return res.status(401).json({ error: 'unauthorized' });
    }
  }

  const summary = {
    reminder_4h: { found: 0, sent: 0, errors: 0 },
    reminder_24h: { found: 0, sent: 0, errors: 0 },
    startedAt: new Date().toISOString(),
  };

  // ── Recordatorio 4 horas (sin descuento) ──
  try {
    const r4 = await findCartsForReminder({ hoursAgo: 4, reminderField: 'reminder_4h_sent_at' });
    if (r4.ok) {
      summary.reminder_4h.found = r4.carts.length;
      for (const cart of r4.carts) {
        try {
          const sent = await sendAbandonedCartReminder4h(cart);
          if (sent.ok) {
            await markReminderSent(cart.id, 'reminder_4h_sent_at');
            summary.reminder_4h.sent++;
          } else {
            summary.reminder_4h.errors++;
          }
        } catch (e) {
          summary.reminder_4h.errors++;
          console.error('[cron 4h] cart', cart.id, e && e.message);
        }
      }
    }
  } catch (e) {
    console.error('[cron 4h] exception:', e && e.message);
  }

  // ── Recordatorio 24 horas (con cupón VOLVE5) ──
  try {
    const r24 = await findCartsForReminder({ hoursAgo: 24, reminderField: 'reminder_24h_sent_at' });
    if (r24.ok) {
      summary.reminder_24h.found = r24.carts.length;
      for (const cart of r24.carts) {
        try {
          const sent = await sendAbandonedCartReminder24h(cart);
          if (sent.ok) {
            await markReminderSent(cart.id, 'reminder_24h_sent_at');
            summary.reminder_24h.sent++;
          } else {
            summary.reminder_24h.errors++;
          }
        } catch (e) {
          summary.reminder_24h.errors++;
          console.error('[cron 24h] cart', cart.id, e && e.message);
        }
      }
    }
  } catch (e) {
    console.error('[cron 24h] exception:', e && e.message);
  }

  summary.finishedAt = new Date().toISOString();
  console.log('[api/cart cron] summary:', JSON.stringify(summary));
  return res.status(200).json({ ok: true, summary });
}

// ───────────────────────────────────────────────────────────
// Router
// ───────────────────────────────────────────────────────────
module.exports = async (req, res) => {
  if (applyCors(req, res)) return;

  const action = (req.query && req.query.action) || '';

  if (action === 'save') return handleSave(req, res);
  if (action === 'cron') return handleCron(req, res);

  return res.status(400).json({ error: 'action inválida — usar save | cron' });
};
