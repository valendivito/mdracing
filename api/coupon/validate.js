/**
 * POST /api/coupon/validate
 *
 * Valida un cupón sin consumirlo (el uso se contabiliza al confirmar la compra).
 *
 * Body: { code: string, subtotal: number }
 *
 * Éxito (200):  { valid: true, discountAmount, type, value, description }
 * Error  (200): { valid: false, error: string }
 * Error  (400/500): { error: string }
 */

const { validateCoupon } = require('../../lib/db');
const { applyCors } = require('../../lib/cors');

module.exports = async (req, res) => {
  if (applyCors(req, res)) return;
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { code, subtotal } = req.body || {};

  if (!code || typeof code !== 'string' || !code.trim()) {
    return res.status(400).json({ error: 'Código requerido' });
  }
  const sub = Number(subtotal);
  if (isNaN(sub) || sub <= 0) {
    return res.status(400).json({ error: 'subtotal inválido' });
  }

  const result = await validateCoupon(code, sub);

  if (!result.ok) {
    return res.status(200).json({ valid: false, error: result.error });
  }

  return res.status(200).json({
    valid: true,
    couponId: result.coupon.id,
    code: result.coupon.code,
    type: result.coupon.type,
    value: Number(result.coupon.value),
    discountAmount: result.discountAmount,
    description: result.coupon.description || null,
  });
};
