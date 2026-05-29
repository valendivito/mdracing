#!/usr/bin/env node
/**
 * MDRACING — SSG Prerender
 * ═══════════════════════════════════════════════════════════════
 *
 * Genera HTML estático pre-renderizado por cada ruta del sitio para SEO.
 * Carga app.js en un sandbox de Node con stubs del DOM, llama las funciones
 * de render (renderHome, renderProductPage, etc.) que ya devuelven HTML como
 * strings, y escribe los resultados como archivos estáticos en la raíz del
 * proyecto.
 *
 * Vercel sirve esos archivos directamente cuando un crawler (o un usuario)
 * hace fetch a una URL — el JS hace takeover encima para hidratar interactividad.
 *
 * Output:
 *   index.html                     (home prerendered)
 *   <slug-categoria>.html          (1 por categoría)
 *   <slug-pagina-estatica>.html    (quienes-somos, contacto, etc.)
 *   producto/<slug>.html           (1 por producto, 167 total)
 *   sitemap.xml                    (con TODAS las URLs reales)
 *
 * Uso:
 *   node scripts/prerender.cjs
 */

'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const APP_JS_PATH = path.join(ROOT, 'app.js');
const INDEX_HTML_PATH = path.join(ROOT, 'index.html');
const SITE_BASE = 'https://www.mdracingfundas.com';

// ═══════════════════════════════════════════════════════════════
// 1) SANDBOX DE NODE CON STUBS DEL DOM
// ═══════════════════════════════════════════════════════════════
//
// app.js asume que corre en el browser. Le damos stubs mínimos para que
// el código se cargue sin explotar. Los handlers de DOMContentLoaded
// efectivamente no se ejecutan porque nuestro stub no dispara el evento.

function createDocumentStub() {
  const noopEl = {
    style: {},
    classList: { add: () => {}, remove: () => {}, toggle: () => {}, contains: () => false },
    setAttribute: () => {},
    getAttribute: () => null,
    removeAttribute: () => {},
    appendChild: () => {},
    removeChild: () => {},
    insertBefore: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    querySelector: () => null,
    querySelectorAll: () => [],
    getElementsByTagName: () => [],
    closest: () => null,
    matches: () => false,
    cloneNode: () => noopEl,
    focus: () => {},
    blur: () => {},
    click: () => {},
    contains: () => false,
    remove: () => {},
    dispatchEvent: () => true,
    parentNode: null,
    children: [],
    childNodes: [],
    firstChild: null,
    nextSibling: null,
    innerHTML: '',
    textContent: '',
    value: '',
    checked: false,
    hidden: false,
    offsetWidth: 0,
    offsetHeight: 0,
    dataset: {},
  };
  return {
    addEventListener: () => {},
    removeEventListener: () => {},
    getElementById: () => null,
    querySelector: () => null,
    querySelectorAll: () => [],
    getElementsByTagName: () => [],
    createElement: () => ({ ...noopEl }),
    createTextNode: () => ({ ...noopEl }),
    body: { ...noopEl, appendChild: () => {} },
    head: { ...noopEl, appendChild: () => {} },
    documentElement: { ...noopEl, lang: 'es' },
    title: '',
    cookie: '',
    visibilityState: 'visible',
    readyState: 'complete',
  };
}

function createSandbox() {
  const sandbox = {
    console: {
      log: () => {},          // silenciar logs de app.js durante prerender
      warn: () => {},
      error: (...args) => console.error('[app.js error]', ...args),
      info: () => {},
      debug: () => {},
    },
    Date, Math, Object, Array, String, Number, JSON, Symbol, RegExp,
    URLSearchParams, URL,
    encodeURIComponent, decodeURIComponent, encodeURI, decodeURI,
    parseInt, parseFloat, isNaN, isFinite,
    Map, Set, WeakMap, WeakSet,
    Promise, setTimeout: (fn) => fn && fn(), clearTimeout: () => {},
    setInterval: () => 0, clearInterval: () => {},
    requestAnimationFrame: (fn) => fn && fn(),
    cancelAnimationFrame: () => {},
    fbq: () => {},
    gtag: () => {},
    dataLayer: [],
    localStorage: { getItem: () => null, setItem: () => {}, removeItem: () => {}, clear: () => {} },
    sessionStorage: { getItem: () => null, setItem: () => {}, removeItem: () => {}, clear: () => {} },
    Image: class { constructor() {} set src(v) {} },
    HTMLElement: class {}, HTMLInputElement: class {}, HTMLButtonElement: class {},
    Element: class {}, Node: class {}, Event: class {}, CustomEvent: class {},
    IntersectionObserver: class { observe() {} unobserve() {} disconnect() {} },
    MutationObserver:   class { observe() {} disconnect() {} },
    ResizeObserver:     class { observe() {} disconnect() {} },
    fetch: () => Promise.resolve({ ok: false, json: async () => ({}), text: async () => '' }),
    XMLHttpRequest: class { open(){} send(){} setRequestHeader(){} },
    navigator: { userAgent: 'node-prerender', language: 'es-AR' },
    location: { pathname: '/', hash: '', search: '', href: SITE_BASE + '/', origin: SITE_BASE },
    history: { pushState: () => {}, replaceState: () => {}, back: () => {}, forward: () => {}, go: () => {} },
    alert: () => {}, confirm: () => true, prompt: () => null,
  };
  sandbox.document = createDocumentStub();
  sandbox.window = sandbox;
  sandbox.self = sandbox;
  sandbox.globalThis = sandbox;
  return sandbox;
}

// ═══════════════════════════════════════════════════════════════
// 2) CARGAR APP.JS EN EL SANDBOX
// ═══════════════════════════════════════════════════════════════

function loadAppInSandbox() {
  const src = fs.readFileSync(APP_JS_PATH, 'utf8');
  const sandbox = createSandbox();
  const ctx = vm.createContext(sandbox);

  // app.js empieza con 'use strict' y declara TODO con const/let. Como las
  // declaraciones top-level en strict mode son scope-local en vm.runInContext,
  // necesitamos colgarlas en globalThis para acceder después. Estrategia:
  // ejecutamos el código en un wrapper que captura todas las declaraciones
  // top-level relevantes y las asigna al global.
  //
  // Aproximación pragmática: tras ejecutar app.js, app.js NO va a exponer
  // sus const/let automáticamente. Para evitar refactor, las que necesitamos
  // las capturamos via eval estructural: las funciones quedan como propiedades
  // del Function constructor wrapper.
  //
  // Solución más simple: prependear/appendear código que asigne a globalThis.

  const exposeList = [
    'products', 'categories', 'icons', 'COLOR_NAMES',
    'HOT_SALE_ACTIVE', 'HOT_SALE_PRICES', 'HOTSALE_END',
    'WA', 'WA_MSG', 'SOCIAL', 'COMPANY', 'SITE_BASE', 'SITE_DEFAULT_IMAGE',
    'ROUTE_TO_PAGE', 'PAGE_TO_ROUTE',
    'pageToPath', 'pathToPage',
    'renderHome', 'renderProductCard', 'renderCategoryPage', 'renderProductPage',
    'renderAboutPage', 'renderFaqPage', 'renderHowToBuyPage', 'renderReturnsPage',
    'renderTermsPage', 'renderPrivacyPage', 'renderContactPage', 'renderCategoriesPage',
    'carSvg', 'seatSvg', 'coverSvg', 'motoSvg', 'capotSvg', 'accesorioSvg',
    'trompaSvg', 'alfombraSvg', 'flameSvg', 'mantaSvg',
    'faqs', 'faqCategories',
  ];

  // Wrappemos: ejecutar app.js y luego asignar al global lo que necesitamos.
  // Si una variable no existe, simplemente skipea esa asignación.
  const exposeCode = exposeList
    .map(name => `try { globalThis.${name} = ${name}; } catch(_) {}`)
    .join('\n');

  const wrapped = src + '\n\n// ── PRERENDER EXPOSE ──\n' + exposeCode + '\n';

  try {
    vm.runInContext(wrapped, ctx, { timeout: 15000, filename: 'app.js' });
  } catch (e) {
    // Es esperable que falle en algún punto (handlers DOM, etc.). Mientras
    // las funciones top-level se hayan definido antes del error, seguimos.
    console.error('[prerender] Warning durante carga de app.js:', e.message);
  }

  // Validar que las funciones críticas estén disponibles
  const missing = ['products', 'categories', 'renderHome', 'renderProductPage', 'renderCategoryPage']
    .filter(name => typeof sandbox[name] === 'undefined');
  if (missing.length) {
    throw new Error('No se pudieron extraer del sandbox: ' + missing.join(', '));
  }
  return sandbox;
}

// ═══════════════════════════════════════════════════════════════
// 3) GENERAR SEO METADATA POR PÁGINA
// ═══════════════════════════════════════════════════════════════

const STATIC_SEO = {
  'home': {
    title: 'MDRACING · Fundas y Cubre Autos a medida · Fábrica directa hace 25 años',
    description: 'Fundas para asientos a medida desde $50.000, cubre autos antigranizo, cubre capots y accesorios premium. Fábrica directa hace 25 años. 10% OFF con transferencia. Envíos a todo el país.',
    path: '/',
  },
  'categorias': {
    title: 'Productos | MDRACING — Catálogo completo de accesorios automotrices',
    description: 'Catálogo completo: fundas para asientos, cubre autos, cubre capots, cubre trompas, cubre motos, alfombras termoformadas y accesorios. Fábrica directa hace 25 años.',
    path: '/categorias',
  },
  'quienes-somos': {
    title: 'Quiénes Somos | MDRACING — 25 años fabricando en Argentina',
    description: 'MDRACING fabrica accesorios automotrices premium desde el año 2000. Conocé nuestra historia, nuestro proceso y por qué nos eligen.',
    path: '/quienes-somos',
  },
  'como-comprar': {
    title: 'Cómo Comprar | MDRACING — Compras online y por WhatsApp',
    description: 'Comprá online con tarjeta en cuotas o transferencia con 10% OFF. Envíos a todo el país, retiro en Munro o fábrica de Ballester. Atención personalizada por WhatsApp.',
    path: '/como-comprar',
  },
  'preguntas-frecuentes': {
    title: 'Preguntas Frecuentes | MDRACING',
    description: 'Resolvemos tus dudas sobre productos, materiales, envíos, talles, instalación y garantías de MDRACING.',
    path: '/preguntas-frecuentes',
  },
  'cambios-devoluciones': {
    title: 'Cambios y Devoluciones | MDRACING',
    description: 'Garantía de 30 días por fallas de fábrica. Política de cambios y devoluciones MDRACING.',
    path: '/cambios-devoluciones',
  },
  'contacto': {
    title: 'Contacto | MDRACING — WhatsApp, Local Munro y Fábrica',
    description: 'Escribinos por WhatsApp +54 9 11 5490-7774, visitá nuestro local en Av. Bartolomé Mitre 3495, Munro, o la fábrica en Villa Ballester.',
    path: '/contacto',
  },
  'terminos-y-condiciones': {
    title: 'Términos y Condiciones | MDRACING',
    description: 'Condiciones de compra, envíos, garantía y derecho de revocación de MDRACING. Conforme a la Ley 24.240 de Defensa del Consumidor.',
    path: '/terminos-y-condiciones',
  },
  'politica-privacidad': {
    title: 'Política de Privacidad | MDRACING',
    description: 'Cómo MDRACING recolecta, usa y protege tus datos personales. Conforme a la Ley 25.326 de Protección de Datos Personales.',
    path: '/politica-privacidad',
  },
};

/**
 * Trunca a `max` chars respetando palabras (no corta a la mitad).
 * Si trunca, agrega elipsis. Limpia saltos de línea y espacios múltiples.
 */
function smartTruncate(text, max = 158) {
  if (!text) return '';
  // Limpiar: saltos de línea → espacio; espacios múltiples → uno solo; trim.
  let s = String(text).replace(/\s+/g, ' ').trim();
  if (s.length <= max) return s;
  // Cortar en el último espacio dentro del límite (-1 para hacer lugar a la elipsis)
  let cut = s.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(' ');
  if (lastSpace > max * 0.6) cut = cut.slice(0, lastSpace);
  return cut.replace(/[\s.,;:—-]+$/, '') + '…';
}

/**
 * Construye un title SEO-friendly para un producto:
 *   "Funda VW Tera Cuero Automotor Acolchado 3mm | MDRACING"
 * Si el resultado quedaría > 60 chars, intenta acortar sacando "| MDRACING".
 * No incluye precios (van en JSON-LD).
 */
function buildProductTitle(name) {
  const suffix = ' | MDRACING';
  if ((name + suffix).length <= 60) return name + suffix;
  if (name.length <= 60) return name;
  return smartTruncate(name, 60).replace(/…$/, '');
}

/**
 * Meta description SEO con CTAs y trim inteligente.
 * - Limpia saltos de línea y MAYÚSCULAS solo cuando todo el string viene así.
 * - Si el producto tiene desc corta, agrega CTAs para llegar a ~150 chars.
 * - Trunca respetando palabras.
 */
function buildProductDescription(product) {
  let base = (product.desc || '').replace(/\s+/g, ' ').trim();
  // Si toda la descripción está en MAYÚSCULAS (caso alfombras termoformadas),
  // pasarla a sentence case para mejor look en SERP.
  if (base && base === base.toUpperCase() && base.length > 30) {
    base = base.toLowerCase();
    base = base.charAt(0).toUpperCase() + base.slice(1);
  }
  const ctas = ' Fabricación propia hace 25 años. Envíos a todo el país. 10% OFF transferencia.';
  let full;
  if (base && base.length > 60) {
    full = base; // ya es suficientemente rica
  } else {
    full = (base ? base + '. ' : '') + `${product.name} fabricado por MDRACING.${ctas}`;
  }
  return smartTruncate(full, 158);
}

function seoForPage(page, sandbox) {
  // Productos
  if (page.startsWith('product-')) {
    const id = page.slice('product-'.length);
    const p = sandbox.products.find(pp => pp.id === id);
    if (!p) return null;
    const title = buildProductTitle(p.name);
    const description = buildProductDescription(p);
    let image = SITE_BASE + '/og-image.jpg';
    if (p.images && p.images[0]) {
      image = p.images[0].startsWith('http') ? p.images[0] : SITE_BASE + '/' + p.images[0];
    }
    return {
      title,
      description,
      image,
      imageAlt: p.name,
      // Productos NO deberían declarar dimensiones OG fijas (imagen real es variable)
      skipOgImageDimensions: true,
      path: '/producto/' + id,
      product: p,
    };
  }

  // Categorías
  if (page.startsWith('cat-')) {
    const cat = sandbox.categories.find(c => c.id === page);
    if (cat) {
      const cleanTitle = cat.title.replace('\n', ' ');
      const rawTitle = `${cleanTitle} para tu Vehículo | MDRACING`;
      const title = rawTitle.length <= 60 ? rawTitle : smartTruncate(rawTitle, 60).replace(/…$/, '');
      return {
        title,
        description: smartTruncate(`${cat.desc} Fabricantes directos con más de 25 años. Envíos a todo el país y 10% OFF pagando con transferencia.`, 158),
        image: SITE_BASE + '/og-image.jpg',
        imageAlt: `${cleanTitle} MDRACING`,
        path: sandbox.pageToPath(page),
        category: cat,
      };
    }
  }

  // Páginas estáticas
  const s = STATIC_SEO[page];
  if (s) return { ...s, image: SITE_BASE + '/og-image.jpg', imageAlt: s.title };

  // Fallback
  return {
    title: 'MDRACING — Fundas, Cubre Autos y Accesorios',
    description: 'Fabricantes de accesorios automotrices premium con más de 25 años de trayectoria.',
    image: SITE_BASE + '/og-image.jpg',
    imageAlt: 'MDRACING',
    path: '/',
  };
}

// ═══════════════════════════════════════════════════════════════
// 4) GENERAR HTML POR PÁGINA — usando index.html como template
// ═══════════════════════════════════════════════════════════════

function escAttr(s) {
  return String(s || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function escHtml(s) {
  return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function _absImage(src) {
  if (!src) return SITE_BASE + '/og-image.jpg';
  return src.startsWith('http') ? src : SITE_BASE + '/' + src;
}

/**
 * Schema Product enriquecido:
 *   - image como array (Google recomienda 3+ formatos: cuadrada/4:3/16:9)
 *   - sku derivado del id del producto (único, prefijo MDR-)
 *   - priceValidUntil + itemCondition (requeridos para Google Merchant Listings)
 *   - description rica si la del catálogo es corta
 */
function productJsonLd(p) {
  const priceNum = String(p.salePrice || p.price || '0').replace(/\./g, '');
  const images = Array.isArray(p.images) && p.images.length
    ? p.images.slice(0, 5).map(_absImage)
    : [SITE_BASE + '/og-image.jpg'];

  const desc = (p.desc && p.desc.trim().length > 30)
    ? p.desc.replace(/\s+/g, ' ').trim()
    : `${p.name} fabricado por MDRACING en Argentina hace 25 años. ${p.cat || ''}. A medida según marca y modelo. Envíos a todo el país. Garantía 30 días por fallas de fábrica.`.replace(/\s+/g, ' ').trim();

  // priceValidUntil: 6 meses desde ahora (suficiente buffer, se regenera en cada build)
  const validUntil = new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

  const data = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': p.name,
    'description': desc,
    'sku': 'MDR-' + p.id.toUpperCase().slice(0, 60),
    'image': images,
    'brand': { '@type': 'Brand', 'name': 'MDRACING' },
    'category': p.cat || undefined,
    'offers': {
      '@type': 'Offer',
      'url': SITE_BASE + '/producto/' + p.id,
      'priceCurrency': 'ARS',
      'price': priceNum,
      'priceValidUntil': validUntil,
      'availability': 'https://schema.org/InStock',
      'itemCondition': 'https://schema.org/NewCondition',
      'seller': { '@type': 'Organization', 'name': 'MDRACING' },
    },
  };
  return `<script type="application/ld+json" id="product-jsonld">${JSON.stringify(data)}</script>`;
}

/**
 * BreadcrumbList JSON-LD para producto: Inicio › Categoría › Producto
 */
function breadcrumbJsonLd(product, sandbox) {
  const cat = sandbox.categories.find(c => c.id === product.catId);
  const catPath = cat ? sandbox.pageToPath(cat.id) : '/categorias';
  const catName = cat ? cat.title.replace('\n', ' ') : 'Productos';
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_BASE + '/' },
      { '@type': 'ListItem', position: 2, name: catName, item: SITE_BASE + catPath },
      { '@type': 'ListItem', position: 3, name: product.name, item: SITE_BASE + '/producto/' + product.id },
    ],
  };
  return `<script type="application/ld+json" id="breadcrumb-jsonld">${JSON.stringify(data)}</script>`;
}

/**
 * ItemList JSON-LD para categoría: lista hasta 30 productos de esa categoría.
 */
function itemListJsonLd(category, sandbox) {
  const prods = sandbox.products
    .filter(p => p.catId === category.id)
    .slice(0, 30);
  if (!prods.length) return '';
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'itemListElement': prods.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: SITE_BASE + '/producto/' + p.id,
      name: p.name,
    })),
  };
  return `<script type="application/ld+json" id="itemlist-jsonld">${JSON.stringify(data)}</script>`;
}

/**
 * Páginas donde el LocalBusiness JSON-LD del template tiene sentido.
 * En productos/categorías lo removemos para no diluir la entidad principal.
 */
const PAGES_WITH_LOCALBUSINESS = new Set(['home', 'quienes-somos', 'contacto', 'como-comprar']);

function buildPageHtml(templateHtml, seo, renderedAppHtml, opts) {
  const url = SITE_BASE + seo.path;
  let html = templateHtml;

  // ── <title> ──
  html = html.replace(
    /<title>[\s\S]*?<\/title>/,
    `<title>${escHtml(seo.title)}</title>`
  );

  // ── <meta name="description"> ──
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="description" content="${escAttr(seo.description)}" />`
  );

  // ── <meta name="keywords"> ── (remover si está duplicada genérica)
  // Google la ignora desde 2009. Sacarla limpia el head y evita inconsistencia.
  html = html.replace(/\s*<meta\s+name="keywords"[^>]*\/?>/gi, '');

  // ── <link rel="canonical"> ──
  html = html.replace(
    /<link\s+rel="canonical"[^>]*\/?>/i,
    `<link rel="canonical" href="${escAttr(url)}" id="canonical-link" />`
  );

  // ── Open Graph ──
  const ogType = seo.product ? 'product' : 'website';
  html = html.replace(
    /<meta\s+property="og:type"[^>]*\/?>/i,
    `<meta property="og:type" content="${ogType}" />`
  );
  html = html.replace(
    /<meta\s+property="og:title"[^>]*\/?>/i,
    `<meta property="og:title" content="${escAttr(seo.title)}" id="og-title" />`
  );
  html = html.replace(
    /<meta\s+property="og:description"[^>]*\/?>/i,
    `<meta property="og:description" content="${escAttr(seo.description)}" id="og-description" />`
  );
  html = html.replace(
    /<meta\s+property="og:url"[^>]*\/?>/i,
    `<meta property="og:url" content="${escAttr(url)}" id="og-url" />`
  );
  html = html.replace(
    /<meta\s+property="og:image"[^>]*\/?>/i,
    `<meta property="og:image" content="${escAttr(seo.image)}" id="og-image" />`
  );
  // og:image:alt dinámico por página
  if (seo.imageAlt) {
    html = html.replace(
      /<meta\s+property="og:image:alt"[^>]*\/?>/i,
      `<meta property="og:image:alt" content="${escAttr(seo.imageAlt)}" />`
    );
  }
  // og:image:width/height: SOLO la home tiene dimensiones conocidas (1641x630).
  // En productos/categorías las imágenes vienen del CDN (cuadradas o variables),
  // así que removemos las dimensiones hardcoded para no romper previews sociales.
  if (seo.skipOgImageDimensions || (!seo.product && opts.pageId !== 'home')) {
    html = html.replace(/\s*<meta\s+property="og:image:width"[^>]*\/?>/gi, '');
    html = html.replace(/\s*<meta\s+property="og:image:height"[^>]*\/?>/gi, '');
  }

  // ── Twitter ──
  html = html.replace(
    /<meta\s+name="twitter:title"[^>]*\/?>/i,
    `<meta name="twitter:title" content="${escAttr(seo.title)}" id="tw-title" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:description"[^>]*\/?>/i,
    `<meta name="twitter:description" content="${escAttr(seo.description)}" id="tw-description" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:image"[^>]*\/?>/i,
    `<meta name="twitter:image" content="${escAttr(seo.image)}" id="tw-image" />`
  );

  // ── LocalBusiness JSON-LD ──
  // El template (index.html) tiene LocalBusiness inline en el <head>. Solo
  // tiene sentido en home / quienes-somos / contacto / como-comprar.
  // En productos/categorías lo removemos para no diluir la entidad principal
  // y para que Google priorice el Product schema.
  if (!PAGES_WITH_LOCALBUSINESS.has(opts.pageId)) {
    // Remover SOLO el <script application/ld+json> que contiene "LocalBusiness".
    // El (?:(?!<\/script>)[\s\S])*? evita cruzar a otros bloques <script> —
    // así Organization y WebSite (que NO tienen LocalBusiness) se conservan
    // en todas las páginas para reforzar la entidad de marca.
    html = html.replace(
      /\s*<script\s+type="application\/ld\+json">(?:(?!<\/script>)[\s\S])*?"LocalBusiness"(?:(?!<\/script>)[\s\S])*?<\/script>/gi,
      ''
    );
  }

  // ── Schemas adicionales antes del </head> ──
  const extras = [];
  if (seo.product) {
    extras.push(productJsonLd(seo.product));
    if (opts.sandbox) extras.push(breadcrumbJsonLd(seo.product, opts.sandbox));
  } else if (seo.category && opts.sandbox) {
    extras.push(itemListJsonLd(seo.category, opts.sandbox));
  }

  // Marca pre-render: el JS lo lee y skipea el render inicial
  extras.push(`<script>window.__PRERENDERED_PAGE = "${escAttr(opts.pageId)}";</script>`);

  if (extras.length) {
    html = html.replace('</head>', `  ${extras.join('\n  ')}\n</head>`);
  }

  // ── Inyectar contenido renderizado en <main id="app"> ──
  html = html.replace(
    /<main\s+id="app"[^>]*>[\s\S]*?<\/main>/i,
    `<main id="app">${renderedAppHtml}</main>`
  );

  return html;
}

// ═══════════════════════════════════════════════════════════════
// 5) SCRIPT PRINCIPAL
// ═══════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════
// META FEED XML — para Commerce Manager
// ═══════════════════════════════════════════════════════════════
//
// RSS 2.0 con namespace Google Merchant. Spec:
//   https://www.facebook.com/business/help/120325381656392

const META_FEED_BRAND = 'MDRACING';
const META_FEED_CURRENCY = 'ARS';

// Google Product Taxonomy — usamos el path conservador "Vehicles & Parts >
// Vehicle Parts & Accessories" para TODAS las categorías. Es una rama válida
// y aceptada por Meta. Los paths más finos (como "Vehicle Seats" o "Vehicle
// Covers") generaban warnings de "invalid_google_product_category" porque
// Google cambió la taxonomía y esos nombres ya no existen como hojas válidas.
const META_GOOGLE_CATEGORY_DEFAULT = 'Vehicles & Parts > Vehicle Parts & Accessories';
const META_CAT_TO_GOOGLE = {
  'cat-fundas-asientos':         META_GOOGLE_CATEGORY_DEFAULT,
  'cat-cubre-autos':             META_GOOGLE_CATEGORY_DEFAULT,
  'cat-cubre-capots':            META_GOOGLE_CATEGORY_DEFAULT,
  'cat-cubre-trompas':           META_GOOGLE_CATEGORY_DEFAULT,
  'cat-cubre-motos':             META_GOOGLE_CATEGORY_DEFAULT,
  'cat-alfombras-termoformadas': META_GOOGLE_CATEGORY_DEFAULT,
  'cat-accesorios':              META_GOOGLE_CATEGORY_DEFAULT,
};

const META_CAT_TO_PRODUCT_TYPE = {
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

function metaPriceToNumber(p) {
  if (typeof p === 'number') return p;
  if (!p) return 0;
  return parseInt(String(p).replace(/[^\d]/g, ''), 10) || 0;
}

function metaAbsoluteImage(src, base) {
  if (!src) return null;
  if (src.startsWith('http://') || src.startsWith('https://')) return src;
  if (src.startsWith('/')) return base + src;
  return base + '/' + src;
}

function buildMetaItem(p, base) {
  const subtotal = metaPriceToNumber(p.price);
  const salePrice = metaPriceToNumber(p.salePrice);

  const validImages = (p.images || []).map(s => metaAbsoluteImage(s, base)).filter(Boolean);
  if (!validImages.length || subtotal <= 0) return null;

  const [mainImg, ...extraImgs] = validImages;
  const additionalImgs = extraImgs.slice(0, 9);

  const link = `${base}/producto/${p.id}`;
  const productType = META_CAT_TO_PRODUCT_TYPE[p.catId] || 'Accesorios automotrices';
  const googleCat = META_CAT_TO_GOOGLE[p.catId] || 'Vehicles & Parts > Vehicle Parts & Accessories';
  const metaId = p.id.slice(0, 100);

  const description = (p.desc && p.desc.trim().length > 10)
    ? p.desc
    : `${p.name}. Fabricados por MDRACING en Argentina hace 25 años. ${p.cat || ''}. A medida según marca y modelo. Envíos a todo el país. 10% OFF pagando con transferencia o efectivo.`;

  const lines = ['    <item>'];
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
  lines.push(`      <g:price>${subtotal} ${META_FEED_CURRENCY}</g:price>`);
  if (salePrice > 0 && salePrice < subtotal) {
    lines.push(`      <g:sale_price>${salePrice} ${META_FEED_CURRENCY}</g:sale_price>`);
  }
  lines.push(`      <g:brand>${escXml(META_FEED_BRAND)}</g:brand>`);
  lines.push(`      <g:google_product_category>${escXml(googleCat)}</g:google_product_category>`);
  lines.push(`      <g:product_type>${escXml(productType)}</g:product_type>`);
  lines.push(`      <g:identifier_exists>no</g:identifier_exists>`);
  // NO incluir <g:item_group_id> con catId — agrupaba a todos los productos
  // de la misma categoría como variantes del mismo "producto" en Commerce
  // Manager. Cada producto es independiente. Si en el futuro queremos
  // exponer colorVariants como variantes reales, hay que emitir un <item>
  // por variante con el mismo item_group_id (= p.id).
  lines.push('    </item>');
  return lines.join('\n');
}

function generateMetaFeedXml(products) {
  const base = 'https://www.mdracingfundas.com';
  const eligible = products.filter(p => p.metaFeedEligible !== false);
  const items = eligible.map(p => buildMetaItem(p, base)).filter(Boolean).join('\n');

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">\n` +
    `  <channel>\n` +
    `    <title>${escXml(META_FEED_BRAND)} — Catálogo</title>\n` +
    `    <link>${base}</link>\n` +
    `    <description>Fundas para asientos, cubre autos antigranizo, cubre capots y accesorios automotrices premium. Fábrica directa hace 25 años.</description>\n` +
    `${items}\n` +
    `  </channel>\n` +
    `</rss>\n`;

  fs.writeFileSync(path.join(ROOT, 'meta-feed.xml'), xml, 'utf8');
  const itemCount = (xml.match(/<item>/g) || []).length;
  console.log(`[prerender] meta-feed.xml escrito con ${itemCount} productos (${Math.round(xml.length / 1024)} KB)`);
}

/**
 * Limpia el HTML del template para que sea reutilizable.
 * Como index.html guarda la home pre-renderizada, al regenerar tenemos que
 * vaciar el <main id="app">, remover el marker viejo y cualquier JSON-LD de
 * producto que haya quedado de un build previo. Esto hace el script idempotente.
 */
function normalizeTemplate(html) {
  // Vaciar el <main id="app"> (puede tener contenido pre-renderizado de un build previo)
  html = html.replace(/<main\s+id="app"[^>]*>[\s\S]*?<\/main>/i, '<main id="app"></main>');
  // Remover marker __PRERENDERED_PAGE viejo
  html = html.replace(/\s*<script>\s*window\.__PRERENDERED_PAGE\s*=\s*"[^"]*";?\s*<\/script>/g, '');
  // Remover Product JSON-LD viejo
  html = html.replace(/\s*<script[^>]*id="product-jsonld"[^>]*>[\s\S]*?<\/script>/g, '');
  return html;
}

async function main() {
  console.log('[prerender] Cargando app.js en sandbox...');
  const sandbox = loadAppInSandbox();
  console.log(`[prerender] OK — ${sandbox.products.length} productos, ${sandbox.categories.length} categorías.`);

  const rawTemplate = fs.readFileSync(INDEX_HTML_PATH, 'utf8');
  const templateHtml = normalizeTemplate(rawTemplate);

  // ═══════════════════════════════════════════════════════════════
  // EXPORTAR data/products.json + data/categories.json (Meta CAPI / feed XML)
  // ═══════════════════════════════════════════════════════════════
  // Estos archivos los consumen los endpoints serverless (/api/meta-feed.xml,
  // /api/meta/event, etc.) para evitar tener que reparsear app.js en runtime.
  // Se regeneran en cada deploy via hook vercel-build.
  const DATA_DIR = path.join(ROOT, 'data');
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

  // Sanitizar productos para JSON (sin SVGs gigantes, sin redundancia)
  const productsForJson = sandbox.products.map(p => ({
    id: p.id,
    name: p.name,
    cat: p.cat,
    catId: p.catId,
    badge: p.badge || null,
    price: p.price,
    salePrice: p.salePrice || null,
    desc: p.desc || '',
    images: Array.isArray(p.images) ? p.images : [],
    colors: Array.isArray(p.colors) ? p.colors : [],
    colorVariants: Array.isArray(p.colorVariants)
      ? p.colorVariants.map(v => ({ hex: v.hex, name: v.name, images: v.images || [] }))
      : [],
    metaFeedEligible: p.metaFeedEligible !== false, // por default todos elegibles
  }));
  fs.writeFileSync(
    path.join(DATA_DIR, 'products.json'),
    JSON.stringify(productsForJson, null, 2),
    'utf8'
  );

  const categoriesForJson = sandbox.categories.map(c => ({
    id: c.id,
    title: c.title,
    cat: c.cat,
    desc: c.desc,
    page: c.page,
    hotsaleOnly: !!c.hotsaleOnly,
  }));
  fs.writeFileSync(
    path.join(DATA_DIR, 'categories.json'),
    JSON.stringify(categoriesForJson, null, 2),
    'utf8'
  );

  console.log(`[prerender] data/ exportado: ${productsForJson.length} productos, ${categoriesForJson.length} categorías`);

  // ═══════════════════════════════════════════════════════════════
  // META FEED XML — generado como archivo estático (no serverless function)
  // ═══════════════════════════════════════════════════════════════
  // Servido en https://www.mdracingfundas.com/meta-feed.xml directo desde CDN.
  // Meta lo refetchea según el schedule configurado en Commerce Manager.
  generateMetaFeedXml(productsForJson);

  const routes = [];

  // Páginas estáticas
  for (const page of Object.keys(STATIC_SEO)) {
    routes.push({ pageId: page });
  }

  // Categorías
  for (const cat of sandbox.categories) {
    if (cat.hotsaleOnly && !sandbox.HOT_SALE_ACTIVE) continue;
    routes.push({ pageId: cat.id });
  }

  // Productos
  for (const p of sandbox.products) {
    routes.push({ pageId: 'product-' + p.id });
  }

  console.log(`[prerender] Generando ${routes.length} páginas...`);

  let okCount = 0, errCount = 0;
  const generatedRoutes = [];

  for (const r of routes) {
    try {
      const seo = seoForPage(r.pageId, sandbox);
      if (!seo) { errCount++; continue; }

      // Llamar a la render function correspondiente
      let appHtml = '';
      if (r.pageId === 'home') {
        appHtml = sandbox.renderHome();
      } else if (r.pageId === 'categorias') {
        appHtml = sandbox.renderCategoriesPage();
      } else if (r.pageId.startsWith('cat-')) {
        appHtml = sandbox.renderCategoryPage(r.pageId);
      } else if (r.pageId.startsWith('product-')) {
        appHtml = sandbox.renderProductPage(r.pageId);
      } else if (r.pageId === 'quienes-somos') {
        appHtml = sandbox.renderAboutPage();
      } else if (r.pageId === 'como-comprar') {
        appHtml = sandbox.renderHowToBuyPage();
      } else if (r.pageId === 'preguntas-frecuentes') {
        appHtml = sandbox.renderFaqPage();
      } else if (r.pageId === 'cambios-devoluciones') {
        appHtml = sandbox.renderReturnsPage();
      } else if (r.pageId === 'terminos-y-condiciones') {
        appHtml = sandbox.renderTermsPage();
      } else if (r.pageId === 'politica-privacidad') {
        appHtml = sandbox.renderPrivacyPage();
      } else if (r.pageId === 'contacto') {
        appHtml = sandbox.renderContactPage();
      }

      if (!appHtml) throw new Error('renderer devolvió vacío');

      const finalHtml = buildPageHtml(templateHtml, seo, appHtml, { pageId: r.pageId, sandbox });

      // Determinar path de salida
      let outPath;
      if (r.pageId === 'home') {
        outPath = path.join(ROOT, 'index.html');
      } else if (r.pageId.startsWith('product-')) {
        const slug = r.pageId.slice('product-'.length);
        const dir = path.join(ROOT, 'producto');
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        outPath = path.join(dir, slug + '.html');
      } else {
        // Categorías y estáticas: usar pageToPath y reemplazar / final
        const route = sandbox.pageToPath(r.pageId); // ej "/cubre-autos"
        const slug = route.slice(1); // ej "cubre-autos"
        outPath = path.join(ROOT, slug + '.html');
      }

      fs.writeFileSync(outPath, finalHtml, 'utf8');
      generatedRoutes.push({ pageId: r.pageId, path: seo.path, file: path.relative(ROOT, outPath) });
      okCount++;
    } catch (e) {
      console.error(`[prerender] Error en ${r.pageId}:`, e.message);
      errCount++;
    }
  }

  console.log(`[prerender] Listo. ${okCount} OK, ${errCount} errores.`);

  // ═══ Generar sitemap.xml ═══
  const today = new Date().toISOString().slice(0, 10);
  const sitemapEntries = generatedRoutes.map(r => {
    let priority = '0.5';
    let changefreq = 'monthly';
    if (r.pageId === 'home') { priority = '1.0'; changefreq = 'weekly'; }
    else if (r.pageId.startsWith('cat-')) { priority = '0.9'; changefreq = 'weekly'; }
    else if (r.pageId === 'categorias') { priority = '0.9'; changefreq = 'weekly'; }
    else if (r.pageId.startsWith('product-')) { priority = '0.8'; changefreq = 'weekly'; }
    else if (r.pageId === 'quienes-somos' || r.pageId === 'como-comprar') { priority = '0.7'; }
    return `  <url>
    <loc>${SITE_BASE}${r.path === '/' ? '/' : r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  }).join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries}
</urlset>
`;
  fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), sitemap, 'utf8');
  console.log(`[prerender] sitemap.xml escrito con ${generatedRoutes.length} URLs.`);
}

main().catch(err => { console.error(err); process.exit(1); });
