/**
 * GET /api/meta-feed.xml
 *
 * Feed RSS 2.0 con namespace Google Merchant (formato aceptado por Meta
 * Commerce Manager) que lista todos los productos del catálogo MDRACING.
 *
 * Se conecta en Meta Commerce Manager → Catálogos → Data feed → URL:
 *   https://www.mdracingfundas.com/api/meta-feed.xml
 *
 * Cacheado 1h (CDN Vercel) → Meta lo refetchea según schedule.
 *
 * Spec: https://www.facebook.com/business/help/120325381656392
 */

'use strict';

const fs = require('fs');
const path = require('path');

const SITE_BASE = 'https://www.mdracingfundas.com';
const BRAND = 'MDRACING';
const CURRENCY = 'ARS';

// Mapeo cat interna → Google Product Taxonomy
// (https://www.google.com/basepages/producttype/taxonomy.en-US.txt)
const CAT_TO_GOOGLE = {
  'cat-fundas-asientos':         'Vehicles & Parts > Vehicle Parts & Accessories > Vehicle Seating & Interior > Vehicle Seats',
  'cat-cubre-autos':             'Vehicles & Parts > Vehicle Parts & Accessories > Vehicle Maintenance, Care & Decor > Vehicle Covers',
  'cat-cubre-capots':            'Vehicles & Parts > Vehicle Parts & Accessories > Vehicle Maintenance, Care & Decor > Vehicle Covers',
  'cat-cubre-trompas':           'Vehicles & Parts > Vehicle Parts & Accessories > Vehicle Maintenance, Care & Decor > Vehicle Covers',
  'cat-cubre-motos':             'Vehicles & Parts > Vehicle Parts & Accessories > Vehicle Maintenance, Care & Decor > Vehicle Covers',
  'cat-alfombras-termoformadas': 'Vehicles & Parts > Vehicle Parts & Accessories > Vehicle Seating & Interior > Vehicle Carpet & Floor Mats',
  'cat-accesorios':              'Vehicles & Parts > Vehicle Parts & Accessories',
};

const CAT_TO_PRODUCT_TYPE = {
  'cat-fundas-asientos':         'Fundas > Fundas para Asientos',
  'cat-cubre-autos':             'Cubre Autos > Cubre Auto',
  'cat-cubre-capots':            'Cubre Autos > Cubre Capot',
  'cat-cubre-trompas':           'Cubre Autos > Cubre Trompa',
  'cat-cubre-motos':             'Cubre Autos > Cubre Moto',
  'cat-alfombras-termoformadas': 'Accesorios > Alfombras Termoformadas',
  'cat-accesorios':              'Accesorios > Accesorios',
};

function escXml(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Convierte "210.000" o "210000" o "$210.000" a número entero
function priceToNumber(p) {
  if (typeof p === 'number') return p;
  if (!p) return 0;
  return parseInt(String(p).replace(/[^\d]/g, ''), 10) || 0;
}

function absoluteImage(src) {
  if (!src) return null;
  if (src.startsWith('http://') || src.startsWith('https://')) return src;
  if (src.startsWith('/')) return SITE_BASE + src;
  return SITE_BASE + '/' + src;
}

function buildItem(p) {
  const subtotal = priceToNumber(p.price);
  const salePrice = priceToNumber(p.salePrice);

  // Si no hay imágenes válidas o el precio es 0, lo omitimos (Meta lo rechaza igual)
  const validImages = (p.images || []).map(absoluteImage).filter(Boolean);
  if (!validImages.length || subtotal <= 0) return null;

  const [mainImg, ...extraImgs] = validImages;
  const additionalImgs = extraImgs.slice(0, 9); // max 10 total (1 main + 9 extra)

  const link = `${SITE_BASE}/producto/${p.id}`;
  const productType = CAT_TO_PRODUCT_TYPE[p.catId] || 'Accesorios automotrices';
  const googleCat = CAT_TO_GOOGLE[p.catId] || 'Vehicles & Parts > Vehicle Parts & Accessories';

  // ID Meta: usar el slug del producto truncado a 100 chars
  const metaId = p.id.slice(0, 100);

  // Descripción: si está vacía, generamos una decente desde el nombre + categoría
  const description = (p.desc && p.desc.trim().length > 10)
    ? p.desc
    : `${p.name}. Fabricados por MDRACING en Argentina hace 25 años. ${p.cat || ''}. A medida según marca y modelo. Envíos a todo el país. 10% OFF pagando con transferencia o efectivo.`;

  const lines = [];
  lines.push('    <item>');
  lines.push(`      <g:id>${escXml(metaId)}</g:id>`);
  lines.push(`      <g:title>${escXml(p.name.slice(0, 150))}</g:title>`);
  lines.push(`      <g:description>${escXml(description.slice(0, 4900))}</g:description>`);
  lines.push(`      <g:link>${escXml(link)}</g:link>`);
  lines.push(`      <g:image_link>${escXml(mainImg)}</g:image_link>`);
  for (const img of additionalImgs) {
    lines.push(`      <g:additional_image_link>${escXml(img)}</g:additional_image_link>`);
  }
  lines.push(`      <g:availability>in stock</g:availability>`);
  lines.push(`      <g:condition>new</g:condition>`);
  lines.push(`      <g:price>${subtotal} ${CURRENCY}</g:price>`);
  if (salePrice > 0 && salePrice < subtotal) {
    lines.push(`      <g:sale_price>${salePrice} ${CURRENCY}</g:sale_price>`);
  }
  lines.push(`      <g:brand>${escXml(BRAND)}</g:brand>`);
  lines.push(`      <g:google_product_category>${escXml(googleCat)}</g:google_product_category>`);
  lines.push(`      <g:product_type>${escXml(productType)}</g:product_type>`);
  lines.push(`      <g:identifier_exists>no</g:identifier_exists>`);
  lines.push(`      <g:item_group_id>${escXml(p.catId || 'mdracing')}</g:item_group_id>`);
  lines.push('    </item>');
  return lines.join('\n');
}

module.exports = async (req, res) => {
  try {
    // products.json se genera en build-time por scripts/prerender.cjs
    const dataPath = path.join(__dirname, '..', 'data', 'products.json');
    if (!fs.existsSync(dataPath)) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'text/plain');
      return res.end('Error: data/products.json no encontrado. Correr "npm run build:ssg".');
    }

    const products = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

    // Filtrar productos elegibles
    const eligible = products.filter(p => p.metaFeedEligible !== false);

    const items = eligible
      .map(buildItem)
      .filter(Boolean)
      .join('\n');

    const xml =
      `<?xml version="1.0" encoding="UTF-8"?>\n` +
      `<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">\n` +
      `  <channel>\n` +
      `    <title>${escXml(BRAND)} — Catálogo</title>\n` +
      `    <link>${SITE_BASE}</link>\n` +
      `    <description>Fundas para asientos, cubre autos antigranizo, cubre capots y accesorios automotrices premium. Fábrica directa hace 25 años.</description>\n` +
      `${items}\n` +
      `  </channel>\n` +
      `</rss>\n`;

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
    res.setHeader('X-Robots-Tag', 'noindex, nofollow');
    res.end(xml);
  } catch (err) {
    console.error('[meta-feed.xml] Error:', err);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Error generando feed: ' + err.message);
  }
};
