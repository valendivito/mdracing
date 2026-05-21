/**
 * MDRACING — Lógica de cálculo de envíos
 *
 * Reglas de envío GRATIS:
 *   1. Producto individual con precio >= $130.000
 *   2. Total del pedido (subtotal) >= $130.000
 *   3. Producto marcado como freeShipping (ej. Alfombras Termoformadas)
 *   4. Retiro en fábrica (Villa Ballester) o local (Munro)
 */

const FREE_SHIPPING_THRESHOLD = 130000;

const SHIPPING_ZONES = {
  'retiro-fabrica': {
    label: 'Retiro en fábrica · Villa Ballester',
    cost: 0,
    isPickup: true,
  },
  'retiro-local': {
    label: 'Retiro en local · Av. Bartolomé Mitre 3495, Munro',
    cost: 0,
    isPickup: true,
  },
  'caba': {
    label: 'Envío a CABA',
    cost: 5000,
    isPickup: false,
  },
  'gba-norte-oeste': {
    label: 'Envío a GBA Norte y Oeste',
    cost: 6500,
    isPickup: false,
  },
  'gba-sur-resto-ba': {
    label: 'Envío a GBA Sur y resto Prov. Buenos Aires',
    cost: 7500,
    isPickup: false,
  },
  'interior': {
    label: 'Envío al interior del país',
    cost: 9500,
    isPickup: false,
  },
};

/**
 * Convierte un string de precio en formato "140.000" o "$140.000" a número.
 */
function priceToNumber(price) {
  if (typeof price === 'number') return price;
  if (!price) return 0;
  return parseInt(String(price).replace(/[^\d]/g, ''), 10) || 0;
}

/**
 * Determina si el pedido califica para envío gratis (a domicilio).
 */
function qualifiesForFreeShipping(items) {
  const subtotal = items.reduce(
    (sum, it) => sum + priceToNumber(it.unitPrice) * (it.qty || 1),
    0
  );

  // Regla 2: total >= threshold
  if (subtotal >= FREE_SHIPPING_THRESHOLD) return true;

  // Reglas 1 y 3: algún producto individual califica
  return items.some(it => {
    if (it.freeShipping === true) return true;
    if (priceToNumber(it.unitPrice) >= FREE_SHIPPING_THRESHOLD) return true;
    return false;
  });
}

/**
 * Calcula el costo y la etiqueta del envío.
 */
function calcShipping(items, zoneKey) {
  const zone = SHIPPING_ZONES[zoneKey];
  if (!zone) {
    throw new Error('Zona de envío inválida: ' + zoneKey);
  }

  // Retiros siempre son gratis
  if (zone.isPickup) {
    return { cost: 0, label: zone.label, free: true, isPickup: true };
  }

  // Si califica para envío gratis pero pidió envío
  if (qualifiesForFreeShipping(items)) {
    return {
      cost: 0,
      label: zone.label + ' (GRATIS)',
      free: true,
      isPickup: false,
    };
  }

  return {
    cost: zone.cost,
    label: zone.label,
    free: false,
    isPickup: false,
  };
}

module.exports = {
  SHIPPING_ZONES,
  FREE_SHIPPING_THRESHOLD,
  calcShipping,
  qualifiesForFreeShipping,
  priceToNumber,
};
