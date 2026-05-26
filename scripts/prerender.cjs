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

function seoForPage(page, sandbox) {
  // Productos
  if (page.startsWith('product-')) {
    const id = page.slice('product-'.length);
    const p = sandbox.products.find(pp => pp.id === id);
    if (!p) return null;
    const offer = p.salePrice ? ` — Oferta $${p.salePrice}` : '';
    const title = `${p.name} — $${p.price}${offer} | MDRACING`;
    const description = (p.desc || `${p.name} fabricado por MDRACING. Calidad premium, envíos a todo el país.`).slice(0, 158);
    let image = SITE_BASE + '/og-image.jpg';
    if (p.images && p.images[0]) {
      image = p.images[0].startsWith('http') ? p.images[0] : SITE_BASE + '/' + p.images[0];
    }
    return { title, description, image, path: '/producto/' + id, product: p };
  }

  // Categorías
  if (page.startsWith('cat-')) {
    const cat = sandbox.categories.find(c => c.id === page);
    if (cat) {
      const cleanTitle = cat.title.replace('\n', ' ');
      return {
        title: `${cleanTitle} para tu Vehículo | MDRACING`,
        description: `${cat.desc} Fabricantes directos con más de 25 años. Envíos a todo el país y retiro en Munro.`,
        image: SITE_BASE + '/og-image.jpg',
        path: sandbox.pageToPath(page),
      };
    }
  }

  // Páginas estáticas
  const s = STATIC_SEO[page];
  if (s) return { ...s, image: SITE_BASE + '/og-image.jpg' };

  // Fallback
  return {
    title: 'MDRACING — Fundas, Cubre Autos y Accesorios',
    description: 'Fabricantes de accesorios automotrices premium con más de 25 años de trayectoria.',
    image: SITE_BASE + '/og-image.jpg',
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

function productJsonLd(p) {
  const priceNum = String(p.salePrice || p.price || '0').replace(/\./g, '');
  const imageUrl = (p.images && p.images[0])
    ? (p.images[0].startsWith('http') ? p.images[0] : SITE_BASE + '/' + p.images[0])
    : (SITE_BASE + '/og-image.jpg');
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': p.name,
    'description': p.desc || p.name,
    'image': imageUrl,
    'brand': { '@type': 'Brand', 'name': 'MDRACING' },
    'offers': {
      '@type': 'Offer',
      'url': SITE_BASE + '/producto/' + p.id,
      'priceCurrency': 'ARS',
      'price': priceNum,
      'availability': 'https://schema.org/InStock',
      'seller': { '@type': 'Organization', 'name': 'MDRACING' },
    },
  };
  return `<script type="application/ld+json" id="product-jsonld">${JSON.stringify(data)}</script>`;
}

function buildPageHtml(templateHtml, seo, renderedAppHtml, opts) {
  const url = SITE_BASE + seo.path;
  let html = templateHtml;

  // <title>
  html = html.replace(
    /<title>[\s\S]*?<\/title>/,
    `<title>${escHtml(seo.title)}</title>`
  );

  // <meta name="description">
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="description" content="${escAttr(seo.description)}" />`
  );

  // <link rel="canonical">
  html = html.replace(
    /<link\s+rel="canonical"[^>]*\/?>/i,
    `<link rel="canonical" href="${escAttr(url)}" id="canonical-link" />`
  );

  // Open Graph
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

  // Twitter
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

  // Product JSON-LD: insertar antes del </head> si es producto
  if (seo.product) {
    const jsonLd = productJsonLd(seo.product);
    html = html.replace('</head>', `  ${jsonLd}\n</head>`);
  }

  // Marca pre-render: el JS lo lee y skipea el render inicial
  const marker = `<script>window.__PRERENDERED_PAGE = "${escAttr(opts.pageId)}";</script>`;
  html = html.replace('</head>', `  ${marker}\n</head>`);

  // Inyectar el contenido renderizado dentro del <main id="app">
  html = html.replace(
    /<main\s+id="app"[^>]*><\/main>/i,
    `<main id="app">${renderedAppHtml}</main>`
  );

  return html;
}

// ═══════════════════════════════════════════════════════════════
// 5) SCRIPT PRINCIPAL
// ═══════════════════════════════════════════════════════════════

async function main() {
  console.log('[prerender] Cargando app.js en sandbox...');
  const sandbox = loadAppInSandbox();
  console.log(`[prerender] OK — ${sandbox.products.length} productos, ${sandbox.categories.length} categorías.`);

  const templateHtml = fs.readFileSync(INDEX_HTML_PATH, 'utf8');

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

      const finalHtml = buildPageHtml(templateHtml, seo, appHtml, { pageId: r.pageId });

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
