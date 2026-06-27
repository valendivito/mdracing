/* ═══════════════════════════════════════════════════════════
   MDRACING · App Router & Page Renderer
   ═══════════════════════════════════════════════════════════ */

'use strict';

// ── WA Number ──
const WA = 'https://wa.me/5491154907774';
const WA_MSG = (txt) => `${WA}?text=${encodeURIComponent(txt)}`;

// ── Social & Company Data ──
const SOCIAL = {
  instagram: 'https://www.instagram.com/mdracingfundas/',
  instagramHandle: '@mdracingfundas',
  tiktok: 'https://www.tiktok.com/@mdracingfundas',
  tiktokHandle: '@mdracingfundas',
  youtube: 'https://www.youtube.com/@mdracingfundas',
  youtubeHandle: '@mdracingfundas',
  mercadolibre: 'https://www.mercadolibre.com.ar/pagina/mdracing#from=share_eshop',
  whatsappPhone: '+54 9 11 5490-7774',
  email: 'mdracingdv@gmail.com',
};

const COMPANY = {
  foundedYear: 2000,
  yearsActive: 25,
  city: 'Villa Ballester',
  district: 'San Martín',
  province: 'Provincia de Buenos Aires',
  region: 'GBA',
  hoursWeek: 'Lun a Vie · 8 a 16hs',
  hoursSat: 'Sábados y domingos · Cerrado',
  warranty: '30 días por fallas de fábrica',
  couriers: ['Correo Argentino', 'Andreani', 'OCA'],
  localCity: 'Villa Ballester',
  localAddress: 'Paraná 2185',
  localDistrict: 'San Martín',
  localMapsUrl: 'https://maps.app.goo.gl/oXSoMeZW8n5ajPVk8',
};

// ── SVGs & Icons ──
const icons = {
  arrowRight: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/></svg>`,
  check: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="20,6 9,17 4,12"/></svg>`,
  star: `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>`,
  shield: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  truck: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="1" y="3" width="15" height="13"/><polygon points="16,8 20,8 23,11 23,16 16,16 16,8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`,
  factory: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 20V9l6-4v4l6-4v4l6-4v15H2z"/></svg>`,
  phone: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>`,
  tag: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>`,
  award: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="7"/><polyline points="8.21,13.89 7,23 12,20 17,23 15.79,13.88"/></svg>`,
  tool: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>`,
  heart: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>`,
  package: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27,6.96 12,12.01 20.73,6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`,
  refresh: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polyline points="23,4 23,10 17,10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>`,
  waIcon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`,
  chevDown: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="6,9 12,15 18,9"/></svg>`,
  chevLeft: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15,18 9,12 15,6"/></svg>`,
  chevRight: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9,18 15,12 9,6"/></svg>`,
  x: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
  instagram: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`,
  tiktok: `<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005.8 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1.84-.1z"/></svg>`,
  youtube: `<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0 -3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
  mercadolibre: `<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.25l-3-3 1.06-1.06L11 14.13l4.94-4.94L17 10.25l-6 6z"/></svg>`,
  pin: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  quote: `<svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" opacity=".8"><path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z"/></svg>`,
  bot: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="8" width="16" height="12" rx="3"/><path d="M12 4v4"/><circle cx="12" cy="3" r="1.2" fill="currentColor" stroke="none"/><circle cx="9" cy="14" r="1.3" fill="currentColor" stroke="none"/><circle cx="15" cy="14" r="1.3" fill="currentColor" stroke="none"/><path d="M9 17.5h6"/><line x1="2" y1="13" x2="4" y2="13"/><line x1="20" y1="13" x2="22" y2="13"/></svg>`,
  cart: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1.5"/><circle cx="18" cy="21" r="1.5"/><path d="M3 3h2.5l2.7 13a2 2 0 002 1.6h8.6a2 2 0 002-1.5l1.6-8.1H6"/></svg>`,
  trash: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a2 2 0 012-2h2a2 2 0 012 2v2"/></svg>`,
  plus: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
};

// ═══════════════════════════════════════════════════════════
// META TRACKING · Pixel (browser) + CAPI (server) deduplicado
// ═══════════════════════════════════════════════════════════
//
// trackEvent() dispara un evento al Pixel client-side Y al endpoint
// /api/meta/event server-side con el MISMO event_id, para que Meta
// deduplique y solo cuente el evento UNA vez.
//
// Beneficio: recuperar el ~30-50% de eventos perdidos por iOS / ad
// blockers / Safari ITP. Mejor atribución y mejor optimización de
// las campañas pagas.
//
// Si el pixel no está cargado (network bloqueado) o si /api/meta/event
// falla, NUNCA debe romper el flujo del usuario. Fail-soft.

function _mdReadCookie(name) {
  if (typeof document === 'undefined') return null;
  const m = document.cookie.match(new RegExp('(?:^|;\\s*)' + name + '=([^;]+)'));
  return m ? decodeURIComponent(m[1]) : null;
}

function _mdGenEventId(eventName) {
  return `${eventName}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * Dispara un evento Meta (Pixel + CAPI) deduplicado.
 *
 * @param {string} eventName - 'ViewContent' | 'AddToCart' | 'InitiateCheckout' | 'Purchase' | 'Lead' | 'PageView' | ...
 * @param {object} customData - { value, currency, content_ids, content_type, num_items, order_id, content_name }
 * @param {object} userData - opcional, PII para mejor Event Match Quality { email, phone, firstName, lastName }
 * @returns {string} event_id (útil si después querés referenciarlo desde otro lado)
 */
function trackEvent(eventName, customData = {}, userData = {}) {
  const eventId = _mdGenEventId(eventName);

  // 1) Pixel client-side (con eventID explícito para dedup)
  try {
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      window.fbq('track', eventName, customData, { eventID: eventId });
    }
  } catch (e) {
    // silenciar errores del pixel para no romper flujo
  }

  // 2) CAPI server-side (no esperamos respuesta, fire-and-forget con keepalive)
  try {
    const payload = {
      event_name: eventName,
      event_id: eventId,
      event_source_url: window.location.href,
      user_data: {
        ...userData,
        fbp: _mdReadCookie('_fbp'),
        fbc: _mdReadCookie('_fbc'),
      },
      custom_data: customData,
    };
    // keepalive: true → el request sobrevive si el usuario navega/cierra pestaña
    fetch('/api/meta/event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {});
  } catch (e) {
    // silenciar
  }

  return eventId;
}

// Exponer para uso desde otros scripts (chat-widget, checkout)
if (typeof window !== 'undefined') {
  window.mdTrackEvent = trackEvent;
}

// ═══════════════════════════════════════════════════════════
// ROUTING · URLs reales (no hash) para SEO
// ═══════════════════════════════════════════════════════════
//
// Mapping bidireccional entre la "page id" interna (string usado por
// renderPage / navigate) y la URL pública limpia que ve Google y el usuario.
//
// Convenciones:
//   - "/" siempre = home
//   - Categorías: /<slug-categoria>  (sin prefijo /categoria/)
//   - Productos:  /producto/<slug-producto>
//   - Páginas estáticas: /<slug-pagina>
//
// Si agregás una nueva ruta estática, sumala acá Y al sitemap.
// Las categorías y productos se descubren automáticamente del catálogo.

const ROUTE_TO_PAGE = {
  '/':                          'home',
  '/categorias':                'categorias',
  '/marcas':                    'marcas',
  '/cubre-autos':               'cat-cubre-autos',
  '/fundas-asientos':           'cat-fundas-asientos',
  '/cubre-capots':              'cat-cubre-capots',
  '/cubre-trompas':             'cat-cubre-trompas',
  '/cubre-motos':               'cat-cubre-motos',
  '/alfombras-termoformadas':   'cat-alfombras-termoformadas',
  '/accesorios':                'cat-accesorios',
  '/hot-sale':                  'cat-hot-sale',
  '/quienes-somos':             'quienes-somos',
  '/como-comprar':              'como-comprar',
  '/preguntas-frecuentes':      'preguntas-frecuentes',
  '/cambios-devoluciones':      'cambios-devoluciones',
  '/terminos-y-condiciones':    'terminos-y-condiciones',
  '/politica-privacidad':       'politica-privacidad',
  '/contacto':                  'contacto',
};

const PAGE_TO_ROUTE = Object.fromEntries(
  Object.entries(ROUTE_TO_PAGE).map(([path, page]) => [page, path])
);

/** Convierte una page id interna ('cat-cubre-autos', 'product-vw-tera-xxx', 'brand-toyota') a ruta pública. */
function pageToPath(page) {
  if (!page) return '/';
  if (page.startsWith('product-')) {
    return '/producto/' + page.slice('product-'.length);
  }
  if (page.startsWith('brand-')) {
    return '/marcas/' + page.slice('brand-'.length);
  }
  return PAGE_TO_ROUTE[page] || '/';
}

/** Convierte una URL ('/cubre-autos', '/producto/xxx', '/marcas/toyota') a page id interna. */
function pathToPage(pathname) {
  if (!pathname) return 'home';
  // Normalizar: quitar trailing slash (excepto root) y trailing index.html
  if (pathname.length > 1 && pathname.endsWith('/')) pathname = pathname.slice(0, -1);
  if (pathname.endsWith('/index.html')) pathname = pathname.slice(0, -('/index.html'.length)) || '/';

  if (pathname.startsWith('/marcas/')) {
    const slug = pathname.slice('/marcas/'.length);
    return slug ? 'brand-' + slug : null;
  }
  if (pathname.startsWith('/producto/')) {
    const slug = pathname.slice('/producto/'.length);
    return slug ? 'product-' + slug : null;
  }
  return ROUTE_TO_PAGE[pathname] || null;
}

// ── Color name map ──
const COLOR_NAMES = {
  '#1a1a1a': 'Negro',
  '#0a0a0a': 'Negro',
  '#888888': 'Gris',
  '#5a5a5a': 'Gris Oscuro',
  '#1a2a5a': 'Azul',
  '#8B0000': 'Bordo',
  '#c46080': 'Rosa',
  '#e8e6e0': 'Beige',
  '#2d8a4e': 'Verde',
};

// ── Car SVG (used throughout) ──
const carSvg = `<svg viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg" class="hero-car-svg">
  <g opacity="0.9">
    <rect x="40" y="90" width="320" height="70" rx="12" fill="#1e1e1e" stroke="#333" stroke-width="1.5"/>
    <path d="M80 90 C90 60, 130 45, 160 43 L240 43 C270 43, 310 58, 320 90Z" fill="#252525" stroke="#3a3a3a" stroke-width="1.5"/>
    <ellipse cx="110" cy="168" rx="32" ry="22" fill="#111" stroke="#444" stroke-width="2"/>
    <ellipse cx="110" cy="168" rx="20" ry="14" fill="#0a0a0a" stroke="#d10000" stroke-width="1.5"/>
    <ellipse cx="290" cy="168" rx="32" ry="22" fill="#111" stroke="#444" stroke-width="2"/>
    <ellipse cx="290" cy="168" rx="20" ry="14" fill="#0a0a0a" stroke="#d10000" stroke-width="1.5"/>
    <rect x="55" y="120" width="50" height="4" rx="2" fill="#d10000" opacity="0.6"/>
    <rect x="295" y="120" width="50" height="4" rx="2" fill="#d10000" opacity="0.9"/>
    <path d="M100 65 L160 50 L240 50 L300 65" stroke="#d10000" stroke-width="1" opacity="0.3"/>
    <rect x="42" y="108" width="24" height="14" rx="4" fill="#e5e5e5" opacity="0.15"/>
    <rect x="334" y="108" width="24" height="14" rx="4" fill="#ff4444" opacity="0.6"/>
  </g>
</svg>`;

// ── Seat SVG ──
const seatSvg = `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
  <rect x="40" y="20" width="120" height="100" rx="16" fill="#1e1e1e" stroke="#d10000" stroke-width="1.5"/>
  <rect x="50" y="130" width="100" height="50" rx="12" fill="#252525" stroke="#333" stroke-width="1.5"/>
  <line x1="60" y1="40" x2="140" y2="40" stroke="#333" stroke-width="1"/>
  <line x1="60" y1="55" x2="140" y2="55" stroke="#333" stroke-width="1"/>
  <path d="M50 120 C50 120, 60 135, 100 135 C140 135, 150 120, 150 120" stroke="#d10000" stroke-width="1.5" fill="none"/>
</svg>`;

// ── Cover SVG ──
const coverSvg = `<svg viewBox="0 0 200 180" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
  <path d="M20 80 C20 40, 40 20, 100 20 C160 20, 180 40, 180 80 L180 140 C180 155, 170 165, 100 165 C30 165, 20 155, 20 140 Z" fill="#1a1a1a" stroke="#d10000" stroke-width="1.5"/>
  <path d="M100 20 L100 165" stroke="#333" stroke-width="1" stroke-dasharray="4,4"/>
  <ellipse cx="100" cy="40" rx="40" ry="10" fill="#252525" stroke="#3a3a3a" stroke-width="1"/>
</svg>`;

// ── Moto SVG ──
const motoSvg = `<svg viewBox="0 0 200 180" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
  <ellipse cx="60" cy="130" rx="34" ry="34" fill="#111" stroke="#d10000" stroke-width="1.5"/>
  <ellipse cx="60" cy="130" rx="22" ry="22" fill="#0a0a0a" stroke="#333" stroke-width="1"/>
  <ellipse cx="148" cy="130" rx="34" ry="34" fill="#111" stroke="#d10000" stroke-width="1.5"/>
  <ellipse cx="148" cy="130" rx="22" ry="22" fill="#0a0a0a" stroke="#333" stroke-width="1"/>
  <path d="M60 130 L100 80 L140 75 L148 130" stroke="#252525" stroke-width="12" stroke-linecap="round" fill="none"/>
  <path d="M60 130 L100 80 L140 75 L148 130" stroke="#3a3a3a" stroke-width="8" stroke-linecap="round" fill="none"/>
  <path d="M95 80 L120 55 L145 60" stroke="#d10000" stroke-width="2" stroke-linecap="round"/>
</svg>`;

// ── Capot SVG ──
const capotSvg = `<svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
  <path d="M20 110 C20 80, 40 50, 100 40 C160 50, 180 80, 180 110 L175 120 L25 120 Z" fill="#1a1a1a" stroke="#d10000" stroke-width="1.5"/>
  <path d="M40 120 L30 140 L170 140 L160 120" fill="#252525" stroke="#333" stroke-width="1"/>
  <path d="M50 95 C70 70, 130 70, 150 95" stroke="#333" stroke-width="1" fill="none"/>
  <line x1="100" y1="40" x2="100" y2="120" stroke="#d10000" stroke-width="1" opacity="0.3"/>
</svg>`;

// ── Accessory SVG ──
const accesorioSvg = `<svg viewBox="0 0 200 180" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
  <rect x="30" y="30" width="60" height="60" rx="8" fill="#1e1e1e" stroke="#d10000" stroke-width="1.5"/>
  <rect x="110" y="30" width="60" height="60" rx="8" fill="#1e1e1e" stroke="#333" stroke-width="1.5"/>
  <rect x="30" y="110" width="60" height="60" rx="8" fill="#1e1e1e" stroke="#333" stroke-width="1.5"/>
  <rect x="110" y="110" width="60" height="60" rx="8" fill="#1e1e1e" stroke="#d10000" stroke-width="1.5"/>
  <circle cx="60" cy="60" r="16" fill="#252525" stroke="#d10000" stroke-width="1.5"/>
  <circle cx="140" cy="60" r="16" fill="#252525" stroke="#333" stroke-width="1"/>
  <circle cx="60" cy="140" r="16" fill="#252525" stroke="#333" stroke-width="1"/>
  <circle cx="140" cy="140" r="16" fill="#252525" stroke="#d10000" stroke-width="1.5"/>
</svg>`;

// ── Trompa SVG ──
const trompaSvg = `<svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
  <path d="M180 80 C180 40, 160 25, 100 20 L30 25 L20 80 L30 135 L100 140 C160 135, 180 120, 180 80 Z" fill="#1a1a1a" stroke="#d10000" stroke-width="1.5"/>
  <rect x="30" y="55" width="50" height="25" rx="6" fill="#111" stroke="#333" stroke-width="1"/>
  <rect x="30" y="95" width="50" height="25" rx="6" fill="#111" stroke="#333" stroke-width="1"/>
  <circle cx="160" cy="80" r="18" fill="#0a0a0a" stroke="#d10000" stroke-width="1.5"/>
  <path d="M80 30 L80 130" stroke="#333" stroke-width="1" stroke-dasharray="4,3"/>
</svg>`;

// ── Alfombra Termoformada SVG ──
const alfombraSvg = `<svg viewBox="0 0 200 180" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
  <path d="M30 40 C30 30, 40 25, 60 25 L140 25 C160 25, 170 30, 170 40 L172 150 C172 160, 162 165, 145 165 L55 165 C38 165, 28 160, 28 150 Z" fill="#1a1a1a" stroke="#d10000" stroke-width="1.5"/>
  <path d="M50 50 L150 50 L155 145 L45 145 Z" fill="#252525" stroke="#333" stroke-width="1"/>
  <path d="M55 60 L145 60" stroke="#3a3a3a" stroke-width="1"/>
  <path d="M55 75 L145 75" stroke="#3a3a3a" stroke-width="1"/>
  <path d="M55 90 L145 90" stroke="#3a3a3a" stroke-width="1"/>
  <path d="M55 105 L145 105" stroke="#3a3a3a" stroke-width="1"/>
  <path d="M55 120 L145 120" stroke="#3a3a3a" stroke-width="1"/>
  <circle cx="100" cy="38" r="6" fill="#d10000" opacity="0.6"/>
  <text x="100" y="135" text-anchor="middle" fill="#d10000" font-family="Arial" font-size="11" font-weight="bold" opacity="0.5">3D</text>
</svg>`;

// ── Hot Sale config ──
const HOTSALE_END = new Date('2026-05-21T00:00:00-03:00');
const HOT_SALE_ACTIVE = new Date() < HOTSALE_END;
const HOT_SALE_PRICES = HOT_SALE_ACTIVE ? {
  // Fundas para asientos
  'funda-para-asientos-vw-tera-cuero-automotor-acolchado-qj9az':            '179.999',
  'funda-para-asientos-vw-polo-track-eco-cuero-wpgw2':                      '118.999',
  'funda-cubre-asientos-vw-polo-track-eco-cuero-cubre-volante-plano-8asgz': '129.999',
  'funda-para-asientos-gol-trend-ecocuero5':                                '115.999',
  'funda-fiat-mobi-cuero-automotor':                                        '174.999',
  'funda-vw-polo-2018-cuero-automotor':                                     '177.999',
  'funda-toyota-hilux-cuerina-automotor-acolchada':                         '189.999',
  'funda-renault-sandero-tela-jakard-premium':                              '119.999',
  'funda-fiat-palio-tela-jakard-premium':                                   '119.999',
  'funda-jakard-premium-fiat-mobi-way':                                     '119.999',
  'funda-nissan-versa-jackard-premium4':                                    '129.999',
  'funda-para-asientos-renault-kwid-ecocuero2':                             '119.999',
  'funda-para-asientos-renault-duster-ecocuero5':                           '119.999',
  'funda-para-asientos-ford-ecosport-l-vieja-ecocuero5':                    '119.999',
  'funda-para-asientos-ford-ecosport-l-nueva-ecocuero5':                    '119.999',
  'funda-toyota-hilux-ecocuero-acolchada-og58b':                            '154.999',
  // Cubre autos / camionetas
  'funda-cubre-camioneta-antigranizo-3-capas-impermeable-toyota-hilux':     '129.999',
  'funda-cubre-camioneta-antigranizo-3-capas-impermeable-ford-ranger':      '129.999',
  'funda-cubre-camioneta-antigranizo-vw-amarok':                            '129.999',
  'funda-cubre-auto-vw-tera-2025-tela-silver':                               '85.999',
  'funda-cubre-auto-antigranizo-polo-track-3-capas':                        '104.999',
  'funda-cubre-auto-antigranizo-toyota-sw4-3-capas':                        '139.999',
  // Cubre capots
  'cubre-capot-vw-amarok-dm92h':                                            '69.999',
  'cubre-capot-vw-t-cross':                                                 '69.999',
  'cubre-capot-ford-fiesta-2011-a-2014':                                    '68.999',
  'cubre-capot-ford-ecosport-kinetic-2018':                                 '68.999',
  'cubre-capot-peugeot-208':                                                '64.999',
  'cubre-capot-peugeot-307-linea-vieja':                                    '64.999',
  'cubre-capot-fiat-toro-mdracing':                                         '64.999',
  // De la sección Hot Sale (para badge y categoría)
  'funda-cubre-auto-antigranizo-3-capas-impermeable':                       '110.000',
  'cubre-volante-base-plana-polo-gol-golf-vento-ksc3g':                     '14.000',
} : {};

const flameSvg = `<svg viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
  <path d="M40 4C40 4 14 32 14 56C14 72 22 82 22 82C22 82 18 70 25 60C29 53 36 53 36 53C36 53 28 70 36 78C39 82 40 92 40 92C40 92 47 83 47 72C47 64 43 60 43 60C43 60 56 66 56 80C56 87 51 94 51 94C60 89 66 79 66 65C66 42 52 18 40 4Z" fill="#ff2200" opacity="0.92"/>
  <path d="M40 26C40 26 27 44 27 58C27 67 33 75 40 75C47 75 53 67 53 58C53 46 46 32 40 26Z" fill="#ff8800" opacity="0.88"/>
  <path d="M40 52C40 52 34 58 34 65C34 69 36 73 40 73C44 73 46 69 46 65C46 58 40 52 40 52Z" fill="#ffe000" opacity="0.95"/>
</svg>`;

// ── Categories data ──
const categories = [
  { id: 'cat-hot-sale', tag: '🔥 HASTA EL 20/05', title: 'HOT\nSALE', cat: 'hot-sale', svg: flameSvg, desc: 'Precios que queman. Solo hasta el 20 de mayo.', page: 'cat-hot-sale', hotsaleOnly: true },
  { id: 'cat-cubre-autos', tag: 'Más Vendido', title: 'Cubre\nAutos', cat: 'cubre-autos', svg: coverSvg, desc: 'Antigranizo, lluvia, sol y polvo. Para todos los modelos.', page: 'cat-cubre-autos' },
  { id: 'cat-fundas-asientos', tag: 'Alta Demanda', title: 'Fundas\nAsientos', cat: 'fundas', svg: seatSvg, desc: 'A medida o universales. Eco cuero, tela premium, cuero automotor y más.', page: 'cat-fundas-asientos' },
  { id: 'cat-cubre-capots', tag: 'Premium', title: 'Cubre\nCapots', cat: 'cubre-capots', svg: capotSvg, desc: 'Protección afelpada contra granizo y rayones.', page: 'cat-cubre-capots' },
  { id: 'cat-cubre-trompas', tag: 'Performance', title: 'Cubre\nTrompas', cat: 'cubre-trompas', svg: trompaSvg, desc: 'Protección para el frente completo de tu vehículo.', page: 'cat-cubre-trompas' },
  { id: 'cat-cubre-motos', tag: 'Motos', title: 'Cubre\nMotos', cat: 'cubre-motos', svg: motoSvg, desc: 'Cobertura completa para motos y scooters.', page: 'cat-cubre-motos' },
  { id: 'cat-alfombras-termoformadas', tag: 'Nuevo', title: 'Alfombras\nTermoformadas', cat: 'alfombras-termoformadas', svg: alfombraSvg, desc: 'Alfombras 3D termoformadas con bordes elevados. Protección total del piso.', page: 'cat-alfombras-termoformadas' },
  { id: 'cat-accesorios', tag: 'Complementos', title: 'Accesorios', cat: 'accesorios', svg: accesorioSvg, desc: 'Todo lo que necesitás para proteger y personalizar.', page: 'cat-accesorios' },
];

// ═══════════════════════════════════════════════════════════
// MARCAS DE AUTO · páginas hub /marcas/<slug>
// ═══════════════════════════════════════════════════════════
//
// Cada marca tiene:
//   - slug (URL): /marcas/<slug>
//   - name: nombre comercial visible
//   - keywords: palabras a buscar en el nombre del producto para asignarlo
//                a esta marca. Coincidencia case-insensitive con word
//                boundary (\b...\b) para evitar falsos positivos (ej. "etios"
//                no debe matchear "ford ranger").
//
// Agregar una marca nueva = agregar 1 línea al array.
const carBrands = [
  { slug: 'toyota',        name: 'Toyota',        keywords: ['toyota', 'hilux', 'corolla', 'etios', 'yaris', 'sw4'] },
  { slug: 'volkswagen',    name: 'Volkswagen',    keywords: ['volkswagen', 'vw', 'amarok', 'polo', 'gol', 'vento', 'tera', 'virtus', 't-cross', 'tcross', 'nivus', 'suran', 'saveiro'] },
  { slug: 'ford',          name: 'Ford',          keywords: ['ford', 'ranger', 'ecosport', 'ka', 'fiesta', 'focus', 'territory', 'maverick'] },
  { slug: 'chevrolet',     name: 'Chevrolet',     keywords: ['chevrolet', 'onix', 'cruze', 's10', 'tracker', 'prisma', 'corsa', 'agile', 'spin', 'montana'] },
  { slug: 'fiat',          name: 'Fiat',          keywords: ['fiat', 'cronos', 'argo', 'toro', 'palio', 'siena', 'strada', 'uno', 'pulse', 'fastback', 'mobi'] },
  { slug: 'renault',       name: 'Renault',       keywords: ['renault', 'kwid', 'sandero', 'logan', 'duster', 'clio', 'kangoo', 'stepway', 'oroch', 'alaskan'] },
  { slug: 'peugeot',       name: 'Peugeot',       keywords: ['peugeot', '208', '2008', '308', '408', 'partner', 'expert'] },
  { slug: 'honda',         name: 'Honda',         keywords: ['honda', 'civic', 'cr-v', 'crv', 'fit', 'hr-v', 'hrv', 'wr-v'] },
  { slug: 'nissan',        name: 'Nissan',        keywords: ['nissan', 'frontier', 'kicks', 'versa', 'march', 'np300', 'np-300'] },
  { slug: 'citroen',       name: 'Citroën',       keywords: ['citroen', 'citroën', 'c3', 'c4', 'c5', 'berlingo'] },
  { slug: 'mitsubishi',    name: 'Mitsubishi',    keywords: ['mitsubishi', 'l200', 'outlander', 'asx', 'eclipse'] },
  { slug: 'bmw',           name: 'BMW',           keywords: ['bmw', 'serie 1', 'serie 3', 'serie 5', 'x1', 'x3', 'x5'] },
  { slug: 'mercedes-benz', name: 'Mercedes-Benz', keywords: ['mercedes', 'mercedes-benz', 'mercedes benz', 'clase a', 'clase b', 'clase c', 'sprinter', 'vito'] },
  { slug: 'jeep',          name: 'Jeep',          keywords: ['jeep', 'renegade', 'compass', 'wrangler', 'grand cherokee'] },
];

/** Devuelve la marca dado el slug, o null. */
function getCarBrand(slug) {
  return carBrands.find(b => b.slug === slug) || null;
}

/** Devuelve los productos compatibles con una marca dada (matcheo por nombre). */
function getProductsForBrand(brand) {
  if (!brand || !brand.keywords) return [];
  const patterns = brand.keywords.map(kw => {
    // Escapamos y permitimos guion/espacio dentro
    const esc = kw.toLowerCase().replace(/[-\s]+/g, '[- ]?').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp('\\b' + esc + '\\b', 'i');
  });
  return products.filter(p => {
    const haystack = (p.name || '').toLowerCase();
    return patterns.some(re => re.test(haystack));
  });
}

// ── Products data ──
const products = [
  // ─── FUNDAS PARA ASIENTOS ───────────────────────────────────────────────
  { id: 'funda-para-asientos-vw-tera-cuero-automotor-acolchado-qj9az', name: 'Funda VW Tera Cuero Automotor Acolchado 3mm', cat: 'Fundas para Asientos', catId: 'cat-fundas-asientos', badge: 'Premium', price: '210.000', salePrice: '189.999', colors: ['#1a1a1a','#888888'], svg: seatSvg, desc: 'Cuero automotor acolchado 3mm para VW Tera. Diseñada específicamente para este modelo, ajuste perfecto y máxima durabilidad.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/vw-tera-con-funda-cuer-aut-4fd92aa337037f508817637371680250-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/6bcf4a36-27a3-4bca-bc0f-9be1274cb0dd-1ab3f7771bee20ef5217637373652048-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/vw-tera-con-funda-cuer-aut-gris-eb2fec05ca4bfbc4dd17637386495801-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/c1d3400f-b126-4eb1-bf57-4f6e2dbf6b5f-a8a6c9f53655a82d3b17637372261628-1024-1024.webp'], colorVariants: [
    { hex: '#1a1a1a', name: 'Negro', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/vw-tera-con-funda-cuer-aut-4fd92aa337037f508817637371680250-1024-1024.webp','/images/asientos-delanteros-tera.png','/images/asientos-traseros-tera.png','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/c1d3400f-b126-4eb1-bf57-4f6e2dbf6b5f-a8a6c9f53655a82d3b17637372261628-1024-1024.webp'] },
    { hex: '#888888', name: 'Gris', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/vw-tera-con-funda-cuer-aut-gris-eb2fec05ca4bfbc4dd17637386495801-1024-1024.webp','/images/asientos-delanteros-tera.png','/images/asientos-traseros-tera.png'] },
  ] },
  { id: 'funda-para-asientos-vw-polo-track-eco-cuero-wpgw2', name: 'Funda VW Polo Track Ecocuero', cat: 'Fundas para Asientos', catId: 'cat-fundas-asientos', badge: null, price: '140.000', salePrice: '125.000', colors: ['#1a1a1a','#888888','#e8e6e0','#1a2a5a','#8B0000','#c46080'], svg: seatSvg, desc: 'Ecocuero para VW Polo Track. Juego completo con apoyacabezas, fácil limpieza y ajuste perfecto.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/polo-con-funda-negra-ecocuero-photoroom-58ee7e0f98592549a017634703261790-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/funda-polo-track-ecocuero-photoroom-74722d0d3727199a4d17634692658814-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/polo-con-funda-gris-ecocuero-photoroom-aef9e35904e01a6e7217634702096934-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/polo-con-funda-roja-ecocuero-photoroom-15eb0295d25197ea2417634702094470-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/polo-con-funda-rosa-ecocuero-photoroom-725c92e78d51f2824b17634702090585-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/polo-con-funda-blanca-ecocuero-photoroom-4e624359eb40a95c0517634702091593-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/polo-con-funda-azul-ecocuero-photoroom-e76353911986bc91b217634702095670-1024-1024.webp'], colorVariants: [
    { hex: '#1a1a1a', name: 'Negro', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/polo-con-funda-negra-ecocuero-photoroom-58ee7e0f98592549a017634703261790-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/funda-polo-track-ecocuero-photoroom-74722d0d3727199a4d17634692658814-1024-1024.webp'] },
    { hex: '#888888', name: 'Gris', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/polo-con-funda-gris-ecocuero-photoroom-aef9e35904e01a6e7217634702096934-1024-1024.webp'] },
    { hex: '#e8e6e0', name: 'Beige', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/polo-con-funda-blanca-ecocuero-photoroom-4e624359eb40a95c0517634702091593-1024-1024.webp'] },
    { hex: '#1a2a5a', name: 'Azul', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/polo-con-funda-azul-ecocuero-photoroom-e76353911986bc91b217634702095670-1024-1024.webp'] },
    { hex: '#8B0000', name: 'Bordo', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/polo-con-funda-roja-ecocuero-photoroom-15eb0295d25197ea2417634702094470-1024-1024.webp'] },
    { hex: '#c46080', name: 'Rosa', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/polo-con-funda-rosa-ecocuero-photoroom-725c92e78d51f2824b17634702090585-1024-1024.webp'] },
  ] },
  { id: 'funda-para-asientos-vw-polo-track-eco-cuero-acolchada-3mm-weji3', name: 'Funda VW Polo Track Ecocuero Acolchada 3mm', cat: 'Fundas para Asientos', catId: 'cat-fundas-asientos', badge: null, price: '170.000', salePrice: '150.000', colors: ['#1a1a1a','#888888'], svg: seatSvg, desc: 'Ecocuero acolchado 3mm para VW Polo Track. Mayor comodidad y protección, diseño específico.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/polo-con-funda-negra-ecocuero-photoroom-a07a3b1ca09f843bd817634710616802-1024-1024.webp'] },
  { id: 'funda-para-asientos-vw-t-cross-2025-cuero-automotor', name: 'Funda VW T-Cross 2025 Cuero Automotor', cat: 'Fundas para Asientos', catId: 'cat-fundas-asientos', badge: 'Premium', price: '210.000', salePrice: '189.999', colors: ['#1a1a1a'], svg: seatSvg, desc: 'Funda de cuero automotor para VW T-Cross 2025. Diseño específico para el modelo, costura reforzada y acabado premium.', images: ['images/fundas/tcross-cuero-portada.jpg','images/fundas/tcross-cuero-foto2.jpg','images/fundas/tcross-cuero-foto3.jpg'] },
  { id: 'funda-para-asientos-vw-polo-track-cuero-automotor-acolchado', name: 'Funda VW Polo Track Cuero Automotor Acolchado 3mm', cat: 'Fundas para Asientos', catId: 'cat-fundas-asientos', badge: 'Premium', price: '210.000', salePrice: '189.999', colors: ['#1a1a1a','#888888'], svg: seatSvg, desc: 'Cuero automotor acolchado 3mm para VW Polo Track. Diseño específico para el modelo, máxima calidad y durabilidad. Juego completo con apoyacabezas.', images: ['https://http2.mlstatic.com/D_NQ_NP_680092-MLA96388870828_102025-O.webp','https://http2.mlstatic.com/D_NQ_NP_723555-MLA96388655786_102025-O.webp','https://http2.mlstatic.com/D_NQ_NP_782550-MLA96838594883_102025-O.webp','https://http2.mlstatic.com/D_NQ_NP_746763-MLA96836813581_102025-O.webp','https://http2.mlstatic.com/D_NQ_NP_819121-MLA103753271871_012026-O.webp','https://http2.mlstatic.com/D_NQ_NP_893231-MLA96863882125_102025-O.webp'], colorVariants: [
    { hex: '#1a1a1a', name: 'Negro', images: ['https://http2.mlstatic.com/D_NQ_NP_680092-MLA96388870828_102025-O.webp','https://http2.mlstatic.com/D_NQ_NP_723555-MLA96388655786_102025-O.webp','https://http2.mlstatic.com/D_NQ_NP_782550-MLA96838594883_102025-O.webp'] },
    { hex: '#888888', name: 'Gris', images: ['https://http2.mlstatic.com/D_NQ_NP_746763-MLA96836813581_102025-O.webp','https://http2.mlstatic.com/D_NQ_NP_819121-MLA103753271871_012026-O.webp','https://http2.mlstatic.com/D_NQ_NP_893231-MLA96863882125_102025-O.webp'] },
  ] },
  { id: 'funda-cubre-asientos-vw-polo-track-eco-cuero-cubre-volante-plano-8asgz', name: 'Funda VW Polo Track + Cubre Volante Plano', cat: 'Fundas para Asientos', catId: 'cat-fundas-asientos', badge: null, price: '150.000', salePrice: '138.999', colors: ['#1a1a1a','#c8a87a'], svg: seatSvg, desc: 'Combo funda para VW Polo Track más cubre volante base plana. Disponible en Ecocuero (6 colores) o Tela Jakard Premium (5 diseños). Protección completa interior.', images: ['images/fundas/eco-portada.webp','images/fundas/jakard-portada.webp'], colorVariants: [
    { hex: '#1a1a1a', name: 'Ecocuero - Todos los colores', isMaterial: true, images: ['images/fundas/eco-portada.webp','images/fundas/eco-foto2.webp','images/fundas/eco-foto3.webp','images/fundas/eco-foto4.webp','images/fundas/eco-foto5.webp'], subColors: ['Negro','Gris','Rojo','Azul','Blanco','Rosa'] },
    { hex: '#c8a87a', name: 'Tela Premium Jakard - Todos los colores', isMaterial: true, images: ['images/fundas/jakard-portada.webp','images/fundas/jakard-foto2.webp','images/fundas/jakard-foto3.webp','images/fundas/jakard-foto4.webp','images/fundas/jakard-foto5.webp','images/fundas/jakard-foto6.webp','images/fundas/jakard-foto7.webp','images/fundas/jakard-foto8.webp','images/fundas/jakard-foto9.webp'], subColors: ['Negro Liso','Diseño Negro con Puntos','Diseño Cuadrados Grises','Diseño Detalles Azules','Diseño Detalles Rojos'] },
  ] },
  { id: 'funda-vw-polo-2018-cuero-automotor', name: 'Funda VW Polo 2018 Cuero Automotor', cat: 'Fundas para Asientos', catId: 'cat-fundas-asientos', badge: 'Premium', price: '210.000', colors: ['#1a1a1a'], svg: seatSvg, desc: 'Cuero automotor de alta calidad para VW Polo 2018. Ajuste perfecto, resistencia y elegancia garantizados.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/funda-ecoc-acolchado-polo-2018-photoroom-cc7df3d4c86bc430f217592434772918-1024-1024.webp'] },
  { id: 'funda-para-asientos-gol-trend-ecocuero5', name: 'Funda VW Gol Trend Ecocuero', cat: 'Fundas para Asientos', catId: 'cat-fundas-asientos', badge: null, price: '140.000', salePrice: '130.000', colors: ['#1a1a1a','#5a5a5a','#1a2a5a','#e8e6e0','#8B0000'], svg: seatSvg, desc: 'Ecocuero para VW Gol Trend. Juego completo con apoyacabezas, fácil de limpiar y montar.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5F2x%5F711213-mla92372485178%5F092025-b-b02514e10f7b873fdb17588067661933-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/funda-gol-trend-ecocuero-gris-729caacd16ac51899217588068858439-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/funda-gol-trend-ecocuero-azul-50d40e832e4b12495317588068792721-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/funda-gol-trend-ecocuero-blanca-2c739a3495c6c41e9317588068828051-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/funda-gol-trend-ecocuero-roja-9aad1959605a3fc35217588068895096-1024-1024.webp'], colorVariants: [
    { hex: '#1a1a1a', name: 'Negro', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5F2x%5F711213-mla92372485178%5F092025-b-b02514e10f7b873fdb17588067661933-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5F2x%5F881414-mla92778037055%5F092025-b-fad3d147bbb367df6117588068499493-1024-1024.webp'] },
    { hex: '#5a5a5a', name: 'Gris', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/funda-gol-trend-ecocuero-gris-729caacd16ac51899217588068858439-1024-1024.webp'] },
    { hex: '#1a2a5a', name: 'Azul', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/funda-gol-trend-ecocuero-azul-50d40e832e4b12495317588068792721-1024-1024.webp'] },
    { hex: '#e8e6e0', name: 'Beige', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/funda-gol-trend-ecocuero-blanca-2c739a3495c6c41e9317588068828051-1024-1024.webp'] },
    { hex: '#8B0000', name: 'Bordo', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/funda-gol-trend-ecocuero-roja-9aad1959605a3fc35217588068895096-1024-1024.webp'] },
  ] },
  { id: 'funda-renault-sandero-tela-jakard-premium', name: 'Funda Renault Sandero Tela Jakard Premium', cat: 'Fundas para Asientos', catId: 'cat-fundas-asientos', badge: null, price: '140.000', salePrice: '130.000', colors: ['#1a1a1a','#888888','#8B0000','#1a2a5a'], svg: seatSvg, desc: 'Tela Jakard premium para Renault Sandero. Resistente, estética y de fácil colocación.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/funda-jakard-sandero-negra-53e3e43eaf253ff92517588918978120-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/funda-jakard-sandero-gris-1-586f2f2f2ffbfd3f7717588912380219-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/funda-jakard-sandero-rojo-30e7b7d07762d4a1d417588919775668-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/funda-jakard-sandero-azul-ca1563f8319753719617588920526492-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/089b7121-5a7c-4a66-ac33-7354df301be2-89245f1f3249ddf30c17588139437675-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/5af1beae-c3ba-43b4-991e-8c2ad091c971-ddcf377236e2b3f6e117588139498677-1024-1024.webp'] },
  { id: 'funda-para-asientos-renault-kwid-ecocuero2', name: 'Funda Renault Kwid Ecocuero', cat: 'Fundas para Asientos', catId: 'cat-fundas-asientos', badge: null, price: '140.000', salePrice: '130.000', colors: ['#1a1a1a','#5a5a5a','#1a2a5a','#e8e6e0','#8B0000'], svg: seatSvg, desc: 'Ecocuero línea nueva para Renault Kwid. Juego completo con apoyacabezas.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/kwid-con-funda-asiento-ecocuero-negra-e9b9a5274a0a359ad417588075645682-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/kwid-con-funda-ecocuero-gris-photoroom-7989606f6f9d62a2b117588075728313-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/kwid-con-funda-ecocuero-azul-photoroom-e188abd6c297ec235217588075663704-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/kwid-con-funda-ecocuero-blanca-photoroom-a9733f252386bd820d17588075704062-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/kwid-con-funda-ecocuero-roja-photoroom-515598db9bb31578d917588075688523-1024-1024.webp'], colorVariants: [
    { hex: '#1a1a1a', name: 'Negro', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/kwid-con-funda-asiento-ecocuero-negra-e9b9a5274a0a359ad417588075645682-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/assets_task_01k59evwnqfwpaegd14xrbcp1m_1758033052_img_0-bfdae30a98438bf2ce17588074656053-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_881414-mla92778037055_092025-b-9f81c8fbae24f1b52b17588075283431-1024-1024.webp'] },
    { hex: '#5a5a5a', name: 'Gris', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/kwid-con-funda-ecocuero-gris-photoroom-7989606f6f9d62a2b117588075728313-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/assets_task_01k59eecgnect82j8h14x2ynkg_1758032608_img_0-9aba9da250ab09f99417588074702831-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_807314-mla92778666363_092025-b-0e0192190ee54eaeee17588075515935-1024-1024.webp'] },
    { hex: '#1a2a5a', name: 'Azul', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/kwid-con-funda-ecocuero-azul-photoroom-e188abd6c297ec235217588075663704-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/assets_task_01k59dekf7e59tb1qbpzy47zrf_1758031565_img_0-2907537494bf605b1c17588074745865-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_771846-mla92369371196_092025-b-603569afe711ddbee117588075361350-1024-1024.webp'] },
    { hex: '#e8e6e0', name: 'Beige', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/kwid-con-funda-ecocuero-blanca-photoroom-a9733f252386bd820d17588075704062-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/assets_task_01k59e20sefstvjvg41mks9a5d_1758032173_img_0-998fd0b49541913d6c17588074792242-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_926383-mla92777642263_092025-b-1b350d9b5b2bce02f817588075432612-1024-1024.webp'] },
    { hex: '#8B0000', name: 'Rojo', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/kwid-con-funda-ecocuero-roja-photoroom-515598db9bb31578d917588075688523-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/assets_task_01k59c89r8e4xa8xdfy3r2ek3e_1758030307_img_0-0cc86d807ca24ba43c17588074838852-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/assets_task_01k60g78nafce9zea6bjyvjwft_1758806224_img_1-1a9dd9975a6af66e6117588074878858-1024-1024.webp'] },
  ] },
  { id: 'funda-renault-kwid-tela-premium-jakard', name: 'Funda Renault Kwid Tela Jakard', cat: 'Fundas para Asientos', catId: 'cat-fundas-asientos', badge: null, price: '140.000', salePrice: '130.000', colors: ['#1a1a1a','#888888'], svg: seatSvg, desc: 'Tela Jakard premium para Renault Kwid. Disponible en varios colores. Instalación opcional en nuestra fábrica de Villa Ballester (Paraná 2185).', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5Fnp%5F805348-mla83092332128%5F032025-o-9d2f4220cbcd4d750d17594983510101-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/kwid-jakard-e335acd42e082350de17628702028322-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/20171115_183855-a7ca5466ac9b73d54617628707250855-1024-1024.webp'] },
  { id: 'funda-para-asientos-renault-duster-ecocuero5', name: 'Funda Renault Duster Ecocuero', cat: 'Fundas para Asientos', catId: 'cat-fundas-asientos', badge: null, price: '140.000', salePrice: '130.000', colors: ['#1a1a1a','#5a5a5a','#1a2a5a','#e8e6e0','#8B0000'], svg: seatSvg, desc: 'Ecocuero para Renault Duster. Juego completo con apoyacabezas, durabilidad y confort.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/funda-duster-ecocuero-negra-2cc655f24b26e6772f17588079591059-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/funda-duster-ecocuero-gris-36914b7968322f7a5517588079676299-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/funda-duster-ecocuero-azul-68908a49fa5c742e5917588079611763-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/funda-duster-ecocuero-blanca-ffadea1f1fda53d87d17588079636794-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/funda-duster-ecocuero-roja-a3b1a2116493a3ee5a17588079706510-1024-1024.webp'], colorVariants: [
    { hex: '#1a1a1a', name: 'Negro', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/funda-duster-ecocuero-negra-2cc655f24b26e6772f17588079591059-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/assets_task_01k59evwnqfwpaegd14xrbcp1m_1758033052_img_0-e8d8755b1008098c9d17588080483706-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_881414-mla92778037055_092025-b-afd34c2ee7aa302ec417588080964233-1024-1024.webp'] },
    { hex: '#5a5a5a', name: 'Gris', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/funda-duster-ecocuero-gris-36914b7968322f7a5517588079676299-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/assets_task_01k59eecgnect82j8h14x2ynkg_1758032608_img_0-4ac46d1beccb09c6c117588080690967-1024-1024.webp'] },
    { hex: '#1a2a5a', name: 'Azul', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/funda-duster-ecocuero-azul-68908a49fa5c742e5917588079611763-1024-1024.webp'] },
    { hex: '#e8e6e0', name: 'Beige', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/funda-duster-ecocuero-blanca-ffadea1f1fda53d87d17588079636794-1024-1024.webp'] },
    { hex: '#8B0000', name: 'Rojo', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/funda-duster-ecocuero-roja-a3b1a2116493a3ee5a17588079706510-1024-1024.webp'] },
  ] },
  { id: 'funda-renault-clio-jakard-premium', name: 'Funda Renault Clio Jakard Premium', cat: 'Fundas para Asientos', catId: 'cat-fundas-asientos', badge: null, price: '140.000', colors: ['#1a1a1a','#888888','#8B0000','#1a2a5a'], svg: seatSvg, desc: 'Tela Jakard premium para Renault Clio. También disponible para Sandero, Duster, Logan, Kangoo y más.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/download-5941146324cd03daeb17588989421287-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/download-9d90a87d66a1c74ea017588989567411-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/download-31f4f90b922b47dbb817588989669171-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/download-d936a83f9df01df5cb17588989848263-1024-1024.webp'] },
  { id: 'funda-cubre-asientos-partner-kangoo-2-cubrecintos-y-cubre-volante', name: 'Funda Partner/Kangoo + Cubrecintos + Cubre Volante', cat: 'Fundas para Asientos', catId: 'cat-fundas-asientos', badge: null, price: '140.000', colors: ['#1a1a1a','#888888'], svg: seatSvg, desc: 'Juego completo para Renault Partner/Kangoo en ecocuero con cubrecintos y cubre volante incluidos.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5F2x%5F916915-mla92673163700%5F092025-b-38ee9a5a2494e2b46217589006791055-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5F2x%5F687455-mla26000514088%5F092017-b-c4f0d26e729701192a17589007284710-1024-1024.webp'] },
  { id: 'funda-para-asientos-ford-ecosport-l-vieja-ecocuero5', name: 'Funda Ford EcoSport Línea Vieja Ecocuero', cat: 'Fundas para Asientos', catId: 'cat-fundas-asientos', badge: null, price: '140.000', colors: ['#1a1a1a','#5a5a5a','#e8e6e0','#1a2a5a','#8B0000'], svg: seatSvg, desc: 'Ecocuero para Ford EcoSport línea vieja. Juego completo con apoyacabezas, ajuste perfecto.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/download-12c83b0cb994a57a8d17588057999265-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/assets%5Ftask%5F01k59evwnqfwpaegd14xrbcp1m%5F1758033052%5Fimg%5F0-eaab6e1fb55399790b17588058134989-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5F2x%5F881414-mla92778037055%5F092025-b-7bb49b848f214230f417588058203959-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/assets%5Ftask%5F01k59eecgnect82j8h14x2ynkg%5F1758032608%5Fimg%5F0-f3d2b0ee9cac0802dc17588059748496-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5F2x%5F807314-mla92778666363%5F092025-b-9b51228ac7303a538417588059798600-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/assets%5Ftask%5F01k59dekf7e59tb1qbpzy47zrf%5F1758031565%5Fimg%5F0-ddfc3ab3f3bee77a8e17588058993370-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5F2x%5F771846-mla92369371196%5F092025-b-3a9cf13b01748550dc17588059334856-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/assets%5Ftask%5F01k59e20sefstvjvg41mks9a5d%5F1758032173%5Fimg%5F0-304ac5c83fa1625d3e17588059543053-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5F2x%5F926383-mla92777642263%5F092025-b-4c76ab5d8ee2eefad917588059620200-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/assets%5Ftask%5F01k59d4papfvc9dh486k0p71pd%5F1758031246%5Fimg%5F0-1a12a0c526f92e758117588060049324-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/assets%5Ftask%5F01k60g78nafce9zea6bjyvjwft%5F1758806224%5Fimg%5F1-fa9621270d3711b46417588064385858-1024-1024.webp'], colorVariants: [
    { hex: '#1a1a1a', name: 'Negro', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/download-12c83b0cb994a57a8d17588057999265-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/assets%5Ftask%5F01k59evwnqfwpaegd14xrbcp1m%5F1758033052%5Fimg%5F0-eaab6e1fb55399790b17588058134989-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5F2x%5F881414-mla92778037055%5F092025-b-7bb49b848f214230f417588058203959-1024-1024.webp'] },
    { hex: '#5a5a5a', name: 'Gris', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/assets%5Ftask%5F01k59eecgnect82j8h14x2ynkg%5F1758032608%5Fimg%5F0-f3d2b0ee9cac0802dc17588059748496-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5F2x%5F807314-mla92778666363%5F092025-b-9b51228ac7303a538417588059798600-1024-1024.webp'] },
    { hex: '#1a2a5a', name: 'Azul', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/assets%5Ftask%5F01k59dekf7e59tb1qbpzy47zrf%5F1758031565%5Fimg%5F0-ddfc3ab3f3bee77a8e17588058993370-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5F2x%5F771846-mla92369371196%5F092025-b-3a9cf13b01748550dc17588059334856-1024-1024.webp'] },
    { hex: '#e8e6e0', name: 'Beige', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/assets%5Ftask%5F01k59e20sefstvjvg41mks9a5d%5F1758032173%5Fimg%5F0-304ac5c83fa1625d3e17588059543053-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5F2x%5F926383-mla92777642263%5F092025-b-4c76ab5d8ee2eefad917588059620200-1024-1024.webp'] },
    { hex: '#8B0000', name: 'Rojo', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/assets%5Ftask%5F01k59d4papfvc9dh486k0p71pd%5F1758031246%5Fimg%5F0-1a12a0c526f92e758117588060049324-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/assets%5Ftask%5F01k60g78nafce9zea6bjyvjwft%5F1758806224%5Fimg%5F1-fa9621270d3711b46417588064385858-1024-1024.webp'] },
  ] },
  { id: 'funda-para-asientos-ford-ecosport-l-nueva-ecocuero5', name: 'Funda Ford EcoSport Línea Nueva Ecocuero', cat: 'Fundas para Asientos', catId: 'cat-fundas-asientos', badge: null, price: '140.000', colors: ['#1a1a1a','#5a5a5a','#1a2a5a','#e8e6e0','#8B0000'], svg: seatSvg, desc: 'Ecocuero para Ford EcoSport línea nueva. Diseño adaptado al interior moderno del vehículo.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/funda-ecosport-l-nueva-negra-c10d7cc742b5324ad017588087044235-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/funda-ecosport-l-nueva-gris-516bf5e24c9be23acb17588087042332-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/funda-ecosport-l-nueva-azul-47884bdd1c07ff00af17588087043597-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/funda-ecosport-l-nueva-blanca-9d300f9391facf337917588087041444-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/funda-ecosport-l-nueva-roja-bf3bdfdb246203fa3417588087044150-1024-1024.webp'], colorVariants: [
    { hex: '#1a1a1a', name: 'Negro', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/funda-ecosport-l-nueva-negra-c10d7cc742b5324ad017588087044235-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/assets%5Ftask%5F01k59evwnqfwpaegd14xrbcp1m%5F1758033052%5Fimg%5F0-796463c28707ac4f6817588087253527-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5F2x%5F881414-mla92778037055%5F092025-b-7f6c72de07474e965c17588087680418-1024-1024.webp'] },
    { hex: '#5a5a5a', name: 'Gris', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/funda-ecosport-l-nueva-gris-516bf5e24c9be23acb17588087042332-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/assets%5Ftask%5F01k59eecgnect82j8h14x2ynkg%5F1758032608%5Fimg%5F0-238f65344416a2212017588088133048-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5F2x%5F807314-mla92778666363%5F092025-b-59c22bd4337ea5855f17588087977893-1024-1024.webp'] },
    { hex: '#1a2a5a', name: 'Azul', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/funda-ecosport-l-nueva-azul-47884bdd1c07ff00af17588087043597-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/assets%5Ftask%5F01k59dekf7e59tb1qbpzy47zrf%5F1758031565%5Fimg%5F0-545ceb69dcb55e789917588088341744-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5F2x%5F771846-mla92369371196%5F092025-b-8fca90eb3ef386a46a17588088437633-1024-1024.webp'] },
    { hex: '#e8e6e0', name: 'Beige', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/funda-ecosport-l-nueva-blanca-9d300f9391facf337917588087041444-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/assets%5Ftask%5F01k59e20sefstvjvg41mks9a5d%5F1758032173%5Fimg%5F0-47c5d06d40d3c1530d17588088551984-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5F2x%5F926383-mla92777642263%5F092025-b-0dc4adcdccf7368f3d17588088617949-1024-1024.webp'] },
    { hex: '#8B0000', name: 'Rojo', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/funda-ecosport-l-nueva-roja-bf3bdfdb246203fa3417588087044150-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/assets%5Ftask%5F01k59c89r8e4xa8xdfy3r2ek3e%5F1758030307%5Fimg%5F0-beeab79ffc9eb8d61517588088673772-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/assets%5Ftask%5F01k60g78nafce9zea6bjyvjwft%5F1758806224%5Fimg%5F1-dbe30fdf24be9c477c17588088723867-1024-1024.webp'] },
  ] },
  { id: 'funda-ford-ranger-ecocuero-acolchada', name: 'Funda Ford Ranger Ecocuero Acolchada 3mm', cat: 'Fundas para Asientos', catId: 'cat-fundas-asientos', badge: null, price: '170.000', salePrice: '159.999', colors: ['#1a1a1a','#888888'], svg: seatSvg, desc: 'Ecocuero acolchado 3mm para Ford Ranger. Con o sin apoyabrazos trasero, ajuste específico.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/funda-premium-acolchada-ranger-photoroom-6f4cb55060907bcecb17592351800320-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/funda-ranger-cuerina-aut-gris-photoroom-d29cb16089119c406d17618491914924-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/assets%5Ftask%5F01k6jkmpr5fgzvygmcrjxyf53j%5F1759413772%5Fimg%5F1-4cc0ee327cf8e74b2717594997999501-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/assets%5Ftask%5F01k6jqdrfmewb921vggsnzbe2n%5F1759417740%5Fimg%5F1-0b50e517388ebd975917618489014768-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5F2x%5F809785-mla25980348476%5F092017-b-78f5ac09368c07924217592347491742-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5F2x%5F778145-mla25980354283%5F092017-b-e26b8c1a153750781917592347567397-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5F2x%5F753604-mla25980362127%5F092017-b-03fe6e58fff8c0d63b17592347865478-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5F2x%5F760985-mla25980345947%5F092017-b-9e708ae6e07dfb7f4d17592347753836-1024-1024.webp'], colorVariants: [
    { hex: '#1a1a1a', name: 'Negro', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/funda-premium-acolchada-ranger-photoroom-6f4cb55060907bcecb17592351800320-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/assets%5Ftask%5F01k6jkmpr5fgzvygmcrjxyf53j%5F1759413772%5Fimg%5F1-4cc0ee327cf8e74b2717594997999501-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5F2x%5F809785-mla25980348476%5F092017-b-78f5ac09368c07924217592347491742-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5F2x%5F778145-mla25980354283%5F092017-b-e26b8c1a153750781917592347567397-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5F2x%5F753604-mla25980362127%5F092017-b-03fe6e58fff8c0d63b17592347865478-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5F2x%5F760985-mla25980345947%5F092017-b-9e708ae6e07dfb7f4d17592347753836-1024-1024.webp'] },
    { hex: '#888888', name: 'Gris', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/funda-ranger-cuerina-aut-gris-photoroom-d29cb16089119c406d17618491914924-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/assets%5Ftask%5F01k6jqdrfmewb921vggsnzbe2n%5F1759417740%5Fimg%5F1-0b50e517388ebd975917618489014768-1024-1024.webp'] },
  ] },
  { id: 'funda-ford-ranger-cuero-automotor', name: 'Funda Ford Ranger Cuero Automotor', cat: 'Fundas para Asientos', catId: 'cat-fundas-asientos', badge: 'Premium', price: '210.000', salePrice: '189.999', colors: ['#1a1a1a'], svg: seatSvg, desc: 'Cuero automotor de alta calidad para Ford Ranger. Máxima resistencia y elegancia para trabajo y ciudad.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/funda-ecoc-acolchado-ranger-photoroom-441a6d991c3c6621f717592428984030-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/assets%5Ftask%5F01k6dexj8nfqdtwrwhcwr9gqmg%5F1759241046%5Fimg%5F1-395cd69abaf34207de17592431539210-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5F2x%5F753039-mla81852127232%5F012025-b-390eec4850cc13df5f17592423256273-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5F2x%5F619689-mla26949279958%5F032018-b-f97a3f21202364ecac17592423303202-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5F2x%5F744898-mla26949282426%5F032018-b-1eea61f719b2d4c23817592423350262-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5F2x%5F634578-mla26949287316%5F032018-b-b9466a900573717d0a17592423422852-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5F2x%5F677222-mla26949292631%5F032018-b-612a8df4b1c2070d4417592423557211-1024-1024.webp'] },
  { id: 'funda-toyota-hilux-ecocuero-acolchada-og58b', name: 'Funda Toyota Hilux Ecocuero Acolchada 3mm', cat: 'Fundas para Asientos', catId: 'cat-fundas-asientos', badge: null, price: '170.000', colors: ['#1a1a1a','#888888'], svg: seatSvg, desc: 'Ecocuero acolchado 3mm para Toyota Hilux. Respaldo trasero entero o dividido a elección.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/hilux-ecocuero-acolch-negr-photoroom-1f9020ded5765ca41817617647926138-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/hilux-ecocuero-acolch-gris-photoroom-6471f24288e5aa531b17618458172111-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/respaldo-trasero-dividido-ef4e4e0a0478e5021117618459457680-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/respaldo-trasero-entero-1-1ce2a50238e8b9ae9517618459457592-1024-1024.webp'], colorVariants: [
    { hex: '#1a1a1a', name: 'Negro', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/hilux-ecocuero-acolch-negr-photoroom-1f9020ded5765ca41817617647926138-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/respaldo-trasero-dividido-ef4e4e0a0478e5021117618459457680-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/respaldo-trasero-entero-1-1ce2a50238e8b9ae9517618459457592-1024-1024.webp'] },
    { hex: '#888888', name: 'Gris', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/hilux-ecocuero-acolch-gris-photoroom-6471f24288e5aa531b17618458172111-1024-1024.webp'] },
  ] },
  { id: 'funda-toyota-hilux-cuerina-automotor-acolchada', name: 'Funda Toyota Hilux Cuero Automotor Acolchado 3mm', cat: 'Fundas para Asientos', catId: 'cat-fundas-asientos', badge: 'Premium', price: '210.000', colors: ['#1a1a1a','#888888'], svg: seatSvg, desc: 'Cuerina automotor acolchada 3mm para Toyota Hilux. Máxima durabilidad y confort para uso intensivo.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/fundas-cuerina-automotor-hilux-negro-photoroom-2a50446a4faa18038d17612326941672-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/fundas-cuerina-automotor-hilux-gris-photoroom-9405878bf4eddf833017612326939426-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/download-98788b729a6bb58ffe17592397894636-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/download-c5f2aa40be286f65de17592398060575-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/download-02a5401bcccc907eb617592398415240-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5F2x%5F635845-mla26986911098%5F032018-b-e80a7afba43fb3fc3d17592398832956-1024-1024.webp'], colorVariants: [
    { hex: '#1a1a1a', name: 'Negro', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/fundas-cuerina-automotor-hilux-negro-photoroom-2a50446a4faa18038d17612326941672-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/download-98788b729a6bb58ffe17592397894636-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/download-c5f2aa40be286f65de17592398060575-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/download-02a5401bcccc907eb617592398415240-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5F2x%5F635845-mla26986911098%5F032018-b-e80a7afba43fb3fc3d17592398832956-1024-1024.webp'] },
    { hex: '#888888', name: 'Gris', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/fundas-cuerina-automotor-hilux-gris-photoroom-9405878bf4eddf833017612326939426-1024-1024.webp'] },
  ] },
  { id: 'funda-peugeot-308-ecocuero-acolchado-gk1p2', name: 'Funda Peugeot 308 Ecocuero Acolchado 3mm', cat: 'Fundas para Asientos', catId: 'cat-fundas-asientos', badge: null, price: '170.000', colors: ['#1a1a1a','#888888'], svg: seatSvg, desc: 'Ecocuero acolchado 3mm para Peugeot 308. Ajuste perfecto y cómodo, instalación rápida.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/funda-ecocuero-acolchado-peugeot-308-photoroom-00e878d5f6fb3a38a217595035256699-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/308-ecoc-acolch-gris-photoroom-2028db5a403dd11a0317618329693266-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/assets%5Ftask%5F01k6jkmpr5fgzvygmcrjxyf53j%5F1759413772%5Fimg%5F1-cb66f650af0d83663d17594170949497-640-0-bf384b76fa96352fa117618403956308-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/assets%5Ftask%5F01k6jqdrfmewb921vggsnzbe2n%5F1759417740%5Fimg%5F1-f767e20d5e4d52b13c17618404152342-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5F2x%5F661540-mla26178543511%5F102017-b-3ffb96ff755fea98ee17588102015457-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5F2x%5F756591-mla26178504466%5F102017-b-a233ee139f5881368d17588102213080-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5F2x%5F789544-mla26178510323%5F102017-b-38df56eae5aacdb0a817588102144891-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5F2x%5F781317-mla26178536118%5F102017-b-bc507c84ed20f1fa2a17588102306812-1024-1024.webp'], colorVariants: [
    { hex: '#1a1a1a', name: 'Negro', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/funda-ecocuero-acolchado-peugeot-308-photoroom-00e878d5f6fb3a38a217595035256699-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/assets%5Ftask%5F01k6jkmpr5fgzvygmcrjxyf53j%5F1759413772%5Fimg%5F1-cb66f650af0d83663d17594170949497-640-0-bf384b76fa96352fa117618403956308-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/assets%5Ftask%5F01k6jqdrfmewb921vggsnzbe2n%5F1759417740%5Fimg%5F1-f767e20d5e4d52b13c17618404152342-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5F2x%5F661540-mla26178543511%5F102017-b-3ffb96ff755fea98ee17588102015457-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5F2x%5F756591-mla26178504466%5F102017-b-a233ee139f5881368d17588102213080-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5F2x%5F789544-mla26178510323%5F102017-b-38df56eae5aacdb0a817588102144891-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5F2x%5F781317-mla26178536118%5F102017-b-bc507c84ed20f1fa2a17588102306812-1024-1024.webp'] },
    { hex: '#888888', name: 'Gris', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/308-ecoc-acolch-gris-photoroom-2028db5a403dd11a0317618329693266-1024-1024.webp'] },
  ] },
  { id: 'funda-fiat-palio-siena', name: 'Funda Fiat Palio/Siena Tela Jakard Premium', cat: 'Fundas para Asientos', catId: 'cat-fundas-asientos', badge: null, price: '140.000', salePrice: '130.000', colors: ['#1a1a1a','#888888','#8B0000','#1a2a5a'], svg: seatSvg, desc: 'Tela Jakard Premium para Fiat Palio y Siena. Disponible para ambos modelos y varios colores.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/funda-jakard-palio-negra-f3785ab0dddbee72f117588958845725-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/funda-jakard-palio-negra-20ccd713379602b9be17588961224631-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/funda-jakard-palio-roja-7acba029e8e041c88017588959729037-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/funda-jakard-palio-azul-ea450771f3d5fe3daa17588956201063-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/funda-jakard-siena-negra-44eaa421ce3d42a4f917588970495312-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/funda-jakard-sienanegra-e7f23db98133d10f5917588969073408-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/funda-jakard-siena-roja-f353f0e94bf69f1f0e17588972246925-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/funda-jakard-siena-azul-f2291ec6521802b6c517588971424674-1024-1024.webp'] },
  { id: 'funda-fiat-palio-ecocuero-acolchado-3mm', name: 'Funda Fiat Palio Ecocuero Acolchado 3mm', cat: 'Fundas para Asientos', catId: 'cat-fundas-asientos', badge: 'Nuevo', price: '155.000', colors: ['#1a1a1a'], svg: seatSvg, desc: 'Ecocuero acolchado 3mm para Fiat Palio. Confort superior, costuras reforzadas y ajuste exclusivo para este modelo. Tacto premium, fácil limpieza y máxima durabilidad.', images: ['/images/productos/palio-ecocuero-acolchado/foto-1.jpeg','/images/productos/palio-ecocuero-acolchado/foto-2.jpeg','/images/productos/palio-ecocuero-acolchado/foto-3.jpeg','/images/productos/palio-ecocuero-acolchado/foto-4.jpeg'] },
  { id: 'funda-fiat-palio-tela-jakard-premium', name: 'Funda Fiat Palio Tela Jakard Premium Lisa', cat: 'Fundas para Asientos', catId: 'cat-fundas-asientos', badge: null, price: '140.000', salePrice: '130.000', colors: ['#1a1a1a','#888888','#8B0000','#1a2a5a'], svg: seatSvg, desc: 'Tela Jakard premium lisa con triple costura para Fiat Palio y Siena. Excelente relación precio-calidad.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5F2x%5F854786-mla93085594839%5F092025-oo-029aab5584d48fc1d217588133010833-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/17dc086f-b918-42c6-8009-bec7efa228ec-4ea4b0634e236a5a5b17658065010287-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/a5cabf18-5ee4-42b5-ab27-8f101aff6811-f13b96399583d4a4b717658065093877-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/cb7b944b-f44c-49ad-8da2-ebd3d25ca05d-09d19dd59c922817e117658077325340-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/071e9cdf-3435-4751-b7b6-d9ba34273c43-e3f5df52e249ade27c17658077362766-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5F2x%5F910115-mla52284772859%5F112022-oo-41d1bad45ac5ee5d6f17588133081012-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/26190c83-ef37-4649-8dec-60e3a8e8de1a-d7add20242adfb9e7017658065408382-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5F2x%5F887004-mla52284562440%5F112022-oo-995ff275b6d9acdf6617588133158903-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/089b7121-5a7c-4a66-ac33-7354df301be2-89245f1f3249ddf30c17588139437675-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/5af1beae-c3ba-43b4-991e-8c2ad091c971-ddcf377236e2b3f6e117588139498677-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5F2x%5F717694-mla52284454942%5F112022-oo-620bf07e009b1eda9417588133217258-1024-1024.webp'] },
  { id: 'funda-fiat-uno-way-tela-jakard', name: 'Funda Fiat Uno Way Tela Jakard', cat: 'Fundas para Asientos', catId: 'cat-fundas-asientos', badge: null, price: '140.000', salePrice: '132.999', colors: ['#1a1a1a','#888888','#8B0000','#1a2a5a'], svg: seatSvg, desc: 'Tela Jakard para Fiat Uno Way. Incluye apoyacabezas. Compatible con Fiat 128, 147, Uno, Duna, Palio y Siena.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/download-952db4f8c7e561246617588946189002-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/download-600fd423cbf6c99ccb17588946337877-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/download-70b854e01d8eef12c917588946447610-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/download-7a0b416fb0683a006517588946532874-1024-1024.webp'] },
  { id: 'funda-fiat-mobi-cuero-automotor', name: 'Funda Fiat Mobi Cuero Automotor', cat: 'Fundas para Asientos', catId: 'cat-fundas-asientos', badge: 'Premium', price: '210.000', salePrice: '200.000', colors: ['#1a1a1a','#888888'], svg: seatSvg, desc: 'Cuero automotor para Fiat Mobi. Respaldo trasero entero o dividido, resistencia y elegancia.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/funda-ecoc-acolchado-mobi-photoroom-92b10978ff648d701217592414089451-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/308-ecoc-acolch-gris-photoroom-1-cf363f29dd8353401a17618339697482-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/assets%5Ftask%5F01k6dexj8nfqdtwrwhcwr9gqmg%5F1759241046%5Fimg%5F1-7706e90518c9cae79717592414241152-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/assets%5Ftask%5F01k6jq8j3ze82sptfrss7nepwh%5F1759417563%5Fimg%5F1-228b5d5bd2b3d4872217618339810646-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5F2x%5F955769-mla26331637504%5F112017-b-2147965e325c4d870a17592403627183-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5F2x%5F840970-mla26331629646%5F112017-b-7815a97c417d4f9b3317592403704041-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5F2x%5F853959-mla26331634541%5F112017-b-ccffad9266f04b298b17592403785365-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/respaldo-trasero-dividido-24be19b072c69bdfd617618332355793-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/respaldo-trasero-entero-1-24953d668e00d49db517618332131459-1024-1024.webp'], colorVariants: [
    { hex: '#1a1a1a', name: 'Negro', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/funda-ecoc-acolchado-mobi-photoroom-92b10978ff648d701217592414089451-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/assets%5Ftask%5F01k6dexj8nfqdtwrwhcwr9gqmg%5F1759241046%5Fimg%5F1-7706e90518c9cae79717592414241152-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5F2x%5F955769-mla26331637504%5F112017-b-2147965e325c4d870a17592403627183-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5F2x%5F840970-mla26331629646%5F112017-b-7815a97c417d4f9b3317592403704041-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5F2x%5F853959-mla26331634541%5F112017-b-ccffad9266f04b298b17592403785365-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/respaldo-trasero-dividido-24be19b072c69bdfd617618332355793-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/respaldo-trasero-entero-1-24953d668e00d49db517618332131459-1024-1024.webp'] },
    { hex: '#888888', name: 'Gris', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/308-ecoc-acolch-gris-photoroom-1-cf363f29dd8353401a17618339697482-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/assets%5Ftask%5F01k6jq8j3ze82sptfrss7nepwh%5F1759417563%5Fimg%5F1-228b5d5bd2b3d4872217618339810646-1024-1024.webp'] },
  ] },
  { id: 'funda-jakard-premium-fiat-mobi-way', name: 'Funda Fiat Mobi Way Jakard Premium', cat: 'Fundas para Asientos', catId: 'cat-fundas-asientos', badge: null, price: '140.000', salePrice: '132.999', colors: ['#1a1a1a','#888888','#8B0000','#1a2a5a'], svg: seatSvg, desc: 'Tela Jakard premium para Fiat Mobi Way. Disponible en múltiples colores, respaldo entero o dividido.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5F2x%5F888729-mla52283556164%5F112022-oo-a3e10538477425542717588974384540-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5F2x%5F748065-mla52283393758%5F112022-oo-41c5d031af0f19711617588974537239-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5F2x%5F843873-mla52283555197%5F112022-oo-e976a1387bf36bc46917588975726905-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5F2x%5F639015-mla52283435550%5F112022-oo-f3726066ac25ad5a7517588975860460-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/respaldo-trasero-entero-1-96350a755bdabd87ef17595043164314-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/respaldo-trasero-dividido-4ecd6909415a78377517595043276137-1024-1024.webp'] },
  { id: 'funda-para-asientos-fiat-mobi-ecocuero-2zg7m', name: 'Funda Fiat Mobi Ecocuero', cat: 'Fundas para Asientos', catId: 'cat-fundas-asientos', badge: null, price: '140.000', salePrice: '129.999', colors: ['#1a1a1a','#1a2a5a','#e8e6e0','#888888','#8B0000','#c46080'], svg: seatSvg, desc: 'Ecocuero con costuras reforzadas y tela elastizada para Fiat Mobi. Ajuste exclusivo para este modelo.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/mobi-con-funda-ecocuero-negro-e7b84a3579de9aff7f17629469474523-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/mobi-con-funda-ecocuero-gris-0c6c544d135631eb1a17629469475451-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/mobi-con-funda-ecocuero-azul-276fc0053f2ec3836217629469475743-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/mobi-con-funda-ecocuero-blanco-4e09cb026f9b6beaac17629469475423-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/mobi-con-funda-ecocuero-rojo-456c7b94abe4a4321a17629469474508-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/mobi-con-funda-ecocuero-rosa-ae87399057331baba117629494389020-1024-1024.webp'], colorVariants: [
    { hex: '#1a1a1a', name: 'Negro', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/mobi-con-funda-ecocuero-negro-e7b84a3579de9aff7f17629469474523-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/assets%5Ftask%5F01k6z7tamwfecvree8b3netcsx%5F1759837579%5Fimg%5F1-e3a8d91c543d451bfa17629498359665-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/asiento-negro-mobi-ecocuero-1da1433a94001210c517629526274019-1024-1024.webp'] },
    { hex: '#888888', name: 'Gris', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/mobi-con-funda-ecocuero-gris-0c6c544d135631eb1a17629469475451-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/assets%5Ftask%5F01k6za9fgfffd8cpjsge64mfbn%5F1759840175%5Fimg%5F1-2880eb0169c3c30bb817629498514474-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/funda-ecocuero-mobi-gris-fa55730c4878dc868e17629529005079-1024-1024.webp'] },
    { hex: '#1a2a5a', name: 'Azul', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/mobi-con-funda-ecocuero-azul-276fc0053f2ec3836217629469475743-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/assets%5Ftask%5F01k6z8n7tvex0sqhbk9cg005t5%5F1759838457%5Fimg%5F1-937af6300b0b68526417629498441717-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/assets%5Ftask%5F01k721n3v3f4nv9nq4yhn2r307%5F1759931818%5Fimg%5F1-0b4c9d6b79921416cd17629499896478-1024-1024.webp'] },
    { hex: '#e8e6e0', name: 'Beige', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/mobi-con-funda-ecocuero-blanco-4e09cb026f9b6beaac17629469475423-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/assets%5Ftask%5F01k6z92e7yettrpfpy0q1z7aj4%5F1759838908%5Fimg%5F0-c37d52651d0a4cc97717629498480885-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/assets%5Ftask%5F01k722tjmkfh79ste3wg19cpwz%5F1759933017%5Fimg%5F0-b2ef916ad0b2c37c6917629499925009-1024-1024.webp'] },
    { hex: '#8B0000', name: 'Rojo', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/mobi-con-funda-ecocuero-rojo-456c7b94abe4a4321a17629469474508-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/assets%5Ftask%5F01k6z8bbk7f4b995fg6gmwveyk%5F1759838135%5Fimg%5F1-ea81391d619b3cc48117629498395975-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/assets%5Ftask%5F01k724dnrrfykt7ya2p49xqxfw%5F1759934709%5Fimg%5F0-8218ce452092588e0317629499990490-1024-1024.webp'] },
    { hex: '#c46080', name: 'Rosa', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/mobi-con-funda-ecocuero-rosa-ae87399057331baba117629494389020-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/576d961e-2a41-4e89-9225-bb06396c2f85-86c3e57e3f75dd980f17629498122093-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/asiento-rosa-mobi-ecocuero-b04c9bf7b912e4fa4517629515472834-1024-1024.webp'] },
  ] },
  { id: 'funda-jakard-premium-nissan-march', name: 'Funda Nissan March Jakard Premium', cat: 'Fundas para Asientos', catId: 'cat-fundas-asientos', badge: null, price: '140.000', salePrice: '135.000', colors: ['#1a1a1a','#888888','#8B0000','#1a2a5a'], svg: seatSvg, desc: 'Tela Jakard premium para Nissan March. Excelente calidad y ajuste para este modelo.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/nissan-march-a96f3977512dd7851017588928476093-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/funda-jakard-march-negra-b26e0f85087b22d1b217588933267457-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/funda-jakard-march-gris-d80fd325ef4756a81617588930197427-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5Fnp%5F818733-mla26178486855%5F102017-o-53b59da47206f07cce17588936047167-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5Fnp%5F676813-mla26178479910%5F102017-o-94066d50853f09e79a17588936209187-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/funda-jakard-march-roja-c28e7b690a27ea964417588934633506-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/funda-jakard-march-azul-ddaa371bb26d0cf66717588935365728-1024-1024.webp'] },
  { id: 'funda-nissan-versa-jackard-premium4', name: 'Funda Nissan Versa Jakard Premium', cat: 'Fundas para Asientos', catId: 'cat-fundas-asientos', badge: null, price: '140.000', colors: ['#1a1a1a','#888888'], svg: seatSvg, desc: 'Tela Jakard premium para Nissan Versa. Calidad y resistencia garantizadas.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/download-1edb7ad0147a6354c817592332340020-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_833325-mla52283706152_112022-oo-1d57aea1e946ea3f9617592333161758-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/download-3bf94d65ba3ba1e93617592332628350-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/download-51fe0f1069116c285317592331963501-1024-1024.webp'] },
  { id: 'funda-universal-ecocuero-acolchada', name: 'Funda Universal Ecocuero Acolchada 3mm', cat: 'Fundas para Asientos', catId: 'cat-fundas-asientos', badge: null, price: '140.000', salePrice: '135.000', colors: ['#1a1a1a','#888888'], svg: seatSvg, desc: 'Ecocuero acolchado 3mm universal. Se adapta a cualquier vehículo, recomendamos consultar modelo.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/task%5F01k9t2a88mehyrhwbrefbva9c7%5F1762885261%5Fimg%5F1-c2dbb0fd8b1dcb14dc17628852959189-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/task%5F01k9t23eqged6bhpn448eaz8qb%5F1762885046%5Fimg%5F0-4bf4f04d43860d69ae17628850898169-1024-1024.webp'] },
  { id: 'funda-universal-butacas-delanteras-cuerina-automotor-acolchada-utryx', name: 'Butacas Delanteras Cuerina Automotor Acolchada', cat: 'Fundas para Asientos', catId: 'cat-fundas-asientos', badge: null, price: '140.000', salePrice: '135.000', colors: ['#1a1a1a','#888888'], svg: seatSvg, desc: 'Solo asientos delanteros en cuerina automotor acolchada 3mm. Universal, consultar vehículo.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/assets_task_01k6jkmpr5fgzvygmcrjxyf53j_1759413772_img_1-cb66f650af0d83663d17594170949497-640-0-320dbc849b1c147f1d17619138854827-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/download-bacfd5b47074233d3917592339817187-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/181707b2-7262-4f5d-bbf6-9402b39d4a70-2966aa8f673a97a6cd17592341666147-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/dc74df64-56fd-40b3-8795-f60d53b41e2a-28eb3feb75d255b40417592341849889-1024-1024.webp'] },
  { id: 'funda-butacas-delanteras-ecocuero-acolchada-premium4', name: 'Butacas Delanteras Ecocuero Acolchada', cat: 'Fundas para Asientos', catId: 'cat-fundas-asientos', badge: null, price: '106.000', salePrice: '99.999', colors: ['#1a1a1a','#888888'], svg: seatSvg, desc: 'Juego butacas delanteras (2 respaldos + 2 asientos + 2 apoyacabezas) en ecocuero acolchado premium.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/assets%5Ftask%5F01k6jqdrfmewb921vggsnzbe2n%5F1759417740%5Fimg%5F1-f17658a9add6212ce417594992208469-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/assets%5Ftask%5F01k6jkmpr5fgzvygmcrjxyf53j%5F1759413772%5Fimg%5F1-32c4cc29f08dd46fd917594992307666-1024-1024.webp'] },
  { id: 'funda-butacas-delanteras-tela-jak-acolchada-premium1', name: 'Butacas Delanteras Tela Jakard Acolchada Premium', cat: 'Fundas para Asientos', catId: 'cat-fundas-asientos', badge: null, price: '79.999', salePrice: '72.999', colors: ['#1a1a1a','#888888','#8B0000','#1a2a5a'], svg: seatSvg, desc: 'Butacas delanteras tela Jakard acolchada premium con apoyacabezas. Diseño universal, 6 piezas.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_781912-mla92673755998_092025-o-a20fd92cf1e0bee19a17588032422504-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_636510-mla93372672303_092025-o-d1ef7025b1a322f03317588036756384-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_789143-mla93372453803_092025-o-514771adca701b39bc17588037078109-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_921382-mla84624620172_052025-o-4fb3e66995f4aac25017588037872213-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_999867-mla84923457201_052025-o-de6a755b886de635b017588037998562-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_777490-mla51421698824_092022-o-e77d8788294cba4c8317588038050429-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_742340-mla51421608960_092022-o-8ca510c3d85083f5ce17588038142075-1024-1024.webp'] },
  { id: 'funda-cubre-asiento-jakard-premium-acolchada-universal', name: 'Funda Jakard Premium Acolchada Universal', cat: 'Fundas para Asientos', catId: 'cat-fundas-asientos', badge: null, price: '150.000', salePrice: '140.000', colors: ['#1a1a1a','#888888'], svg: seatSvg, desc: 'Juego universal tela Jakard con 3mm de goma espuma acolchada. Se adapta a la mayoría de los vehículos.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/download-900d9a36b2c4a18f2017588052825703-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5F2x%5F614952-mla26568391141%5F122017-b-fab2a1b7990517977717588052948558-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5F2x%5F822707-mla26568391616%5F122017-b-88c14b3bde5fa3b0fa17588053030774-1024-1024.webp'] },
  { id: 'funda-cubre-asientos-universal-ecocuero-alemania-wspb4', name: 'Funda Universal Ecocuero Alemania', cat: 'Fundas para Asientos', catId: 'cat-fundas-asientos', badge: null, price: '110.000', salePrice: '100.000', colors: ['#1a1a1a','#888888'], svg: seatSvg, desc: 'Ecocuero reconocido como el mejor del mercado. Protección máxima, fácil limpieza, fabricado a medida.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/funda-bandera-alemania-e6b4c5e86ce625e47417126864779074-1024-1024.webp'] },
  { id: 'funda-cubre-asientos-para-perros-mascota-k5zgc', name: 'Funda Cubre Asientos Para Mascotas', cat: 'Fundas para Asientos', catId: 'cat-fundas-asientos', badge: null, price: '29.000', colors: ['#1a1a1a'], svg: seatSvg, desc: 'Funda 100% impermeable para proteger el asiento trasero de pelos y manchas de mascotas. Universal 1,40x1,50m.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/assets_task_01k88mvtetfbrsm4ayqcdsv8gz_1761227026_img_1-d95221a8cfc6e4497617628855414893-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_703241-mla89267718710_082025-o-48cb66e35b798b434917587279427229-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_2x_977703-mla95607486808_102025-f-001056ce0ac4409f2817628855276763-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_704235-mla89633049163_082025-o-d86a58c5c9789d6a9117587279474778-1024-1024.webp'] },

  // ─── CUBRE CAPOTS ────────────────────────────────────────────────────────
  { id: 'cubre-capot-renault-twingo', name: 'Cubre Capot Renault Twingo', cat: 'Cubre Capots', catId: 'cat-cubre-capots', badge: 'OFERTA', price: '80.000', salePrice: '70.000', colors: ['#1a1a1a'], svg: capotSvg, desc: 'Cubre capot MDRACING para Renault Twingo. Ecocuero afelpado interior, ajuste preciso con elásticos y ganchos.', images: ['images/cubre-capots/cubre-capot-twingo-1.webp','images/cubre-capots/cubre-capot-twingo-2.webp'] },
  { id: 'cubre-capot-renault-kangoo-2008-en-adelante', name: 'Cubre Capot Renault Kangoo 2008 en Adelante', cat: 'Cubre Capots', catId: 'cat-cubre-capots', badge: 'OFERTA', price: '80.000', salePrice: '70.000', colors: ['#1a1a1a'], svg: capotSvg, desc: 'Cubre capot MDRACING para Renault Kangoo 2008 en adelante. Protección precisa, instalación rápida.', images: ['images/cubre-capots/cubre-capot-generica-1.webp','images/cubre-capots/cubre-capot-generica-2.webp','images/cubre-capots/cubre-capot-generica-3.webp','images/cubre-capots/cubre-capot-generica-4.webp'] },
  { id: 'cubre-capot-renault-clio-96-99', name: 'Cubre Capot Renault Clio 96/99', cat: 'Cubre Capots', catId: 'cat-cubre-capots', badge: 'OFERTA', price: '80.000', salePrice: '70.000', colors: ['#1a1a1a'], svg: capotSvg, desc: 'Cubre capot MDRACING para Renault Clio 96/99. Ecocuero con felpa interior.', images: ['images/cubre-capots/cubre-capot-generica-1.webp','images/cubre-capots/cubre-capot-generica-2.webp','images/cubre-capots/cubre-capot-generica-3.webp','images/cubre-capots/cubre-capot-generica-4.webp'] },
  { id: 'cubre-capot-renault-clio-2004', name: 'Cubre Capot Renault Clio 2004', cat: 'Cubre Capots', catId: 'cat-cubre-capots', badge: null, price: '80.000', colors: ['#1a1a1a'], svg: capotSvg, desc: 'Cubre capot MDRACING para Renault Clio 2004. Protege la pintura contra impactos y el desgaste.', images: ['images/cubre-capots/cubre-capot-generica-1.webp','images/cubre-capots/cubre-capot-generica-2.webp','images/cubre-capots/cubre-capot-generica-3.webp','images/cubre-capots/cubre-capot-generica-4.webp'] },
  { id: 'cubre-capot-renault-clio-2007', name: 'Cubre Capot Renault Clio 2007', cat: 'Cubre Capots', catId: 'cat-cubre-capots', badge: null, price: '80.000', colors: ['#1a1a1a'], svg: capotSvg, desc: 'Cubre capot MDRACING para Renault Clio 2007. Ajuste preciso, mantiene el capot en perfecto estado.', images: ['images/cubre-capots/cubre-capot-generica-1.webp','images/cubre-capots/cubre-capot-generica-2.webp','images/cubre-capots/cubre-capot-generica-3.webp','images/cubre-capots/cubre-capot-generica-4.webp'] },
  { id: 'cubre-capot-renault-megane-2005', name: 'Cubre Capot Renault Megane 2005', cat: 'Cubre Capots', catId: 'cat-cubre-capots', badge: 'OFERTA', price: '80.000', salePrice: '70.000', colors: ['#1a1a1a'], svg: capotSvg, desc: 'Cubre capot MDRACING para Renault Megane 2005 (Megane 2 francés). Consultar año para enviar el correcto.', images: ['images/cubre-capots/cubre-capot-megane-2005.webp'] },
  { id: 'cubre-capot-megane-2000', name: 'Cubre Capot Renault Megane 2000', cat: 'Cubre Capots', catId: 'cat-cubre-capots', badge: null, price: '80.000', colors: ['#1a1a1a'], svg: capotSvg, desc: 'Cubre capot MDRACING para Renault Megane 2000. Directo de fábrica, excelente precio.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_927020-mla49759787573_042022-o-eb7f54c4e941dd5c3817587301887421-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_934945-mla29531215469_032019-o-449d34cdd4ac24094517587301976514-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_737244-mla31063945946_062019-o-715d44f0523fa28e9617587302017055-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_728436-mla29531237207_032019-o-f829bbba034947c72e17587302033390-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_788086-mla29531211900_032019-o-576155144f6cb7bce117587301955220-1024-1024.webp'] },
  { id: 'cubre-capot-renault-scenic', name: 'Cubre Capot Renault Scenic', cat: 'Cubre Capots', catId: 'cat-cubre-capots', badge: null, price: '80.000', colors: ['#1a1a1a'], svg: capotSvg, desc: 'Cubre capot MDRACING para Renault Scenic. Ecocuero afelpado, instalación sencilla.', images: ['images/cubre-capots/cubre-capot-generica-1.webp','images/cubre-capots/cubre-capot-generica-2.webp','images/cubre-capots/cubre-capot-generica-3.webp','images/cubre-capots/cubre-capot-generica-4.webp'] },
  { id: 'cubre-capot-renault-trafic', name: 'Cubre Capot Renault Trafic', cat: 'Cubre Capots', catId: 'cat-cubre-capots', badge: 'OFERTA', price: '80.000', salePrice: '70.000', colors: ['#1a1a1a'], svg: capotSvg, desc: 'Cubre capot MDRACING para Renault Trafic. Indicar año al comprar para enviar el modelo correcto.', images: ['images/cubre-capots/cubre-capot-generica-1.webp','images/cubre-capots/cubre-capot-generica-2.webp','images/cubre-capots/cubre-capot-generica-3.webp','images/cubre-capots/cubre-capot-generica-4.webp'] },
  { id: 'cubre-capot-renault-duster', name: 'Cubre Capot Renault Duster', cat: 'Cubre Capots', catId: 'cat-cubre-capots', badge: 'LIQUIDACIÓN', price: '80.000', salePrice: '45.000', colors: ['#1a1a1a'], svg: capotSvg, desc: 'Cubre capot MDRACING para Renault Duster. Ecocuero máxima calidad afelpado en su interior.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_814524-mla26856638211_022018-o-a38a7d28ed0501a43717587290864106-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_961569-mla26856557497_022018-o-b2576b4f1301a6489f17587290892298-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_643217-mla26856638188_022018-o-77db5b90fac428416817587290914495-1024-1024.webp'] },
  { id: 'cubre-capot-renault-master', name: 'Cubre Capot Renault Master', cat: 'Cubre Capots', catId: 'cat-cubre-capots', badge: 'LIQUIDACIÓN', price: '80.000', salePrice: '45.000', colors: ['#1a1a1a'], svg: capotSvg, desc: 'Cubre capot MDRACING para Renault Master. Indicar año al comprar, también enviar foto de la trompa.', images: ['images/cubre-capots/cubre-capot-generica-1.webp','images/cubre-capots/cubre-capot-generica-2.webp','images/cubre-capots/cubre-capot-generica-3.webp','images/cubre-capots/cubre-capot-generica-4.webp'] },
  { id: 'cubre-capot-ford-fiesta-2000', name: 'Cubre Capot Ford Fiesta 2000', cat: 'Cubre Capots', catId: 'cat-cubre-capots', badge: null, price: '80.000', colors: ['#1a1a1a'], svg: capotSvg, desc: 'Cubre capot MDRACING para Ford Fiesta 2000. Protección precisa, instalación rápida.', images: ['images/cubre-capots/cubre-capot-generica-1.webp','images/cubre-capots/cubre-capot-generica-2.webp','images/cubre-capots/cubre-capot-generica-3.webp','images/cubre-capots/cubre-capot-generica-4.webp'] },
  { id: 'cubre-capot-ford-fiesta-2011-a-2014', name: 'Cubre Capot Ford Fiesta 2011 a 2014', cat: 'Cubre Capots', catId: 'cat-cubre-capots', badge: null, price: '80.000', colors: ['#1a1a1a'], svg: capotSvg, desc: 'Cubre capot MDRACING para Ford Fiesta 2011 a 2014. La mejor calidad del mercado.', images: ['images/cubre-capots/cubre-capot-fiesta-2011-1.webp','images/cubre-capots/cubre-capot-fiesta-2011-2.webp','images/cubre-capots/cubre-capot-fiesta-2011-3.webp','images/cubre-capots/cubre-capot-fiesta-2011-4.webp'] },
  { id: 'cubre-capot-ford-f100', name: 'Cubre Capot Ford F100', cat: 'Cubre Capots', catId: 'cat-cubre-capots', badge: null, price: '80.000', salePrice: '70.000', colors: ['#1a1a1a'], svg: capotSvg, desc: 'Cubre capot MDRACING para Ford F100. Ecocuero afelpado, protege la pintura original.', images: ['images/cubre-capots/cubre-capot-generica-1.webp','images/cubre-capots/cubre-capot-generica-2.webp','images/cubre-capots/cubre-capot-generica-3.webp','images/cubre-capots/cubre-capot-generica-4.webp'] },
  { id: 'cubre-capot-ford-orion', name: 'Cubre Capot Ford Orion', cat: 'Cubre Capots', catId: 'cat-cubre-capots', badge: 'LIQUIDACIÓN', price: '80.000', salePrice: '45.000', colors: ['#1a1a1a'], svg: capotSvg, desc: 'Cubre capot MDRACING para Ford Orion. Ecocuero con felpa, ajuste exacto.', images: ['images/cubre-capots/cubre-capot-generica-1.webp','images/cubre-capots/cubre-capot-generica-2.webp','images/cubre-capots/cubre-capot-generica-3.webp','images/cubre-capots/cubre-capot-generica-4.webp'] },
  { id: 'cubre-capot-ford-focus-linea-vieja', name: 'Cubre Capot Ford Focus Línea Vieja', cat: 'Cubre Capots', catId: 'cat-cubre-capots', badge: 'OFERTA', price: '80.000', salePrice: '70.000', colors: ['#1a1a1a'], svg: capotSvg, desc: 'Cubre capot MDRACING para Ford Focus línea vieja. Protección precisa contra el desgaste.', images: ['images/cubre-capots/cubre-capot-generica-1.webp','images/cubre-capots/cubre-capot-generica-2.webp','images/cubre-capots/cubre-capot-generica-3.webp','images/cubre-capots/cubre-capot-generica-4.webp'] },
  { id: 'cubre-capot-ford-transit', name: 'Cubre Capot Ford Transit', cat: 'Cubre Capots', catId: 'cat-cubre-capots', badge: null, price: '80.000', colors: ['#1a1a1a'], svg: capotSvg, desc: 'Cubre capot MDRACING para Ford Transit. Ecocuero con felpa interior, ajuste adaptable.', images: ['images/cubre-capots/cubre-capot-generica-1.webp','images/cubre-capots/cubre-capot-generica-2.webp','images/cubre-capots/cubre-capot-generica-3.webp','images/cubre-capots/cubre-capot-generica-4.webp'] },
  { id: 'cubre-capot-ford-ka-2017', name: 'Cubre Capot Ford Ka 2017', cat: 'Cubre Capots', catId: 'cat-cubre-capots', badge: 'LIQUIDACIÓN', price: '80.000', salePrice: '45.000', colors: ['#1a1a1a'], svg: capotSvg, desc: 'Cubre capot MDRACING para Ford Ka 2017. Solo cubre capot, no trompa completa.', images: ['images/cubre-capots/cubre-capot-ford-ka-2017-1.webp','images/cubre-capots/cubre-capot-ford-ka-2017-2.webp'] },
  { id: 'cubre-capot-ford-ecosport-kinetic-2018', name: 'Cubre Capot Ford EcoSport Kinetic 2018', cat: 'Cubre Capots', catId: 'cat-cubre-capots', badge: null, price: '80.000', colors: ['#1a1a1a'], svg: capotSvg, desc: 'Cubre capot MDRACING para Ford EcoSport 2018. La mejor marca y calidad del mercado.', images: ['images/cubre-capots/cubre-capot-ecosport-2018-1.webp','images/cubre-capots/cubre-capot-ecosport-2018-2.webp','images/cubre-capots/cubre-capot-ecosport-2018-3.webp'] },
  { id: 'cubre-capot-vw-polo-2005', name: 'Cubre Capot VW Polo 2005', cat: 'Cubre Capots', catId: 'cat-cubre-capots', badge: 'OFERTA', price: '80.000', salePrice: '70.000', colors: ['#1a1a1a'], svg: capotSvg, desc: 'Cubre capot MDRACING para VW Polo 2005. Ecocuero afelpado, instalación sencilla.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_764911-mla89282947144_082025-o-a7b6797dcaee9e863817587291861922-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_837060-mla89282779646_082025-o-ce44990da1a15ef7b417587291913918-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_804683-mla89282858878_082025-o-0a17ab6d51efcaa0d017587291937794-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_802180-mla89282304240_082025-o-27041b9f0cd4d2a48817587291955803-1024-1024.webp'] },
  { id: 'cubre-capot-vw-polo-2017-4-puertas', name: 'Cubre Capot VW Polo 2017 4 Puertas', cat: 'Cubre Capots', catId: 'cat-cubre-capots', badge: null, price: '80.000', colors: ['#1a1a1a'], svg: capotSvg, desc: 'Cubre capot MDRACING para VW Polo 2017 4 puertas. Excelente calidad de ajuste.', images: ['images/cubre-capots/cubre-capot-polo-2017-4p-1.webp','images/cubre-capots/cubre-capot-polo-2017-4p-2.webp','images/cubre-capots/cubre-capot-polo-2017-4p-3.webp','images/cubre-capots/cubre-capot-polo-2017-4p-4.webp','images/cubre-capots/cubre-capot-polo-2017-4p-5.webp'] },
  { id: 'cubre-capot-volkswagen-polo-virtus-2018-5p', name: 'Cubre Capot VW Polo/Virtus 2018 5p', cat: 'Cubre Capots', catId: 'cat-cubre-capots', badge: null, price: '80.000', colors: ['#1a1a1a'], svg: capotSvg, desc: 'Cubre capot MDRACING para VW Polo/Virtus 2018. Excelente para viajes en ruta.', images: ['images/cubre-capots/cubre-capot-polo-virtus-2018-5p-1.webp','images/cubre-capots/cubre-capot-polo-virtus-2018-5p-2.webp'] },
  { id: 'cubre-capot-vw-t-cross', name: 'Cubre Capot VW T-Cross', cat: 'Cubre Capots', catId: 'cat-cubre-capots', badge: null, price: '80.000', colors: ['#1a1a1a'], svg: capotSvg, desc: 'Cubre capot MDRACING para VW T-Cross. Preserva la pintura original, ajuste exacto.', images: ['images/cubre-capots/cubre-capot-vw-t-cross-1.webp','images/cubre-capots/cubre-capot-vw-t-cross-2.webp','images/cubre-capots/cubre-capot-vw-t-cross-3.webp'] },
  { id: 'cubre-capot-vw-amarok-dm92h', name: 'Cubre Capot VW Amarok', cat: 'Cubre Capots', catId: 'cat-cubre-capots', badge: null, price: '80.000', colors: ['#1a1a1a'], svg: capotSvg, desc: 'Cubre capot MDRACING para VW Amarok. Ecocuero afelpado, ajuste adaptable para esta camioneta.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_864921-mla84932359417_052025-b-39d819db59e4644b1d17611340496956-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_758915-mla84932635189_052025-b-5868ea8a4656c8c16817611340584605-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_988498-mla84931984295_052025-b-2985a4268c6f57bcf917611340629645-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_814543-mla84932172551_052025-b-499769248d3eddfcf817611340686879-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_614009-mla84932507133_052025-b-b7e38d863943baeda417611340842414-1024-1024.webp'] },
  { id: 'cubre-capot-vw-gol-2000', name: 'Cubre Capot VW Gol 2000', cat: 'Cubre Capots', catId: 'cat-cubre-capots', badge: 'LIQUIDACIÓN', price: '80.000', salePrice: '45.000', colors: ['#1a1a1a'], svg: capotSvg, desc: 'Cubre capot MDRACING para VW Gol 2000. Ecocuero afelpado, instalación rápida.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_668615-mla89276713856_082025-o-1294d90acbc33226df17587295380652-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_617986-mla89642761865_082025-o-68fefd5f7b3839dbb417587295404988-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_933737-mla89276694188_082025-o-70a5e7b6086798488817587295425115-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_675840-mla89276932422_082025-o-0e33345381b3eb576517587295442114-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_925997-mla89643167431_082025-o-fcc0bcae7686926af817587295458300-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_932913-mla89276694196_082025-o-3d9aa0290d8518714917587295488438-1024-1024.webp'] },
  { id: 'cubre-capot-vw-gol-senda', name: 'Cubre Capot VW Gol/Senda', cat: 'Cubre Capots', catId: 'cat-cubre-capots', badge: 'LIQUIDACIÓN', price: '80.000', salePrice: '45.000', colors: ['#1a1a1a'], svg: capotSvg, desc: 'Cubre capot MDRACING para VW Gol/Senda. Protege la pintura de rayones y el desgaste.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_748964-mla89280168830_082025-o-7ad030cd0f5a72a71917587290125440-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_927862-mla48481776584_122021-o-2dc973de69efbac82917587290148815-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_797476-mla89280565454_082025-o-40d54ed4dfe6ae967b17587290189693-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_747677-mla89645971025_082025-o-6935354d5f9dafd96017587290217929-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_675802-mla89280337052_082025-o-3bf2e8445f9b00b6ac17587290242588-1024-1024.webp'] },
  { id: 'cubre-capot-chevrolet-tigra', name: 'Cubre Capot Chevrolet Tigra', cat: 'Cubre Capots', catId: 'cat-cubre-capots', badge: 'LIQUIDACIÓN', price: '80.000', salePrice: '18.000', colors: ['#1a1a1a'], svg: capotSvg, desc: 'Cubre capot MDRACING para Chevrolet Tigra. Ecocuero afelpado, liquidación de stock.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_789893-mla74342748216_022024-o-5f0b5e7c19845b2c4c17587266802191-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_994847-mla48481558881_122021-o-b5c4bc07a488b76bdb17587266824596-1024-1024.webp'] },
  { id: 'cubre-capot-chevrolet-astra', name: 'Cubre Capot Chevrolet Astra', cat: 'Cubre Capots', catId: 'cat-cubre-capots', badge: 'LIQUIDACIÓN', price: '80.000', salePrice: '18.000', colors: ['#1a1a1a'], svg: capotSvg, desc: 'Cubre capot MDRACING para Chevrolet Astra. Ecocuero afelpado, excelente precio.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_830110-mla74342888708_022024-o-a0934f641ccd929f4817587265963198-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_994847-mla48481558881_122021-o-739edc7bd150f1e34717587265983842-1024-1024.webp'] },
  { id: 'cubre-capot-chevrolet-monza', name: 'Cubre Capot Chevrolet Monza', cat: 'Cubre Capots', catId: 'cat-cubre-capots', badge: 'LIQUIDACIÓN', price: '80.000', salePrice: '22.500', colors: ['#1a1a1a'], svg: capotSvg, desc: 'Cubre capot MDRACING para Chevrolet Monza. Ecocuero afelpado, precio especial.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_778398-mla74342626388_022024-o-e6140b7d674c8149be17587276138178-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_866767-mla48481714822_122021-o-a39e695cacf401057617587276194788-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_994847-mla48481558881_122021-o-8be65cfad0eec82f3017587276261351-1024-1024.webp'] },
  { id: 'cubre-capot-chevrolet-zafira', name: 'Cubre Capot Chevrolet Zafira', cat: 'Cubre Capots', catId: 'cat-cubre-capots', badge: 'LIQUIDACIÓN', price: '80.000', salePrice: '22.500', colors: ['#1a1a1a'], svg: capotSvg, desc: 'Cubre capot MDRACING para Chevrolet Zafira. Ecocuero afelpado, precio de liquidación.', images: ['images/cubre-capots/cubre-capot-generica-1.webp','images/cubre-capots/cubre-capot-generica-2.webp','images/cubre-capots/cubre-capot-generica-3.webp','images/cubre-capots/cubre-capot-generica-4.webp'] },
  { id: 'cubre-capot-chevrolet-luv', name: 'Cubre Capot Chevrolet Luv', cat: 'Cubre Capots', catId: 'cat-cubre-capots', badge: 'LIQUIDACIÓN', price: '80.000', salePrice: '45.000', colors: ['#1a1a1a'], svg: capotSvg, desc: 'Cubre capot MDRACING para Chevrolet Luv. Ecocuero de calidad, protección para este clásico.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5Fnp%5F994847-mla48481558881%5F122021-o-13776ac96dd017f6f017587303741195-1024-1024.webp'] },
  { id: 'cubre-capot-chevrolet-vectra', name: 'Cubre Capot Chevrolet Vectra', cat: 'Cubre Capots', catId: 'cat-cubre-capots', badge: 'LIQUIDACIÓN', price: '80.000', salePrice: '18.000', colors: ['#1a1a1a'], svg: capotSvg, desc: 'Cubre capot MDRACING para Chevrolet Vectra. Ecocuero afelpado, precio de liquidación.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_702660-mla74342864734_022024-o-9b2e5faefdbc60b18a17587267519603-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_994847-mla48481558881_122021-o-9caeb3dbcb3342488917587267536250-1024-1024.webp'] },
  { id: 'cubre-capot-chevrolet-onix-prisma-2017', name: 'Cubre Capot Chevrolet Onix/Prisma 2017', cat: 'Cubre Capots', catId: 'cat-cubre-capots', badge: null, price: '80.000', salePrice: '70.000', colors: ['#1a1a1a'], svg: capotSvg, desc: 'Cubre capot MDRACING para Chevrolet Onix/Prisma 2017 LTZ. Para Joy, usar modelo anterior.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_907567-mla74455176741_022024-o-12a574cbb9a438230917587304732884-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_628489-mla44724226632_012021-o-d6cbef2a67d0c2bb2417587304751929-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_856121-mla44724230795_012021-o-432fcda43d04b419c617587304797731-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_973915-mla44724221841_012021-o-984a822f258812718b17587304896504-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_839445-mla44724226725_012021-o-22f777af12991d11ce17587305003081-1024-1024.webp'] },
  { id: 'cubre-capot-chevrolet-cruze-2017', name: 'Cubre Capot Chevrolet Cruze 2017', cat: 'Cubre Capots', catId: 'cat-cubre-capots', badge: 'OFERTA', price: '80.000', salePrice: '65.000', colors: ['#1a1a1a'], svg: capotSvg, desc: 'Cubre capot MDRACING para Chevrolet Cruze 2017. Solo cubre capot, no trompa completa.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_907567-mla74455176741_022024-o-12a574cbb9a438230917587304732884-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_628489-mla44724226632_012021-o-d6cbef2a67d0c2bb2417587304751929-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_856121-mla44724230795_012021-o-432fcda43d04b419c617587304797731-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_973915-mla44724221841_012021-o-984a822f258812718b17587304896504-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_839445-mla44724226725_012021-o-22f777af12991d11ce17587305003081-1024-1024.webp'] },
  { id: 'cubre-capot-traker-2017', name: 'Cubre Capot Chevrolet Tracker 2017', cat: 'Cubre Capots', catId: 'cat-cubre-capots', badge: 'OFERTA', price: '80.000', salePrice: '65.000', colors: ['#1a1a1a'], svg: capotSvg, desc: 'Cubre capot MDRACING para Chevrolet Tracker 2017. Ecocuero afelpado de excelente calidad.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_606489-mla44329640653_122020-o-0a95130f48c272234617587300046608-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_600758-mla44329655282_122020-o-5af8a3621e08680e9c17587300087632-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_806472-mla80062806251_102024-o-a88a195ca2027a362717587300121282-1024-1024.webp'] },
  { id: 'cubre-capot-peugeot-504', name: 'Cubre Capot Peugeot 504', cat: 'Cubre Capots', catId: 'cat-cubre-capots', badge: 'OFERTA', price: '80.000', salePrice: '65.000', colors: ['#1a1a1a'], svg: capotSvg, desc: 'Cubre capot MDRACING para Peugeot 504. Ecocuero afelpado, protección precisa.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_817193-mla89720660711_082025-o-dbcc8e5d2858bb543e17587297826343-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_940768-mla89353780542_082025-o-0788b8e69d37b305da17587297906747-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_889183-mla89720422255_082025-o-315282f12fc340562717587297844582-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_757565-mla89720769591_082025-o-830e8348ad5468641717587297860902-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_991765-mla89720442035_082025-o-ce3335dc47b90a042817587297877038-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_694922-mla89353453464_082025-o-90dbacfde04932f4f617587297892594-1024-1024.webp'] },
  { id: 'cubre-capot-peugeot-505', name: 'Cubre Capot Peugeot 505', cat: 'Cubre Capots', catId: 'cat-cubre-capots', badge: 'OFERTA', price: '80.000', salePrice: '65.000', colors: ['#1a1a1a'], svg: capotSvg, desc: 'Cubre capot MDRACING para Peugeot 505. Ecocuero de calidad, instalación sencilla.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_670870-mla89721155121_082025-o-798971c05b8200987317587292833598-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_859294-mla89354345190_082025-o-355e2637286255b43617587292850137-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_760448-mla89720471313_082025-o-26c2179952ae48b99f17587292866661-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_727388-mla89353641266_082025-o-29e8184557b661239817587292883342-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_614722-mla89720779067_082025-o-6fe071166f613f164b17587292900380-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_915523-mla89720421601_082025-o-8da7f91053b975da7417587292920481-1024-1024.webp'] },
  { id: 'cubre-capot-peugeot-406', name: 'Cubre Capot Peugeot 406', cat: 'Cubre Capots', catId: 'cat-cubre-capots', badge: 'OFERTA', price: '80.000', salePrice: '65.000', colors: ['#1a1a1a'], svg: capotSvg, desc: 'Cubre capot MDRACING para Peugeot 406. Ecocuero afelpado, ajuste perfecto.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_606307-mla89722522773_082025-o-fdc8d529fc6cbb53ca17587292424974-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_851398-mla89356157552_082025-o-102ffb64f0872835ab17587292444129-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_864810-mla89723154927_082025-o-cf0b7b99a6f00d188f17587292461834-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_778273-mla89722888439_082025-o-9b8a0528d88240a27717587292478820-1024-1024.webp'] },
  { id: 'cubre-capot-peugeot-2008', name: 'Cubre Capot Peugeot 2008', cat: 'Cubre Capots', catId: 'cat-cubre-capots', badge: null, price: '80.000', colors: ['#1a1a1a'], svg: capotSvg, desc: 'Cubre capot MDRACING para Peugeot 2008. Excelente calidad.', images: ['images/cubre-capots/cubre-capot-generica-1.webp','images/cubre-capots/cubre-capot-generica-2.webp','images/cubre-capots/cubre-capot-generica-3.webp','images/cubre-capots/cubre-capot-generica-4.webp'] },
  { id: 'cubre-capot-peugeot-308', name: 'Cubre Capot Peugeot 308', cat: 'Cubre Capots', catId: 'cat-cubre-capots', badge: null, price: '80.000', salePrice: '70.000', colors: ['#1a1a1a'], svg: capotSvg, desc: 'Cubre capot MDRACING para Peugeot 308. Solo cubre capot. Consultar para la trompa completa.', images: ['images/cubre-capots/cubre-capot-peugeot-308-1.webp','images/cubre-capots/cubre-capot-peugeot-308-2.webp'] },
  { id: 'cubre-capot-peugeot-307-linea-vieja', name: 'Cubre Capot Peugeot 307 Línea Vieja', cat: 'Cubre Capots', catId: 'cat-cubre-capots', badge: null, price: '80.000', salePrice: '70.000', colors: ['#1a1a1a'], svg: capotSvg, desc: 'Cubre capot MDRACING para Peugeot 307 línea vieja. Ecocuero afelpado de máxima calidad.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_879797-mla26338305020_112017-o-51a1111d8dac79ce4017587300793868-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_714376-mla26338305531_112017-o-f4256fab83d3e6df8317587300813997-1024-1024.webp'] },
  { id: 'cubre-capot-peugeot-306-98-2006', name: 'Cubre Capot Peugeot 306 98/2006', cat: 'Cubre Capots', catId: 'cat-cubre-capots', badge: null, price: '80.000', colors: ['#1a1a1a'], svg: capotSvg, desc: 'Cubre capot MDRACING para Peugeot 306 98/2006. Liquidación de stock, super precio.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_615474-mla74341849396_022024-b-48fd8e132e203c973517592379752608-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_978115-mla25160756250_112016-b-29dbd503d2f9a2e99b17592379818364-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_536115-mla25160758231_112016-b-a789d8e372cbe2e85317592380057383-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_939115-mla25160758228_112016-b-e93cc1ee91613b038117592380208972-1024-1024.webp'] },
  { id: 'cubre-capot-peugeot-301', name: 'Cubre Capot Peugeot 301', cat: 'Cubre Capots', catId: 'cat-cubre-capots', badge: null, price: '80.000', colors: ['#1a1a1a'], svg: capotSvg, desc: 'Cubre capot MDRACING para Peugeot 301. La nueva línea diseñada no trae deflectores.', images: ['images/cubre-capots/cubre-capot-peugeot-301-1.webp','images/cubre-capots/cubre-capot-peugeot-301-2.webp','images/cubre-capots/cubre-capot-peugeot-301-3.webp'] },
  { id: 'cubre-capot-peugeot-208', name: 'Cubre Capot Peugeot 208', cat: 'Cubre Capots', catId: 'cat-cubre-capots', badge: null, price: '80.000', salePrice: '70.000', colors: ['#1a1a1a'], svg: capotSvg, desc: 'Cubre capot MDRACING para Peugeot 208. Excelente calidad, disponible para todas las marcas.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_795319-mla80419895003_112024-o-e4519c23764bcac34f17587297045423-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_790347-mla80419703285_112024-o-0e188af1239147485917587296882610-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_711580-mla80163153332_112024-o-4434bb8e68ab6e109f17587297005223-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_854597-mla26723738771_012018-o-2f8af412aeae484ae517587296979515-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_985223-mla26723740693_012018-o-c0d6f43ad02a3f91dc17587296947611-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_907589-mla26723739782_012018-o-7e72e990f04ea06eb217587296922270-1024-1024.webp'] },
  { id: 'cubre-capot-fiat-palio-2001', name: 'Cubre Capot Fiat Palio 2001', cat: 'Cubre Capots', catId: 'cat-cubre-capots', badge: 'LIQUIDACIÓN', price: '80.000', salePrice: '18.000', colors: ['#1a1a1a'], svg: capotSvg, desc: 'Cubre capot MDRACING para Fiat Palio 2001. Ecocuero afelpado, precio de liquidación.', images: ['images/cubre-capots/cubre-capot-generica-1.webp','images/cubre-capots/cubre-capot-generica-2.webp','images/cubre-capots/cubre-capot-generica-3.webp','images/cubre-capots/cubre-capot-generica-4.webp'] },
  { id: 'cubre-capot-fiat-uno-2004', name: 'Cubre Capot Fiat Uno 2004', cat: 'Cubre Capots', catId: 'cat-cubre-capots', badge: null, price: '80.000', colors: ['#1a1a1a'], svg: capotSvg, desc: 'Cubre capot MDRACING para Fiat Uno 2004. Ecocuero afelpado, ajuste específico para este modelo.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_811840-mla89640219077_082025-o-8764dc0e837904706317587296282643-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_909657-mla74459870357_022024-o-b19c14e3f9264b452717587296303732-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_927862-mla48481776584_122021-o-bf9a101e1e9ea5e2d317587296316246-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_983959-mla48481762863_122021-o-ee8a37956ec23bf95a17587296329411-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_994847-mla48481558881_122021-o-f48244049fe7ea15fe17587296345363-1024-1024.webp'] },
  { id: 'cubre-capot-fiat-uno-2011', name: 'Cubre Capot Fiat Uno 2011', cat: 'Cubre Capots', catId: 'cat-cubre-capots', badge: 'LIQUIDACIÓN', price: '80.000', salePrice: '45.000', colors: ['#1a1a1a'], svg: capotSvg, desc: 'Cubre capot MDRACING para Fiat Uno 2011. Ecocuero de calidad.', images: ['images/cubre-capots/cubre-capot-generica-1.webp','images/cubre-capots/cubre-capot-generica-2.webp','images/cubre-capots/cubre-capot-generica-3.webp','images/cubre-capots/cubre-capot-generica-4.webp'] },
  { id: 'cubre-capot-fiat-toro-mdracing', name: 'Cubre Capot Fiat Toro', cat: 'Cubre Capots', catId: 'cat-cubre-capots', badge: null, price: '80.000', salePrice: '70.000', colors: ['#1a1a1a'], svg: capotSvg, desc: 'Cubre capot MDRACING para Fiat Toro. Excelente calidad ecocuero.', images: ['images/cubre-capots/cubre-capot-fiat-toro-1.webp','images/cubre-capots/cubre-capot-fiat-toro-2.webp','images/cubre-capots/cubre-capot-fiat-toro-3.webp','images/cubre-capots/cubre-capot-fiat-toro-4.webp'] },
  { id: 'cubre-capot-citroen-picasso', name: 'Cubre Capot Citroën Picasso', cat: 'Cubre Capots', catId: 'cat-cubre-capots', badge: null, price: '80.000', salePrice: '70.000', colors: ['#1a1a1a'], svg: capotSvg, desc: 'Cubre capot MDRACING para Citroën Picasso. Ecocuero afelpado, ajuste preciso.', images: ['images/cubre-capots/cubre-capot-generica-1.webp','images/cubre-capots/cubre-capot-generica-2.webp','images/cubre-capots/cubre-capot-generica-3.webp','images/cubre-capots/cubre-capot-generica-4.webp'] },
  { id: 'cubre-capot-citroen-berlingo', name: 'Cubre Capot Citroën Berlingo', cat: 'Cubre Capots', catId: 'cat-cubre-capots', badge: 'LIQUIDACIÓN', price: '80.000', salePrice: '45.000', colors: ['#1a1a1a'], svg: capotSvg, desc: 'Cubre capot MDRACING para Citroën Berlingo. Ecocuero de calidad.', images: ['images/cubre-capots/cubre-capot-berlingo-1.webp','images/cubre-capots/cubre-capot-berlingo-2.webp','images/cubre-capots/cubre-capot-berlingo-3.webp'] },

  // ─── CUBRE TROMPAS ───────────────────────────────────────────────────────
  { id: 'cubre-paragolpe-logan-nuevo', name: 'Cubre Trompa Renault Logan', cat: 'Cubre Trompas', catId: 'cat-cubre-trompas', badge: null, price: '310.000', colors: ['#1a1a1a'], svg: trompaSvg, desc: 'Cubre paragolpe MDRACING para Renault Logan. Consultá por tu auto, tenemos casi todos los moldes.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/download-bebc8c422afd4730ae17592450748683-640-0.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_793848-mla31084184858_062019-b-1a81e7629e3e7dd7e617592450832759-640-0.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_698831-mla31084223613_062019-b-f0ae9e7775b0f6a60717592450882671-640-0.webp'] },
  { id: 'cubre-trompa-completo-vw-gol-2013', name: 'Cubre Trompa VW Gol 2013', cat: 'Cubre Trompas', catId: 'cat-cubre-trompas', badge: null, price: '310.000', colors: ['#1a1a1a'], svg: trompaSvg, desc: 'Cubre trompa MDRACING para VW Gol 2013. Ecocuero afelpado, cubre capot y paragolpe completo.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_810277-mla26722632160_012018-b-cb599a61137c8e684a17592440293175-640-0.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_859655-mla26722637063_012018-b-4ca76b549f16f0db2b17592440385402-640-0.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_602850-mla26722619470_012018-b-a595e1699572baa3ca17592440432519-640-0.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_689212-mla26722630745_012018-b-1e72e1b91163de766517592440498246-640-0.webp'] },
  { id: 'cubre-trompa-vw-gol-saveiro', name: 'Cubre Trompa VW Gol/Saveiro', cat: 'Cubre Trompas', catId: 'cat-cubre-trompas', badge: null, price: '310.000', colors: ['#1a1a1a'], svg: trompaSvg, desc: 'Cubre trompa MDRACING para VW Gol/Saveiro. Protección completa del frente del vehículo.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_578605-mla25064118578_092016-b-6de64a43c60ce1b14617592464125122-1024-1024.webp'] },
  { id: 'cubre-trompa-vw-t-cross', name: 'Cubre Trompa VW T-Cross', cat: 'Cubre Trompas', catId: 'cat-cubre-trompas', badge: null, price: '310.000', colors: ['#1a1a1a'], svg: trompaSvg, desc: 'Cubre trompa MDRACING para VW T-Cross. Ecocuero afelpado, instalación sencilla.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_873052-mla45153348046_032021-b-fe421d7da4d92314ba17592443758092-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_889771-mla45153352012_032021-b-5ff8bb2145bf88100617592443809068-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_894619-mla45153349119_032021-b-6539248fbfe35dbc9717592443876367-1024-1024.webp'] },
  { id: 'cubre-trompa-completo-vw-polo-2017-con-baul', name: 'Cubre Trompa VW Polo 2017 con Baúl', cat: 'Cubre Trompas', catId: 'cat-cubre-trompas', badge: null, price: '310.000', colors: ['#1a1a1a'], svg: trompaSvg, desc: 'Cubre trompa MDRACING para VW Polo 2017 con baúl. Protección completa del frente.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_629746-mla26678831677_012018-b-1dd62b7fa617712f5917592445999000-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_892650-mla26678836684_012018-b-9e91cf24611f18b66917592446042006-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_724395-mla26678782474_012018-b-b00dc0b84cb021b80a17592446083460-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_808479-mla26678777473_012018-b-5d451afdb9cfa065b117592446139286-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_912880-mla26678847629_012018-b-1db9316406bb71caac17592446205197-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_788367-mla26678815297_012018-b-c0383de7dcc2730b0417592446244089-1024-1024.webp'] },
  { id: 'cubre-trompa-vw-amarok', name: 'Cubre Trompa VW Amarok', cat: 'Cubre Trompas', catId: 'cat-cubre-trompas', badge: 'OFERTA', price: '310.000', salePrice: '290.000', colors: ['#1a1a1a'], svg: trompaSvg, desc: 'Cubre trompa MDRACING para VW Amarok. Ecocuero afelpado, durabilidad y resistencia.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_731405-mla20847993310_082016-b-0121517b4e737c727b17592436575005-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_829305-mla20847997382_082016-b-499ac6d40a9487efaf17592436762005-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_388305-mla20847995417_082016-b-88ac713d0658fe4b6417592436705066-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_224405-mla20847995282_082016-b-4c658f4d7f96c9562f17592436642204-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_169305-mla20848000174_082016-b-99393fcae19f57dcfc17592436840707-1024-1024.webp'] },
  { id: 'cubre-trompa-completo-vw-vento', name: 'Cubre Trompa VW Vento', cat: 'Cubre Trompas', catId: 'cat-cubre-trompas', badge: 'OFERTA', price: '310.000', salePrice: '290.000', colors: ['#1a1a1a'], svg: trompaSvg, desc: 'Cubre trompa MDRACING para VW Vento. Protección completa del frente del vehículo.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_990333-mla26883972330_022018-b-300a3c794202acb6b217592461777475-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_769062-mla26883986643_022018-b-3bdfa80184b184d9fd17592461853021-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_638796-mla26857076021_022018-b-aa17db3d269628efa817592461408071-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_751584-mla26856973897_022018-b-72caeb52f81793a52117592461464087-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_735204-mla26857052611_022018-b-cdd5fa6a1525f5cb8d17592461515028-1024-1024.webp'] },
  { id: 'cubre-trompa-vw-polo-virtus-2018', name: 'Cubre Trompa VW Polo/Virtus 2018', cat: 'Cubre Trompas', catId: 'cat-cubre-trompas', badge: 'OFERTA', price: '310.000', salePrice: '290.000', colors: ['#1a1a1a'], svg: trompaSvg, desc: 'Cubre trompa MDRACING para VW Polo/Virtus 2018. Ecocuero afelpado, ajuste preciso.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_854360-mla80062807025_102024-b-7a8924e4354da4912c17593211300677-480-0.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_666905-mla44329491304_122020-b-9bf383af64556d43b817593211350211-480-0.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_627644-mla44329495354_122020-b-b79000e0a86f9da24017593211506437-480-0.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_956379-mla44329503034_122020-b-830e703656b96aec8317593211453483-480-0.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_881646-mla44329481741_122020-b-9e0a8f0e70bf90f3b517593211623251-480-0.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_777480-mla44329495313_122020-b-ec8fa88bc26c7d1f8517593211699150-480-0.webp'] },
  { id: 'cubre-trompa-chevrolet-agile-m3racing', name: 'Cubre Trompa Chevrolet Agile', cat: 'Cubre Trompas', catId: 'cat-cubre-trompas', badge: null, price: '310.000', colors: ['#1a1a1a'], svg: trompaSvg, desc: 'Cubre trompa MDRACING para Chevrolet Agile. Ecocuero afelpado, cubre capot y paragolpe.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_219115-mla25160778056_112016-b-34fc566717ffd621e117592438334375-480-0.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_489115-mla25160773811_112016-b-9b5550cee18b6e39c517592438390189-480-0.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_397115-mla25160778047_112016-b-c9e62c7fe6887ff49f17592438431719-480-0.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_466115-mla25160773815_112016-b-2f698994104c33e2eb17592438489974-480-0.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_815215-mla25160773808_112016-b-acaef5d79937f7c40517592438546018-480-0.webp'] },
  { id: 'cubre-trompa-onix-hasta-2016', name: 'Cubre Trompa Chevrolet Onix hasta 2016', cat: 'Cubre Trompas', catId: 'cat-cubre-trompas', badge: null, price: '310.000', colors: ['#1a1a1a'], svg: trompaSvg, desc: 'Cubre trompa MDRACING para Chevrolet Onix hasta 2016 (si es Joy se ajusta a todos).', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/download-78045e88aa274d946817592442312493-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_653238-mla26709927152_012018-b-2e285410c7edfc000017592442502276-480-0.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_794216-mla26709928626_012018-b-d4b9508ee5dfb6125217592442560257-480-0.webp'] },
  { id: 'cubre-trompa-chevrolet-onix-prisma-l-vieja-y-joy', name: 'Cubre Trompa Chevrolet Onix/Prisma L/Vieja y Joy', cat: 'Cubre Trompas', catId: 'cat-cubre-trompas', badge: null, price: '310.000', colors: ['#1a1a1a'], svg: trompaSvg, desc: 'Cubre trompa MDRACING para Chevrolet Onix Prisma línea vieja y Joy.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_887148-mla74341283998_022024-b-dff315b5aaf88b210717592453239114-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_940143-mla26857072233_022018-b-9b5b06522b99812cb517592453305723-480-0.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_861737-mla26857060733_022018-b-ff86d6ebf7b2711d6f17592453350196-480-0.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_813664-mla26857105618_022018-b-e6355abea5d45c27d817592453502621-480-0.webp'] },
  { id: 'cubre-trompa-chevrolet-onix-prisma-2017', name: 'Cubre Trompa Chevrolet Onix/Prisma 2017', cat: 'Cubre Trompas', catId: 'cat-cubre-trompas', badge: null, price: '310.000', colors: ['#1a1a1a'], svg: trompaSvg, desc: 'Cubre trompa MDRACING para Chevrolet Onix/Prisma 2017. Ecocuero afelpado.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_779513-mla44329665228_122020-b-915089558717f3830f17592468166530-480-0.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_770805-mla44329648745_122020-b-554962cae2025386fd17592468210914-480-0.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_790020-mla44329684126_122020-b-f78d69a2ed314bca3e17592468273096-480-0.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_952526-mla74337258164_022024-b-c09297a67e7b09db4917592468479515-480-0.webp'] },
  { id: 'cubre-trompa-chevrolet-cruze-2016', name: 'Cubre Trompa Chevrolet Cruze 2016', cat: 'Cubre Trompas', catId: 'cat-cubre-trompas', badge: null, price: '310.000', colors: ['#1a1a1a'], svg: trompaSvg, desc: 'Cubre trompa MDRACING para Chevrolet Cruze 2016. Protección completa del frente.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_372515-mla25257911283_012017-b-25c4f99c0c4640301517592466043692-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_920615-mla25257912336_012017-b-c4a29fae9c814dbddf17592466347675-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_688515-mla25257911278_012017-b-98503837c510bd069a17592466458876-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_416515-mla25257912341_012017-b-d8195b30b75212362817592466530943-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_510515-mla25257912328_012017-b-4a9beb7161b5488abf17592466659718-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_931379-mla44724259413_012021-b-4d778824317bf1e66617592466407130-1024-1024.webp'] },
  { id: 'cubre-trompa-ford-ecosport-kd-2018', name: 'Cubre Trompa Ford EcoSport KD 2018', cat: 'Cubre Trompas', catId: 'cat-cubre-trompas', badge: 'OFERTA', price: '310.000', salePrice: '290.000', colors: ['#1a1a1a'], svg: trompaSvg, desc: 'Cubre trompa MDRACING para Ford EcoSport KD 2018. Ecocuero afelpado, instalación sencilla.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_802824-mla26715683975_012018-b-6c137357da2068c57f17592453877222-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_734976-mla26715697598_012018-b-69d011bbe7bb7ee63717592453930908-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_966501-mla26715686458_012018-b-4ed15fbdde6e76372317592453984708-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_711940-mla26715683979_012018-b-8397366b5c031c7a5117592454228343-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_981932-mla26764341385_022018-b-5328841f57af6e9bbc17592454280619-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_602936-mla31576697755_072019-b-befb0a68810cb927d217592454326046-1024-1024.webp'] },
  { id: 'cubre-trompa-ford-fiesta-2015-a-2018', name: 'Cubre Trompa Ford Fiesta 2015 a 2018', cat: 'Cubre Trompas', catId: 'cat-cubre-trompas', badge: null, price: '310.000', colors: ['#1a1a1a'], svg: trompaSvg, desc: 'Cubre trompa MDRACING para Ford Fiesta 2015 a 2018. Ecocuero afelpado.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_821887-mla31083922883_062019-b-1a279a07390e18cd0217592454818181-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_679896-mla93825897685_092025-b-f594d2f3cd6d71b31b17592455141553-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_917434-mla31083928490_062019-b-61a7e9d30e4fd84bf117592455174833-1024-1024.webp'] },
  { id: 'cubre-trompa-ford-ka-kd-2017', name: 'Cubre Trompa Ford Ka KD 2017', cat: 'Cubre Trompas', catId: 'cat-cubre-trompas', badge: null, price: '310.000', colors: ['#1a1a1a'], svg: trompaSvg, desc: 'Cubre trompa MDRACING para Ford Ka KD 2017. Protección completa del frente.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_270415-mla25225358969_122016-b-d89ecb2d1ea1eca82417592469051710-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_985315-mla25225352912_122016-b-cf70f7483e8638422c17592469092330-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_981415-mla25225357033_122016-b-4f79e856d28a08ea5717592469141711-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_902656-mla31012063422_062019-b-11dbf6b5c73afdf56a17592469178382-1024-1024.webp'] },
  { id: 'cubre-trompa-renault-sandero-2017', name: 'Cubre Trompa Renault Sandero 2017', cat: 'Cubre Trompas', catId: 'cat-cubre-trompas', badge: 'OFERTA', price: '310.000', salePrice: '290.000', colors: ['#1a1a1a'], svg: trompaSvg, desc: 'Cubre trompa MDRACING para Renault Sandero 2017. Ecocuero afelpado, ajuste específico.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_815802-mla80064434407_102024-b-f02f29c30210589a7817592449352408-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_669708-mla31137473988_062019-b-c21872b5a55e4291ec17592449835542-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_717005-mla31137491609_062019-b-fe7962fa3eb52dbaba17592449890409-1024-1024.webp'] },
  { id: 'cubre-trompa-renault-logan-2015-a-2018', name: 'Cubre Trompa Renault Logan 2015 a 2018', cat: 'Cubre Trompas', catId: 'cat-cubre-trompas', badge: null, price: '310.000', colors: ['#1a1a1a'], svg: trompaSvg, desc: 'Cubre trompa MDRACING para Renault Logan 2015 a 2018 (última línea).', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/download-bebc8c422afd4730ae17592450748683-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_793848-mla31084184858_062019-b-1a81e7629e3e7dd7e617592450832759-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_698831-mla31084223613_062019-b-f0ae9e7775b0f6a60717592450882671-1024-1024.webp'] },
  { id: 'cubre-trompa-m3racing-peugeot-208', name: 'Cubre Trompa Peugeot 208', cat: 'Cubre Trompas', catId: 'cat-cubre-trompas', badge: 'OFERTA', price: '310.000', salePrice: '290.000', colors: ['#1a1a1a'], svg: trompaSvg, desc: 'Cubre trompa MDRACING para Peugeot 208, DISEÑO NUEVO. Ecocuero afelpado.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_614963-mla89181715518_082025-b-cd9fd6cad657705cb617592452208318-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_984840-mla89181031668_082025-b-d5befcec6e9ddaa8ba17592452279077-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_734454-mla80419720929_112024-b-7b6d7c402857832b4317592452352528-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_630302-mla80419720931_112024-b-b38632b1cd1f9ff7bc17592452386535-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_854415-mla25225336393_122016-b-8b1f594f3e01aa9a8917592452573150-1024-1024.webp'] },
  { id: 'cubre-trompa-peugeot-306-mdracing', name: 'Cubre Trompa Peugeot 306', cat: 'Cubre Trompas', catId: 'cat-cubre-trompas', badge: null, price: '310.000', colors: ['#1a1a1a'], svg: trompaSvg, desc: 'Cubre trompa MDRACING para Peugeot 306. Ecocuero afelpado, instalación sencilla.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_615474-mla74341849396_022024-b-48fd8e132e203c973517592379752608-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_978115-mla25160756250_112016-b-29dbd503d2f9a2e99b17592379818364-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_536115-mla25160758231_112016-b-a789d8e372cbe2e85317592380057383-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_939115-mla25160758228_112016-b-e93cc1ee91613b038117592380208972-1024-1024.webp'] },
  { id: 'cubre-trompa-peugeot-307-2006-en-adelante', name: 'Cubre Trompa Peugeot 307 (2006 en Adelante)', cat: 'Cubre Trompas', catId: 'cat-cubre-trompas', badge: null, price: '310.000', colors: ['#1a1a1a'], svg: trompaSvg, desc: 'Cubre trompa MDRACING para Peugeot 307 (2006 en adelante). Protección completa del frente.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_735179-mla26294910212_112017-b-676e9b124382e2f4f617592455989477-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_642523-mla26294911680_112017-b-2861b6daeebc149f7117592456072608-1024-1024.webp'] },
  { id: 'cubre-trompa-peugeot-307', name: 'Cubre Trompa Peugeot 307', cat: 'Cubre Trompas', catId: 'cat-cubre-trompas', badge: null, price: '310.000', colors: ['#1a1a1a'], svg: trompaSvg, desc: 'Cubre trompa MDRACING para Peugeot 307. Ecocuero afelpado, durabilidad y resistencia.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_721314-mla93471856536_102025-o-b51667cdd36e182f2e17593202262412-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_973611-mla93471740372_102025-o-52a0f0fa5ecd1e587c17593202947178-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_913168-mla93471610550_102025-o-7fad19fca4293abba417593202999887-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_913381-mla93471595648_102025-o-ed14b00b296ffd9e9617593202904246-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_770014-mla92672984086_092025-o-4356d47bd9118b419217593202218665-1024-1024.webp'] },
  { id: 'cubre-trompa-peugeot-2008', name: 'Cubre Trompa Peugeot 2008', cat: 'Cubre Trompas', catId: 'cat-cubre-trompas', badge: null, price: '310.000', colors: ['#1a1a1a'], svg: trompaSvg, desc: 'Cubre trompa MDRACING para Peugeot 2008. Protección completa contra impactos y rayones.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_492415-mla25225328456_122016-b-af9eff8fdf2028c17817592467427298-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_974315-mla25225327479_122016-b-3a586c09763003460417592467468415-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_275315-mla25225331931_122016-b-019c113a054835f7af17592467549011-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_854415-mla25225336393_122016-b-b0d1f365c873eee38717592467646460-1024-1024.webp'] },
  { id: 'cubre-trompa-citroen-c3-m3-racing-yioi8', name: 'Cubre Trompa Citroën C3', cat: 'Cubre Trompas', catId: 'cat-cubre-trompas', badge: 'LIQUIDACIÓN', price: '310.000', salePrice: '145.000', colors: ['#1a1a1a'], svg: trompaSvg, desc: 'Cubre trompa MDRACING para Citroën C3. Instalación con ganchos y elásticos para ajuste efectivo.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_821325-mla25422193623_032017-b-0d265d265c1f1ca32417592360017220-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_923452-mla26889142058_022018-b-b3e2c4d6ba1affb12817592375926506-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_911042-mla26889106349_022018-b-10cc2da0ba51f6b79217592376076251-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_894269-mla26889111344_022018-b-431e263d882704891c17592376131354-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_672146-mla26889135622_022018-b-0588d6606548f0641c17592376187159-1024-1024.webp'] },
  { id: 'cubre-trompa-citroen-c4', name: 'Cubre Trompa Citroën C4', cat: 'Cubre Trompas', catId: 'cat-cubre-trompas', badge: null, price: '310.000', colors: ['#1a1a1a'], svg: trompaSvg, desc: 'Cubre trompa MDRACING para Citroën C4. Ecocuero afelpado, protección completa.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_742552-mla80063036933_102024-b-45bd77a2033f1d1e2a17592464896074-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_741497-mla26631904773_012018-b-7daaedf903c71d26b017592465011852-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_903162-mla26631918061_012018-b-c88018bbf9440a0dc017592465077353-1024-1024.webp'] },
  { id: 'cubre-trompa-citroen-berlingo-partner', name: 'Cubre Trompa Citroën Berlingo/Partner', cat: 'Cubre Trompas', catId: 'cat-cubre-trompas', badge: 'OFERTA', price: '310.000', salePrice: '290.000', colors: ['#1a1a1a'], svg: trompaSvg, desc: 'Cubre trompa MDRACING para Citroën Berlingo/Partner. Ecocuero afelpado, instalación sencilla.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/cubre-trompa-berlingo-photoroom-1-6af664ecce017381ea17592460714338-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_927862-mla48481776584_122021-b-624f9bf8848400c5d917592459590598-1024-1024.webp'] },
  { id: 'cubre-trompa-audi-a4-hasta-2014', name: 'Cubre Trompa Audi A4 hasta 2014', cat: 'Cubre Trompas', catId: 'cat-cubre-trompas', badge: 'Premium', price: '310.000', salePrice: '290.000', colors: ['#1a1a1a'], svg: trompaSvg, desc: 'Cubre trompa MDRACING para Audi A4 hasta 2014. Ecocuero afelpado de alta calidad.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_994517-mla82550610845_022025-b-fc5e81e46cc81dd6b917592441236385-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_675009-mla26709955003_012018-b-85803d4be88285569c17592441275721-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_972290-mla26709931881_012018-b-2228be29fbc78aec3f17592441347319-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_857201-mla26709939281_012018-b-dcd0c5046c3a54c45017592441395912-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_887147-mla26709928425_012018-b-e37f68efa616aedda517592441496373-1024-1024.webp'] },
  { id: 'cubre-trompa-completa-audi-a3-2017-en-adelante', name: 'Cubre Trompa Audi A3 2017 en Adelante', cat: 'Cubre Trompas', catId: 'cat-cubre-trompas', badge: 'Premium', price: '310.000', salePrice: '290.000', colors: ['#1a1a1a'], svg: trompaSvg, desc: 'Cubre trompa MDRACING para Audi A3 (2017 en adelante). Ecocuero afelpado, ajuste específico.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_989918-mla26856434146_022018-b-7eeb9f38fc1cb8d46517592445126445-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_955801-mla82266632972_022025-b-2e7274d0d208f8e6bf17592444678778-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_819629-mla26856362984_022018-b-954dba1cdbc2151a8217592444725910-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_977534-mla26856436153_022018-b-762fe5aa6bdf52c37917592444986320-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_967861-mla26856462063_022018-b-6a1af1d5e5b6e7403617592444799247-1024-1024.webp'] },
  { id: 'cubre-trompa-completo-bmw-320-2013-17', name: 'Cubre Trompa BMW 320 2013/2017', cat: 'Cubre Trompas', catId: 'cat-cubre-trompas', badge: 'Premium', price: '310.000', colors: ['#1a1a1a'], svg: trompaSvg, desc: 'Cubre trompa MDRACING para BMW 320 2013/2017. Protección premium para un vehículo premium.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_827715-mla44291644364_122020-b-7c6fb760478afb217a17592448211495-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_927251-mla44724756622_012021-b-7ea1647aada11e3abd17592448343872-1024-1024.webp'] },
  { id: 'cubre-trompa-honda-civic-2008', name: 'Cubre Trompa Honda Civic 2008', cat: 'Cubre Trompas', catId: 'cat-cubre-trompas', badge: null, price: '310.000', colors: ['#1a1a1a'], svg: trompaSvg, desc: 'Cubre trompa MDRACING para Honda Civic 2008. Verificar modelo por variaciones en faros auxiliares.' },
  { id: 'cubre-trompa-honda-hrv', name: 'Cubre Trompa Honda HR-V', cat: 'Cubre Trompas', catId: 'cat-cubre-trompas', badge: null, price: '310.000', colors: ['#1a1a1a'], svg: trompaSvg, desc: 'Cubre trompa MDRACING para Honda HR-V. Ecocuero afelpado, instalación sencilla.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_873495-mla29310028330_022019-b-4919d246902e52946217592447091791-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_783628-mla29310027812_022019-b-5764740a8c7195203617592447027120-1024-1024.webp'] },
  { id: 'cubre-trompa-toyota-etios', name: 'Cubre Trompa Toyota Etios', cat: 'Cubre Trompas', catId: 'cat-cubre-trompas', badge: 'OFERTA', price: '310.000', salePrice: '290.000', colors: ['#1a1a1a'], svg: trompaSvg, desc: 'Cubre trompa MDRACING para Toyota Etios. Ecocuero afelpado, protección completa del frente.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_540115-mla25208828794_122016-b-24fdd4ac2abd14577417592456991563-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_722115-mla25208824819_122016-b-df6c97447a4b65824217592456847820-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_344015-mla25208828687_122016-b-1b7b2445bd74f8889617592456885017-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_447015-mla25208829064_122016-b-218d839289ac41bbda17592456928319-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_632133-mla93825763687_092025-b-d7aabfb0c4c38c705e17592457107236-1024-1024.webp'] },
  { id: 'cubre-trompa-toyota-corolla-2014', name: 'Cubre Trompa Toyota Corolla 2014', cat: 'Cubre Trompas', catId: 'cat-cubre-trompas', badge: 'OFERTA', price: '310.000', salePrice: '290.000', colors: ['#1a1a1a'], svg: trompaSvg, desc: 'Cubre trompa MDRACING para Toyota Corolla 2014. Ecocuero afelpado de alta calidad.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_829505-mla44329878383_122020-b-53297a0b5df267c2fc17592462982871-480-0.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_914318-mla44329859499_122020-b-c595b90bfd7535fb0c17592463090425-480-0.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_812894-mla44329859526_122020-b-be097ce6e3d34fa10117592463187819-480-0.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_711095-mla44329881617_122020-b-caa323bace42f7403917592463322862-480-0.webp'] },
  { id: 'cubre-trompa-fiat-toro-linea-vieja', name: 'Cubre Trompa Fiat Toro Línea Vieja', cat: 'Cubre Trompas', catId: 'cat-cubre-trompas', badge: null, price: '310.000', colors: ['#1a1a1a'], svg: trompaSvg, desc: 'Cubre trompa MDRACING para Fiat Toro línea vieja. Ecocuero afelpado, ajuste preciso.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/download-a51817346d5a9239ce17593215273293-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_308115-mla25160756237_112016-b-338a2c33cdce6e83df17593215351363-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_978115-mla25160756250_112016-b-2d3a6151663955070e17593215413422-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_939115-mla25160758228_112016-b-8d155898ac3f12e20017593215487198-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_872352-mla79810000364_102024-b-567d7d796fc16eca9a17593215617253-1024-1024.webp'] },

  // ─── CUBRE AUTOS / CAMIONETAS ────────────────────────────────────────────
  { id: 'funda-cubre-camioneta-antigranizo-vw-amarok', name: 'Funda Antigranizo 3 Capas VW Amarok', cat: 'Cubre Autos', catId: 'cat-cubre-autos', badge: 'Más Vendido', price: '140.000', salePrice: '135.000', colors: ['#1a1a1a'], svg: coverSvg, desc: 'Antigranizo 3 capas para VW Amarok. Tela Silver exterior impermeable + Polyfoam 6mm + interior afelpado. 5,4x1,5x1,5m.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/download-19d181ee4c9cbe5bb817624307334850-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5Fnp%5F2x%5F674313-mla98247217315%5F112025-f-84314e6c1e8a4a44eb17733414759342-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5Fnp%5F2x%5F890100-mla98246262917%5F112025-f-79a188b5f53f7dcf5e17733414777556-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5Fnp%5F2x%5F817066-mla98247216701%5F112025-f-eb313d1a697290546117733414794330-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5F2x%5F618584-mla92357730948%5F092025-b-0322aa41cd7e50105517592385201320-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5F2x%5F761660-mla92766139459%5F092025-t-5ee5913d41d68d2eef17592385251592-1024-1024.webp'] },
  { id: 'funda-cubre-camioneta-antigranizo-3-capas-impermeable-mitsubishi-l200', name: 'Funda Antigranizo 3 Capas Mitsubishi L200', cat: 'Cubre Autos', catId: 'cat-cubre-autos', badge: null, price: '140.000', salePrice: '135.000', colors: ['#1a1a1a'], svg: coverSvg, desc: 'Antigranizo 3 capas para Mitsubishi L200. Tela Silver, Polyfoam 6mm, interior suave. Medidas 5,4x1,5x1,5m.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/mitsubishi-l200-antigranizo-bb2355492f783aed9717592385731833-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5Fnp%5F2x%5F674313-mla98247217315%5F112025-f-6fcfdd2f12f1aedb1117733415789312-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5Fnp%5F2x%5F890100-mla98246262917%5F112025-f-a3f54e75f0c249fb9c17733415802973-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5Fnp%5F2x%5F817066-mla98247216701%5F112025-f-18495982104ea8e01717733415818862-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5F2x%5F618584-mla92357730948%5F092025-b-d3bef20c927f57bb9217592386365123-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5F2x%5F761660-mla92766139459%5F092025-b-646da77aed84f5dfba17592386413798-1024-1024.webp'] },
  { id: 'funda-cubre-camioneta-antigranizo-3-capas-impermeable-ford-ranger', name: 'Funda Antigranizo 3 Capas Ford Ranger', cat: 'Cubre Autos', catId: 'cat-cubre-autos', badge: 'Más Vendido', price: '140.000', salePrice: '135.000', colors: ['#1a1a1a'], svg: coverSvg, desc: 'Antigranizo 3 capas para Ford Ranger. Triple capa con Polyfoam 6mm, impermeable y antirrayones.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/ford-ranger-antigranizo-a31b32152e704c8eff17592386661341-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_2x_674313-mla98247217315_112025-f-9ac604dbe27caba06b17733414137227-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_2x_890100-mla98246262917_112025-f-85e227d8e5fb48daa817733414187730-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_2x_817066-mla98247216701_112025-f-bb1a1931288fba994e17733414228579-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_618584-mla92357730948_092025-b-7ab9f9d04ec6966d0717592387008506-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_761660-mla92766139459_092025-b-85c4c40e69269ed40f17592387055905-1024-1024.webp'] },
  { id: 'funda-cubre-camioneta-antigranizo-3-capas-impermeable-chevrolet-s10', name: 'Funda Antigranizo 3 Capas Chevrolet S10', cat: 'Cubre Autos', catId: 'cat-cubre-autos', badge: null, price: '140.000', salePrice: '135.000', colors: ['#1a1a1a'], svg: coverSvg, desc: 'Antigranizo 3 capas para Chevrolet S10. Tela Silver exterior, Polyfoam 6mm, fácil guardado.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/chevrolet-s10-antigranizo-45221c3a23147ee2b317592387233397-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_2x_674313-mla98247217315_112025-f-6bbe77f8d23126183017733415277907-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_2x_890100-mla98246262917_112025-f-95d2236bde000fe39d17733415301831-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_2x_817066-mla98247216701_112025-f-4af563f566427a6ad717733415315833-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_618584-mla92357730948_092025-b-a5577f71e11106b82917592387546455-1024-1024.webp'] },
  { id: 'funda-cubre-camioneta-antigranizo-3-capas-impermeable-toyota-hilux', name: 'Funda Antigranizo 3 Capas Toyota Hilux', cat: 'Cubre Autos', catId: 'cat-cubre-autos', badge: 'Más Vendido', price: '140.000', salePrice: '135.000', colors: ['#1a1a1a'], svg: coverSvg, desc: 'Antigranizo 3 capas para Toyota Hilux. Polyfoam 6mm, elástico perimetral, incluye bolsa de regalo.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/toyota-hilux-fondo-blanco-photoroom-bdd1fc918f88d65c7717624307664816-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_2x_674313-mla98247217315_112025-f-25092cd7fff16ceae617733412895434-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_2x_890100-mla98246262917_112025-f-01aff221894e1a69a717733413157262-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_2x_817066-mla98247216701_112025-f-ec4783e1a2ad02b29917733413217062-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_618584-mla92357730948_092025-b-aa6764329c76e4a2a117592389555096-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_761660-mla92766139459_092025-b-73016349644d3649c717592389596296-1024-1024.webp'] },
  { id: 'funda-cubre-camioneta-antigranizo-alaskan-nissan-frontier', name: 'Funda Antigranizo 3 Capas Renault Alaskan / Nissan Frontier', cat: 'Cubre Autos', catId: 'cat-cubre-autos', badge: null, price: '140.000', salePrice: '135.000', colors: ['#1a1a1a'], svg: coverSvg, desc: 'Antigranizo 3 capas para Renault Alaskan / Nissan Frontier. Triple capa impermeable con Polyfoam.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/assets%5Ftask%5F01k4th668tfj6sh3j04ycz3tyr%5F1757532158%5Fimg%5F0-215593930ef43d2e6b17592390671148-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/assets%5Ftask%5F01k4tgvfwpe0et136kad0az0rb%5F1757531816%5Fimg%5F0-d3e79786b4ed8c1c2c17592390716603-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5Fnp%5F2x%5F674313-mla98247217315%5F112025-f-8ae9cfdefb5619bd6d17733416124760-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5Fnp%5F2x%5F890100-mla98246262917%5F112025-f-58ee1f86b8f1be395817733416159124-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5Fnp%5F2x%5F817066-mla98247216701%5F112025-f-574b3362d1ec730da317733416174273-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5F2x%5F618584-mla92357730948%5F092025-b-bf1125e2581c49aa7117592391996704-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5F2x%5F761660-mla92766139459%5F092025-b-fe1568d76d16e8008e17592392040439-1024-1024.webp'] },
  { id: 'funda-cubre-auto-premium-afelpado-impermeable4', name: 'Funda Cubre Auto Premium Afelpado', cat: 'Cubre Autos', catId: 'cat-cubre-autos', badge: 'Premium', price: '180.000', colors: ['#1a1a1a','#888888'], svg: coverSvg, desc: 'Funda premium con interior afelpado e impermeable. Tela Kipling alta calidad. Talles S/M/L y XL ($210.000).', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/cubre-auto-premium-ng-photoroom-def6f3b4ec257686a617624317809918-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5F2x%5F915538-mla81837544625%5F012025-b-be66e08032be767f5a17612384213935-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/74dc3f55-c51f-41c5-8511-4da11bb451b9-cdf7a380548317762117612383751398-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5F2x%5F949309-mla81567224900%5F012025-b-4635e88190e547ec2917612384073326-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/2efeae4f-ce1a-40ee-93a1-70e396f5d233-94d874bbf5203e84af17612383808168-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5F2x%5F697048-mla81567244720%5F012025-b-203cba0cc2ced5a05817612384152917-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5F2x%5F603661-mla81837875457%5F012025-b-03257e641a2b2f959b17612384180280-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/3bf84c57-3e28-4d9b-8dd9-8a7a11e4643d-77a82758cef9e344d217612383878488-1024-1024.webp'] },
  { id: 'funda-cubre-auto-antigranizo-3-capas-impermeable', name: 'Funda Cubre Auto Antigranizo 3 Capas Impermeable', cat: 'Cubre Autos', catId: 'cat-cubre-autos', badge: 'Más Vendido', price: '130.000', salePrice: '110.000', colors: ['#1a1a1a'], svg: coverSvg, desc: 'Funda cubre auto antigranizo universal 3 capas. Tela Silver exterior impermeable + Polyfoam 6mm + interior afelpado. Elástico perimetral. Talle S/M/L: $135.000 · XL: $150.000.', sizeVariants: [{label:'S',price:'135.000'},{label:'M',price:'135.000'},{label:'L',price:'135.000'},{label:'XL',price:'150.000'}], images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/assets%5Ftask%5F01k7ky0myxf3jr4g3jy99ag6f0%5F1760531937%5Fimg%5F0-eab6a87d6fb053554317611332655636-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/assets%5Ftask%5F01k7m29tm2f1rr3vt2fh57t2x0%5F1760536456%5Fimg%5F0-e29021bebcdae9a5a217611332829135-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/assets%5Ftask%5F01k7kz4aw0fajat52c7fsg357c%5F1760533127%5Fimg%5F0-e5001dfb836d768dc317611332732286-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5F2x%5F726652-mla94773545596%5F102025-b-d4b989af0ea5c58b5e17611332998889-1024-1024.webp'] },
  { id: 'funda-cubre-auto-vw-tera-2025-tela-silver', name: 'Funda Cubre Auto VW Tera 2025', cat: 'Cubre Autos', catId: 'cat-cubre-autos', badge: 'Nuevo', price: '110.000', salePrice: '99.999', colors: ['#1a1a1a'], svg: coverSvg, desc: 'Funda cubre auto tela Silver para VW Tera 2025. Impermeable, protección UV, interior suave. Elástico perimetral. Talle L/XL según versión.', images: ['https://http2.mlstatic.com/D_NQ_NP_964759-MLA98384413641_112025-O.webp','https://http2.mlstatic.com/D_NQ_NP_842740-MLA98377408815_112025-O.webp','https://http2.mlstatic.com/D_NQ_NP_988515-MLA97909255146_112025-O.webp'] },
  { id: 'funda-cubre-auto-antigranizo-vw-taos-3-capas', name: 'Funda Antigranizo 3 Capas VW Taos', cat: 'Cubre Autos', catId: 'cat-cubre-autos', badge: null, price: '150.000', salePrice: '140.000', colors: ['#1a1a1a'], svg: coverSvg, desc: 'Funda antigranizo 3 capas para VW Taos. Tela Silver exterior impermeable + Polyfoam 6mm + interior afelpado. Protege contra granizo intenso.', images: ['https://http2.mlstatic.com/D_NQ_NP_951543-MLA103221813496_012026-O.webp','https://http2.mlstatic.com/D_NQ_NP_628889-MLA103221751142_012026-O.webp','https://http2.mlstatic.com/D_NQ_NP_991318-MLA103740574715_012026-O.webp'] },
  { id: 'funda-cubre-auto-tela-silver-vw-taos', name: 'Funda Cubre Auto VW Taos Tela Silver', cat: 'Cubre Autos', catId: 'cat-cubre-autos', badge: null, price: '130.000', salePrice: '125.000', colors: ['#1a1a1a'], svg: coverSvg, desc: 'Funda cubre auto tela Silver impermeable para VW Taos. Liviana, resistente a lluvia, sol y polvo. Elástico perimetral.', images: ['https://http2.mlstatic.com/D_NQ_NP_900382-MLA106786551934_022026-O.webp','https://http2.mlstatic.com/D_NQ_NP_945819-MLA107456889993_022026-O.webp','https://http2.mlstatic.com/D_NQ_NP_791338-MLA106785547494_022026-O.webp'] },
  { id: 'funda-cubre-auto-antigranizo-polo-track-3-capas', name: 'Funda Antigranizo 3 Capas VW Polo Track', cat: 'Cubre Autos', catId: 'cat-cubre-autos', badge: 'A medida', price: '135.000', salePrice: '113.999', colors: ['#1a1a1a'], svg: coverSvg, desc: 'Funda antigranizo 3 capas para VW Polo Track. Tela Silver impermeable + Polyfoam 6mm + interior afelpado. Protege contra granizo, lluvia y sol.', images: ['https://http2.mlstatic.com/D_NQ_NP_988998-MLA107638054681_022026-O.webp','https://http2.mlstatic.com/D_NQ_NP_869096-MLA107641527129_022026-O.webp','https://http2.mlstatic.com/D_NQ_NP_812982-MLA107638031807_022026-O.webp','https://http2.mlstatic.com/D_NQ_NP_671760-MLA107641617453_022026-O.webp'] },
  { id: 'funda-cubre-auto-antigranizo-toyota-sw4-3-capas', name: 'Funda Antigranizo 3 Capas Toyota SW4', cat: 'Cubre Autos', catId: 'cat-cubre-autos', badge: 'Exclusivo', price: '165.000', salePrice: '150.000', colors: ['#1a1a1a'], svg: coverSvg, desc: 'Funda antigranizo 3 capas para Toyota SW4. Tela Silver exterior + Polyfoam 6mm alta densidad + interior afelpado. Talle XL.', images: ['https://http2.mlstatic.com/D_NQ_NP_847498-MLA101675603735_122025-O.webp','https://http2.mlstatic.com/D_NQ_NP_888944-MLA97102440184_112025-O.webp','https://http2.mlstatic.com/D_NQ_NP_891009-MLA97561305371_112025-O.webp'] },

  // ─── CUBRE MOTOS ─────────────────────────────────────────────────────────
  { id: 'funda-cubre-moto-silver-impermeable', name: 'Funda Silver Cubre Moto', cat: 'Cubre Motos', catId: 'cat-cubre-motos', badge: null, price: '26.000', colors: ['#1a1a1a'], svg: motoSvg, desc: 'Funda Silver para motos y scooters. Impermeable, protección UV, resistente al polvo y lluvia. Interior plateado suave que no raya. Bolso incluido. Disponible en 5 talles según largo de la moto: Talle S 1,95m · Talle M 2,05m · Talle L 2,15m · Talle XL 2,25m · Talle XXL 2,35m.', sizeVariants: [{label:'S/M/L',price:'26.000',salePrice:'23.999'},{label:'XL',price:'30.000',salePrice:'26.000'},{label:'XXL',price:'34.000',salePrice:'30.000'}], images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_611065-mla94923201172_102025-b-e5b80a1484fb037bb117611346308065-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_605998-mla95357172459_102025-b-995a50ebcf49f9e5ca17611346405395-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_622395-mla95358375093_102025-b-996fe2a97ff9f9e86817611346440451-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_613313-mla95358179509_102025-b-ad69b33dffc1a5d5cc17611346490788-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_641495-mla95085858489_102025-b-03f6973619d389c5c817611346539549-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_782345-mla94654556870_102025-b-d6f52dd2bc746f7d6717611346578310-1024-1024.webp'] },

  // ─── ALFOMBRAS TERMOFORMADAS ─────────────────────────────────────────────
  // JEEP
  { id: 'alfombra-termoformada-jeep-renegade-7088', name: 'Alfombra Termoformada Jeep Renegade 2015+', cat: 'Alfombras Termoformadas', catId: 'cat-alfombras-termoformadas', badge: null, price: '190.000', colors: ['#1a1a1a'], svg: alfombraSvg, desc: 'ALFOMBRAS TERMOFORMADAS MDRACING – AJUSTE PERFECTO\n\nModelo: Jeep Renegade 2015+\n\nProtegé el interior de tu vehículo con las alfombras termoformadas MDRACING, diseñadas específicamente para cada modelo de auto. Ofrecen máxima protección, excelente ajuste y un acabado moderno y funcional.\nFabricadas con materiales de alta calidad, estas alfombras se adaptan perfectamente a la forma original del piso del vehículo, cubriendo las zonas más expuestas al desgaste diario, suciedad, barro y líquidos.\n\nCARACTERÍSTICAS PRINCIPALES\n• Diseño termoformado a medida\n• Ajuste perfecto según el modelo indicado\n• Material resistente, durable y flexible\n• Bordes elevados que evitan derrames\n• Superficie antideslizante\n• Incluyen clips de sujeción para una fijación segura\n• Fácil limpieza (agua o paño húmedo)\n• No retienen olor\n• Mantienen el interior del vehículo protegido y prolijo\n\nBENEFICIOS\n• Protegen la alfombra original del auto\n• Evitan manchas, humedad y desgaste\n• Mejoran la estética interior\n• Fijación firme que evita desplazamientos\n• Ideales para uso urbano, viajes, lluvia, barro o arena\n\nCONTENIDO DEL PAQUETE\n• Juego completo de alfombras termoformadas (delanteras y traseras, según modelo)\n\nIMPORTANTE\n• Producto diseñado exclusivamente para el modelo indicado\n• Las imágenes publicadas corresponden al producto real', images: ['images/alfombras%20termoformadas/Alfombra%20Termoformada%20Jeep%20Renegade%202015%2B/1.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/3.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/4.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/5.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/6.webp'] },
  { id: 'alfombra-termoformada-jeep-commander-7asientos-7089', name: 'Alfombra Termoformada Jeep Commander 7 Asientos 2020+', cat: 'Alfombras Termoformadas', catId: 'cat-alfombras-termoformadas', badge: null, price: '190.000', colors: ['#1a1a1a'], svg: alfombraSvg, desc: 'ALFOMBRAS TERMOFORMADAS MDRACING – AJUSTE PERFECTO\n\nModelo: Jeep Commander 7 Asientos 2020+\n\nProtegé el interior de tu vehículo con las alfombras termoformadas MDRACING, diseñadas específicamente para cada modelo de auto. Ofrecen máxima protección, excelente ajuste y un acabado moderno y funcional.\nFabricadas con materiales de alta calidad, estas alfombras se adaptan perfectamente a la forma original del piso del vehículo, cubriendo las zonas más expuestas al desgaste diario, suciedad, barro y líquidos.\n\nCARACTERÍSTICAS PRINCIPALES\n• Diseño termoformado a medida\n• Ajuste perfecto según el modelo indicado\n• Material resistente, durable y flexible\n• Bordes elevados que evitan derrames\n• Superficie antideslizante\n• Incluyen clips de sujeción para una fijación segura\n• Fácil limpieza (agua o paño húmedo)\n• No retienen olor\n• Mantienen el interior del vehículo protegido y prolijo\n\nBENEFICIOS\n• Protegen la alfombra original del auto\n• Evitan manchas, humedad y desgaste\n• Mejoran la estética interior\n• Fijación firme que evita desplazamientos\n• Ideales para uso urbano, viajes, lluvia, barro o arena\n\nCONTENIDO DEL PAQUETE\n• Juego completo de alfombras termoformadas (delanteras y traseras, según modelo)\n\nIMPORTANTE\n• Producto diseñado exclusivamente para el modelo indicado\n• Las imágenes publicadas corresponden al producto real', images: ['/images/alfombras%20termoformadas/fotos%203%204%205%206/3.webp','/images/alfombras%20termoformadas/fotos%203%204%205%206/4.webp','/images/alfombras%20termoformadas/fotos%203%204%205%206/5.webp','/images/alfombras%20termoformadas/fotos%203%204%205%206/6.webp'] },
  { id: 'alfombra-termoformada-jeep-compass-2025-7090', name: 'Alfombra Termoformada Jeep Compass 2025', cat: 'Alfombras Termoformadas', catId: 'cat-alfombras-termoformadas', badge: null, price: '190.000', colors: ['#1a1a1a'], svg: alfombraSvg, desc: 'ALFOMBRAS TERMOFORMADAS MDRACING – AJUSTE PERFECTO\n\nModelo: Jeep Compass 2025\n\nProtegé el interior de tu vehículo con las alfombras termoformadas MDRACING, diseñadas específicamente para cada modelo de auto. Ofrecen máxima protección, excelente ajuste y un acabado moderno y funcional.\nFabricadas con materiales de alta calidad, estas alfombras se adaptan perfectamente a la forma original del piso del vehículo, cubriendo las zonas más expuestas al desgaste diario, suciedad, barro y líquidos.\n\nCARACTERÍSTICAS PRINCIPALES\n• Diseño termoformado a medida\n• Ajuste perfecto según el modelo indicado\n• Material resistente, durable y flexible\n• Bordes elevados que evitan derrames\n• Superficie antideslizante\n• Incluyen clips de sujeción para una fijación segura\n• Fácil limpieza (agua o paño húmedo)\n• No retienen olor\n• Mantienen el interior del vehículo protegido y prolijo\n\nBENEFICIOS\n• Protegen la alfombra original del auto\n• Evitan manchas, humedad y desgaste\n• Mejoran la estética interior\n• Fijación firme que evita desplazamientos\n• Ideales para uso urbano, viajes, lluvia, barro o arena\n\nCONTENIDO DEL PAQUETE\n• Juego completo de alfombras termoformadas (delanteras y traseras, según modelo)\n\nIMPORTANTE\n• Producto diseñado exclusivamente para el modelo indicado\n• Las imágenes publicadas corresponden al producto real', images: ['images/alfombras%20termoformadas/Alfombra%20Termoformada%20Jeep%20Compass%202025/1.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/3.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/4.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/5.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/6.webp'] },
  // FIAT
  { id: 'alfombra-termoformada-fiat-argo-cronos-7072', name: 'Alfombra Termoformada Fiat Argo / Cronos', cat: 'Alfombras Termoformadas', catId: 'cat-alfombras-termoformadas', badge: null, price: '190.000', colors: ['#1a1a1a'], svg: alfombraSvg, desc: 'ALFOMBRAS TERMOFORMADAS MDRACING – AJUSTE PERFECTO\n\nModelo: Fiat Argo / Cronos\n\nProtegé el interior de tu vehículo con las alfombras termoformadas MDRACING, diseñadas específicamente para cada modelo de auto. Ofrecen máxima protección, excelente ajuste y un acabado moderno y funcional.\nFabricadas con materiales de alta calidad, estas alfombras se adaptan perfectamente a la forma original del piso del vehículo, cubriendo las zonas más expuestas al desgaste diario, suciedad, barro y líquidos.\n\nCARACTERÍSTICAS PRINCIPALES\n• Diseño termoformado a medida\n• Ajuste perfecto según el modelo indicado\n• Material resistente, durable y flexible\n• Bordes elevados que evitan derrames\n• Superficie antideslizante\n• Incluyen clips de sujeción para una fijación segura\n• Fácil limpieza (agua o paño húmedo)\n• No retienen olor\n• Mantienen el interior del vehículo protegido y prolijo\n\nBENEFICIOS\n• Protegen la alfombra original del auto\n• Evitan manchas, humedad y desgaste\n• Mejoran la estética interior\n• Fijación firme que evita desplazamientos\n• Ideales para uso urbano, viajes, lluvia, barro o arena\n\nCONTENIDO DEL PAQUETE\n• Juego completo de alfombras termoformadas (delanteras y traseras, según modelo)\n\nIMPORTANTE\n• Producto diseñado exclusivamente para el modelo indicado\n• Las imágenes publicadas corresponden al producto real', images: ['images/alfombras%20termoformadas/Alfombra%20Termoformada%20Fiat%20Argo%20%20Cronos/1.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/3.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/4.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/5.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/6.webp'] },
  { id: 'alfombra-termoformada-fiat-toro-7091', name: 'Alfombra Termoformada Fiat Toro', cat: 'Alfombras Termoformadas', catId: 'cat-alfombras-termoformadas', badge: null, price: '190.000', colors: ['#1a1a1a'], svg: alfombraSvg, desc: 'ALFOMBRAS TERMOFORMADAS MDRACING – AJUSTE PERFECTO\n\nModelo: Fiat Toro\n\nProtegé el interior de tu vehículo con las alfombras termoformadas MDRACING, diseñadas específicamente para cada modelo de auto. Ofrecen máxima protección, excelente ajuste y un acabado moderno y funcional.\nFabricadas con materiales de alta calidad, estas alfombras se adaptan perfectamente a la forma original del piso del vehículo, cubriendo las zonas más expuestas al desgaste diario, suciedad, barro y líquidos.\n\nCARACTERÍSTICAS PRINCIPALES\n• Diseño termoformado a medida\n• Ajuste perfecto según el modelo indicado\n• Material resistente, durable y flexible\n• Bordes elevados que evitan derrames\n• Superficie antideslizante\n• Incluyen clips de sujeción para una fijación segura\n• Fácil limpieza (agua o paño húmedo)\n• No retienen olor\n• Mantienen el interior del vehículo protegido y prolijo\n\nBENEFICIOS\n• Protegen la alfombra original del auto\n• Evitan manchas, humedad y desgaste\n• Mejoran la estética interior\n• Fijación firme que evita desplazamientos\n• Ideales para uso urbano, viajes, lluvia, barro o arena\n\nCONTENIDO DEL PAQUETE\n• Juego completo de alfombras termoformadas (delanteras y traseras, según modelo)\n\nIMPORTANTE\n• Producto diseñado exclusivamente para el modelo indicado\n• Las imágenes publicadas corresponden al producto real', images: ['images/alfombras%20termoformadas/Alfombra%20Termoformada%20Fiat%20Toro/1.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/3.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/4.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/5.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/6.webp'] },
  { id: 'alfombra-termoformada-fiat-fastback-pulse-7092', name: 'Alfombra Termoformada Fiat Fastback / Pulse', cat: 'Alfombras Termoformadas', catId: 'cat-alfombras-termoformadas', badge: null, price: '190.000', colors: ['#1a1a1a'], svg: alfombraSvg, desc: 'ALFOMBRAS TERMOFORMADAS MDRACING – AJUSTE PERFECTO\n\nModelo: Fiat Fastback / Pulse\n\nProtegé el interior de tu vehículo con las alfombras termoformadas MDRACING, diseñadas específicamente para cada modelo de auto. Ofrecen máxima protección, excelente ajuste y un acabado moderno y funcional.\nFabricadas con materiales de alta calidad, estas alfombras se adaptan perfectamente a la forma original del piso del vehículo, cubriendo las zonas más expuestas al desgaste diario, suciedad, barro y líquidos.\n\nCARACTERÍSTICAS PRINCIPALES\n• Diseño termoformado a medida\n• Ajuste perfecto según el modelo indicado\n• Material resistente, durable y flexible\n• Bordes elevados que evitan derrames\n• Superficie antideslizante\n• Incluyen clips de sujeción para una fijación segura\n• Fácil limpieza (agua o paño húmedo)\n• No retienen olor\n• Mantienen el interior del vehículo protegido y prolijo\n\nBENEFICIOS\n• Protegen la alfombra original del auto\n• Evitan manchas, humedad y desgaste\n• Mejoran la estética interior\n• Fijación firme que evita desplazamientos\n• Ideales para uso urbano, viajes, lluvia, barro o arena\n\nCONTENIDO DEL PAQUETE\n• Juego completo de alfombras termoformadas (delanteras y traseras, según modelo)\n\nIMPORTANTE\n• Producto diseñado exclusivamente para el modelo indicado\n• Las imágenes publicadas corresponden al producto real', images: ['images/alfombras%20termoformadas/Alfombra%20Termoformada%20Fiat%20Fastback%20%20Pulse/1.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/3.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/4.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/5.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/6.webp'] },
  { id: 'alfombra-termoformada-fiat-strada-2020-7093', name: 'Alfombra Termoformada Fiat Strada 2020+', cat: 'Alfombras Termoformadas', catId: 'cat-alfombras-termoformadas', badge: null, price: '190.000', colors: ['#1a1a1a'], svg: alfombraSvg, desc: 'ALFOMBRAS TERMOFORMADAS MDRACING – AJUSTE PERFECTO\n\nModelo: Fiat Strada 2020+\n\nProtegé el interior de tu vehículo con las alfombras termoformadas MDRACING, diseñadas específicamente para cada modelo de auto. Ofrecen máxima protección, excelente ajuste y un acabado moderno y funcional.\nFabricadas con materiales de alta calidad, estas alfombras se adaptan perfectamente a la forma original del piso del vehículo, cubriendo las zonas más expuestas al desgaste diario, suciedad, barro y líquidos.\n\nCARACTERÍSTICAS PRINCIPALES\n• Diseño termoformado a medida\n• Ajuste perfecto según el modelo indicado\n• Material resistente, durable y flexible\n• Bordes elevados que evitan derrames\n• Superficie antideslizante\n• Incluyen clips de sujeción para una fijación segura\n• Fácil limpieza (agua o paño húmedo)\n• No retienen olor\n• Mantienen el interior del vehículo protegido y prolijo\n\nBENEFICIOS\n• Protegen la alfombra original del auto\n• Evitan manchas, humedad y desgaste\n• Mejoran la estética interior\n• Fijación firme que evita desplazamientos\n• Ideales para uso urbano, viajes, lluvia, barro o arena\n\nCONTENIDO DEL PAQUETE\n• Juego completo de alfombras termoformadas (delanteras y traseras, según modelo)\n\nIMPORTANTE\n• Producto diseñado exclusivamente para el modelo indicado\n• Las imágenes publicadas corresponden al producto real', images: ['images/alfombras%20termoformadas/Alfombra%20Termoformada%20Fiat%20Strada%202020%2B/1.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/3.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/4.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/5.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/6.webp'] },
  // FORD
  { id: 'alfombra-termoformada-ford-ranger-2023-7070', name: 'Alfombra Termoformada Ford Ranger 2023+', cat: 'Alfombras Termoformadas', catId: 'cat-alfombras-termoformadas', badge: null, price: '190.000', colors: ['#1a1a1a'], svg: alfombraSvg, desc: 'ALFOMBRAS TERMOFORMADAS MDRACING – AJUSTE PERFECTO\n\nModelo: Ford Ranger 2023+\n\nProtegé el interior de tu vehículo con las alfombras termoformadas MDRACING, diseñadas específicamente para cada modelo de auto. Ofrecen máxima protección, excelente ajuste y un acabado moderno y funcional.\nFabricadas con materiales de alta calidad, estas alfombras se adaptan perfectamente a la forma original del piso del vehículo, cubriendo las zonas más expuestas al desgaste diario, suciedad, barro y líquidos.\n\nCARACTERÍSTICAS PRINCIPALES\n• Diseño termoformado a medida\n• Ajuste perfecto según el modelo indicado\n• Material resistente, durable y flexible\n• Bordes elevados que evitan derrames\n• Superficie antideslizante\n• Incluyen clips de sujeción para una fijación segura\n• Fácil limpieza (agua o paño húmedo)\n• No retienen olor\n• Mantienen el interior del vehículo protegido y prolijo\n\nBENEFICIOS\n• Protegen la alfombra original del auto\n• Evitan manchas, humedad y desgaste\n• Mejoran la estética interior\n• Fijación firme que evita desplazamientos\n• Ideales para uso urbano, viajes, lluvia, barro o arena\n\nCONTENIDO DEL PAQUETE\n• Juego completo de alfombras termoformadas (delanteras y traseras, según modelo)\n\nIMPORTANTE\n• Producto diseñado exclusivamente para el modelo indicado\n• Las imágenes publicadas corresponden al producto real', images: ['images/alfombras%20termoformadas/Alfombra%20Termoformada%20Ford%20Ranger%202023%2B/1.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/3.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/4.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/5.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/6.webp'] },
  { id: 'alfombra-termoformada-ford-territory-2025-7082', name: 'Alfombra Termoformada Ford Territory 2025', cat: 'Alfombras Termoformadas', catId: 'cat-alfombras-termoformadas', badge: null, price: '190.000', colors: ['#1a1a1a'], svg: alfombraSvg, desc: 'ALFOMBRAS TERMOFORMADAS MDRACING – AJUSTE PERFECTO\n\nModelo: Ford Territory 2025\n\nProtegé el interior de tu vehículo con las alfombras termoformadas MDRACING, diseñadas específicamente para cada modelo de auto. Ofrecen máxima protección, excelente ajuste y un acabado moderno y funcional.\nFabricadas con materiales de alta calidad, estas alfombras se adaptan perfectamente a la forma original del piso del vehículo, cubriendo las zonas más expuestas al desgaste diario, suciedad, barro y líquidos.\n\nCARACTERÍSTICAS PRINCIPALES\n• Diseño termoformado a medida\n• Ajuste perfecto según el modelo indicado\n• Material resistente, durable y flexible\n• Bordes elevados que evitan derrames\n• Superficie antideslizante\n• Incluyen clips de sujeción para una fijación segura\n• Fácil limpieza (agua o paño húmedo)\n• No retienen olor\n• Mantienen el interior del vehículo protegido y prolijo\n\nBENEFICIOS\n• Protegen la alfombra original del auto\n• Evitan manchas, humedad y desgaste\n• Mejoran la estética interior\n• Fijación firme que evita desplazamientos\n• Ideales para uso urbano, viajes, lluvia, barro o arena\n\nCONTENIDO DEL PAQUETE\n• Juego completo de alfombras termoformadas (delanteras y traseras, según modelo)\n\nIMPORTANTE\n• Producto diseñado exclusivamente para el modelo indicado\n• Las imágenes publicadas corresponden al producto real', images: ['images/alfombras%20termoformadas/Alfombra%20Termoformada%20Ford%20Territory%202025/D_NQ_NP_2X_753387-MLA110120605210_042026-F.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/3.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/4.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/5.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/6.webp'] },
  // CHEVROLET
  { id: 'alfombra-termoformada-chevrolet-onix-2022-7094', name: 'Alfombra Termoformada Chevrolet Onix 2022+', cat: 'Alfombras Termoformadas', catId: 'cat-alfombras-termoformadas', badge: null, price: '190.000', colors: ['#1a1a1a'], svg: alfombraSvg, desc: 'ALFOMBRAS TERMOFORMADAS MDRACING – AJUSTE PERFECTO\n\nModelo: Chevrolet Onix 2022+\n\nProtegé el interior de tu vehículo con las alfombras termoformadas MDRACING, diseñadas específicamente para cada modelo de auto. Ofrecen máxima protección, excelente ajuste y un acabado moderno y funcional.\nFabricadas con materiales de alta calidad, estas alfombras se adaptan perfectamente a la forma original del piso del vehículo, cubriendo las zonas más expuestas al desgaste diario, suciedad, barro y líquidos.\n\nCARACTERÍSTICAS PRINCIPALES\n• Diseño termoformado a medida\n• Ajuste perfecto según el modelo indicado\n• Material resistente, durable y flexible\n• Bordes elevados que evitan derrames\n• Superficie antideslizante\n• Incluyen clips de sujeción para una fijación segura\n• Fácil limpieza (agua o paño húmedo)\n• No retienen olor\n• Mantienen el interior del vehículo protegido y prolijo\n\nBENEFICIOS\n• Protegen la alfombra original del auto\n• Evitan manchas, humedad y desgaste\n• Mejoran la estética interior\n• Fijación firme que evita desplazamientos\n• Ideales para uso urbano, viajes, lluvia, barro o arena\n\nCONTENIDO DEL PAQUETE\n• Juego completo de alfombras termoformadas (delanteras y traseras, según modelo)\n\nIMPORTANTE\n• Producto diseñado exclusivamente para el modelo indicado\n• Las imágenes publicadas corresponden al producto real', images: ['images/alfombras%20termoformadas/Alfombra%20Termoformada%20Chevrolet%20Onix%202022%2B/1.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/3.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/4.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/5.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/6.webp'] },
  { id: 'alfombra-termoformada-chevrolet-onix-joy-2020-2024', name: 'Alfombra Termoformada Chevrolet Onix Joy 2020-2024', cat: 'Alfombras Termoformadas', catId: 'cat-alfombras-termoformadas', badge: null, price: '190.000', colors: ['#1a1a1a'], svg: alfombraSvg, desc: 'ALFOMBRAS TERMOFORMADAS MDRACING – AJUSTE PERFECTO\n\nModelo: Chevrolet Onix Joy 2020-2024\n\nProtegé el interior de tu vehículo con las alfombras termoformadas MDRACING, diseñadas específicamente para cada modelo de auto. Ofrecen máxima protección, excelente ajuste y un acabado moderno y funcional.\nFabricadas con materiales de alta calidad, estas alfombras se adaptan perfectamente a la forma original del piso del vehículo, cubriendo las zonas más expuestas al desgaste diario, suciedad, barro y líquidos.\n\nCARACTERÍSTICAS PRINCIPALES\n• Diseño termoformado a medida\n• Ajuste perfecto según el modelo indicado\n• Material resistente, durable y flexible\n• Bordes elevados que evitan derrames\n• Superficie antideslizante\n• Incluyen clips de sujeción para una fijación segura\n• Fácil limpieza (agua o paño húmedo)\n• No retienen olor\n• Mantienen el interior del vehículo protegido y prolijo\n\nBENEFICIOS\n• Protegen la alfombra original del auto\n• Evitan manchas, humedad y desgaste\n• Mejoran la estética interior\n• Fijación firme que evita desplazamientos\n• Ideales para uso urbano, viajes, lluvia, barro o arena\n\nCONTENIDO DEL PAQUETE\n• Juego completo de alfombras termoformadas (delanteras y traseras, según modelo)\n\nIMPORTANTE\n• Producto diseñado exclusivamente para el modelo indicado\n• Las imágenes publicadas corresponden al producto real', images: ['images/alfombras%20termoformadas/Alfombra%20termoformada%20Chevrolet%20Onix%20Joy%202020-2024/D_NQ_NP_2X_887044-MLA105152802491_012026-F.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/3.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/4.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/5.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/6.webp'] },
  { id: 'alfombra-termoformada-chevrolet-tracker-2020-7096', name: 'Alfombra Termoformada Chevrolet Tracker 2020+', cat: 'Alfombras Termoformadas', catId: 'cat-alfombras-termoformadas', badge: null, price: '190.000', colors: ['#1a1a1a'], svg: alfombraSvg, desc: 'ALFOMBRAS TERMOFORMADAS MDRACING – AJUSTE PERFECTO\n\nModelo: Chevrolet Tracker 2020+\n\nProtegé el interior de tu vehículo con las alfombras termoformadas MDRACING, diseñadas específicamente para cada modelo de auto. Ofrecen máxima protección, excelente ajuste y un acabado moderno y funcional.\nFabricadas con materiales de alta calidad, estas alfombras se adaptan perfectamente a la forma original del piso del vehículo, cubriendo las zonas más expuestas al desgaste diario, suciedad, barro y líquidos.\n\nCARACTERÍSTICAS PRINCIPALES\n• Diseño termoformado a medida\n• Ajuste perfecto según el modelo indicado\n• Material resistente, durable y flexible\n• Bordes elevados que evitan derrames\n• Superficie antideslizante\n• Incluyen clips de sujeción para una fijación segura\n• Fácil limpieza (agua o paño húmedo)\n• No retienen olor\n• Mantienen el interior del vehículo protegido y prolijo\n\nBENEFICIOS\n• Protegen la alfombra original del auto\n• Evitan manchas, humedad y desgaste\n• Mejoran la estética interior\n• Fijación firme que evita desplazamientos\n• Ideales para uso urbano, viajes, lluvia, barro o arena\n\nCONTENIDO DEL PAQUETE\n• Juego completo de alfombras termoformadas (delanteras y traseras, según modelo)\n\nIMPORTANTE\n• Producto diseñado exclusivamente para el modelo indicado\n• Las imágenes publicadas corresponden al producto real', images: ['images/alfombras%20termoformadas/Alfombra%20Termoformada%20Chevrolet%20Tracker%202020%2B/D_NQ_NP_2X_865960-MLA111345496507_052026-F.jpg','images/alfombras%20termoformadas/fotos%203%204%205%206/3.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/4.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/5.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/6.webp'] },
  { id: 'alfombra-termoformada-chevrolet-tracker-2015-7097', name: 'Alfombra Termoformada Chevrolet Tracker 2015+', cat: 'Alfombras Termoformadas', catId: 'cat-alfombras-termoformadas', badge: null, price: '190.000', colors: ['#1a1a1a'], svg: alfombraSvg, desc: 'ALFOMBRAS TERMOFORMADAS MDRACING – AJUSTE PERFECTO\n\nModelo: Chevrolet Tracker 2015+\n\nProtegé el interior de tu vehículo con las alfombras termoformadas MDRACING, diseñadas específicamente para cada modelo de auto. Ofrecen máxima protección, excelente ajuste y un acabado moderno y funcional.\nFabricadas con materiales de alta calidad, estas alfombras se adaptan perfectamente a la forma original del piso del vehículo, cubriendo las zonas más expuestas al desgaste diario, suciedad, barro y líquidos.\n\nCARACTERÍSTICAS PRINCIPALES\n• Diseño termoformado a medida\n• Ajuste perfecto según el modelo indicado\n• Material resistente, durable y flexible\n• Bordes elevados que evitan derrames\n• Superficie antideslizante\n• Incluyen clips de sujeción para una fijación segura\n• Fácil limpieza (agua o paño húmedo)\n• No retienen olor\n• Mantienen el interior del vehículo protegido y prolijo\n\nBENEFICIOS\n• Protegen la alfombra original del auto\n• Evitan manchas, humedad y desgaste\n• Mejoran la estética interior\n• Fijación firme que evita desplazamientos\n• Ideales para uso urbano, viajes, lluvia, barro o arena\n\nCONTENIDO DEL PAQUETE\n• Juego completo de alfombras termoformadas (delanteras y traseras, según modelo)\n\nIMPORTANTE\n• Producto diseñado exclusivamente para el modelo indicado\n• Las imágenes publicadas corresponden al producto real', images: ['images/alfombras%20termoformadas/Alfombra%20Termoformada%20Chevrolet%20Tracker%202015%2B/D_NQ_NP_2X_865960-MLA111345496507_052026-F.jpg','images/alfombras%20termoformadas/fotos%203%204%205%206/3.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/4.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/5.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/6.webp'] },
  { id: 'alfombra-termoformada-chevrolet-cruze-2016-7098', name: 'Alfombra Termoformada Chevrolet Cruze 2016+', cat: 'Alfombras Termoformadas', catId: 'cat-alfombras-termoformadas', badge: null, price: '190.000', colors: ['#1a1a1a'], svg: alfombraSvg, desc: 'ALFOMBRAS TERMOFORMADAS MDRACING – AJUSTE PERFECTO\n\nModelo: Chevrolet Cruze 2016+\n\nProtegé el interior de tu vehículo con las alfombras termoformadas MDRACING, diseñadas específicamente para cada modelo de auto. Ofrecen máxima protección, excelente ajuste y un acabado moderno y funcional.\nFabricadas con materiales de alta calidad, estas alfombras se adaptan perfectamente a la forma original del piso del vehículo, cubriendo las zonas más expuestas al desgaste diario, suciedad, barro y líquidos.\n\nCARACTERÍSTICAS PRINCIPALES\n• Diseño termoformado a medida\n• Ajuste perfecto según el modelo indicado\n• Material resistente, durable y flexible\n• Bordes elevados que evitan derrames\n• Superficie antideslizante\n• Incluyen clips de sujeción para una fijación segura\n• Fácil limpieza (agua o paño húmedo)\n• No retienen olor\n• Mantienen el interior del vehículo protegido y prolijo\n\nBENEFICIOS\n• Protegen la alfombra original del auto\n• Evitan manchas, humedad y desgaste\n• Mejoran la estética interior\n• Fijación firme que evita desplazamientos\n• Ideales para uso urbano, viajes, lluvia, barro o arena\n\nCONTENIDO DEL PAQUETE\n• Juego completo de alfombras termoformadas (delanteras y traseras, según modelo)\n\nIMPORTANTE\n• Producto diseñado exclusivamente para el modelo indicado\n• Las imágenes publicadas corresponden al producto real', images: ['images/alfombras%20termoformadas/Alfombra%20Termoformada%20Chevrolet%20Cruze%202016%2B/D_NQ_NP_2X_865960-MLA111345496507_052026-F.jpg','images/alfombras%20termoformadas/fotos%203%204%205%206/3.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/4.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/5.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/6.webp'] },
  { id: 'alfombra-termoformada-chevrolet-s10-2012-7099', name: 'Alfombra Termoformada Chevrolet S10 2012+', cat: 'Alfombras Termoformadas', catId: 'cat-alfombras-termoformadas', badge: null, price: '190.000', colors: ['#1a1a1a'], svg: alfombraSvg, desc: 'ALFOMBRAS TERMOFORMADAS MDRACING – AJUSTE PERFECTO\n\nModelo: Chevrolet S10 2012+\n\nProtegé el interior de tu vehículo con las alfombras termoformadas MDRACING, diseñadas específicamente para cada modelo de auto. Ofrecen máxima protección, excelente ajuste y un acabado moderno y funcional.\nFabricadas con materiales de alta calidad, estas alfombras se adaptan perfectamente a la forma original del piso del vehículo, cubriendo las zonas más expuestas al desgaste diario, suciedad, barro y líquidos.\n\nCARACTERÍSTICAS PRINCIPALES\n• Diseño termoformado a medida\n• Ajuste perfecto según el modelo indicado\n• Material resistente, durable y flexible\n• Bordes elevados que evitan derrames\n• Superficie antideslizante\n• Incluyen clips de sujeción para una fijación segura\n• Fácil limpieza (agua o paño húmedo)\n• No retienen olor\n• Mantienen el interior del vehículo protegido y prolijo\n\nBENEFICIOS\n• Protegen la alfombra original del auto\n• Evitan manchas, humedad y desgaste\n• Mejoran la estética interior\n• Fijación firme que evita desplazamientos\n• Ideales para uso urbano, viajes, lluvia, barro o arena\n\nCONTENIDO DEL PAQUETE\n• Juego completo de alfombras termoformadas (delanteras y traseras, según modelo)\n\nIMPORTANTE\n• Producto diseñado exclusivamente para el modelo indicado\n• Las imágenes publicadas corresponden al producto real', images: ['images/alfombras%20termoformadas/Alfombra%20Termoformada%20Chevrolet%20S10%202012%2B/d_nq_np_2x_883589-mla104522340886_012026-f-995a152437a18cc95e17707525341611-1024-1024.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/3.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/4.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/5.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/6.webp'] },
  // NISSAN
  { id: 'alfombra-termoformada-nissan-versa-2024-7095', name: 'Alfombra Termoformada Nissan Versa 2024+', cat: 'Alfombras Termoformadas', catId: 'cat-alfombras-termoformadas', badge: null, price: '190.000', colors: ['#1a1a1a'], svg: alfombraSvg, desc: 'ALFOMBRAS TERMOFORMADAS MDRACING – AJUSTE PERFECTO\n\nModelo: Nissan Versa 2024+\n\nProtegé el interior de tu vehículo con las alfombras termoformadas MDRACING, diseñadas específicamente para cada modelo de auto. Ofrecen máxima protección, excelente ajuste y un acabado moderno y funcional.\nFabricadas con materiales de alta calidad, estas alfombras se adaptan perfectamente a la forma original del piso del vehículo, cubriendo las zonas más expuestas al desgaste diario, suciedad, barro y líquidos.\n\nCARACTERÍSTICAS PRINCIPALES\n• Diseño termoformado a medida\n• Ajuste perfecto según el modelo indicado\n• Material resistente, durable y flexible\n• Bordes elevados que evitan derrames\n• Superficie antideslizante\n• Incluyen clips de sujeción para una fijación segura\n• Fácil limpieza (agua o paño húmedo)\n• No retienen olor\n• Mantienen el interior del vehículo protegido y prolijo\n\nBENEFICIOS\n• Protegen la alfombra original del auto\n• Evitan manchas, humedad y desgaste\n• Mejoran la estética interior\n• Fijación firme que evita desplazamientos\n• Ideales para uso urbano, viajes, lluvia, barro o arena\n\nCONTENIDO DEL PAQUETE\n• Juego completo de alfombras termoformadas (delanteras y traseras, según modelo)\n\nIMPORTANTE\n• Producto diseñado exclusivamente para el modelo indicado\n• Las imágenes publicadas corresponden al producto real', images: ['images/alfombras%20termoformadas/Alfombra%20Termoformada%20Nissan%20Versa%202024%2B/D_NQ_NP_2X_760333-MLA110266312588_052026-F.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/3.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/4.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/5.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/6.webp'] },
  { id: 'alfombra-termoformada-nissan-kicks-play-2017-7102', name: 'Alfombra Termoformada Nissan Kicks Play 2017+', cat: 'Alfombras Termoformadas', catId: 'cat-alfombras-termoformadas', badge: null, price: '190.000', colors: ['#1a1a1a'], svg: alfombraSvg, desc: 'ALFOMBRAS TERMOFORMADAS MDRACING – AJUSTE PERFECTO\n\nModelo: Nissan Kicks Play 2017+\n\nProtegé el interior de tu vehículo con las alfombras termoformadas MDRACING, diseñadas específicamente para cada modelo de auto. Ofrecen máxima protección, excelente ajuste y un acabado moderno y funcional.\nFabricadas con materiales de alta calidad, estas alfombras se adaptan perfectamente a la forma original del piso del vehículo, cubriendo las zonas más expuestas al desgaste diario, suciedad, barro y líquidos.\n\nCARACTERÍSTICAS PRINCIPALES\n• Diseño termoformado a medida\n• Ajuste perfecto según el modelo indicado\n• Material resistente, durable y flexible\n• Bordes elevados que evitan derrames\n• Superficie antideslizante\n• Incluyen clips de sujeción para una fijación segura\n• Fácil limpieza (agua o paño húmedo)\n• No retienen olor\n• Mantienen el interior del vehículo protegido y prolijo\n\nBENEFICIOS\n• Protegen la alfombra original del auto\n• Evitan manchas, humedad y desgaste\n• Mejoran la estética interior\n• Fijación firme que evita desplazamientos\n• Ideales para uso urbano, viajes, lluvia, barro o arena\n\nCONTENIDO DEL PAQUETE\n• Juego completo de alfombras termoformadas (delanteras y traseras, según modelo)\n\nIMPORTANTE\n• Producto diseñado exclusivamente para el modelo indicado\n• Las imágenes publicadas corresponden al producto real', images: ['/images/alfombras%20termoformadas/fotos%203%204%205%206/3.webp','/images/alfombras%20termoformadas/fotos%203%204%205%206/4.webp','/images/alfombras%20termoformadas/fotos%203%204%205%206/5.webp','/images/alfombras%20termoformadas/fotos%203%204%205%206/6.webp'] },
  { id: 'alfombra-termoformada-nissan-frontier-2018-7103', name: 'Alfombra Termoformada Nissan Frontier 2018+', cat: 'Alfombras Termoformadas', catId: 'cat-alfombras-termoformadas', badge: null, price: '190.000', colors: ['#1a1a1a'], svg: alfombraSvg, desc: 'ALFOMBRAS TERMOFORMADAS MDRACING – AJUSTE PERFECTO\n\nModelo: Nissan Frontier 2018+\n\nProtegé el interior de tu vehículo con las alfombras termoformadas MDRACING, diseñadas específicamente para cada modelo de auto. Ofrecen máxima protección, excelente ajuste y un acabado moderno y funcional.\nFabricadas con materiales de alta calidad, estas alfombras se adaptan perfectamente a la forma original del piso del vehículo, cubriendo las zonas más expuestas al desgaste diario, suciedad, barro y líquidos.\n\nCARACTERÍSTICAS PRINCIPALES\n• Diseño termoformado a medida\n• Ajuste perfecto según el modelo indicado\n• Material resistente, durable y flexible\n• Bordes elevados que evitan derrames\n• Superficie antideslizante\n• Incluyen clips de sujeción para una fijación segura\n• Fácil limpieza (agua o paño húmedo)\n• No retienen olor\n• Mantienen el interior del vehículo protegido y prolijo\n\nBENEFICIOS\n• Protegen la alfombra original del auto\n• Evitan manchas, humedad y desgaste\n• Mejoran la estética interior\n• Fijación firme que evita desplazamientos\n• Ideales para uso urbano, viajes, lluvia, barro o arena\n\nCONTENIDO DEL PAQUETE\n• Juego completo de alfombras termoformadas (delanteras y traseras, según modelo)\n\nIMPORTANTE\n• Producto diseñado exclusivamente para el modelo indicado\n• Las imágenes publicadas corresponden al producto real', images: ['images/alfombras%20termoformadas/Alfombra%20Termoformada%20Nissan%20Frontier%202018%2B/D_NQ_NP_2X_865960-MLA111345496507_052026-F.jpg','images/alfombras%20termoformadas/fotos%203%204%205%206/3.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/4.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/5.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/6.webp'] },
  // HONDA
  { id: 'alfombra-termoformada-honda-hrv-2015-7100', name: 'Alfombra Termoformada Honda HR-V 2015+', cat: 'Alfombras Termoformadas', catId: 'cat-alfombras-termoformadas', badge: null, price: '190.000', colors: ['#1a1a1a'], svg: alfombraSvg, desc: 'ALFOMBRAS TERMOFORMADAS MDRACING – AJUSTE PERFECTO\n\nModelo: Honda HR-V 2015+\n\nProtegé el interior de tu vehículo con las alfombras termoformadas MDRACING, diseñadas específicamente para cada modelo de auto. Ofrecen máxima protección, excelente ajuste y un acabado moderno y funcional.\nFabricadas con materiales de alta calidad, estas alfombras se adaptan perfectamente a la forma original del piso del vehículo, cubriendo las zonas más expuestas al desgaste diario, suciedad, barro y líquidos.\n\nCARACTERÍSTICAS PRINCIPALES\n• Diseño termoformado a medida\n• Ajuste perfecto según el modelo indicado\n• Material resistente, durable y flexible\n• Bordes elevados que evitan derrames\n• Superficie antideslizante\n• Incluyen clips de sujeción para una fijación segura\n• Fácil limpieza (agua o paño húmedo)\n• No retienen olor\n• Mantienen el interior del vehículo protegido y prolijo\n\nBENEFICIOS\n• Protegen la alfombra original del auto\n• Evitan manchas, humedad y desgaste\n• Mejoran la estética interior\n• Fijación firme que evita desplazamientos\n• Ideales para uso urbano, viajes, lluvia, barro o arena\n\nCONTENIDO DEL PAQUETE\n• Juego completo de alfombras termoformadas (delanteras y traseras, según modelo)\n\nIMPORTANTE\n• Producto diseñado exclusivamente para el modelo indicado\n• Las imágenes publicadas corresponden al producto real', images: ['/images/alfombras%20termoformadas/fotos%203%204%205%206/3.webp','/images/alfombras%20termoformadas/fotos%203%204%205%206/4.webp','/images/alfombras%20termoformadas/fotos%203%204%205%206/5.webp','/images/alfombras%20termoformadas/fotos%203%204%205%206/6.webp'] },
  { id: 'alfombra-termoformada-honda-hrv-2023-7101', name: 'Alfombra Termoformada Honda HR-V 2023+', cat: 'Alfombras Termoformadas', catId: 'cat-alfombras-termoformadas', badge: null, price: '190.000', colors: ['#1a1a1a'], svg: alfombraSvg, desc: 'ALFOMBRAS TERMOFORMADAS MDRACING – AJUSTE PERFECTO\n\nModelo: Honda HR-V 2023+\n\nProtegé el interior de tu vehículo con las alfombras termoformadas MDRACING, diseñadas específicamente para cada modelo de auto. Ofrecen máxima protección, excelente ajuste y un acabado moderno y funcional.\nFabricadas con materiales de alta calidad, estas alfombras se adaptan perfectamente a la forma original del piso del vehículo, cubriendo las zonas más expuestas al desgaste diario, suciedad, barro y líquidos.\n\nCARACTERÍSTICAS PRINCIPALES\n• Diseño termoformado a medida\n• Ajuste perfecto según el modelo indicado\n• Material resistente, durable y flexible\n• Bordes elevados que evitan derrames\n• Superficie antideslizante\n• Incluyen clips de sujeción para una fijación segura\n• Fácil limpieza (agua o paño húmedo)\n• No retienen olor\n• Mantienen el interior del vehículo protegido y prolijo\n\nBENEFICIOS\n• Protegen la alfombra original del auto\n• Evitan manchas, humedad y desgaste\n• Mejoran la estética interior\n• Fijación firme que evita desplazamientos\n• Ideales para uso urbano, viajes, lluvia, barro o arena\n\nCONTENIDO DEL PAQUETE\n• Juego completo de alfombras termoformadas (delanteras y traseras, según modelo)\n\nIMPORTANTE\n• Producto diseñado exclusivamente para el modelo indicado\n• Las imágenes publicadas corresponden al producto real', images: ['images/alfombras%20termoformadas/Alfombra%20Termoformada%20Honda%20HR-V%202023%2B/1.webp','images/alfombras%20termoformadas/Alfombra%20Termoformada%20Honda%20HR-V%202023%2B/2.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/3.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/4.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/5.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/6.webp'] },
  // RENAULT
  { id: 'alfombra-termoformada-renault-duster-oroch-2013-7104', name: 'Alfombra Termoformada Renault Duster / Oroch 2013+', cat: 'Alfombras Termoformadas', catId: 'cat-alfombras-termoformadas', badge: null, price: '190.000', colors: ['#1a1a1a'], svg: alfombraSvg, desc: 'ALFOMBRAS TERMOFORMADAS MDRACING – AJUSTE PERFECTO\n\nModelo: Renault Duster / Oroch 2013+\n\nProtegé el interior de tu vehículo con las alfombras termoformadas MDRACING, diseñadas específicamente para cada modelo de auto. Ofrecen máxima protección, excelente ajuste y un acabado moderno y funcional.\nFabricadas con materiales de alta calidad, estas alfombras se adaptan perfectamente a la forma original del piso del vehículo, cubriendo las zonas más expuestas al desgaste diario, suciedad, barro y líquidos.\n\nCARACTERÍSTICAS PRINCIPALES\n• Diseño termoformado a medida\n• Ajuste perfecto según el modelo indicado\n• Material resistente, durable y flexible\n• Bordes elevados que evitan derrames\n• Superficie antideslizante\n• Incluyen clips de sujeción para una fijación segura\n• Fácil limpieza (agua o paño húmedo)\n• No retienen olor\n• Mantienen el interior del vehículo protegido y prolijo\n\nBENEFICIOS\n• Protegen la alfombra original del auto\n• Evitan manchas, humedad y desgaste\n• Mejoran la estética interior\n• Fijación firme que evita desplazamientos\n• Ideales para uso urbano, viajes, lluvia, barro o arena\n\nCONTENIDO DEL PAQUETE\n• Juego completo de alfombras termoformadas (delanteras y traseras, según modelo)\n\nIMPORTANTE\n• Producto diseñado exclusivamente para el modelo indicado\n• Las imágenes publicadas corresponden al producto real', images: ['images/alfombras%20termoformadas/Alfombra%20Termoformada%20Renault%20Duster%20%20Oroch%202013%2B/D_NQ_NP_2X_865960-MLA111345496507_052026-F.jpg','images/alfombras%20termoformadas/fotos%203%204%205%206/3.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/4.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/5.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/6.webp'] },
  { id: 'alfombra-termoformada-renault-sandero-logan-stepway-7105', name: 'Alfombra Termoformada Renault Sandero / Logan / Stepway', cat: 'Alfombras Termoformadas', catId: 'cat-alfombras-termoformadas', badge: null, price: '190.000', colors: ['#1a1a1a'], svg: alfombraSvg, desc: 'ALFOMBRAS TERMOFORMADAS MDRACING – AJUSTE PERFECTO\n\nModelo: Renault Sandero / Logan / Stepway\n\nProtegé el interior de tu vehículo con las alfombras termoformadas MDRACING, diseñadas específicamente para cada modelo de auto. Ofrecen máxima protección, excelente ajuste y un acabado moderno y funcional.\nFabricadas con materiales de alta calidad, estas alfombras se adaptan perfectamente a la forma original del piso del vehículo, cubriendo las zonas más expuestas al desgaste diario, suciedad, barro y líquidos.\n\nCARACTERÍSTICAS PRINCIPALES\n• Diseño termoformado a medida\n• Ajuste perfecto según el modelo indicado\n• Material resistente, durable y flexible\n• Bordes elevados que evitan derrames\n• Superficie antideslizante\n• Incluyen clips de sujeción para una fijación segura\n• Fácil limpieza (agua o paño húmedo)\n• No retienen olor\n• Mantienen el interior del vehículo protegido y prolijo\n\nBENEFICIOS\n• Protegen la alfombra original del auto\n• Evitan manchas, humedad y desgaste\n• Mejoran la estética interior\n• Fijación firme que evita desplazamientos\n• Ideales para uso urbano, viajes, lluvia, barro o arena\n\nCONTENIDO DEL PAQUETE\n• Juego completo de alfombras termoformadas (delanteras y traseras, según modelo)\n\nIMPORTANTE\n• Producto diseñado exclusivamente para el modelo indicado\n• Las imágenes publicadas corresponden al producto real', images: ['images/alfombras%20termoformadas/Alfombra%20Termoformada%20Renault%20Sandero%20%20Logan%20%20Stepway/D_NQ_NP_2X_865960-MLA111345496507_052026-F.jpg','images/alfombras%20termoformadas/fotos%203%204%205%206/3.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/4.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/5.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/6.webp'] },
  { id: 'alfombra-termoformada-renault-kardian-7106', name: 'Alfombra Termoformada Renault Kardian', cat: 'Alfombras Termoformadas', catId: 'cat-alfombras-termoformadas', badge: null, price: '190.000', colors: ['#1a1a1a'], svg: alfombraSvg, desc: 'ALFOMBRAS TERMOFORMADAS MDRACING – AJUSTE PERFECTO\n\nModelo: Renault Kardian\n\nProtegé el interior de tu vehículo con las alfombras termoformadas MDRACING, diseñadas específicamente para cada modelo de auto. Ofrecen máxima protección, excelente ajuste y un acabado moderno y funcional.\nFabricadas con materiales de alta calidad, estas alfombras se adaptan perfectamente a la forma original del piso del vehículo, cubriendo las zonas más expuestas al desgaste diario, suciedad, barro y líquidos.\n\nCARACTERÍSTICAS PRINCIPALES\n• Diseño termoformado a medida\n• Ajuste perfecto según el modelo indicado\n• Material resistente, durable y flexible\n• Bordes elevados que evitan derrames\n• Superficie antideslizante\n• Incluyen clips de sujeción para una fijación segura\n• Fácil limpieza (agua o paño húmedo)\n• No retienen olor\n• Mantienen el interior del vehículo protegido y prolijo\n\nBENEFICIOS\n• Protegen la alfombra original del auto\n• Evitan manchas, humedad y desgaste\n• Mejoran la estética interior\n• Fijación firme que evita desplazamientos\n• Ideales para uso urbano, viajes, lluvia, barro o arena\n\nCONTENIDO DEL PAQUETE\n• Juego completo de alfombras termoformadas (delanteras y traseras, según modelo)\n\nIMPORTANTE\n• Producto diseñado exclusivamente para el modelo indicado\n• Las imágenes publicadas corresponden al producto real', images: ['images/alfombras%20termoformadas/Alfombra%20Termoformada%20Renault%20Kardian/D_NQ_NP_2X_967278-MLA108573878305_032026-F.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/3.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/4.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/5.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/6.webp'] },
  { id: 'alfombra-termoformada-renault-kangoo-g2-7107', name: 'Alfombra Termoformada Renault Kangoo Generation 2', cat: 'Alfombras Termoformadas', catId: 'cat-alfombras-termoformadas', badge: null, price: '190.000', colors: ['#1a1a1a'], svg: alfombraSvg, desc: 'ALFOMBRAS TERMOFORMADAS MDRACING – AJUSTE PERFECTO\n\nModelo: Renault Kangoo Generation 2\n\nProtegé el interior de tu vehículo con las alfombras termoformadas MDRACING, diseñadas específicamente para cada modelo de auto. Ofrecen máxima protección, excelente ajuste y un acabado moderno y funcional.\nFabricadas con materiales de alta calidad, estas alfombras se adaptan perfectamente a la forma original del piso del vehículo, cubriendo las zonas más expuestas al desgaste diario, suciedad, barro y líquidos.\n\nCARACTERÍSTICAS PRINCIPALES\n• Diseño termoformado a medida\n• Ajuste perfecto según el modelo indicado\n• Material resistente, durable y flexible\n• Bordes elevados que evitan derrames\n• Superficie antideslizante\n• Incluyen clips de sujeción para una fijación segura\n• Fácil limpieza (agua o paño húmedo)\n• No retienen olor\n• Mantienen el interior del vehículo protegido y prolijo\n\nBENEFICIOS\n• Protegen la alfombra original del auto\n• Evitan manchas, humedad y desgaste\n• Mejoran la estética interior\n• Fijación firme que evita desplazamientos\n• Ideales para uso urbano, viajes, lluvia, barro o arena\n\nCONTENIDO DEL PAQUETE\n• Juego completo de alfombras termoformadas (delanteras y traseras, según modelo)\n\nIMPORTANTE\n• Producto diseñado exclusivamente para el modelo indicado\n• Las imágenes publicadas corresponden al producto real', images: ['/images/alfombras%20termoformadas/fotos%203%204%205%206/3.webp','/images/alfombras%20termoformadas/fotos%203%204%205%206/4.webp','/images/alfombras%20termoformadas/fotos%203%204%205%206/5.webp','/images/alfombras%20termoformadas/fotos%203%204%205%206/6.webp'] },
  // PEUGEOT
  { id: 'alfombra-termoformada-peugeot-208-g2-2020-7108', name: 'Alfombra Termoformada Peugeot 208 G2 2020+', cat: 'Alfombras Termoformadas', catId: 'cat-alfombras-termoformadas', badge: null, price: '190.000', colors: ['#1a1a1a'], svg: alfombraSvg, desc: 'ALFOMBRAS TERMOFORMADAS MDRACING – AJUSTE PERFECTO\n\nModelo: Peugeot 208 G2 2020+\n\nProtegé el interior de tu vehículo con las alfombras termoformadas MDRACING, diseñadas específicamente para cada modelo de auto. Ofrecen máxima protección, excelente ajuste y un acabado moderno y funcional.\nFabricadas con materiales de alta calidad, estas alfombras se adaptan perfectamente a la forma original del piso del vehículo, cubriendo las zonas más expuestas al desgaste diario, suciedad, barro y líquidos.\n\nCARACTERÍSTICAS PRINCIPALES\n• Diseño termoformado a medida\n• Ajuste perfecto según el modelo indicado\n• Material resistente, durable y flexible\n• Bordes elevados que evitan derrames\n• Superficie antideslizante\n• Incluyen clips de sujeción para una fijación segura\n• Fácil limpieza (agua o paño húmedo)\n• No retienen olor\n• Mantienen el interior del vehículo protegido y prolijo\n\nBENEFICIOS\n• Protegen la alfombra original del auto\n• Evitan manchas, humedad y desgaste\n• Mejoran la estética interior\n• Fijación firme que evita desplazamientos\n• Ideales para uso urbano, viajes, lluvia, barro o arena\n\nCONTENIDO DEL PAQUETE\n• Juego completo de alfombras termoformadas (delanteras y traseras, según modelo)\n\nIMPORTANTE\n• Producto diseñado exclusivamente para el modelo indicado\n• Las imágenes publicadas corresponden al producto real', images: ['images/alfombras%20termoformadas/Alfombra%20Termoformada%20Peugeot%20208%20G2%202020%2B/D_NQ_NP_2X_678601-MLA96055886618_102025-F.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/3.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/4.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/5.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/6.webp'] },
  { id: 'alfombra-termoformada-peugeot-2008-g2-2024-7109', name: 'Alfombra Termoformada Peugeot 2008 G2 2024', cat: 'Alfombras Termoformadas', catId: 'cat-alfombras-termoformadas', badge: null, price: '190.000', colors: ['#1a1a1a'], svg: alfombraSvg, desc: 'ALFOMBRAS TERMOFORMADAS MDRACING – AJUSTE PERFECTO\n\nModelo: Peugeot 2008 G2 2024\n\nProtegé el interior de tu vehículo con las alfombras termoformadas MDRACING, diseñadas específicamente para cada modelo de auto. Ofrecen máxima protección, excelente ajuste y un acabado moderno y funcional.\nFabricadas con materiales de alta calidad, estas alfombras se adaptan perfectamente a la forma original del piso del vehículo, cubriendo las zonas más expuestas al desgaste diario, suciedad, barro y líquidos.\n\nCARACTERÍSTICAS PRINCIPALES\n• Diseño termoformado a medida\n• Ajuste perfecto según el modelo indicado\n• Material resistente, durable y flexible\n• Bordes elevados que evitan derrames\n• Superficie antideslizante\n• Incluyen clips de sujeción para una fijación segura\n• Fácil limpieza (agua o paño húmedo)\n• No retienen olor\n• Mantienen el interior del vehículo protegido y prolijo\n\nBENEFICIOS\n• Protegen la alfombra original del auto\n• Evitan manchas, humedad y desgaste\n• Mejoran la estética interior\n• Fijación firme que evita desplazamientos\n• Ideales para uso urbano, viajes, lluvia, barro o arena\n\nCONTENIDO DEL PAQUETE\n• Juego completo de alfombras termoformadas (delanteras y traseras, según modelo)\n\nIMPORTANTE\n• Producto diseñado exclusivamente para el modelo indicado\n• Las imágenes publicadas corresponden al producto real', images: ['images/alfombras%20termoformadas/Alfombra%20Termoformada%20Peugeot%202008%20G2%202024/D_NQ_NP_2X_865960-MLA111345496507_052026-F.jpg','images/alfombras%20termoformadas/fotos%203%204%205%206/3.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/4.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/5.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/6.webp'] },
  { id: 'alfombra-termoformada-peugeot-3008-2024-7121', name: 'Alfombra Termoformada Peugeot 3008 2024+', cat: 'Alfombras Termoformadas', catId: 'cat-alfombras-termoformadas', badge: null, price: '190.000', colors: ['#1a1a1a'], svg: alfombraSvg, desc: 'ALFOMBRAS TERMOFORMADAS MDRACING – AJUSTE PERFECTO\n\nModelo: Peugeot 3008 2024+\n\nProtegé el interior de tu vehículo con las alfombras termoformadas MDRACING, diseñadas específicamente para cada modelo de auto. Ofrecen máxima protección, excelente ajuste y un acabado moderno y funcional.\nFabricadas con materiales de alta calidad, estas alfombras se adaptan perfectamente a la forma original del piso del vehículo, cubriendo las zonas más expuestas al desgaste diario, suciedad, barro y líquidos.\n\nCARACTERÍSTICAS PRINCIPALES\n• Diseño termoformado a medida\n• Ajuste perfecto según el modelo indicado\n• Material resistente, durable y flexible\n• Bordes elevados que evitan derrames\n• Superficie antideslizante\n• Incluyen clips de sujeción para una fijación segura\n• Fácil limpieza (agua o paño húmedo)\n• No retienen olor\n• Mantienen el interior del vehículo protegido y prolijo\n\nBENEFICIOS\n• Protegen la alfombra original del auto\n• Evitan manchas, humedad y desgaste\n• Mejoran la estética interior\n• Fijación firme que evita desplazamientos\n• Ideales para uso urbano, viajes, lluvia, barro o arena\n\nCONTENIDO DEL PAQUETE\n• Juego completo de alfombras termoformadas (delanteras y traseras, según modelo)\n\nIMPORTANTE\n• Producto diseñado exclusivamente para el modelo indicado\n• Las imágenes publicadas corresponden al producto real', images: ['/images/alfombras%20termoformadas/fotos%203%204%205%206/3.webp','/images/alfombras%20termoformadas/fotos%203%204%205%206/4.webp','/images/alfombras%20termoformadas/fotos%203%204%205%206/5.webp','/images/alfombras%20termoformadas/fotos%203%204%205%206/6.webp'] },
  { id: 'alfombra-termoformada-peugeot-partner-2012-7122', name: 'Alfombra Termoformada Peugeot Partner 2012+', cat: 'Alfombras Termoformadas', catId: 'cat-alfombras-termoformadas', badge: null, price: '190.000', colors: ['#1a1a1a'], svg: alfombraSvg, desc: 'ALFOMBRAS TERMOFORMADAS MDRACING – AJUSTE PERFECTO\n\nModelo: Peugeot Partner 2012+\n\nProtegé el interior de tu vehículo con las alfombras termoformadas MDRACING, diseñadas específicamente para cada modelo de auto. Ofrecen máxima protección, excelente ajuste y un acabado moderno y funcional.\nFabricadas con materiales de alta calidad, estas alfombras se adaptan perfectamente a la forma original del piso del vehículo, cubriendo las zonas más expuestas al desgaste diario, suciedad, barro y líquidos.\n\nCARACTERÍSTICAS PRINCIPALES\n• Diseño termoformado a medida\n• Ajuste perfecto según el modelo indicado\n• Material resistente, durable y flexible\n• Bordes elevados que evitan derrames\n• Superficie antideslizante\n• Incluyen clips de sujeción para una fijación segura\n• Fácil limpieza (agua o paño húmedo)\n• No retienen olor\n• Mantienen el interior del vehículo protegido y prolijo\n\nBENEFICIOS\n• Protegen la alfombra original del auto\n• Evitan manchas, humedad y desgaste\n• Mejoran la estética interior\n• Fijación firme que evita desplazamientos\n• Ideales para uso urbano, viajes, lluvia, barro o arena\n\nCONTENIDO DEL PAQUETE\n• Juego completo de alfombras termoformadas (delanteras y traseras, según modelo)\n\nIMPORTANTE\n• Producto diseñado exclusivamente para el modelo indicado\n• Las imágenes publicadas corresponden al producto real', images: ['images/alfombras%20termoformadas/Alfombra%20Termoformada%20Peugeot%20Partner%202012%2B/D_NQ_NP_2X_755540-MLA108741813090_032026-F.jpg','images/alfombras%20termoformadas/fotos%203%204%205%206/3.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/4.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/5.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/6.webp'] },
  // TOYOTA
  { id: 'alfombra-termoformada-toyota-hilux-2016-2025-7076', name: 'Alfombra Termoformada Toyota Hilux 2016-2025', cat: 'Alfombras Termoformadas', catId: 'cat-alfombras-termoformadas', badge: null, price: '190.000', colors: ['#1a1a1a'], svg: alfombraSvg, desc: 'ALFOMBRAS TERMOFORMADAS MDRACING – AJUSTE PERFECTO\n\nModelo: Toyota Hilux 2016-2025\n\nProtegé el interior de tu vehículo con las alfombras termoformadas MDRACING, diseñadas específicamente para cada modelo de auto. Ofrecen máxima protección, excelente ajuste y un acabado moderno y funcional.\nFabricadas con materiales de alta calidad, estas alfombras se adaptan perfectamente a la forma original del piso del vehículo, cubriendo las zonas más expuestas al desgaste diario, suciedad, barro y líquidos.\n\nCARACTERÍSTICAS PRINCIPALES\n• Diseño termoformado a medida\n• Ajuste perfecto según el modelo indicado\n• Material resistente, durable y flexible\n• Bordes elevados que evitan derrames\n• Superficie antideslizante\n• Incluyen clips de sujeción para una fijación segura\n• Fácil limpieza (agua o paño húmedo)\n• No retienen olor\n• Mantienen el interior del vehículo protegido y prolijo\n\nBENEFICIOS\n• Protegen la alfombra original del auto\n• Evitan manchas, humedad y desgaste\n• Mejoran la estética interior\n• Fijación firme que evita desplazamientos\n• Ideales para uso urbano, viajes, lluvia, barro o arena\n\nCONTENIDO DEL PAQUETE\n• Juego completo de alfombras termoformadas (delanteras y traseras, según modelo)\n\nIMPORTANTE\n• Producto diseñado exclusivamente para el modelo indicado\n• Las imágenes publicadas corresponden al producto real', images: ['images/alfombras%20termoformadas/Alfombra%20Termoformada%20Toyota%20Hilux%202016-2025/D_NQ_NP_2X_772413-MLA97011209443_112025-F.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/3.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/4.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/5.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/6.webp'] },
  { id: 'alfombra-termoformada-toyota-hilux-2005-2020-7112', name: 'Alfombra Termoformada Toyota Hilux 2005-2020', cat: 'Alfombras Termoformadas', catId: 'cat-alfombras-termoformadas', badge: null, price: '190.000', colors: ['#1a1a1a'], svg: alfombraSvg, desc: 'ALFOMBRAS TERMOFORMADAS MDRACING – AJUSTE PERFECTO\n\nModelo: Toyota Hilux 2005-2020\n\nProtegé el interior de tu vehículo con las alfombras termoformadas MDRACING, diseñadas específicamente para cada modelo de auto. Ofrecen máxima protección, excelente ajuste y un acabado moderno y funcional.\nFabricadas con materiales de alta calidad, estas alfombras se adaptan perfectamente a la forma original del piso del vehículo, cubriendo las zonas más expuestas al desgaste diario, suciedad, barro y líquidos.\n\nCARACTERÍSTICAS PRINCIPALES\n• Diseño termoformado a medida\n• Ajuste perfecto según el modelo indicado\n• Material resistente, durable y flexible\n• Bordes elevados que evitan derrames\n• Superficie antideslizante\n• Incluyen clips de sujeción para una fijación segura\n• Fácil limpieza (agua o paño húmedo)\n• No retienen olor\n• Mantienen el interior del vehículo protegido y prolijo\n\nBENEFICIOS\n• Protegen la alfombra original del auto\n• Evitan manchas, humedad y desgaste\n• Mejoran la estética interior\n• Fijación firme que evita desplazamientos\n• Ideales para uso urbano, viajes, lluvia, barro o arena\n\nCONTENIDO DEL PAQUETE\n• Juego completo de alfombras termoformadas (delanteras y traseras, según modelo)\n\nIMPORTANTE\n• Producto diseñado exclusivamente para el modelo indicado\n• Las imágenes publicadas corresponden al producto real', images: ['images/alfombras%20termoformadas/Alfombra%20Termoformada%20Toyota%20Hilux%202005-2020/D_NQ_NP_2X_974095-MLA91139121307_082025-F.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/3.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/4.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/5.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/6.webp'] },
  { id: 'alfombra-termoformada-toyota-yaris-hatch-sedan-2018-7087', name: 'Alfombra Termoformada Toyota Yaris Hatch & Sedan 2018+', cat: 'Alfombras Termoformadas', catId: 'cat-alfombras-termoformadas', badge: null, price: '190.000', colors: ['#1a1a1a'], svg: alfombraSvg, desc: 'ALFOMBRAS TERMOFORMADAS MDRACING – AJUSTE PERFECTO\n\nModelo: Toyota Yaris Hatch & Sedan 2018+\n\nProtegé el interior de tu vehículo con las alfombras termoformadas MDRACING, diseñadas específicamente para cada modelo de auto. Ofrecen máxima protección, excelente ajuste y un acabado moderno y funcional.\nFabricadas con materiales de alta calidad, estas alfombras se adaptan perfectamente a la forma original del piso del vehículo, cubriendo las zonas más expuestas al desgaste diario, suciedad, barro y líquidos.\n\nCARACTERÍSTICAS PRINCIPALES\n• Diseño termoformado a medida\n• Ajuste perfecto según el modelo indicado\n• Material resistente, durable y flexible\n• Bordes elevados que evitan derrames\n• Superficie antideslizante\n• Incluyen clips de sujeción para una fijación segura\n• Fácil limpieza (agua o paño húmedo)\n• No retienen olor\n• Mantienen el interior del vehículo protegido y prolijo\n\nBENEFICIOS\n• Protegen la alfombra original del auto\n• Evitan manchas, humedad y desgaste\n• Mejoran la estética interior\n• Fijación firme que evita desplazamientos\n• Ideales para uso urbano, viajes, lluvia, barro o arena\n\nCONTENIDO DEL PAQUETE\n• Juego completo de alfombras termoformadas (delanteras y traseras, según modelo)\n\nIMPORTANTE\n• Producto diseñado exclusivamente para el modelo indicado\n• Las imágenes publicadas corresponden al producto real', images: ['images/alfombras%20termoformadas/Alfombra%20Termoformada%20Toyota%20Yaris%20Hatch%20%26%20Sedan%202018%2B/D_NQ_NP_2X_865960-MLA111345496507_052026-F.jpg','images/alfombras%20termoformadas/fotos%203%204%205%206/3.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/4.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/5.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/6.webp'] },
  { id: 'alfombra-termoformada-toyota-corolla-g11-2015-2020-7078', name: 'Alfombra Termoformada Toyota Corolla G11 2015-2020', cat: 'Alfombras Termoformadas', catId: 'cat-alfombras-termoformadas', badge: null, price: '190.000', colors: ['#1a1a1a'], svg: alfombraSvg, desc: 'ALFOMBRAS TERMOFORMADAS MDRACING – AJUSTE PERFECTO\n\nModelo: Toyota Corolla G11 2015-2020\n\nProtegé el interior de tu vehículo con las alfombras termoformadas MDRACING, diseñadas específicamente para cada modelo de auto. Ofrecen máxima protección, excelente ajuste y un acabado moderno y funcional.\nFabricadas con materiales de alta calidad, estas alfombras se adaptan perfectamente a la forma original del piso del vehículo, cubriendo las zonas más expuestas al desgaste diario, suciedad, barro y líquidos.\n\nCARACTERÍSTICAS PRINCIPALES\n• Diseño termoformado a medida\n• Ajuste perfecto según el modelo indicado\n• Material resistente, durable y flexible\n• Bordes elevados que evitan derrames\n• Superficie antideslizante\n• Incluyen clips de sujeción para una fijación segura\n• Fácil limpieza (agua o paño húmedo)\n• No retienen olor\n• Mantienen el interior del vehículo protegido y prolijo\n\nBENEFICIOS\n• Protegen la alfombra original del auto\n• Evitan manchas, humedad y desgaste\n• Mejoran la estética interior\n• Fijación firme que evita desplazamientos\n• Ideales para uso urbano, viajes, lluvia, barro o arena\n\nCONTENIDO DEL PAQUETE\n• Juego completo de alfombras termoformadas (delanteras y traseras, según modelo)\n\nIMPORTANTE\n• Producto diseñado exclusivamente para el modelo indicado\n• Las imágenes publicadas corresponden al producto real', images: ['images/alfombras%20termoformadas/Alfombra%20Termoformada%20Toyota%20Corolla%20G11%202015-2020/D_NQ_NP_2X_865960-MLA111345496507_052026-F.jpg','images/alfombras%20termoformadas/fotos%203%204%205%206/3.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/4.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/5.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/6.webp'] },
  { id: 'alfombra-termoformada-toyota-corolla-g12-2020-7085', name: 'Alfombra Termoformada Toyota Corolla G12 2020+', cat: 'Alfombras Termoformadas', catId: 'cat-alfombras-termoformadas', badge: null, price: '190.000', colors: ['#1a1a1a'], svg: alfombraSvg, desc: 'ALFOMBRAS TERMOFORMADAS MDRACING – AJUSTE PERFECTO\n\nModelo: Toyota Corolla G12 2020+\n\nProtegé el interior de tu vehículo con las alfombras termoformadas MDRACING, diseñadas específicamente para cada modelo de auto. Ofrecen máxima protección, excelente ajuste y un acabado moderno y funcional.\nFabricadas con materiales de alta calidad, estas alfombras se adaptan perfectamente a la forma original del piso del vehículo, cubriendo las zonas más expuestas al desgaste diario, suciedad, barro y líquidos.\n\nCARACTERÍSTICAS PRINCIPALES\n• Diseño termoformado a medida\n• Ajuste perfecto según el modelo indicado\n• Material resistente, durable y flexible\n• Bordes elevados que evitan derrames\n• Superficie antideslizante\n• Incluyen clips de sujeción para una fijación segura\n• Fácil limpieza (agua o paño húmedo)\n• No retienen olor\n• Mantienen el interior del vehículo protegido y prolijo\n\nBENEFICIOS\n• Protegen la alfombra original del auto\n• Evitan manchas, humedad y desgaste\n• Mejoran la estética interior\n• Fijación firme que evita desplazamientos\n• Ideales para uso urbano, viajes, lluvia, barro o arena\n\nCONTENIDO DEL PAQUETE\n• Juego completo de alfombras termoformadas (delanteras y traseras, según modelo)\n\nIMPORTANTE\n• Producto diseñado exclusivamente para el modelo indicado\n• Las imágenes publicadas corresponden al producto real', images: ['/images/alfombras%20termoformadas/fotos%203%204%205%206/3.webp','/images/alfombras%20termoformadas/fotos%203%204%205%206/4.webp','/images/alfombras%20termoformadas/fotos%203%204%205%206/5.webp','/images/alfombras%20termoformadas/fotos%203%204%205%206/6.webp'] },
  { id: 'alfombra-termoformada-toyota-corolla-cross-g11-2021-7085b', name: 'Alfombra Termoformada Toyota Corolla Cross G11 2021+', cat: 'Alfombras Termoformadas', catId: 'cat-alfombras-termoformadas', badge: null, price: '190.000', colors: ['#1a1a1a'], svg: alfombraSvg, desc: 'ALFOMBRAS TERMOFORMADAS MDRACING – AJUSTE PERFECTO\n\nModelo: Toyota Corolla Cross G11 2021+\n\nProtegé el interior de tu vehículo con las alfombras termoformadas MDRACING, diseñadas específicamente para cada modelo de auto. Ofrecen máxima protección, excelente ajuste y un acabado moderno y funcional.\nFabricadas con materiales de alta calidad, estas alfombras se adaptan perfectamente a la forma original del piso del vehículo, cubriendo las zonas más expuestas al desgaste diario, suciedad, barro y líquidos.\n\nCARACTERÍSTICAS PRINCIPALES\n• Diseño termoformado a medida\n• Ajuste perfecto según el modelo indicado\n• Material resistente, durable y flexible\n• Bordes elevados que evitan derrames\n• Superficie antideslizante\n• Incluyen clips de sujeción para una fijación segura\n• Fácil limpieza (agua o paño húmedo)\n• No retienen olor\n• Mantienen el interior del vehículo protegido y prolijo\n\nBENEFICIOS\n• Protegen la alfombra original del auto\n• Evitan manchas, humedad y desgaste\n• Mejoran la estética interior\n• Fijación firme que evita desplazamientos\n• Ideales para uso urbano, viajes, lluvia, barro o arena\n\nCONTENIDO DEL PAQUETE\n• Juego completo de alfombras termoformadas (delanteras y traseras, según modelo)\n\nIMPORTANTE\n• Producto diseñado exclusivamente para el modelo indicado\n• Las imágenes publicadas corresponden al producto real', images: ['/images/alfombras%20termoformadas/fotos%203%204%205%206/3.webp','/images/alfombras%20termoformadas/fotos%203%204%205%206/4.webp','/images/alfombras%20termoformadas/fotos%203%204%205%206/5.webp','/images/alfombras%20termoformadas/fotos%203%204%205%206/6.webp'] },
  { id: 'alfombra-termoformada-toyota-etios-sedan-7110', name: 'Alfombra Termoformada Toyota Etios Sedan', cat: 'Alfombras Termoformadas', catId: 'cat-alfombras-termoformadas', badge: null, price: '190.000', colors: ['#1a1a1a'], svg: alfombraSvg, desc: 'ALFOMBRAS TERMOFORMADAS MDRACING – AJUSTE PERFECTO\n\nModelo: Toyota Etios Sedan\n\nProtegé el interior de tu vehículo con las alfombras termoformadas MDRACING, diseñadas específicamente para cada modelo de auto. Ofrecen máxima protección, excelente ajuste y un acabado moderno y funcional.\nFabricadas con materiales de alta calidad, estas alfombras se adaptan perfectamente a la forma original del piso del vehículo, cubriendo las zonas más expuestas al desgaste diario, suciedad, barro y líquidos.\n\nCARACTERÍSTICAS PRINCIPALES\n• Diseño termoformado a medida\n• Ajuste perfecto según el modelo indicado\n• Material resistente, durable y flexible\n• Bordes elevados que evitan derrames\n• Superficie antideslizante\n• Incluyen clips de sujeción para una fijación segura\n• Fácil limpieza (agua o paño húmedo)\n• No retienen olor\n• Mantienen el interior del vehículo protegido y prolijo\n\nBENEFICIOS\n• Protegen la alfombra original del auto\n• Evitan manchas, humedad y desgaste\n• Mejoran la estética interior\n• Fijación firme que evita desplazamientos\n• Ideales para uso urbano, viajes, lluvia, barro o arena\n\nCONTENIDO DEL PAQUETE\n• Juego completo de alfombras termoformadas (delanteras y traseras, según modelo)\n\nIMPORTANTE\n• Producto diseñado exclusivamente para el modelo indicado\n• Las imágenes publicadas corresponden al producto real', images: ['images/alfombras%20termoformadas/Alfombra%20Termoformada%20Toyota%20Etios%20Sedan/D_NQ_NP_2X_865960-MLA111345496507_052026-F.jpg','images/alfombras%20termoformadas/fotos%203%204%205%206/3.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/4.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/5.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/6.webp'] },
  { id: 'alfombra-termoformada-toyota-etios-hatchback-7111', name: 'Alfombra Termoformada Toyota Etios Hatchback', cat: 'Alfombras Termoformadas', catId: 'cat-alfombras-termoformadas', badge: null, price: '190.000', colors: ['#1a1a1a'], svg: alfombraSvg, desc: 'ALFOMBRAS TERMOFORMADAS MDRACING – AJUSTE PERFECTO\n\nModelo: Toyota Etios Hatchback\n\nProtegé el interior de tu vehículo con las alfombras termoformadas MDRACING, diseñadas específicamente para cada modelo de auto. Ofrecen máxima protección, excelente ajuste y un acabado moderno y funcional.\nFabricadas con materiales de alta calidad, estas alfombras se adaptan perfectamente a la forma original del piso del vehículo, cubriendo las zonas más expuestas al desgaste diario, suciedad, barro y líquidos.\n\nCARACTERÍSTICAS PRINCIPALES\n• Diseño termoformado a medida\n• Ajuste perfecto según el modelo indicado\n• Material resistente, durable y flexible\n• Bordes elevados que evitan derrames\n• Superficie antideslizante\n• Incluyen clips de sujeción para una fijación segura\n• Fácil limpieza (agua o paño húmedo)\n• No retienen olor\n• Mantienen el interior del vehículo protegido y prolijo\n\nBENEFICIOS\n• Protegen la alfombra original del auto\n• Evitan manchas, humedad y desgaste\n• Mejoran la estética interior\n• Fijación firme que evita desplazamientos\n• Ideales para uso urbano, viajes, lluvia, barro o arena\n\nCONTENIDO DEL PAQUETE\n• Juego completo de alfombras termoformadas (delanteras y traseras, según modelo)\n\nIMPORTANTE\n• Producto diseñado exclusivamente para el modelo indicado\n• Las imágenes publicadas corresponden al producto real', images: ['images/alfombras%20termoformadas/Alfombra%20Termoformada%20Toyota%20Etios%20Hatchback/D_NQ_NP_2X_658856-MLA100498301299_122025-F.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/3.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/4.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/5.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/6.webp'] },
  // VOLKSWAGEN
  { id: 'alfombra-termoformada-vw-amarok-2010-7074', name: 'Alfombra Termoformada VW Amarok 2010+', cat: 'Alfombras Termoformadas', catId: 'cat-alfombras-termoformadas', badge: null, price: '190.000', colors: ['#1a1a1a'], svg: alfombraSvg, desc: 'ALFOMBRAS TERMOFORMADAS MDRACING – AJUSTE PERFECTO\n\nModelo: Volkswagen Amarok 2010+\n\nProtegé el interior de tu vehículo con las alfombras termoformadas MDRACING, diseñadas específicamente para cada modelo de auto. Ofrecen máxima protección, excelente ajuste y un acabado moderno y funcional.\nFabricadas con materiales de alta calidad, estas alfombras se adaptan perfectamente a la forma original del piso del vehículo, cubriendo las zonas más expuestas al desgaste diario, suciedad, barro y líquidos.\n\nCARACTERÍSTICAS PRINCIPALES\n• Diseño termoformado a medida\n• Ajuste perfecto según el modelo indicado\n• Material resistente, durable y flexible\n• Bordes elevados que evitan derrames\n• Superficie antideslizante\n• Incluyen clips de sujeción para una fijación segura\n• Fácil limpieza (agua o paño húmedo)\n• No retienen olor\n• Mantienen el interior del vehículo protegido y prolijo\n\nBENEFICIOS\n• Protegen la alfombra original del auto\n• Evitan manchas, humedad y desgaste\n• Mejoran la estética interior\n• Fijación firme que evita desplazamientos\n• Ideales para uso urbano, viajes, lluvia, barro o arena\n\nCONTENIDO DEL PAQUETE\n• Juego completo de alfombras termoformadas (delanteras y traseras, según modelo)\n\nIMPORTANTE\n• Producto diseñado exclusivamente para el modelo indicado\n• Las imágenes publicadas corresponden al producto real', images: ['images/alfombras%20termoformadas/Alfombra%20Termoformada%20VW%20Amarok%202010%2B/D_NQ_NP_2X_806501-MLA91917302802_092025-F.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/3.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/4.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/5.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/6.webp'] },
  { id: 'alfombra-termoformada-vw-suran-fox-7113', name: 'Alfombra Termoformada VW Suran / Fox', cat: 'Alfombras Termoformadas', catId: 'cat-alfombras-termoformadas', badge: null, price: '190.000', colors: ['#1a1a1a'], svg: alfombraSvg, desc: 'ALFOMBRAS TERMOFORMADAS MDRACING – AJUSTE PERFECTO\n\nModelo: Volkswagen Suran / Fox\n\nProtegé el interior de tu vehículo con las alfombras termoformadas MDRACING, diseñadas específicamente para cada modelo de auto. Ofrecen máxima protección, excelente ajuste y un acabado moderno y funcional.\nFabricadas con materiales de alta calidad, estas alfombras se adaptan perfectamente a la forma original del piso del vehículo, cubriendo las zonas más expuestas al desgaste diario, suciedad, barro y líquidos.\n\nCARACTERÍSTICAS PRINCIPALES\n• Diseño termoformado a medida\n• Ajuste perfecto según el modelo indicado\n• Material resistente, durable y flexible\n• Bordes elevados que evitan derrames\n• Superficie antideslizante\n• Incluyen clips de sujeción para una fijación segura\n• Fácil limpieza (agua o paño húmedo)\n• No retienen olor\n• Mantienen el interior del vehículo protegido y prolijo\n\nBENEFICIOS\n• Protegen la alfombra original del auto\n• Evitan manchas, humedad y desgaste\n• Mejoran la estética interior\n• Fijación firme que evita desplazamientos\n• Ideales para uso urbano, viajes, lluvia, barro o arena\n\nCONTENIDO DEL PAQUETE\n• Juego completo de alfombras termoformadas (delanteras y traseras, según modelo)\n\nIMPORTANTE\n• Producto diseñado exclusivamente para el modelo indicado\n• Las imágenes publicadas corresponden al producto real', images: ['images/alfombras%20termoformadas/Alfombra%20Termoformada%20VW%20Suran%20%20Fox/D_NQ_NP_2X_888887-MLA90750190991_082025-F.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/3.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/4.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/5.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/6.webp'] },
  { id: 'alfombra-termoformada-vw-virtus-7114', name: 'Alfombra Termoformada VW Virtus', cat: 'Alfombras Termoformadas', catId: 'cat-alfombras-termoformadas', badge: null, price: '190.000', colors: ['#1a1a1a'], svg: alfombraSvg, desc: 'ALFOMBRAS TERMOFORMADAS MDRACING – AJUSTE PERFECTO\n\nModelo: Volkswagen Virtus\n\nProtegé el interior de tu vehículo con las alfombras termoformadas MDRACING, diseñadas específicamente para cada modelo de auto. Ofrecen máxima protección, excelente ajuste y un acabado moderno y funcional.\nFabricadas con materiales de alta calidad, estas alfombras se adaptan perfectamente a la forma original del piso del vehículo, cubriendo las zonas más expuestas al desgaste diario, suciedad, barro y líquidos.\n\nCARACTERÍSTICAS PRINCIPALES\n• Diseño termoformado a medida\n• Ajuste perfecto según el modelo indicado\n• Material resistente, durable y flexible\n• Bordes elevados que evitan derrames\n• Superficie antideslizante\n• Incluyen clips de sujeción para una fijación segura\n• Fácil limpieza (agua o paño húmedo)\n• No retienen olor\n• Mantienen el interior del vehículo protegido y prolijo\n\nBENEFICIOS\n• Protegen la alfombra original del auto\n• Evitan manchas, humedad y desgaste\n• Mejoran la estética interior\n• Fijación firme que evita desplazamientos\n• Ideales para uso urbano, viajes, lluvia, barro o arena\n\nCONTENIDO DEL PAQUETE\n• Juego completo de alfombras termoformadas (delanteras y traseras, según modelo)\n\nIMPORTANTE\n• Producto diseñado exclusivamente para el modelo indicado\n• Las imágenes publicadas corresponden al producto real', images: ['images/alfombras%20termoformadas/Alfombra%20Termoformada%20VW%20Virtus/D_NQ_NP_2X_672621-MLA92290843802_092025-F.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/3.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/4.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/5.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/6.webp'] },
  { id: 'alfombra-termoformada-vw-t-cross-7115', name: 'Alfombra Termoformada VW T-Cross', cat: 'Alfombras Termoformadas', catId: 'cat-alfombras-termoformadas', badge: null, price: '190.000', colors: ['#1a1a1a'], svg: alfombraSvg, desc: 'ALFOMBRAS TERMOFORMADAS MDRACING – AJUSTE PERFECTO\n\nModelo: Volkswagen T-Cross\n\nProtegé el interior de tu vehículo con las alfombras termoformadas MDRACING, diseñadas específicamente para cada modelo de auto. Ofrecen máxima protección, excelente ajuste y un acabado moderno y funcional.\nFabricadas con materiales de alta calidad, estas alfombras se adaptan perfectamente a la forma original del piso del vehículo, cubriendo las zonas más expuestas al desgaste diario, suciedad, barro y líquidos.\n\nCARACTERÍSTICAS PRINCIPALES\n• Diseño termoformado a medida\n• Ajuste perfecto según el modelo indicado\n• Material resistente, durable y flexible\n• Bordes elevados que evitan derrames\n• Superficie antideslizante\n• Incluyen clips de sujeción para una fijación segura\n• Fácil limpieza (agua o paño húmedo)\n• No retienen olor\n• Mantienen el interior del vehículo protegido y prolijo\n\nBENEFICIOS\n• Protegen la alfombra original del auto\n• Evitan manchas, humedad y desgaste\n• Mejoran la estética interior\n• Fijación firme que evita desplazamientos\n• Ideales para uso urbano, viajes, lluvia, barro o arena\n\nCONTENIDO DEL PAQUETE\n• Juego completo de alfombras termoformadas (delanteras y traseras, según modelo)\n\nIMPORTANTE\n• Producto diseñado exclusivamente para el modelo indicado\n• Las imágenes publicadas corresponden al producto real', images: ['/images/alfombras%20termoformadas/fotos%203%204%205%206/3.webp','/images/alfombras%20termoformadas/fotos%203%204%205%206/4.webp','/images/alfombras%20termoformadas/fotos%203%204%205%206/5.webp','/images/alfombras%20termoformadas/fotos%203%204%205%206/6.webp'] },
  { id: 'alfombra-termoformada-vw-taos-7116', name: 'Alfombra Termoformada VW Taos', cat: 'Alfombras Termoformadas', catId: 'cat-alfombras-termoformadas', badge: null, price: '190.000', colors: ['#1a1a1a'], svg: alfombraSvg, desc: 'ALFOMBRAS TERMOFORMADAS MDRACING – AJUSTE PERFECTO\n\nModelo: Volkswagen Taos\n\nProtegé el interior de tu vehículo con las alfombras termoformadas MDRACING, diseñadas específicamente para cada modelo de auto. Ofrecen máxima protección, excelente ajuste y un acabado moderno y funcional.\nFabricadas con materiales de alta calidad, estas alfombras se adaptan perfectamente a la forma original del piso del vehículo, cubriendo las zonas más expuestas al desgaste diario, suciedad, barro y líquidos.\n\nCARACTERÍSTICAS PRINCIPALES\n• Diseño termoformado a medida\n• Ajuste perfecto según el modelo indicado\n• Material resistente, durable y flexible\n• Bordes elevados que evitan derrames\n• Superficie antideslizante\n• Incluyen clips de sujeción para una fijación segura\n• Fácil limpieza (agua o paño húmedo)\n• No retienen olor\n• Mantienen el interior del vehículo protegido y prolijo\n\nBENEFICIOS\n• Protegen la alfombra original del auto\n• Evitan manchas, humedad y desgaste\n• Mejoran la estética interior\n• Fijación firme que evita desplazamientos\n• Ideales para uso urbano, viajes, lluvia, barro o arena\n\nCONTENIDO DEL PAQUETE\n• Juego completo de alfombras termoformadas (delanteras y traseras, según modelo)\n\nIMPORTANTE\n• Producto diseñado exclusivamente para el modelo indicado\n• Las imágenes publicadas corresponden al producto real', images: ['images/alfombras%20termoformadas/Alfombra%20Termoformada%20VW%20Taos/D_NQ_NP_2X_982340-MLA97117161720_112025-F.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/3.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/4.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/5.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/6.webp'] },
  { id: 'alfombra-termoformada-vw-vento-mk7-2018-7117', name: 'Alfombra Termoformada VW Vento MK7 2018+', cat: 'Alfombras Termoformadas', catId: 'cat-alfombras-termoformadas', badge: null, price: '190.000', colors: ['#1a1a1a'], svg: alfombraSvg, desc: 'ALFOMBRAS TERMOFORMADAS MDRACING – AJUSTE PERFECTO\n\nModelo: Volkswagen Vento MK7 2018+\n\nProtegé el interior de tu vehículo con las alfombras termoformadas MDRACING, diseñadas específicamente para cada modelo de auto. Ofrecen máxima protección, excelente ajuste y un acabado moderno y funcional.\nFabricadas con materiales de alta calidad, estas alfombras se adaptan perfectamente a la forma original del piso del vehículo, cubriendo las zonas más expuestas al desgaste diario, suciedad, barro y líquidos.\n\nCARACTERÍSTICAS PRINCIPALES\n• Diseño termoformado a medida\n• Ajuste perfecto según el modelo indicado\n• Material resistente, durable y flexible\n• Bordes elevados que evitan derrames\n• Superficie antideslizante\n• Incluyen clips de sujeción para una fijación segura\n• Fácil limpieza (agua o paño húmedo)\n• No retienen olor\n• Mantienen el interior del vehículo protegido y prolijo\n\nBENEFICIOS\n• Protegen la alfombra original del auto\n• Evitan manchas, humedad y desgaste\n• Mejoran la estética interior\n• Fijación firme que evita desplazamientos\n• Ideales para uso urbano, viajes, lluvia, barro o arena\n\nCONTENIDO DEL PAQUETE\n• Juego completo de alfombras termoformadas (delanteras y traseras, según modelo)\n\nIMPORTANTE\n• Producto diseñado exclusivamente para el modelo indicado\n• Las imágenes publicadas corresponden al producto real', images: ['/images/alfombras%20termoformadas/fotos%203%204%205%206/3.webp','/images/alfombras%20termoformadas/fotos%203%204%205%206/4.webp','/images/alfombras%20termoformadas/fotos%203%204%205%206/5.webp','/images/alfombras%20termoformadas/fotos%203%204%205%206/6.webp'] },
  { id: 'alfombra-termoformada-vw-nivus-2025-7118', name: 'Alfombra Termoformada VW Nivus 2025+', cat: 'Alfombras Termoformadas', catId: 'cat-alfombras-termoformadas', badge: null, price: '190.000', colors: ['#1a1a1a'], svg: alfombraSvg, desc: 'ALFOMBRAS TERMOFORMADAS MDRACING – AJUSTE PERFECTO\n\nModelo: Volkswagen Nivus 2025+\n\nProtegé el interior de tu vehículo con las alfombras termoformadas MDRACING, diseñadas específicamente para cada modelo de auto. Ofrecen máxima protección, excelente ajuste y un acabado moderno y funcional.\nFabricadas con materiales de alta calidad, estas alfombras se adaptan perfectamente a la forma original del piso del vehículo, cubriendo las zonas más expuestas al desgaste diario, suciedad, barro y líquidos.\n\nCARACTERÍSTICAS PRINCIPALES\n• Diseño termoformado a medida\n• Ajuste perfecto según el modelo indicado\n• Material resistente, durable y flexible\n• Bordes elevados que evitan derrames\n• Superficie antideslizante\n• Incluyen clips de sujeción para una fijación segura\n• Fácil limpieza (agua o paño húmedo)\n• No retienen olor\n• Mantienen el interior del vehículo protegido y prolijo\n\nBENEFICIOS\n• Protegen la alfombra original del auto\n• Evitan manchas, humedad y desgaste\n• Mejoran la estética interior\n• Fijación firme que evita desplazamientos\n• Ideales para uso urbano, viajes, lluvia, barro o arena\n\nCONTENIDO DEL PAQUETE\n• Juego completo de alfombras termoformadas (delanteras y traseras, según modelo)\n\nIMPORTANTE\n• Producto diseñado exclusivamente para el modelo indicado\n• Las imágenes publicadas corresponden al producto real', images: ['images/alfombras%20termoformadas/Alfombra%20Termoformada%20VW%20Nivus%202025%2B/D_NQ_NP_2X_865960-MLA111345496507_052026-F.jpg','images/alfombras%20termoformadas/fotos%203%204%205%206/3.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/4.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/5.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/6.webp'] },
  { id: 'alfombra-termoformada-vw-tera-2025-7119', name: 'Alfombra Termoformada VW Tera 2025+', cat: 'Alfombras Termoformadas', catId: 'cat-alfombras-termoformadas', badge: null, price: '190.000', colors: ['#1a1a1a'], svg: alfombraSvg, desc: 'ALFOMBRAS TERMOFORMADAS MDRACING – AJUSTE PERFECTO\n\nModelo: Volkswagen Tera 2025+\n\nProtegé el interior de tu vehículo con las alfombras termoformadas MDRACING, diseñadas específicamente para cada modelo de auto. Ofrecen máxima protección, excelente ajuste y un acabado moderno y funcional.\nFabricadas con materiales de alta calidad, estas alfombras se adaptan perfectamente a la forma original del piso del vehículo, cubriendo las zonas más expuestas al desgaste diario, suciedad, barro y líquidos.\n\nCARACTERÍSTICAS PRINCIPALES\n• Diseño termoformado a medida\n• Ajuste perfecto según el modelo indicado\n• Material resistente, durable y flexible\n• Bordes elevados que evitan derrames\n• Superficie antideslizante\n• Incluyen clips de sujeción para una fijación segura\n• Fácil limpieza (agua o paño húmedo)\n• No retienen olor\n• Mantienen el interior del vehículo protegido y prolijo\n\nBENEFICIOS\n• Protegen la alfombra original del auto\n• Evitan manchas, humedad y desgaste\n• Mejoran la estética interior\n• Fijación firme que evita desplazamientos\n• Ideales para uso urbano, viajes, lluvia, barro o arena\n\nCONTENIDO DEL PAQUETE\n• Juego completo de alfombras termoformadas (delanteras y traseras, según modelo)\n\nIMPORTANTE\n• Producto diseñado exclusivamente para el modelo indicado\n• Las imágenes publicadas corresponden al producto real', images: ['images/alfombras%20termoformadas/Alfombra%20Termoformada%20VW%20Tera%202025%2B/D_NQ_NP_2X_865960-MLA111345496507_052026-F.jpg','images/alfombras%20termoformadas/fotos%203%204%205%206/3.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/4.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/5.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/6.webp'] },
  { id: 'alfombra-termoformada-vw-titano-2024-7120', name: 'Alfombra Termoformada VW Titano 2024+', cat: 'Alfombras Termoformadas', catId: 'cat-alfombras-termoformadas', badge: null, price: '190.000', colors: ['#1a1a1a'], svg: alfombraSvg, desc: 'ALFOMBRAS TERMOFORMADAS MDRACING – AJUSTE PERFECTO\n\nModelo: Volkswagen Titano 2024+\n\nProtegé el interior de tu vehículo con las alfombras termoformadas MDRACING, diseñadas específicamente para cada modelo de auto. Ofrecen máxima protección, excelente ajuste y un acabado moderno y funcional.\nFabricadas con materiales de alta calidad, estas alfombras se adaptan perfectamente a la forma original del piso del vehículo, cubriendo las zonas más expuestas al desgaste diario, suciedad, barro y líquidos.\n\nCARACTERÍSTICAS PRINCIPALES\n• Diseño termoformado a medida\n• Ajuste perfecto según el modelo indicado\n• Material resistente, durable y flexible\n• Bordes elevados que evitan derrames\n• Superficie antideslizante\n• Incluyen clips de sujeción para una fijación segura\n• Fácil limpieza (agua o paño húmedo)\n• No retienen olor\n• Mantienen el interior del vehículo protegido y prolijo\n\nBENEFICIOS\n• Protegen la alfombra original del auto\n• Evitan manchas, humedad y desgaste\n• Mejoran la estética interior\n• Fijación firme que evita desplazamientos\n• Ideales para uso urbano, viajes, lluvia, barro o arena\n\nCONTENIDO DEL PAQUETE\n• Juego completo de alfombras termoformadas (delanteras y traseras, según modelo)\n\nIMPORTANTE\n• Producto diseñado exclusivamente para el modelo indicado\n• Las imágenes publicadas corresponden al producto real', images: ['images/alfombras%20termoformadas/Alfombra%20Termoformada%20VW%20Titano%202024%2B/D_NQ_NP_2X_865960-MLA111345496507_052026-F.jpg','images/alfombras%20termoformadas/fotos%203%204%205%206/3.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/4.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/5.webp','images/alfombras%20termoformadas/fotos%203%204%205%206/6.webp'] },

  // ─── ACCESORIOS ──────────────────────────────────────────────────────────
  { id: 'cubre-volante-base-plana-polo-gol-golf-vento-ksc3g', name: 'Cubre Volante Base Plana VW/Ford/Renault', cat: 'Accesorios', catId: 'cat-accesorios', badge: 'Más Vendido', price: '15.000', salePrice: '14.000', colors: ['#1a1a1a'], svg: accesorioSvg, desc: 'Cubre volante base plana 38". Compatible con volantes planos y redondos de 38". VW, Peugeot, Citroën, Ford, Renault.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_629274-mla52282926741_112022-o-cdf58f73a58e843bf117587257532784-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_626330-mla52282969610_112022-o-90100461e3078480a817587257682928-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_823792-mla52282841928_112022-o-9b7bc23b184a566e2c17587257554450-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_912712-mla52283002449_112022-o-253686a7308ccf33da17587257609320-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_799303-mla52283059129_112022-o-5e70ce3350d7815a5e17587257633261-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_865350-mla52282987564_112022-o-746e629d142ab7009217587257657426-1024-1024.webp'] },
  { id: 'cubre-volante-diametro-38', name: 'Cubre Volante Diámetro 38', cat: 'Accesorios', catId: 'cat-accesorios', badge: null, price: '14.000', colors: ['#1a1a1a'], svg: accesorioSvg, desc: 'Cubre volante universal diámetro 38. Acolchado con costuras decorativas rojas, mejora el grip.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5Fnp%5F752400-mla89203726000%5F082025-o-a9276600043e69fcd917587256300114-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5Fnp%5F711495-mla89202461178%5F082025-o-d050a03a353db6e94217587256329915-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5Fnp%5F961763-mla89203006850%5F082025-o-7043d819acb440efb817587256351350-1024-1024.webp'] },
  { id: 'cubre-volante-animal-print', name: 'Cubre Volante Animal Print', cat: 'Accesorios', catId: 'cat-accesorios', badge: 'OFERTA', price: '12.000', salePrice: '10.000', colors: ['#1a1a1a'], svg: accesorioSvg, desc: 'Cubre volante diseño animal print. Estilo único para el interior de tu auto.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5Fnp%5F944468-mla92664068167%5F092025-o-cda332ca2c2816ae6917587255314985-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5Fnp%5F673355-mla82187795800%5F022025-o-ac6f2eebb60640d2dd17587255398251-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5Fnp%5F789506-mla92257280070%5F092025-o-49a5c3d8e6e0f0edeb17587255447970-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5Fnp%5F808891-mla92662853735%5F092025-o-e540cb3cda2802e07617587255489084-1024-1024.webp'] },
  { id: 'cubre-volante-acolchado-universal-38', name: 'Cubre Volante Acolchado Universal 38', cat: 'Accesorios', catId: 'cat-accesorios', badge: null, price: '12.000', colors: ['#1a1a1a'], svg: accesorioSvg, desc: 'Cubre volante acolchado universal para volantes de 38 cm.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/cubre-volante-acolchado-universal-30ab9999e1e2d71df717126705883238-1024-1024.webp'] },
  { id: 'cubre-volante-flores-universal-38', name: 'Cubre Volante Flores Universal 38', cat: 'Accesorios', catId: 'cat-accesorios', badge: null, price: '14.000', colors: ['#c46080'], svg: accesorioSvg, desc: 'Cubre volante diseño flores universal para volantes de 38 cm.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/cubre-volante-flores-universal-d50135790382fcdbfc17126704962174-1024-1024.webp'] },
  { id: 'cubre-volante-rosa-universal', name: 'Cubre Volante Rosa Universal', cat: 'Accesorios', catId: 'cat-accesorios', badge: 'OFERTA', price: '11.000', salePrice: '9.000', colors: ['#c46080'], svg: accesorioSvg, desc: 'Cubre volante rosa universal. Toque de color y personalidad para el interior del auto.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/cubre-volante-rosa-universal-38-179702b080cd072abe17126701253426-1024-1024.webp'] },
  { id: 'cubre-volante-protector-mecanicos-detailing', name: 'Cubre Volante Protector Mecánicos (Unidad)', cat: 'Accesorios', catId: 'cat-accesorios', badge: 'Mecánico', price: '5.000', colors: ['#1a1a1a'], svg: accesorioSvg, desc: 'Cubre volante protector para mecánicos y detailing. Colocación y remoción en segundos. Precio por unidad.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5F2x%5F776605-mla25064099758%5F092016-b-656862511ce14697af17587247821980-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5Fnp%5F668307-mla82246854541%5F022025-o-f79e0892b328464a0a17587248001407-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5Fnp%5F676393-mla82246941635%5F022025-o-2d5acecbbbec7f446017587248054044-1024-1024.webp'] },
  { id: 'cubre-volante-protector-mecanicos-detailing-10-unidades', name: 'Cubre Volante Protector Mecánicos x10 Unidades', cat: 'Accesorios', catId: 'cat-accesorios', badge: 'Mecánico', price: '45.000', colors: ['#1a1a1a'], svg: accesorioSvg, desc: 'Pack 10 unidades de cubre volante protector para talleres y detailing. Práctico para uso profesional.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_776605-mla25064099758_092016-b-7109e422546e6d486817587287272733-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_668307-mla82246854541_022025-o-96126a687916ac362717587287372817-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_676393-mla82246941635_022025-o-4fa0f8f6f90a4ec4d117587287396604-1024-1024.webp'] },
  { id: 'cubre-ruedas-rigido-ecosport', name: 'Cubre Rueda Rígido Ford EcoSport', cat: 'Accesorios', catId: 'cat-accesorios', badge: 'A medida', price: '43.000', colors: ['#1a1a1a'], svg: accesorioSvg, desc: 'Cubre rueda plástico rígido para Ford EcoSport con logo. Rodado 15 y 16, se ajusta al bulón de rueda auxiliar.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_669592-mla74942538034_032024-o-fd8036b4d47c55ce8317587285954207-1024-1024.webp'] },
  { id: 'portabici-techo-auto-ruedas-anchas-r29-soporte-universal', name: 'Portabici Techo Ruedas Anchas R29 Universal', cat: 'Accesorios', catId: 'cat-accesorios', badge: null, price: '43.000', colors: ['#1a1a1a'], svg: accesorioSvg, desc: 'Portabicicleta de techo canaleta ancha para todo tipo de bicicleta. Adaptable a barras de hasta 8cm.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_895572-mla88973848746_082025-o-bb2e3ec2512124a50f17587286257829-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_652445-mla74903954713_032024-o-71c109d5ce4741c28417587286295649-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_624578-mla74903569387_032024-o-0efdcaa02f5326de2b17587286319809-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/logo_nuevo_m3_png-dcf78470086c34b27017587286490818-1024-1024.webp'] },
  { id: 'portabicicletas-mdracing-techo-hierro-r29-8no1w', name: 'Portabicicletas MDRACING Techo Hierro R29', cat: 'Accesorios', catId: 'cat-accesorios', badge: null, price: '42.000', colors: ['#1a1a1a'], svg: accesorioSvg, desc: 'Portabicicleta de techo con canaleta ancha y tiras de sujeción. Sirve para todo tipo de bicicleta.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/download-cc400e2544bd49398617588991294268-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_804118-mla48949432254_012022-o-ff7423fdf613d694c417588993761146-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_2x_624578-mla74903569387_032024-b-e789f513ec1d05b39517588993909416-1024-1024.webp'] },
  { id: 'barra-portaequipaje-transversal-hierro-recubierto-plastico', name: 'Barra Portaequipaje Transversal Hierro 1,3m', cat: 'Accesorios', catId: 'cat-accesorios', badge: null, price: '65.000', colors: ['#1a1a1a'], svg: accesorioSvg, desc: 'Barras portaequipaje transversales 1,3m en hierro reforzado, soporta hasta 100kg. Para S10, Berlingo, EcoSport y más.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5Fnp%5F892890-mla76033997577%5F042024-o-b3ce2a60e9e93641f017587308212007-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5Fnp%5F761779-mla76033572293%5F042024-o-ee658e9b66a3dd382517587308247377-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5Fnp%5F739627-mla76033701553%5F042024-o-ada881521985e8c99617587308229569-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5Fnp%5F930803-mla76033572393%5F042024-o-ad0f0eb42a9e06c1d317587308263481-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5Fnp%5F990913-mla76033701649%5F042024-o-ff4b4b0a52ce3ec8df17587308281850-1024-1024.webp'] },
  { id: 'cubre-zocalo-peugeot-207', name: 'Cubre Zócalo Peugeot 207', cat: 'Accesorios', catId: 'cat-accesorios', badge: null, price: '9.000', colors: ['#888888'], svg: accesorioSvg, desc: 'Cubre zócalos 4 puertas acero inoxidable esmerilado con cinta doble faz. Protege la pintura de rayones.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5Fnp%5F871848-mla32340124788%5F092019-o-57602cd7fb30fb85db17587251032580-1024-1024.webp'] },
  { id: 'cubre-zocalo-chevrolet-cruze', name: 'Cubre Zócalo Chevrolet Cruze', cat: 'Accesorios', catId: 'cat-accesorios', badge: null, price: '10.000', colors: ['#888888'], svg: accesorioSvg, desc: 'Cubre zócalos 4 puertas acero inoxidable esmerilado con cinta doble faz para Chevrolet Cruze.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_975190-mla32340130762_092019-o-3b960e21b1d62aaef617587252703672-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_815503-mla32340125778_092019-o-9c3a43c7649ad9b49417587252730889-1024-1024.webp'] },
  { id: 'cubre-zocalo-ford-ecosport', name: 'Cubre Zócalo Ford EcoSport', cat: 'Accesorios', catId: 'cat-accesorios', badge: null, price: '10.000', colors: ['#888888'], svg: accesorioSvg, desc: 'Cubre zócalos 4 puertas acero inoxidable esmerilado con cinta doble faz para Ford EcoSport.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5Fnp%5F708255-mla32340126783%5F092019-o-6e9fec71e00226f63817587253195455-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5Fnp%5F942354-mla32340139711%5F092019-o-b468f009893049b70e17587253216618-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5Fnp%5F743912-mla32340139712%5F092019-o-0158070ee6e507993c17587253295084-1024-1024.webp'] },
  { id: 'cubre-zocalos-citroen-c3-c4-c5-saxo-picasso-air-cross', name: 'Cubre Zócalos Citroën C3/C4/C5/Saxo/Picasso', cat: 'Accesorios', catId: 'cat-accesorios', badge: null, price: '25.000', colors: ['#888888'], svg: accesorioSvg, desc: 'Cubre zócalos 4 puertas (3,8x48cm delanteros, 25cm traseros) para Citroën C3/C4/C5/Saxo/Picasso/Air Cross.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5Fnp%5F754864-mla32340073209%5F092019-o-5b54d4a6de0b481be717587265277368-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5Fnp%5F977674-mla32340078172%5F092019-o-b309673f2aea7407e017587265300130-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5Fnp%5F981912-mla32339942783%5F092019-o-0528ed6c9c143c031017587265320993-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5Fnp%5F767100-mla32340080662%5F092019-o-40b8312430c3fc261d17587265342351-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5Fnp%5F950337-mla32340091068%5F092019-o-a3426e40e54072dcd717587265362927-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5Fnp%5F861255-mla32340097504%5F092019-o-a0c59d339fc4d280eb17587265388955-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5Fnp%5F794766-mla32340078173%5F092019-o-25dabadd7ca73a4bd917587265451035-1024-1024.webp'] },
  { id: 'cubre-alfombra-pesada-3-piezas-pvc', name: 'Cubre Alfombra Goma Pesada 3 Piezas', cat: 'Accesorios', catId: 'cat-accesorios', badge: null, price: '28.000', colors: ['#1a1a1a'], svg: accesorioSvg, desc: '3 piezas goma pesada (2 delanteras + 1 trasera). Para Renault, Ford, VW, Peugeot, Fiat, Citroën, Chevrolet.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_787018-mla91721305062_092025-o-8de56af0955a7df48a17587270883179-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_811584-mla75721959716_042024-o-118ba1b549e789c82c17587270912020-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_624223-mla75888732901_042024-o-b70c9c2e872eef2efe17587270929105-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_795557-mla75888866731_042024-o-191d981197fef4604617587270944957-1024-1024.webp'] },
  { id: 'cubre-alfombra-de-baul-pesada-chica', name: 'Cubre Alfombra Baúl Chica 120x80cm', cat: 'Accesorios', catId: 'cat-accesorios', badge: null, price: '15.000', colors: ['#1a1a1a'], svg: accesorioSvg, desc: 'Alfombra PVC para baúl 120x80cm, troquelada para recortar y adaptar a todos los vehículos.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/alfombra-chica-de-goma-ce5ab9af7d36f0a4fd17126791590748-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/alfombra-chica-de-goma-1-06de24d08d593ae1b117126791677784-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/alfombra-grande-instalada-6a37e03ba7f7c0d96217126791833524-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/alfombra-de-baul-universal-grande-y-chica-620b2ec2852ab2fadb17126791894248-1024-1024.webp'] },
  { id: 'cubre-alfombra-de-baul-pesada-universal-grande', name: 'Cubre Alfombra Baúl Grande 110x140cm', cat: 'Accesorios', catId: 'cat-accesorios', badge: null, price: '28.000', colors: ['#1a1a1a'], svg: accesorioSvg, desc: 'Alfombra PVC para baúl 110x140cm, troquelada para recortar y adaptar a todos los vehículos.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/alfombra-goma-grande-110-x-140-c4b975f7ae29b0eeff17126789082940-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/alfombra-grande-instalada-b003e4629c22631e5317126789348623-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/corte-para-alfombra-9349e76b72b1d0f23317126790368460-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/alfombra-de-baul-universal-grande-y-chica-73679ac249f22d2abf17126790419035-1024-1024.webp'] },
  { id: 'cubre-alfombra-3-piezas-pesada', name: 'Cubre Alfombra 3 Piezas Pesada', cat: 'Accesorios', catId: 'cat-accesorios', badge: null, price: '28.000', colors: ['#1a1a1a'], svg: accesorioSvg, desc: 'Juego 3 piezas alfombra goma pesada universal. Fácil colocación y limpieza, superficie antideslizante.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/alfombre-de-goma-3-piezas-pesada-588bc3d7ebaaea5a9417126766606248-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/alfombra-universal-3-piezas-pesada-811d793b55381e8b0717126766922261-1024-1024.webp'] },
  { id: 'kit-de-abrojos-cubre-trompa-m3racing', name: 'Kit Abrojos Cubre Trompa MDRACING', cat: 'Accesorios', catId: 'cat-accesorios', badge: null, price: '10.000', colors: ['#1a1a1a'], svg: accesorioSvg, desc: 'Kit de 6 abrojos MDRACING para la correcta instalación del cubre trompa.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5Fnp%5F971991-mla25628539734%5F052017-o-6b3715343948dc26c717587254075572-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5Fnp%5F859237-mla25628535420%5F052017-o-864cb995a572d0eec917587254099514-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5Fnp%5F764089-mla25628539737%5F052017-o-ae01f6dc95e88db70e17587254121196-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5Fnp%5F669218-mla25628540217%5F052017-o-d1fdb4a9c915ce581b17587254145662-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5Fnp%5F844167-mla25628541616%5F052017-o-2648d246be41a7778a17587254168194-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5Fnp%5F746710-mla25628538914%5F052017-o-0609ff05baeaec814017587254195971-1024-1024.webp'] },
  { id: 'vinilo-simil-fibra-carbono-negro-60x50', name: 'Vinilo Símil Fibra Carbono Negro 60x50', cat: 'Accesorios', catId: 'cat-accesorios', badge: null, price: '18.000', colors: ['#1a1a1a'], svg: accesorioSvg, desc: 'Vinilo símil fibra de carbono negro 60x50cm. Personaliza el interior y exterior de tu vehículo.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5Fnp%5F905694-mla93081334315%5F092025-o-a31eaf8b413b42550517587263860159-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5Fnp%5F606823-mla93078983067%5F092025-o-f794628c6e2460f3c817587263925196-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5Fnp%5F853128-mla92668080926%5F092025-o-81cba9619b1e53159a17587263962739-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5Fnp%5F887228-mla93078976387%5F092025-o-85a8f21616574d05f917587264005890-1024-1024.webp'] },
  { id: 'leva-empunadura-freno-de-mano-aluminio-universal', name: 'Leva Freno de Mano Aluminio Universal', cat: 'Accesorios', catId: 'cat-accesorios', badge: 'OFERTA', price: '15.000', salePrice: '10.000', colors: ['#888888'], svg: accesorioSvg, desc: 'Leva freno de mano en aluminio universal. En algunos modelos entra directo, en otros reemplaza el plástico.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5Fnp%5F963608-mla44638264668%5F012021-o-df1b2abcef2acdfe1317587259165834-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5Fnp%5F899277-mla44638265484%5F012021-o-b254371503b8784d8317587259191299-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5Fnp%5F962637-mla44638265689%5F012021-o-02c27714a05f2e281917587259211285-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5Fnp%5F927570-mla44638259924%5F012021-o-ee7c76df948a52f04c17587259232523-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5Fnp%5F607731-mla44638306002%5F012021-o-da879505341706755317587259259062-1024-1024.webp'] },
  { id: 'cubre-cinto-de-seguridad4', name: 'Cubre Cinturón de Seguridad Tela Acolchada', cat: 'Accesorios', catId: 'cat-accesorios', badge: 'OFERTA', price: '30.000', salePrice: '28.000', colors: ['#1a1a1a','#1a2a5a','#5a5a5a','#8B0000'], svg: accesorioSvg, desc: 'Cubre cinturón tela acolchada. Suaviza el contacto con la piel, ideal para viajes. Con velcro de sujeción.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5Fnp%5F796059-mla92120519037%5F092025-o-e214d04e920f4048be17587271361093-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5Fnp%5F676318-mla81828535173%5F012025-o-24e982413870154f1217587271386771-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5Fnp%5F965805-mla81557788078%5F012025-o-815aec596b5a70474e17587272754060-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5Fnp%5F870605-mla81828555211%5F012025-o-730e3e6946c952ecf817587272513943-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5Fnp%5F798313-mla81828535935%5F012025-o-aae54e0c7932d5c7af17587272591203-1024-1024.webp'] },
  { id: 'protector-cubre-cinturon-de-seguridad-cuerina', name: 'Cubre Cinturón de Seguridad Cuerina', cat: 'Accesorios', catId: 'cat-accesorios', badge: 'Premium', price: '40.000', colors: ['#1a1a1a'], svg: accesorioSvg, desc: 'Cubre cinturón Sportiva en cuerina. Protección y estilo para el cinturón de seguridad.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5Fnp%5F811842-mla77023968150%5F062024-o-0ae8d807ee29eebc5717587277760758-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5Fnp%5F554601-mla20353389612%5F072015-o-4d89291b56149aa41517587277806957-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5Fnp%5F828832-mla75722036316%5F042024-o-c34e87c3b10f71fded17587277841263-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5Fnp%5F105601-mla20353388842%5F072015-o-c9084a26cc450e1f6e17587277863656-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5Fnp%5F993601-mla20353389624%5F072015-o-9d57427371cf3ceb8d17587277883657-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5Fnp%5F871601-mla20353388832%5F072015-o-3a4de6b500680f482417587277903225-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5Fnp%5F727501-mla20353388828%5F072015-o-f9dfe56d9086a1efd417587277955500-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5Fnp%5F469501-mla20353389621%5F072015-o-111bb3f23e756e5ae517587278003690-1024-1024.webp'] },
  { id: 'gancho-para-funda-de-asiento-auto-ecocuero-tela', name: 'Gancho para Funda de Asiento (Unidad)', cat: 'Accesorios', catId: 'cat-accesorios', badge: null, price: '5.000', colors: ['#888888'], svg: accesorioSvg, desc: 'Ganchito para colocación de fundas cubre asiento. Tapicería automotor, consultar cantidad.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5Fnp%5F745925-mla75723105214%5F042024-o-587aaae1397245abda17587248883784-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5Fnp%5F872309-mla75889952159%5F042024-o-39b0e24e1e696669e617587248919116-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5Fnp%5F655340-mla75890217729%5F042024-o-538fe803c395ce7a8917587248944713-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d%5Fnq%5Fnp%5F771000-mla75889972273%5F042024-o-54be63c8c7430c72d217587249030628-1024-1024.webp'] },
  { id: 'tapa-de-valvula-antirrobo1', name: 'Tapa de Válvula Antirrobo con Llave', cat: 'Accesorios', catId: 'cat-accesorios', badge: null, price: '9.000', colors: ['#888888'], svg: accesorioSvg, desc: 'Tapa de válvula cromada con tornillo y llave antirrobo. Disponible para todas las marcas.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/tapa-de-avlvula-fiat-299943249b7462a66717126851117793-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/tapa-de-valvula-chevrolet-amarilla-011519a9979076791317126851195218-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/tapa-de-valvula-chevrolet-b87625d06e895a855917126851273420-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/tapa-de-valvula-citroen-c03dad23a546cb0ee017126851470400-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/tapa-de-valvula-ford-83c142bc0976855b1b17126851581358-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/tapa-de-valvula-jeep-ecbf156f05a32deb6517126851707984-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/tapa-de-valvula-renault-amarilla-4f1a6c8db6d455e03f17126851818313-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/tapa-de-valvula-renault-cd78649972796aecd717126851894090-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/tapa-de-valvula-toyota-1fba600abd8751811117126851992859-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/tapa-de-valvula-vw-8cc96570f6d9219a8917126852203978-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/tapa-de-valvula-alemana-a2aa487e1185c1aa9f17126852590132-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/tapa-valvula-alemania-9f9092c95b0b3077f517126863316310-1024-1024.webp'] },
  { id: 'bolsa-residuos', name: 'Bolsa de Residuos para Auto Tela', cat: 'Accesorios', catId: 'cat-accesorios', badge: null, price: '8.000', colors: ['#1a1a1a'], svg: accesorioSvg, desc: 'Bolsa de residuos de tela para auto. Disponible con logo de Toyota, Chevrolet, Fiat, Ford, Peugeot, Renault, VW y más.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/bolsa-basura-vw-5374f65cfdd7cab38217126835132018-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/bolsa-basura-toyota-728afb88805cd0daf817126835201997-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/bolsa-basura-peugeot-658691e1471fec67d617126835246131-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/bolsa-basura-ford-2a51887ebad7ad617617126835303749-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/bolsa-basura-fiat-04902606b02243eb2c17126835347789-1024-1024.webp'] },
  { id: 'crique-tijera-1-5-toneladas', name: 'Crique Tijera 1,5 Toneladas', cat: 'Accesorios', catId: 'cat-accesorios', badge: null, price: '32.000', colors: ['#888888'], svg: accesorioSvg, desc: 'Crique tijera de 1,5 toneladas. Herramienta esencial para cambio de ruedas en emergencias.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/crique-tijera-2-toneladas-b819ae59b45892649c17126764305019-1024-1024.webp'] },
  { id: 'criqque-botella-8-toneladas', name: 'Crique Botella 8 Toneladas', cat: 'Accesorios', catId: 'cat-accesorios', badge: null, price: '40.000', colors: ['#888888'], svg: accesorioSvg, desc: 'Crique botella hidráulico de 8 toneladas. Alta resistencia para trabajos de mecánica.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/crique-botella-8-toneladas-9e36c466e29c990a3717126794657351-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/crique-instalado-botella-99b93d2272ba00bf6a17126794706673-1024-1024.webp','https://dcdn-us.mitiendanube.com/stores/004/478/482/products/crique-instalado-fbf8eaa0536cfc2bbb17126794775267-1024-1024.webp'] },
  { id: 'crique-botella-10-toneladas', name: 'Crique Botella 10 Toneladas', cat: 'Accesorios', catId: 'cat-accesorios', badge: null, price: '48.000', colors: ['#888888'], svg: accesorioSvg, desc: 'Crique botella hidráulico de 10 toneladas. Para trabajo pesado y vehículos de gran porte.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/crique-botella-10-toneladas-c9a9c35c7d2faa107d17126738297347-1024-1024.webp'] },
  { id: 'crique-carrito-toneladas', name: 'Crique Carrito Hidráulico', cat: 'Accesorios', catId: 'cat-accesorios', badge: null, price: '59.000', colors: ['#888888'], svg: accesorioSvg, desc: 'Crique carrito hidráulico. Ideal para taller, facilita el trabajo de mantenimiento de vehículos.', images: ['https://dcdn-us.mitiendanube.com/stores/004/478/482/products/crike-carrito-2-tonelada-03c0a27a691b8092fe17126733272312-1024-1024.webp'] },
];

// ── Car brands/models ──
const vehicleData = {
  'Toyota': ['Corolla','Hilux','RAV4','Etios','Yaris','Land Cruiser','SW4'],
  'Volkswagen': ['Golf','Vento','Amarok','Polo','Virtus','T-Cross','Tiguan'],
  'Chevrolet': ['Tracker','S10','Onix','Cruze','Spin','Montana','Captiva'],
  'Ford': ['Ranger','Focus','EcoSport','Fiesta','Ka','Mustang','Maverick'],
  'Renault': ['Kwid','Sandero','Logan','Duster','Oroch','Megane','Koleos'],
  'Peugeot': ['208','308','2008','3008','Partner','Expert'],
  'Fiat': ['Argo','Cronos','Toro','Pulse','Mobi','Ducato'],
  'Nissan': ['Frontier','Kicks','Versa','March','X-Trail'],
  'Honda': ['City','Civic','HR-V','WR-V','Fit'],
  'Hyundai': ['HB20','Creta','Tucson','Santa Fe','Venue'],
  'Yamaha': ['MT-03','FZ25','YBR125','R3','XTZ150'],
  'Honda Motos': ['CB300','XRE300','CG150','PCX','Biz'],
  'Kawasaki': ['Ninja 400','Z400','Versys','Vulcan'],
};

// ── Testimonials (reseñas reales) ──
const testimonials = [
  { name: null, text: 'Muy bien, cumple la función! Buena calidad, Ranger Raptor protegida💪🏻.', stars: 5, initial: 'ML', source: 'Mercado Libre', img: 'images/review-ranger.jpg', product: 'Funda antigranizo 3 capas Ford Ranger' },
  { name: 'Martín V.', text: 'No duden, tengo un Vw Polo y le quedó de diez pronto les pediré que me hagan las fundas. Parece que me lo hubieran entregado con el auto acabado de primera.', stars: 5, initial: 'M', source: 'Google', img: 'images/review-volante.webp', product: 'Cubre volante base plana 38cm' },
  { name: null, text: 'Lo recomiendo 100 %. Excelentes fundas, de buena calidad.', stars: 5, initial: 'ML', source: 'Mercado Libre', img: 'images/review-fundas-tera.png', product: 'Funda para asientos Vw Tera eco cuero' },
  { name: 'Ezequiel Elcolo', text: 'Excelente atención y buenos precios en efectivo. Tienen de todo hasta cobertores antigranizo de auto!!!', stars: 5, initial: 'E', source: 'Google' },
  { name: 'Guillermo Rudolph', text: 'Prolijidad, puntualidad, buen precio, excelente trato. 6 estrellas les pondría. Me vendieron y colocaron unas fundas de simil cuero para un Corolla, impecables.', stars: 5, initial: 'G', source: 'Google' },
  { name: 'Gonzalo Javier Alonso', text: 'Siempre acudo a comprarles todo lo referido a mi auto. El dueño y sus compañeros siempre me dieron una mano, a veces me han reparado algo sin cobrarme, eso se valora mucho. Sigan así!', stars: 5, initial: 'G', source: 'Google' },
  { name: 'Mariano Sargiotti', text: 'Excelente servicio. Compré fundas para los asientos del auto de muy buena calidad. La colocación quedó perfecta.', stars: 5, initial: 'M', source: 'Google' },
  { name: 'Arias MIX', text: 'Muy buena atención, excelente variedad de productos. Y muy buena calidad. Gracias chicos. Siempre muy atentos.', stars: 5, initial: 'A', source: 'Google' },
  { name: 'Daniel Vacatello', text: 'Muy buen surtido de accesorios y excelente atención. Son muy cordiales.', stars: 5, initial: 'D', source: 'Google' },
  { name: 'Yonathan Segovia', text: 'De confianza como siempre 🤝🏽.', stars: 5, initial: 'Y', source: 'Google' },
];

// ── FAQ data ──
const faqs = [
  { q: '¿Cómo compro en MDRACING?', a: 'Tenés <strong>2 formas</strong>: <br><strong>(1) Compra online directa</strong> · tocás "Comprar ahora" en el producto, completás tus datos y pagás con tarjeta (con cuotas) o transferencia/efectivo (10% OFF). Te llega un email con tu pedido confirmado.<br><strong>(2) Asesoramiento por WhatsApp</strong> · si tenés dudas sobre talle, modelo o material (típico en fundas y cubre autos), consultá primero con Madi (chat del sitio) o por WhatsApp al +54 9 11 5490-7774. Después podés cerrar la compra online o por WA, como prefieras.' },
  { q: '¿Le va a mi auto?', a: 'Para confirmar compatibilidad podés escribirnos por WhatsApp con tu marca, modelo y año, o consultar con <strong>Madi</strong>, nuestra asistente virtual del sitio (botón flotante en la parte inferior). Madi te responde al momento en base a nuestro catálogo. Si tu modelo no figura, lo armamos a pedido.' },
  { q: '¿Tienen stock disponible o es a pedido?', a: 'Los <strong>accesorios</strong> suelen estar en stock para envío inmediato. La mayoría de <strong>fundas, cubre autos, cubre capots y cubre trompas</strong> son <strong>a pedido</strong> · los fabricamos especialmente para tu vehículo. Consultanos por WhatsApp el plazo exacto del modelo que te interesa.' },
  { q: '¿Hacen envíos a todo el país?', a: 'Sí. Enviamos a toda Argentina por Andreani, OCA y Correo Argentino. GBA: 2-3 días hábiles · Interior: 4-7 días según zona. El <strong>costo se calcula automáticamente en el checkout</strong> según tu zona (CABA, GBA, Interior). <strong style="color:var(--red2)">Envío GRATIS</strong> en pedidos de $200.000 o más. Te pasamos el tracking apenas despachamos.' },
  { q: '¿Qué formas de pago aceptan?', a: 'Todas estas disponibles en el checkout online:<br>· <strong>Tarjeta de crédito o débito</strong> vía Mercado Pago, con cuotas sin interés según banco.<br>· <strong>Mercado Pago wallet</strong>, QR, dinero en cuenta, Pago Fácil, Rapipago.<br>· <strong>Transferencia bancaria</strong> directa con <strong style="color:var(--red2)">10% OFF</strong> · te mostramos los datos en el checkout y mandás el comprobante por WhatsApp.<br>· <strong>Efectivo</strong> al retirar en nuestra fábrica de Villa Ballester, también con <strong style="color:var(--red2)">10% OFF</strong>.<br><strong>Sí hacemos factura A</strong> · pedila al momento de la compra con tu CUIT.' },
  { q: '¿El antigranizo cubre los laterales también?', a: 'No. El antigranizo tiene la espuma protectora (Polyfoam 6mm) en <strong>toda la parte superior</strong> · techo, capot y baúl, que es donde caen los granizos. No cubre laterales porque sería muy voluminoso y poco práctico para guardar (se haría una bola). Igual la funda completa protege todo el auto contra lluvia, sol y polvo.' },
  { q: '¿Qué diferencia hay entre una funda universal y una a medida?', a: 'La <strong>universal</strong> tiene un patrón estándar y se adapta a varios modelos similares · más económica y rápida de conseguir. La <strong>a medida</strong> está cortada y cosida específicamente para tu modelo, con ajuste exacto en respaldos, apoyacabezas y butacas. Si tu auto tiene butacas especiales, asiento partido o detalles únicos, conviene a medida.' },
  { q: '¿Cómo se ajustan los cubre autos para que no se vuelen?', a: 'Vienen con <strong>cordón o tiras que pasan por debajo del auto</strong> y se atan por los costados. Eso los mantiene firmes incluso con viento fuerte. Es importante elegir el talle correcto para tu vehículo · si tenés dudas, consultá con Madi o por WhatsApp con el modelo y año.' },
  { q: '¿Puedo colocar las fundas yo mismo o necesito ayuda profesional?', a: 'Las podés colocar vos sin herramientas · lleva alrededor de <strong>1 hora</strong>. Solo hay que pasar la funda por respaldo, asiento y apoyacabezas, y ajustar los elásticos por debajo. Si preferís ayuda, escribinos por WhatsApp y coordinamos la instalación con un taller asociado.' },
  { q: '¿Qué materiales manejan para fundas, cubre autos y los demás productos?', a: '<strong>Fundas:</strong> ecocuero, ecocuero acolchado 3mm, cuero automotor y tela Jakard premium.<br><strong>Cubre autos y motos:</strong> Tela Silver impermeable y Tela Premium afelpada.<br><strong>Antigranizo:</strong> 3 capas (Silver exterior + Polyfoam 6mm + interior Silver suave).<br><strong>Cubre capots y trompas:</strong> cuerina afelpada por dentro, impermeable por fuera.<br><strong>Alfombras termoformadas:</strong> material 3D con bordes elevados.' },
  { q: '¿Puedo pasar a retirar?', a: 'Sí, podés retirar en nuestra <strong>fábrica de Villa Ballester</strong> (Paraná 2185). Ahí podés ver y probar los productos. Coordiná previamente por WhatsApp para asegurarnos que esté listo.' },
  { q: '¿Hacen factura A?', a: 'Sí, hacemos factura A. Al momento de la compra pasanos tus datos fiscales (CUIT y razón social) y te la emitimos.' },
  { q: '¿Qué otros productos puedo combinar con mis fundas o cubre autos?', a: '<strong>Combos populares para el interior:</strong> funda + cubre volante + cubre cinturones + alfombras termoformadas.<br><strong>Para protección externa:</strong> cubre auto + cubre capot + antigranizo + cubre trompa.<br>Si pensás un combo, escribinos por WhatsApp y te armamos un precio especial.' },
  { q: '¿Qué diferencia a MDRACING de otras marcas?', a: 'Tres cosas concretas: <strong>(1)</strong> somos fabricantes directos desde el año 2000 · no revendemos, controlamos cada etapa de producción.<br><strong>(2)</strong> Cada material lo seleccionamos después de probarlo durante años en condiciones reales (calor, humedad, uso intensivo) · si no aguanta, no lo usamos.<br><strong>(3)</strong> Te atiende una persona real que conoce los productos, no un call center con respuestas armadas. Después de 25 años en el rubro, tenemos uno de los catálogos más amplios del país, todo bajo un mismo techo.' },
];

// ═══════════════════════════════════════════════════════════
// PAGE RENDERERS
// ═══════════════════════════════════════════════════════════

function renderHome() {
  return `
    <!-- HOT SALE -->
    ${(() => {
      const now = new Date();
      if (now >= HOTSALE_END) return '';

      const hotProducts = [
        {
          id: 'funda-cubre-auto-antigranizo-3-capas-impermeable',
          name: 'Cubre Auto Antigranizo 3 Capas',
          cat: 'Cubre Autos',
          price: '130.000', salePrice: '110.000', off: 15,
          img: 'https://dcdn-us.mitiendanube.com/stores/004/478/482/products/assets%5Ftask%5F01k7ky0myxf3jr4g3jy99ag6f0%5F1760531937%5Fimg%5F0-eab6a87d6fb053554317611332655636-1024-1024.webp'
        },
        {
          id: 'funda-cubre-camioneta-antigranizo-3-capas-impermeable-toyota-hilux',
          name: 'Antigranizo 3 Capas Toyota Hilux',
          cat: 'Cubre Autos',
          price: '140.000', salePrice: '129.999', off: 7,
          img: 'https://dcdn-us.mitiendanube.com/stores/004/478/482/products/toyota-hilux-fondo-blanco-photoroom-bdd1fc918f88d65c7717624307664816-1024-1024.webp'
        },
        {
          id: 'funda-cubre-camioneta-antigranizo-3-capas-impermeable-ford-ranger',
          name: 'Antigranizo 3 Capas Ford Ranger',
          cat: 'Cubre Autos',
          price: '140.000', salePrice: '129.999', off: 7,
          img: 'https://dcdn-us.mitiendanube.com/stores/004/478/482/products/ford-ranger-antigranizo-a31b32152e704c8eff17592386661341-1024-1024.webp'
        },
        {
          id: 'cubre-volante-base-plana-polo-gol-golf-vento-ksc3g',
          name: 'Cubre Volante Base Plana',
          cat: 'Accesorios',
          price: '15.000', salePrice: '14.000', off: 7,
          img: 'https://dcdn-us.mitiendanube.com/stores/004/478/482/products/d_nq_np_629274-mla52282926741_112022-o-cdf58f73a58e843bf117587257532784-1024-1024.webp'
        }
      ];

      const ctaTexts = [
        '¡Lo quiero a ese precio! 🔥',
        'Aprovechar antes que se acabe →',
        '¡Me la llevo ahora! 🔥',
        'Comprar con descuento →'
      ];

      const emberData = [
        {s:5,l:8,b:12,d:2.4,dl:0.3},{s:4,l:18,b:5,d:3.1,dl:1.2},{s:7,l:28,b:20,d:2.8,dl:0.7},
        {s:3,l:38,b:8,d:3.5,dl:2.1},{s:6,l:48,b:15,d:2.2,dl:0.1},{s:4,l:58,b:6,d:3.8,dl:1.6},
        {s:5,l:65,b:22,d:2.6,dl:0.9},{s:8,l:72,b:10,d:3.2,dl:2.4},{s:3,l:82,b:18,d:2.9,dl:0.5},
        {s:6,l:90,b:4,d:3.6,dl:1.8},{s:4,l:14,b:25,d:2.3,dl:3.0},{s:5,l:44,b:3,d:4.1,dl:1.4},
        {s:3,l:54,b:28,d:2.7,dl:2.7},{s:7,l:76,b:14,d:3.3,dl:0.2},{s:4,l:94,b:9,d:2.5,dl:1.9}
      ];
      const embers = emberData.map(e =>
        `<div class="hs-ember" style="width:${e.s}px;height:${e.s}px;left:${e.l}%;bottom:${e.b}%;--dur:${e.d}s;animation-delay:${e.dl}s"></div>`
      ).join('');

      const cardsHTML = hotProducts.map((p, i) => `
        <div class="hotsale-card" onclick="navigate('product-${p.id}')">
          <div class="hs-card-off">${p.off}% OFF</div>
          <div class="hs-card-img">
            <img src="${p.img}" alt="${p.name}" loading="lazy" />
          </div>
          <div class="hs-card-body">
            <span class="hs-card-cat">${p.cat}</span>
            <h3 class="hs-card-name">${p.name}</h3>
            <div class="hs-price-row">
              <span class="hs-price-old">Antes $${p.price}</span>
              <span class="hs-price-new"><span>$</span>${p.salePrice}</span>
            </div>
            <a href="${WA_MSG('¡Hola! Quiero aprovechar el Hot Sale 🔥 y comprar: ' + p.name + '. ¿Está disponible al precio especial?')}"
               target="_blank" class="hs-card-cta" onclick="event.stopPropagation()">
              ${ctaTexts[i]}
            </a>
          </div>
        </div>
      `).join('');

      return `
        <section class="hotsale-section">
          ${embers}
          <div class="hotsale-inner">
            <div class="hotsale-header">
              <div class="hotsale-eyebrow">🔥 EDICIÓN LIMITADA &nbsp;·&nbsp; SOLO HASTA EL 20 DE MAYO</div>
              <div class="hotsale-title-wrap">
                <span class="hotsale-title-hs">HOT SALE</span>
                <span class="hotsale-title-brand">LLEGÓ A MDRACING</span>
              </div>
              <p class="hotsale-subtitle">Precios que queman. Ofertas reales directo de fábrica.</p>
              <div class="hotsale-countdown" id="hotsale-countdown">
                <div class="hsc-unit"><span class="hsc-num" id="hsc-days">--</span><span class="hsc-label">días</span></div>
                <span class="hsc-colon">:</span>
                <div class="hsc-unit"><span class="hsc-num" id="hsc-hours">--</span><span class="hsc-label">horas</span></div>
                <span class="hsc-colon">:</span>
                <div class="hsc-unit"><span class="hsc-num" id="hsc-mins">--</span><span class="hsc-label">min</span></div>
                <span class="hsc-colon">:</span>
                <div class="hsc-unit"><span class="hsc-num" id="hsc-secs">--</span><span class="hsc-label">seg</span></div>
              </div>
            </div>
            <div class="hotsale-grid">${cardsHTML}</div>
            <div class="hotsale-footer">
              <a href="/hot-sale" data-page="cat-hot-sale" class="hotsale-footer-link">Ver todos los productos con descuento Hot Sale →</a>
            </div>
          </div>
        </section>
      `;
    })()}

    <!-- HERO -->
    <section class="hero">
      <div class="hero-bg"></div>
      <div class="hero-noise"></div>
      <div class="hero-inner">
        <div class="hero-content animate-in">
          <div class="hero-eyebrow">
            <span class="hero-eyebrow-dot"></span>
            <span>Fábrica argentina · Desde el año ${COMPANY.foundedYear}</span>
          </div>
          <h1 class="hero-title">
            <span class="line-accent">Protección Premium</span>
            <span class="line-white">para tu Vehículo</span>
          </h1>
          <p class="hero-sub">
            <strong>Fabricantes directos</strong> de fundas para asientos, cubre autos, cubre capots, cubre motos y accesorios.
            <strong style="color:var(--white)">Comprá online</strong> con tarjeta en cuotas o transferencia con <strong style="color:var(--red2)">10% OFF</strong>. Envíos a todo el país.
          </p>
          <div class="hero-ctas">
            <a href="/categorias" data-page="categorias" class="btn-primary">${icons.cart} Comprar ahora</a>
            <a href="${WA_MSG('Hola! Quiero consultar por un producto MDRACING')}" target="_blank" class="btn-whatsapp" style="font-size:15px;padding:13px 28px">${icons.waIcon} Consultar por WhatsApp</a>
          </div>
          <!-- Trust signals: pago seguro · cuotas · envío · devolución -->
          <div class="hero-trust-grid">
            <div class="hero-trust-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              <div>
                <strong>Pago seguro</strong>
                <small>Mercado Pago + SSL</small>
              </div>
            </div>
            <div class="hero-trust-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
              <div>
                <strong>Cuotas sin interés</strong>
                <small>Según tu tarjeta</small>
              </div>
            </div>
            <div class="hero-trust-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
              <div>
                <strong>Envío a todo el país</strong>
                <small>Gratis desde $200.000</small>
              </div>
            </div>
            <div class="hero-trust-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
              <div>
                <strong>Cambios en 30 días</strong>
                <small>Garantía de fábrica</small>
              </div>
            </div>
          </div>
          <div class="hero-trustline">
            <div class="hero-trustline-stars">${'★'.repeat(5)}</div>
            <span><strong>+1.500 reseñas reales</strong> · Google, Instagram, Mercado Libre</span>
          </div>
          <div class="hero-stats">
            <div>
              <span class="hero-stat-num">${COMPANY.yearsActive}<span>+</span></span>
              <span class="hero-stat-label">años fabricando</span>
            </div>
            <div>
              <span class="hero-stat-num">100<span>%</span></span>
              <span class="hero-stat-label">fabricación propia</span>
            </div>
            <div>
              <span class="hero-stat-num">+5.000</span>
              <span class="hero-stat-label">clientes en todo el país 🇦🇷</span>
            </div>
          </div>
          <!-- Foto fábrica solo visible en mobile -->
          <div class="hero-mobile-factory">
            <img src="images/fabrica.webp" alt="Fábrica MDRACING · Villa Ballester" width="1512" height="1512" loading="lazy" />
          </div>
        </div>
        <div class="hero-visual animate-in animate-delay-2">
          <div class="hero-search-bar">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" class="hero-search-input" placeholder="Buscá tu funda, cubre auto, accesorio..." autocomplete="off"
              onkeydown="if(event.key==='Enter'){openSearch();setTimeout(()=>{var i=document.getElementById('search-input');if(i){i.value=this.value;runSearch(this.value);}},80);}"
              onfocus="this.closest('.hero-search-bar').classList.add('focused')"
              onblur="this.closest('.hero-search-bar').classList.remove('focused')" />
            <button onclick="openSearch()" class="hero-search-submit">Buscar</button>
          </div>
          <div class="hero-car-wrap">
            <img src="images/fabrica.webp" alt="Fábrica MDRACING · Villa Ballester" width="1512" height="1512" loading="lazy" class="hero-factory-img" />
          </div>
          <div class="hero-floating-badge">
            <div class="hfb-icon">${icons.factory}</div>
            <div>
              <div class="hfb-title">Fábrica propia</div>
              <div class="hfb-sub">GBA, Bs. As.</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- TOP REVIEWS -->
    <section class="top-reviews-section">
      <div class="top-reviews-inner">
        <div class="top-reviews-header">
          <div class="top-reviews-stars">${'★'.repeat(5)}</div>
          <span><strong>+1.500 reseñas reales</strong> verificadas en Google y Mercado Libre</span>
        </div>
        <div class="top-reviews-carousel-wrap">
          <button class="tr-arrow tr-arrow-prev" id="tr-prev" aria-label="Anterior">${icons.chevLeft}</button>
          <div class="top-reviews-viewport">
            <div class="top-reviews-track" id="top-reviews-track">
              ${testimonials.slice(0,3).map((t, i) => `
                <div class="top-review-card" data-review-idx="${i}">
                  <div class="top-review-img" onclick="openReviewLightbox(${i})" style="cursor:pointer">
                    <img src="${t.img}" alt="${t.product}" loading="lazy" />
                    <div class="top-review-img-hint"><span><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>Ver imagen</span></div>
                  </div>
                  <div class="top-review-body">
                    <div class="top-review-toprow">
                      <div class="top-review-stars">${'★'.repeat(t.stars)}</div>
                      <span class="t-source-badge ${t.source === 'Mercado Libre' ? 't-source-ml' : 't-source-google'}">${t.source}</span>
                    </div>
                    <div class="top-review-product">${t.product}</div>
                    <p class="top-review-text">"${t.text}"</p>
                    <div class="top-review-author">${t.name || 'Comprador verificado'}</div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
          <button class="tr-arrow tr-arrow-next" id="tr-next" aria-label="Siguiente">${icons.chevRight}</button>
        </div>
      </div>
    </section>

    <!-- TRUST STRIP -->
    <section class="trust-strip">
      <div class="trust-strip-inner">
        <div class="trust-item">
          <div class="trust-icon">${icons.factory}</div>
          <div class="trust-text">
            <strong>Fabricantes directos</strong>
            <span>Producción propia desde el año ${COMPANY.foundedYear}</span>
          </div>
        </div>
        <div class="trust-item">
          <div class="trust-icon">${icons.truck}</div>
          <div class="trust-text">
            <strong>Envíos a todo el país</strong>
            <span>Correo Argentino · Andreani · OCA</span>
          </div>
        </div>
        <div class="trust-item">
          <div class="trust-icon">${icons.heart}</div>
          <div class="trust-text">
            <strong>Atención personal</strong>
            <span>Por WhatsApp con un asesor real</span>
          </div>
        </div>
        <div class="trust-item">
          <div class="trust-icon">${icons.pin}</div>
          <div class="trust-text">
            <strong>Fábrica en Villa Ballester</strong>
            <span>Para instalación de fundas y accesorios</span>
          </div>
        </div>
      </div>
    </section>

    <!-- CATEGORIES -->
    <section class="categories-section">
      <div class="categories-inner">
        <div class="section-header">
          <span class="section-label">Categorías</span>
          <h2 class="section-title">Lo que <span>protege</span> tu vehículo</h2>
          <div class="divider-line"></div>
          <p class="section-sub">Fabricamos todos nuestros productos con materiales de primera calidad seleccionados en base a las necesidades de nuestros clientes.</p>
        </div>
        ${(() => {
          const featuredIds = ['cat-cubre-autos','cat-fundas-asientos','cat-alfombras-termoformadas'];
          const featured = featuredIds.map(id => categories.find(c => c.id === id)).filter(Boolean);
          const secondary = categories.filter(c => !featuredIds.includes(c.id) && !c.hotsaleOnly);
          const renderCard = (c, isSmall) => `
            <div class="cat-card${isSmall ? ' cat-card-sm' : ''}" data-cat="${c.cat}" onclick="navigate('${c.page}')" style="cursor:pointer">
              <div class="cat-card-bg"></div>
              <div class="cat-visual">${c.svg}</div>
              <div class="cat-card-overlay"></div>
              <div class="cat-card-content">
                <span class="cat-card-tag">${c.tag}</span>
                <h3 class="cat-card-title">${c.title.replace('\n','<br>')}</h3>
                <div class="cat-card-arrow">Ver productos ${icons.arrowRight}</div>
              </div>
            </div>`;
          const hotSaleBanner = HOT_SALE_ACTIVE ? `
            <div class="cat-hs-fullbanner" onclick="navigate('cat-hot-sale')" style="cursor:pointer">
              <div class="cat-hs-fb-flame">${flameSvg}</div>
              <div class="cat-hs-fb-text">
                <span class="cat-hs-fb-tag">🔥 HASTA EL 20/05</span>
                <h3 class="cat-hs-fb-title">HOT SALE MDRACING</h3>
                <p class="cat-hs-fb-sub">Precios que queman directo de fábrica</p>
              </div>
              <div class="cat-hs-fb-cta">Ver todas las ofertas ${icons.arrowRight}</div>
            </div>` : '';
          return `
            <div class="cat-grid cat-grid-featured">
              ${featured.map(c => renderCard(c, false)).join('')}
            </div>
            <div class="cat-grid cat-grid-secondary">
              ${secondary.map(c => renderCard(c, true)).join('')}
            </div>
            ${hotSaleBanner}
          `;
        })()}
      </div>
    </section>

    <!-- NO ENCONTRAS TU MODELO · WA + MADI CTA -->
    <section class="nomodel-section">
      <div class="nomodel-inner">
        <div class="nomodel-icon">${icons.bot}</div>
        <div class="nomodel-text">
          <h3>¿No encontrás el producto para tu vehículo?</h3>
          <p>Podemos tener exactamente lo que buscás aunque no esté publicado en el catálogo. Escribinos por WhatsApp con la marca, modelo y año de tu vehículo, o consultá compatibilidad e información sobre MDRACING con nuestro bot <strong>Madi</strong> · te asesoramos sin compromiso.</p>
          <p class="nomodel-stock">✔ Stock disponible para envío inmediato</p>
        </div>
        <div class="nomodel-actions">
          <a href="${WA_MSG('Hola! No encontré el producto para mi vehículo en el catálogo. ¿Pueden ayudarme?')}" target="_blank" class="btn-primary btn-primary-wa nomodel-btn">${icons.waIcon} Consultanos por WhatsApp</a>
          <button type="button" onclick="openMadiChat()" class="nomodel-btn-madi">${icons.bot} O consultá con nuestro bot Madi</button>
        </div>
      </div>
    </section>

    <!-- FEATURED PRODUCTS -->
    <section class="featured-section">
      <div class="featured-inner">
        <div class="section-header" style="display:flex;align-items:flex-end;justify-content:space-between;flex-wrap:wrap;gap:24px">
          <div>
            <span class="section-label">Productos Estrella</span>
            <h2 class="section-title">Los más <span>elegidos</span></h2>
          </div>
          <a href="/categorias" data-page="categorias" class="btn-ghost">Ver todo el catálogo ${icons.arrowRight}</a>
        </div>
        <div class="products-grid">
          ${[
            'funda-cubre-asientos-vw-polo-track-eco-cuero-cubre-volante-plano-8asgz',
            'funda-cubre-camioneta-antigranizo-vw-amarok',
            'cubre-capot-volkswagen-polo-virtus-2018-5p',
            'funda-cubre-moto-silver-impermeable',
          ].map(id => products.find(p => p.id === id)).filter(Boolean).map(p => renderProductCard(p)).join('')}
        </div>
        <div style="text-align:center">
          <a href="/categorias" data-page="categorias" class="btn-outline">Ver Todos los Productos</a>
        </div>
      </div>
    </section>

    <!-- COMPRÁ EN 3 PASOS -->
    <section class="steps-section">
      <div class="steps-inner">
        <div class="steps-header">
          <span class="section-label">Compra rápida y segura</span>
          <h2 class="section-title">Comprá en <span>3 pasos</span></h2>
          <p class="section-sub" style="margin:14px auto 0;text-align:center;max-width:580px">Online directo desde el sitio o con asesoramiento por WhatsApp. Vos elegís.</p>
        </div>
        <div class="steps-cards">
          <div class="step-card">
            <div class="step-num">01</div>
            <div class="step-icon">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
            </div>
            <div class="step-title">Elegí tu producto</div>
            <div class="step-desc">Explorá el catálogo y tocá "Comprar ahora" en lo que te interese.</div>
          </div>
          <div class="step-sep">→</div>
          <div class="step-card">
            <div class="step-num">02</div>
            <div class="step-icon">${icons.cart}</div>
            <div class="step-title">Completá y pagá</div>
            <div class="step-desc">Tus datos + dirección + método de pago. Tarjeta con cuotas o transferencia con <strong style="color:var(--red2)">10% OFF</strong>.</div>
          </div>
          <div class="step-sep">→</div>
          <div class="step-card">
            <div class="step-num">03</div>
            <div class="step-icon">${icons.truck}</div>
            <div class="step-title">Lo recibís en casa</div>
            <div class="step-desc">Despacho en 24-72 hs a todo el país. O lo retirás en nuestra fábrica de Villa Ballester.</div>
          </div>
        </div>
        <div class="steps-cta" style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
          <a href="/categorias" data-page="categorias" class="btn-primary">${icons.cart} Ver catálogo</a>
          <a href="${WA_MSG('Hola! Quiero consultar antes de comprar')}" target="_blank" class="btn-whatsapp" style="font-size:15px;padding:13px 28px">${icons.waIcon} Consultar por WhatsApp</a>
        </div>

        <!-- Medios de pago strip -->
        <div class="steps-payments">
          <span class="steps-payments-label">Aceptamos:</span>
          <div class="steps-payments-list">
            <div class="pay-badge" title="Mercado Pago">Mercado Pago</div>
            <div class="pay-badge" title="Visa">VISA</div>
            <div class="pay-badge" title="Mastercard">Mastercard</div>
            <div class="pay-badge" title="American Express">Amex</div>
            <div class="pay-badge" title="Naranja X">Naranja</div>
            <div class="pay-badge" title="Cabal">Cabal</div>
            <div class="pay-badge" title="Pago Fácil">Pago Fácil</div>
            <div class="pay-badge" title="Rapipago">Rapipago</div>
            <div class="pay-badge pay-badge-cash" title="Transferencia bancaria"><strong>Transferencia</strong> · 10% OFF</div>
            <div class="pay-badge pay-badge-cash" title="Efectivo"><strong>Efectivo</strong> · 10% OFF</div>
          </div>
        </div>
      </div>
    </section>

    <!-- BUSCADOR POR MARCA Y MODELO -->
    <section class="brand-selector-section">
      <div class="brand-selector-inner">
        <div class="brand-selector-left">
          <span class="section-label" style="margin:0">Compatibilidad</span>
          <h2 class="steps-heading" style="margin-bottom:6px">¿Para qué <span>vehículo buscás?</span></h2>
          <p style="font-size:14px;color:var(--metal);margin:0">Seleccioná tu marca y escribí el modelo para ver todos los productos compatibles.</p>
        </div>
        <div class="brand-selector-right">
          <div class="brand-chips" id="brand-chips" style="justify-content:center">
            ${['VW','Ford','Chevrolet','Renault','Peugeot','Citroën','Fiat','Toyota','Honda','Nissan','Mitsubishi','Suzuki'].map(b =>
              `<button class="brand-chip" onclick="selectBrand('${b}')">${b}</button>`
            ).join('')}
          </div>
          <div class="brand-search-row">
            <input type="text" id="brand-model-input" class="brand-model-input" placeholder="Ej: Polo 2022, Ranger, Sandero..." autocomplete="off" onkeydown="if(event.key==='Enter')buscarMarcaModelo()" />
            <button class="brand-search-btn" onclick="buscarMarcaModelo()">${icons.arrowRight} Buscar</button>
          </div>
        </div>
      </div>
    </section>

    <!-- WHY MDRACING -->
    <section class="why-section">
      <div class="why-inner">
        <div class="why-visual">
          <div class="why-visual-card" style="background-image:url('images/local-fundas.jpeg')">
            <div class="why-year-display"><span>${COMPANY.yearsActive}</span>+</div>
            <div class="why-year-sub">años fabricando en Argentina</div>
            <div class="why-year-note">Desde el año ${COMPANY.foundedYear} · Villa Ballester, GBA</div>
            <div class="why-badges">
              <span class="why-badge accent">Fabricantes directos</span>
              <span class="why-badge">Calidad premium</span>
              <span class="why-badge">Garantía real</span>
              <span class="why-badge accent">Envíos a todo el país</span>
              <span class="why-badge">Atención humana</span>
            </div>
          </div>
        </div>
        <div>
          <span class="section-label">Por qué elegirnos</span>
          <h2 class="section-title">No vendemos barato.<br>Vendemos <span>calidad.</span></h2>
          <div class="divider-line"></div>
          <div class="why-features">
            <div class="why-feat-item">
              <div class="why-feat-icon">${icons.factory}</div>
              <div>
                <div class="why-feat-title">Fabricación Propia</div>
                <div class="why-feat-text">Producimos la mayoría de nuestros productos en Argentina. Controlamos cada etapa, desde la materia prima hasta el terminado. Sin intermediarios.</div>
              </div>
            </div>
            <div class="why-feat-item">
              <div class="why-feat-icon">${icons.award}</div>
              <div>
                <div class="why-feat-title">Materiales de Primera</div>
                <div class="why-feat-text">Cada producto tiene su material específico: fundas para asientos en eco cuero, tela jakard premium y cuero automotor; cubre autos y motos en tela silver o tela premium; cubre capots y trompas en cuerina impermeable afelpada por dentro. Materiales seleccionados y probados para durar.</div>
              </div>
            </div>
            <div class="why-feat-item">
              <div class="why-feat-icon">${icons.tool}</div>
              <div>
                <div class="why-feat-title">Compatibilidad garantizada</div>
                <div class="why-feat-text">Te asesoramos antes de la compra. Si tu vehículo necesita medidas especiales, lo resolvemos. No vas a recibir algo que no te queda.</div>
              </div>
            </div>
            <div class="why-feat-item">
              <div class="why-feat-icon">${icons.heart}</div>
              <div>
                <div class="why-feat-title">Atención humana</div>
                <div class="why-feat-text">Te responde una persona real por WhatsApp, no un bot. Escuchamos cada consulta, damos soluciones personalizadas y te ayudamos a elegir según tu uso.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- MATERIALS -->
    <section class="materials-section">
      <div class="materials-inner-v2">
        <div class="materials-header">
          <span class="section-label">Materiales</span>
          <h2 class="section-title">Calidad que se <span>nota.</span></h2>
          <div class="divider-line"></div>
          <p class="section-sub">Cada producto tiene su material específico. Trabajamos solo con materiales seleccionados, probados y pensados para durar en las condiciones de uso real de nuestros clientes.</p>
        </div>
        <div class="mat-carousel-wrapper">
          <button class="mat-arrow mat-arrow-prev" id="mat-prev" aria-label="Anterior">${icons.chevLeft}</button>
          <div class="mat-viewport">
            <div class="mat-track" id="mat-track">
              <div class="mat-slide">
                <div class="mat-slide-img"><img src="images/mat-eco-cuero.jpeg" alt="Eco Cuero" /></div>
                <div class="mat-slide-info">
                  <div class="mat-slide-name">Eco Cuero</div>
                  <div class="mat-slide-use">Fundas para asientos</div>
                  <div class="mat-slide-desc">Alta resistencia al desgaste diario. Fácil de limpiar y mantener.</div>
                </div>
              </div>
              <div class="mat-slide">
                <div class="mat-slide-img"><img src="images/mat-tela-premium.jpeg" alt="Tela Jakard Premium" /></div>
                <div class="mat-slide-info">
                  <div class="mat-slide-name">Tela Jakard Premium</div>
                  <div class="mat-slide-use">Fundas para asientos</div>
                  <div class="mat-slide-desc">Transpirable, textura premium y muy resistente al uso diario.</div>
                </div>
              </div>
              <div class="mat-slide">
                <div class="mat-slide-img"><img src="images/mat-eco-acolchado.jpeg" alt="Eco Cuero Acolchado" /></div>
                <div class="mat-slide-info">
                  <div class="mat-slide-name">Eco Cuero Acolchado 3mm</div>
                  <div class="mat-slide-use">Fundas para asientos</div>
                  <div class="mat-slide-desc">Confort superior con relleno de alta resiliencia. Protección y comodidad.</div>
                </div>
              </div>
              <div class="mat-slide">
                <div class="mat-slide-img"><img src="images/mat-cuero-automotor.jpeg" alt="Cuero Automotor" /></div>
                <div class="mat-slide-info">
                  <div class="mat-slide-name">Cuero Automotor</div>
                  <div class="mat-slide-use">Fundas para asientos</div>
                  <div class="mat-slide-desc">Calidad de primera. Durabilidad máxima para uso intensivo.</div>
                </div>
              </div>
              <div class="mat-slide">
                <div class="mat-slide-img"><img src="images/mat-tela-silver.jpeg" alt="Tela Silver" /></div>
                <div class="mat-slide-info">
                  <div class="mat-slide-name">Tela Silver</div>
                  <div class="mat-slide-use">Cubre autos · Cubre motos</div>
                  <div class="mat-slide-desc">Impermeable, resistente al sol, lluvia y polvo. Ideal para protección exterior.</div>
                </div>
              </div>
              <div class="mat-slide">
                <div class="mat-slide-img"><img src="images/mat-tela-auto-premium.jpeg" alt="Tela Kipling Premium" /></div>
                <div class="mat-slide-info">
                  <div class="mat-slide-name">Tela Kipling Premium</div>
                  <div class="mat-slide-use">Cubre autos · Cubre motos</div>
                  <div class="mat-slide-desc">Material premium para cobertores exteriores. Máxima protección contra todos los elementos.</div>
                </div>
              </div>
            </div>
          </div>
          <button class="mat-arrow mat-arrow-next" id="mat-next" aria-label="Siguiente">${icons.chevRight}</button>
        </div>
      </div>
    </section>

    <!-- TESTIMONIALS · CAROUSEL -->
    <section class="testimonials-section">
      <div class="testimonials-inner">
        <div class="section-header centered">
          <span class="section-label">Reseñas reales</span>
          <h2 class="section-title">Lo que dicen <span>nuestros clientes</span></h2>
          <div class="divider-line"></div>
          <p class="section-sub">Reseñas verificadas de clientes reales. La confianza se construye con hechos, no con frases.</p>
        </div>
        <div class="testimonials-carousel-wrap">
          <button class="carousel-arrow carousel-arrow-prev" id="t-prev" aria-label="Anterior">${icons.chevLeft}</button>
          <div class="testimonials-carousel" id="testimonials-carousel">
            <div class="testimonials-track" id="testimonials-track">
              ${testimonials.filter(t => !t.img).map(t => renderTestimonial(t)).join('')}
            </div>
          </div>
          <button class="carousel-arrow carousel-arrow-next" id="t-next" aria-label="Siguiente">${icons.chevRight}</button>
        </div>
        <div class="carousel-dots" id="t-dots"></div>
      </div>
    </section>

    <!-- LOCAL FÍSICO -->
    <section class="local-section">
      <div class="local-inner">
        <div class="local-content">
          <span class="section-label">Directo de fábrica</span>
          <h2 class="section-title">Fabricamos en <span>Villa Ballester</span></h2>
          <div class="divider-line"></div>
          <p class="local-desc">Fabricamos cada producto en Villa Ballester. Si querés ver los materiales y la calidad en persona antes de comprar, escribinos por WhatsApp y coordinamos una visita sin compromiso. Por ahí también resolvés tus dudas y, si necesitás instalación, te la coordinamos.</p>
          <div class="local-details">
            <div class="local-detail-item">
              <div class="local-detail-icon">${icons.pin}</div>
              <div>
                <div class="local-detail-title">Ubicación</div>
                <div class="local-detail-value">${COMPANY.localAddress}<br>${COMPANY.localCity} · ${COMPANY.province}</div>
              </div>
            </div>
            <div class="local-detail-item">
              <div class="local-detail-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg></div>
              <div>
                <div class="local-detail-title">Horario</div>
                <div class="local-detail-value">${COMPANY.hoursWeek}<br>${COMPANY.hoursSat}</div>
              </div>
            </div>
            <div class="local-detail-item">
              <div class="local-detail-icon">${icons.tool}</div>
              <div>
                <div class="local-detail-title">Instalación</div>
                <div class="local-detail-value">La coordinás por WhatsApp</div>
              </div>
            </div>
          </div>
          <div class="local-ctas">
            <a href="${WA_MSG('Hola! Quiero coordinar una visita a la fábrica en Villa Ballester, Paraná 2185')}" target="_blank" class="btn-primary btn-primary-wa">${icons.waIcon} Coordinar visita</a>
            <a href="${COMPANY.localMapsUrl}" target="_blank" rel="noopener" class="btn-outline">${icons.pin} Ver en Google Maps</a>
          </div>
        </div>
        <div class="local-visual">
          <div class="local-map-frame">
            <iframe
              src="https://maps.google.com/maps?q=-34.549683992602816,-58.5446744177423&z=16&output=embed"
              class="local-map-embed"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              title="Ubicación de la fábrica MDRACING, Paraná 2185, Villa Ballester"></iframe>
          </div>
        </div>
      </div>
    </section>

    <!-- SOCIAL PROOF -->
    <section class="social-proof-section">
      <div class="social-proof-inner">
        <div class="section-header centered">
          <span class="section-label">Seguinos y verificá</span>
          <h2 class="section-title">Estamos donde <span>nos buscás</span></h2>
          <div class="divider-line"></div>
          <p class="section-sub">Mirá productos en uso, reseñas de clientes y videos de instalación. Comprá con tranquilidad a través de nuestra tienda verificada en Mercado Libre.</p>
        </div>
        <div class="social-grid">
          <a href="${SOCIAL.instagram}" target="_blank" rel="noopener" class="social-card social-ig">
            <div class="social-card-icon">${icons.instagram}</div>
            <div class="social-card-body">
              <div class="social-card-platform">Instagram</div>
              <div class="social-card-handle">${SOCIAL.instagramHandle}</div>
              <div class="social-card-cta">Ver productos reales ${icons.arrowRight}</div>
            </div>
          </a>
          <a href="${SOCIAL.mercadolibre}" target="_blank" rel="noopener" class="social-card social-ml">
            <div class="social-card-icon">${icons.mercadolibre}</div>
            <div class="social-card-body">
              <div class="social-card-platform">Mercado Libre</div>
              <div class="social-card-handle">Tienda oficial MDRACING</div>
              <div class="social-card-cta">Comprar con MP ${icons.arrowRight}</div>
            </div>
          </a>
          <a href="${SOCIAL.tiktok}" target="_blank" rel="noopener" class="social-card social-tt">
            <div class="social-card-icon">${icons.tiktok}</div>
            <div class="social-card-body">
              <div class="social-card-platform">TikTok</div>
              <div class="social-card-handle">${SOCIAL.tiktokHandle}</div>
              <div class="social-card-cta">Ver videos ${icons.arrowRight}</div>
            </div>
          </a>
          <a href="${SOCIAL.youtube}" target="_blank" rel="noopener" class="social-card social-yt">
            <div class="social-card-icon">${icons.youtube}</div>
            <div class="social-card-body">
              <div class="social-card-platform">YouTube</div>
              <div class="social-card-handle">${SOCIAL.youtubeHandle}</div>
              <div class="social-card-cta">Tutoriales e instalación ${icons.arrowRight}</div>
            </div>
          </a>
        </div>
      </div>
    </section>

    <!-- FINAL CTA -->
    <section class="final-cta">
      <div class="final-cta-inner final-cta-2col">
        <div class="final-cta-text">
          <div class="final-cta-badge">⚡ Comprá online o consultá por WA</div>
          <span class="section-label" style="display:block;margin-bottom:10px;text-align:left">Sin intermediarios · Fabricado en Argentina</span>
          <h2 class="section-title" style="text-align:left">Comprá fácil <br><span>o pedí tu combo a medida.</span></h2>
          <div class="divider-line" style="margin:18px 0"></div>
          <p class="section-sub" style="text-align:left;margin:0 0 22px">Comprá directo desde el sitio con tarjeta en cuotas o transferencia con <strong style="color:var(--red2)">10% OFF</strong>. Si necesitás asesoramiento o un combo a medida para tu auto, escribinos por WhatsApp.</p>
          <div class="final-cta-chips" style="justify-content:flex-start">
            <span class="cta-chip">✔ Pago online seguro</span>
            <span class="cta-chip">✔ Cuotas sin interés</span>
            <span class="cta-chip">✔ 10% OFF transferencia/efectivo</span>
            <span class="cta-chip">✔ Envío 24–72 hs</span>
            <span class="cta-chip">✔ Garantía 30 días</span>
          </div>
          <div class="final-cta-actions" style="justify-content:flex-start;margin-top:24px">
            <a href="/categorias" data-page="categorias" class="btn-primary" style="font-size:16px;padding:14px 28px">${icons.cart} Comprar ahora</a>
            <a href="${WA_MSG('Hola! Quiero asesoramiento para mi vehículo con MDRACING. Mi marca y modelo es...')}" target="_blank" class="btn-whatsapp" style="font-size:16px;padding:14px 28px">${icons.waIcon} Asesoramiento WhatsApp</a>
          </div>
          <p class="final-cta-note" style="text-align:left;margin-top:16px">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>
            WhatsApp Lun–Vie 8 a 16hs · Compra online 24/7
          </p>
        </div>
        <div class="final-cta-gallery">
          ${(() => {
            const ctaImgs = [
              { src: 'images/cta-ranger-granizo.jpeg', alt: 'Cubre auto antigranizo Ford Ranger Raptor' },
              { src: 'images/cta-butacas-fundas.jpeg', alt: 'Fundas de asientos cuero automotor' },
              { src: 'images/cta-trompa-polo.jpg', alt: 'Cubre trompa VW Polo en estudio' },
            ];
            const motoP = products.find(p => p.id === 'funda-cubre-moto-silver-impermeable');
            if (motoP) {
              const mImg = (motoP.images && motoP.images[0]) || (motoP.colorVariants && motoP.colorVariants[0] && motoP.colorVariants[0].images[0]) || '';
              if (mImg) ctaImgs.push({ src: mImg, alt: motoP.name });
            }
            return ctaImgs.map(item => `<div class="cta-gallery-img"><img src="${item.src}" alt="${item.alt}" loading="lazy" /></div>`).join('');
          })()}
        </div>
      </div>
    </section>
  `;
}

function renderProductCard(p) {
  // Aplicar precio Hot Sale si corresponde
  const hsPrice = HOT_SALE_PRICES[p.id];
  if (hsPrice) p = { ...p, salePrice: hsPrice, _isHot: true };

  let displayPrice = p.salePrice || p.price;
  if (p.sizeVariants && p.sizeVariants.length > 0) {
    if (p._isHot) {
      // Hot Sale price siempre gana sobre sizeVariants
      displayPrice = p.salePrice;
    } else {
      const prices = p.sizeVariants.map(sv => parseInt((sv.salePrice || sv.price).replace(/\./g, ''), 10));
      const minPrice = Math.min(...prices);
      displayPrice = minPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }
  }
  const waLink = p._isHot
    ? WA_MSG(`¡Hola! Quiero aprovechar el Hot Sale 🔥 y consultar por: ${p.name} (precio Hot Sale $${displayPrice})`)
    : WA_MSG(`Hola! Quiero consultar por: ${p.name} (desde $${displayPrice})`);

  let mediaContent;
  if (p.images && p.images.length > 0) {
    const uid = p.id.replace(/[^a-z0-9]/g, '');
    const slides = p.images.map((img, i) =>
      `<img src="${ppImgSrc(img)}" alt="${p.name}" class="pg-slide${i === 0 ? '' : ' pg-hidden'}" loading="${i === 0 ? 'eager' : 'lazy'}" />`
    ).join('');
    const dots = p.images.length > 1
      ? `<div class="pg-dots">${p.images.map((_, i) => `<span class="pg-dot${i === 0 ? ' pg-dot-active' : ''}"></span>`).join('')}</div>`
      : '';
    const arrows = p.images.length > 1
      ? `<button class="pg-arr pg-prev" onclick="event.stopPropagation();pgMove('${uid}',-1)" aria-label="Anterior">&#8249;</button>
         <button class="pg-arr pg-next" onclick="event.stopPropagation();pgMove('${uid}',1)" aria-label="Siguiente">&#8250;</button>`
      : '';
    mediaContent = `<div class="pg-wrap" id="pg-${uid}" data-cur="0">${arrows}${slides}${dots}</div>`;
  } else if (p.img) {
    mediaContent = `<img src="${p.img}" alt="${p.name}" class="product-real-img" loading="lazy" />`;
  } else {
    mediaContent = `<div class="product-img-visual">${p.svg}</div>`;
  }

  const hasSaleInSizes = p.sizeVariants && p.sizeVariants.some(sv => sv.salePrice);
  const isLiquidacion = p.badge && p.badge.toLowerCase().includes('liquidaci');
  const badgeHtml = p._isHot
    ? `<span class="product-badge product-badge-hs">🔥 HOT SALE</span>`
    : (p.badge
      ? `<span class="product-badge">${p.badge}</span>`
      : ((p.salePrice || hasSaleInSizes) ? `<span class="product-badge product-badge-oferta">Oferta</span>` : ''));
  const ultimasHtml = isLiquidacion
    ? `<div class="product-last-units"><span class="last-units-dot"></span>Últimas unidades</div>`
    : '';
  const colorsHtml = p.colors && p.colors.length
    ? `<div class="product-colors">${p.colors.map(c => `<span class="product-color-dot" style="background:${c}"></span>`).join('')}</div>`
    : '';
  let priceHtml;
  if (p.sizeVariants && p.sizeVariants.length > 0) {
    if (p._isHot) {
      // Hot Sale: mostrar precio original tachado + precio Hot Sale
      priceHtml = `<div class="product-price-block">
          <span class="product-price-original">$${p.price}</span>
          <div class="product-price product-price-sale">$${displayPrice}</div>
         </div>`;
    } else {
      const hasSale = p.sizeVariants.some(sv => sv.salePrice);
      priceHtml = `<div class="product-price-block">
          ${hasSale ? `<span class="product-price-label">Desde</span>` : ''}
          <div class="product-price${hasSale ? ' product-price-sale' : ''}">$${displayPrice}</div>
         </div>`;
    }
  } else if (p.salePrice) {
    priceHtml = `<div class="product-price-block">
        <span class="product-price-original">$${p.price}</span>
        <div class="product-price product-price-sale">$${p.salePrice}</div>
       </div>`;
  } else {
    priceHtml = `<div class="product-price-block">
        <div class="product-price">$${p.price}</div>
       </div>`;
  }
  return `
    <article class="product-card">
      <div class="product-card-media" onclick="navigate('product-${p.id}')">
        ${mediaContent}
        ${badgeHtml}
        <div class="product-card-hover"><span>Ver detalle ${icons.arrowRight}</span></div>
      </div>
      <div class="product-info">
        <div class="product-cat-tag">${p.cat}</div>
        <h3 class="product-name" onclick="navigate('product-${p.id}')">${p.name}</h3>
        <p class="product-desc">${p.desc}</p>
        ${colorsHtml}
        ${ultimasHtml}
        <div class="product-price-row">${priceHtml}</div>
        <div class="product-card-actions">
          <button class="product-btn-buynow" onclick="event.stopPropagation();openCheckoutForProduct('${p.id}')" aria-label="Comprar ahora">${icons.cart} Comprar</button>
          <a href="${waLink}" target="_blank" class="product-btn-wa" onclick="event.stopPropagation()">${icons.waIcon} Consultar</a>
          <button class="product-btn-cart" data-cart-btn="${p.id}" onclick="event.stopPropagation();addToCart('${p.id}')" aria-label="Sumar al carrito" title="Sumar al carrito">${icons.plus}</button>
        </div>
      </div>
    </article>
  `;
}

function renderTestimonial(t) {
  const authorName = t.name || 'Comprador verificado';
  const sourceBadge = t.source === 'Mercado Libre'
    ? `<span class="t-source-badge t-source-ml">Mercado Libre</span>`
    : `<span class="t-source-badge t-source-google">Google</span>`;
  const productTag = t.product ? `<div class="t-product-tag">${t.product}</div>` : '';
  const prodImg = t.img ? `<div class="t-prod-img"><img src="${t.img}" alt="${t.product || 'Producto MDRACING'}" loading="lazy" /></div>` : '';
  return `
    <div class="testimonial-card${t.img ? ' has-photo' : ''}">
      ${prodImg}
      <div class="testimonial-body">
        <div class="t-top-row">
          <div class="testimonial-stars">${'★'.repeat(t.stars)}</div>
          ${sourceBadge}
        </div>
        ${productTag}
        <div class="testimonial-quote-icon">${icons.quote}</div>
        <p class="testimonial-text">${t.text}</p>
        <div class="testimonial-author">
          <div class="testimonial-avatar">${t.initial}</div>
          <div>
            <div class="testimonial-name">${authorName}</div>
            <div class="testimonial-vehicle">Cliente verificado · ${t.source || 'Google'}</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ── Category Page ──
function renderCategoryPage(catId) {
  // Categoría especial HOT SALE
  if (catId === 'cat-hot-sale') {
    if (!HOT_SALE_ACTIVE) return renderHome();
    const hsIds = Object.keys(HOT_SALE_PRICES);
    const hsProducts = products.filter(p => hsIds.includes(p.id));
    return `
      <div class="page-wrapper">
        <div class="page-hero page-hero-hs">
          <div class="page-hero-inner">
            <div class="page-breadcrumb">
              <a href="/" data-page="home">Inicio</a>
              <span>›</span>
              <span>🔥 HOT SALE</span>
            </div>
            <h1 class="page-hero-title">🔥 HOT SALE <span style="color:var(--red2)">MDRACING</span></h1>
            <p class="page-hero-sub">Precios especiales directo de fábrica. <strong>Solo hasta el 20 de mayo.</strong> ¡Aprovechá antes que se acabe!</p>
          </div>
        </div>
        <div style="max-width:var(--max);margin:0 auto;padding:48px 24px">
          <div class="products-grid cat-products-grid">
            ${hsProducts.map(p => renderProductCard(p)).join('')}
          </div>
        </div>
      </div>
    `;
  }

  const cat = categories.find(c => c.id === catId) || categories[0];
  const catProducts = products.filter(p => p.catId === catId);
  let allProducts = catProducts.length > 0 ? catProducts : products;
  // Cubre capots: productos con fotos propias primero, genéricas abajo
  if (catId === 'cat-cubre-capots') {
    const isGeneric = p => p.images && p.images.some(img => img.includes('generica'));
    allProducts = [...allProducts.filter(p => !isGeneric(p)), ...allProducts.filter(p => isGeneric(p))];
  }

  const names = {
    'cat-fundas-asientos': { title: 'Fundas para Asientos', sub: 'Fabricadas a medida o universales. Ecocuero, tela premium, cuero automotor y más. Para todos los vehículos.' },
    'cat-cubre-autos': { title: 'Cubre Autos y Camionetas', sub: 'Protección total contra granizo, lluvia, sol y polvo. Para autos, SUVs y camionetas.' },
    'cat-cubre-capots': { title: 'Cubre Capots', sub: 'Material de alta densidad. Protege contra impactos, granizo y rayones en el capot.' },
    'cat-cubre-trompas': { title: 'Cubre Trompas', sub: 'Tela Silver reforzada para proteger el frente completo de tu vehículo.' },
    'cat-cubre-motos': { title: 'Cubre Motos', sub: 'Cobertura 360° para motos y scooters. Impermeable, resistente al sol y polvo.' },
    'cat-alfombras-termoformadas': { title: 'Alfombras Termoformadas', sub: 'Alfombras 3D termoformadas con bordes elevados. Protección total del piso del vehículo, fácil de limpiar.' },
    'cat-accesorios': { title: 'Accesorios Automotrices', sub: 'Todo lo que necesitás para proteger y personalizar tu vehículo.' },
  };
  const info = names[catId] || names['cat-fundas-asientos'];

  return `
    <div class="page-wrapper">
      <div class="page-hero">
        <div class="page-hero-inner">
          <div class="page-breadcrumb">
            <a href="/" data-page="home">Inicio</a>
            <span>›</span>
            <span>${info.title}</span>
          </div>
          <h1 class="page-hero-title">${info.title}</h1>
          <p class="page-hero-sub">${info.sub}</p>
        </div>
      </div>
      <button class="filters-toggle-btn" id="filters-toggle" onclick="toggleMobileFilters()">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/></svg>
        Filtrar productos
      </button>
      <div class="cat-page-inner" data-catid="${catId}">
        <!-- Sidebar Filters -->
        <aside class="filters-sidebar" id="filters-sidebar">
          <button class="filters-sidebar-close" onclick="toggleMobileFilters()">✕ Cerrar filtros</button>
          <div class="filter-block" data-filter-type="brand">
            <div class="filter-title">Filtrar por Marca</div>
            <div class="filter-options">
              ${['Fiat','Peugeot','Toyota','Volkswagen','BMW','Ford','Chevrolet','Renault','Audi','Nissan','Honda','Citroën','Mitsubishi'].map(b => `
                <label class="filter-opt">
                  <input type="checkbox" onchange="applyFilters()"> <span>${b}</span>
                </label>
              `).join('')}
            </div>
          </div>
          ${(() => {
            const matsByCat = {
              'cat-fundas-asientos': ['Ecocuero','Tela Premium Jakard','Ecocuero Acolchado 3mm','Cuero Automotor'],
              'cat-cubre-autos': ['Tela Silver','Tela Premium Afelpada','Antigranizo 3 Capas'],
              'cat-cubre-capots': [],
              'cat-cubre-trompas': [],
              'cat-cubre-motos': ['Tela Silver','Tela Premium Afelpada'],
              'cat-alfombras-termoformadas': [],
              'cat-accesorios': [],
            };
            const mats = matsByCat[catId] || [];
            if (!mats.length) return '';
            return `<div class="filter-block" data-filter-type="material">
              <div class="filter-title">Tipo de Material</div>
              <div class="filter-options">
                ${mats.map(m => `
                  <label class="filter-opt">
                    <input type="checkbox" onchange="applyFilters()"> <span>${m}</span>
                  </label>
                `).join('')}
              </div>
            </div>`;
          })()}
          <div class="filter-block" data-filter-type="badge">
            <div class="filter-title">Tipo de producto</div>
            <div class="filter-options">
              ${['Más Vendido','Premium','OFERTA','LIQUIDACIÓN','Exclusivo','Mecánico','A medida'].map(b => `
                <label class="filter-opt">
                  <input type="checkbox" onchange="applyFilters()" data-badge-val="${b.toLowerCase()}"> <span>${b}</span>
                </label>
              `).join('')}
            </div>
          </div>
          <div class="filter-block" data-filter-type="model">
            <div class="filter-title">Modelo de Vehículo</div>
            <div class="selector-field" style="margin-top:0">
              <select onchange="applyFilters()" style="background:var(--dark3);border:1px solid var(--white15);border-radius:6px;color:var(--white);font-family:var(--font-body);font-size:14px;padding:10px 14px;width:100%">
                <option value="">Todos los modelos</option>
                ${Object.values(vehicleData).flat().sort().map(m => `<option value="${m.toLowerCase()}">${m}</option>`).join('')}
              </select>
            </div>
          </div>
          <div style="padding:16px 0;display:flex;flex-direction:column;gap:8px">
            <button onclick="clearFilters()" style="background:transparent;border:1px solid var(--white15);color:var(--metal2);border-radius:6px;padding:10px 16px;cursor:pointer;font-family:var(--font-body);font-size:13px;transition:var(--trans)" onmouseover="this.style.borderColor='var(--red2)';this.style.color='var(--white)'" onmouseout="this.style.borderColor='var(--white15)';this.style.color='var(--metal2)'">✕ Limpiar filtros</button>
            <a href="${WA_MSG('Hola! Necesito ayuda para encontrar el producto correcto para mi vehículo')}" target="_blank" class="btn-whatsapp" style="width:100%;justify-content:center;font-size:13px;padding:12px 16px">${icons.waIcon} ¿No encontrás tu modelo?</a>
          </div>
        </aside>

        <!-- Products -->
        <div class="cat-products-area">
          <div class="cat-toolbar">
            <div class="cat-results"><strong id="cat-results-count">${allProducts.length}</strong> productos encontrados</div>
            <div class="cat-sort">
              <select onchange="sortProducts(this.value)">
                <option value="">Más vendidos</option>
                <option value="asc">Precio: menor a mayor</option>
                <option value="desc">Precio: mayor a menor</option>
              </select>
            </div>
          </div>
          <div class="cat-products-grid in-cat-page" id="cat-products-grid">
            ${allProducts.map(p => renderProductCard(p)).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

// ── Product Page ──
// Normaliza una ruta de imagen a absoluta desde la raíz del sitio.
// Las páginas de producto viven en /producto/<slug>, así que una ruta
// relativa ("images/...") resolvería a /producto/images/... → 404.
// Dejamos intactas las URLs absolutas (http...) y las que ya empiezan con "/".
function ppImgSrc(u) {
  if (!u) return u;
  return /^(https?:)?\/\//.test(u) || u.startsWith('/') ? u : '/' + u;
}

function renderProductPage(productId) {
  let p = products.find(pr => `product-${pr.id}` === productId) || products[0];

  // Aplicar precio Hot Sale si corresponde (igual que en renderProductCard)
  const hsPriceDetail = HOT_SALE_PRICES[p.id];
  if (hsPriceDetail) p = { ...p, salePrice: hsPriceDetail, _isHot: true };

  // ── Versión options por categoría ──
  const versionHtml = (() => {
    if (p.catId === 'cat-fundas-asientos') {
      return `<div class="option-group">
        <span class="option-label">Respaldo trasero</span>
        <div class="variant-btns">
          <button class="variant-btn active" onclick="this.closest('.variant-btns').querySelectorAll('.variant-btn').forEach(b=>b.classList.remove('active'));this.classList.add('active')">Dividido</button>
          <button class="variant-btn" onclick="this.closest('.variant-btns').querySelectorAll('.variant-btn').forEach(b=>b.classList.remove('active'));this.classList.add('active')">Entero</button>
        </div>
      </div>`;
    }
    return '';
  })();

  // ── Materiales por categoría ──
  const materialsItems = {
    'cat-fundas-asientos': [
      'Cuero ecológico de alta densidad · resistente al desgaste, fácil de limpiar',
      'Relleno de espuma de alta resiliencia en zonas de apoyo',
      'Costura con hilo de nylon reforzado · no se deshilacha con el tiempo',
      'Elástico perimetral de alta tensión · asegura ajuste firme',
      'Materiales 100% libres de formaldehído · seguros para uso diario',
    ],
    'cat-cubre-autos': [
      'Tela Silver exterior impermeable · refleja el sol y protege contra polvo y lluvia',
      'Interior plateado suave que no raya la pintura del vehículo',
      'En modelos antigranizo: capa de espuma Polyfoam 6mm en toda la parte superior (techo, capot y baúl) · amortigua impactos y granizo',
      'Costuras reforzadas con hilo de nylon · duraderas bajo lluvia y sol',
      'Sistema de sujeción con cordón o tiras que pasan por debajo del auto · ajuste firme sin que se vuele',
    ],
    'cat-cubre-capots': [
      'Cuerina impermeable exterior · protege contra granizo, impactos y rayones',
      'Interior afelpado suave · no raya la pintura del capot',
      'Elásticos perimetrales y ganchos de sujeción incluidos',
      'Costuras selladas · resistentes a la lluvia y humedad',
      'Material moldeado específicamente para cada modelo',
    ],
    'cat-cubre-trompas': [
      'Cuerina impermeable exterior · protege paragolpe y frente del vehículo',
      'Interior afelpado suave · sin rayones en pintura ni plásticos',
      'Sistema de sujeción con ganchos y elásticos · ajuste firme sin ataduras',
      'Material moldeado para cada modelo · ajuste preciso y estético',
      'Resistente a lluvia, granizo, polvo e insectos',
    ],
    'cat-cubre-motos': [
      'Tela Silver exterior impermeable · refleja rayos UV y protege contra lluvia y polvo',
      'Interior plateado suave que no raya pintura ni plásticos de la moto',
      'Costuras selladas con hilo de nylon · alta resistencia a la intemperie',
      'Incluye bolso de guardado · fácil de llevar y guardar',
      'Disponible en 5 talles según el largo de la moto: S 1,95m · M 2,05m · L 2,15m · XL 2,25m · XXL 2,35m',
    ],
    'cat-alfombras-termoformadas': [
      'Material termoformado de alta densidad · resistente al agua, barro y derrames',
      'Bordes elevados (3D) que contienen líquidos y suciedad · evitan que pase al piso original',
      'Antideslizante en su base · no se mueve durante el uso',
      'Ajuste preciso al modelo del vehículo · cubre toda la zona de pisada',
      'Fácil de retirar y limpiar con agua o paño húmedo',
    ],
    'cat-accesorios': [
      'Materiales seleccionados según el tipo de accesorio',
      'Acabados de alta calidad · diseñados para durar en uso diario',
      'Compatibles con los vehículos indicados en cada producto',
      'Fabricados en Argentina bajo control de calidad MDRACING',
    ],
  };

  // ── Instalación por categoría ──
  const installStepsMap = {
    'cat-fundas-asientos': [
      'Limpiá bien el asiento antes de instalar',
      'Posicioná la funda comenzando por el respaldo y luego el asiento',
      'Pasá los ganchos o elásticos por debajo del asiento y butacas',
      'Ajustá uniformemente por todos los lados, sin tensiones excesivas',
      'Tiempo de colocación: aproximadamente 1 hora. Si preferís, te la instalamos en nuestra fábrica de Villa Ballester',
    ],
    'cat-cubre-autos': [
      'Asegurate de que el auto esté frío antes de cubrir',
      'Extendé el cubre auto empezando desde el techo hacia los costados',
      'Bajá bien la tela sobre el capot y el baúl',
      'Pasá el cordón o las tiras por debajo del auto y atalas por los costados',
      'Verificá que esté firme · el cordón/tiras evitan que se vuele con viento',
    ],
    'cat-cubre-capots': [
      'Limpiá bien el capot antes de instalar',
      'Colocá el cubre capot alineándolo desde el frente hacia la bisagra',
      'Enganchá los ganchos en las rejillas o el frente del auto',
      'Ajustá el elástico trasero por debajo del capot',
      'Verificá que quede bien tenso y sin arrugas',
    ],
    'cat-cubre-trompas': [
      'Limpiá el paragolpe y el frente del vehículo antes de instalar',
      'Colocá el cubre trompa alineándolo desde el centro',
      'Enganchá los ganchos en las rejillas o aberturas del paragolpe',
      'Ajustá el elástico perimetral para un cierre firme',
      'Verificá que el ajuste sea uniforme y sin arrugas por todos los lados',
    ],
    'cat-cubre-motos': [
      'Estacioná la moto en un lugar seguro y plano',
      'Elegí el talle correcto según el largo de la moto (S 1,95m / M 2,05m / L 2,15m / XL 2,25m / XXL 2,35m)',
      'Desplegá la funda y colocala desde la parte trasera hacia el frente',
      'Bajá la tela por ambos costados, cubriendo bien las ruedas',
      'Atá las cintas de sujeción para que no se vuele con el viento',
    ],
    'cat-alfombras-termoformadas': [
      'Retirá las alfombras originales del vehículo',
      'Limpiá el piso del auto antes de colocar las nuevas',
      'Ubicá cada pieza en su posición (delantera izq/der, trasera, baúl)',
      'Calzala desde el extremo más profundo hacia el más cercano a la puerta',
      'Verificá que quede bien ajustada y que el clip de seguridad (si lo tiene) quede enganchado',
    ],
    'cat-accesorios': [
      'Revisá las instrucciones específicas del accesorio antes de instalar',
      'Limpiá bien la superficie donde va a ir el accesorio',
      'Seguí los pasos de montaje indicados en el empaque',
      'Verificá que el ajuste o fijación sea firme antes de usar',
      'Consultanos por WhatsApp si tenés alguna duda de instalación',
    ],
  };

  const matItems = materialsItems[p.catId] || materialsItems['cat-accesorios'];
  const instSteps = installStepsMap[p.catId] || installStepsMap['cat-accesorios'];

  // Gallery dinámica
  const pid = p.id.replace(/[^a-z0-9]/g, '').slice(0, 20);
  const hasColorVariants = p.colorVariants && p.colorVariants.length > 0;
  const galleryImages = hasColorVariants
    ? p.colorVariants[0].images
    : (p.images && p.images.length > 0 ? p.images : null);

  const galleryHtml = galleryImages
    ? `<div class="product-gallery" id="pp-gallery-${pid}">
        <div class="product-main-img">
          <img src="${ppImgSrc(galleryImages[0])}" alt="${p.name}" width="800" height="800" fetchpriority="high" decoding="async" style="width:100%;height:100%;object-fit:contain;border-radius:8px;background:var(--dark3)" id="pp-main-img-${pid}" />
        </div>
        <div class="product-thumbs" id="pp-thumbs-${pid}">
          ${hasColorVariants
            ? p.colorVariants.map((cv, ci) => cv.images.map((img, ii) => `
              <div class="product-thumb pp-color-thumb ${ci===0&&ii===0?'active':''}" data-color-idx="${ci}" style="${ci!==0?'display:none':''}" onclick="ppThumb(this,'${ppImgSrc(img)}','pp-main-img-${pid}')">
                <img src="${ppImgSrc(img)}" alt="${p.name} color ${cv.name}" width="200" height="200" loading="lazy" decoding="async" style="width:100%;height:100%;object-fit:contain;background:var(--dark3)" />
              </div>`).join('')).join('')
            : galleryImages.map((img, i) => `
              <div class="product-thumb ${i===0?'active':''}" onclick="ppThumb(this,'${ppImgSrc(img)}','pp-main-img-${pid}')">
                <img src="${ppImgSrc(img)}" alt="${p.name} vista ${i+1}" width="200" height="200" loading="lazy" decoding="async" style="width:100%;height:100%;object-fit:contain;background:var(--dark3)" />
              </div>`).join('')}
        </div>
      </div>`
    : `<div class="product-gallery">
        <div class="product-main-img">
          <div style="width:70%;height:70%">${p.svg}</div>
        </div>
        <div class="product-thumbs">
          ${[0,1,2,3].map(i => `
            <div class="product-thumb ${i===0?'active':''}">
              <div style="width:70%;height:70%;opacity:${i===0?'.9':'.3'}">${p.svg}</div>
            </div>
          `).join('')}
        </div>
      </div>`;

  // ── Size variant selector ──
  // Si Hot Sale activo en este producto, los botones de talle siempre muestran el precio Hot Sale
  const sizeHtml = (() => {
    if (!p.sizeVariants || p.sizeVariants.length === 0) return '';
    return `<div class="option-group">
      <span class="option-label">Talle</span>
      <div class="variant-btns">
        ${p.sizeVariants.map((sv, i) => {
          const effSale = p._isHot ? p.salePrice : (sv.salePrice || '');
          const effOrig = p._isHot ? p.price : sv.price;
          return `<button class="variant-btn ${i===0?'active':''}" onclick="selectSizeVariant(this,'${pid}','${effOrig}','${effSale}')">${sv.label}</button>`;
        }).join('')}
      </div>
    </div>`;
  })();

  // ── Initial price display ──
  const initPriceHtml = (() => {
    if (p._isHot) {
      // Hot Sale price siempre gana sobre sizeVariants
      return `<span class="price-old">$${p.price}</span> <span class="currency">$</span>${p.salePrice}`;
    }
    if (p.sizeVariants && p.sizeVariants.length > 0) {
      const sv = p.sizeVariants[0];
      if (sv.salePrice) return `<span class="price-old">$${sv.price}</span> <span class="currency">$</span>${sv.salePrice}`;
      return `<span class="currency">$</span>${sv.price}`;
    }
    if (p.salePrice) return `<span class="price-old">$${p.price}</span> <span class="currency">$</span>${p.salePrice}`;
    return `<span class="currency">$</span>${p.price}`;
  })();
  const priceFromLabel = (p._isHot ? 'Precio Hot Sale 🔥' : (p.sizeVariants && p.sizeVariants.length > 0 ? 'Precio · elegí tu talle' : 'Precio'));

  return `
    <div class="page-wrapper">
      <div class="page-hero">
        <div class="page-hero-inner">
          <div class="page-breadcrumb">
            <a href="/" data-page="home">Inicio</a>
            <span>›</span>
            <a href="${pageToPath(p.catId)}" data-page="${p.catId}">${p.cat}</a>
            <span>›</span>
            <span>${p.name}</span>
          </div>
        </div>
      </div>
      <div class="product-page-inner">
        <!-- Gallery -->
        ${galleryHtml}

        <!-- Info -->
        <div class="product-page-info">
          <div class="product-cat-tag">${p.cat}</div>
          <h1 class="product-page-title">${p.name}</h1>

          <div class="product-compat">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20,6 9,17 4,12"/></svg>
            Compatible con múltiples modelos · consultá el tuyo
          </div>

          <div class="product-benefits-top">
            <span class="benefit-chip"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20,6 9,17 4,12"/></svg> Fabricación propia</span>
            <span class="benefit-chip"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20,6 9,17 4,12"/></svg> Garantía 30 días</span>
            <span class="benefit-chip"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20,6 9,17 4,12"/></svg> Envío a todo el país</span>
            <span class="benefit-chip"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20,6 9,17 4,12"/></svg> Fácil instalación</span>
          </div>

          <div class="product-price-section">
            <div class="price-from">${priceFromLabel}</div>
            <div class="price-main" id="pp-price-main-${pid}">${initPriceHtml}</div>
            <div style="font-size:13px;color:var(--metal)">IVA incluido · Envío a calcular según destino</div>
            <div class="pp-delivery-badge">${icons.truck} <strong>Entrega en 24 a 72 horas hábiles</strong> · Todo el país</div>
          </div>

          <div class="product-options">
            ${sizeHtml}
            ${(() => {
              if (p.colorVariants && p.colorVariants.length > 0 && p.colorVariants[0].isMaterial) {
                const firstSub = p.colorVariants[0].subColors || [];
                return `<div class="option-group">
                  <span class="option-label">Material</span>
                  <div class="variant-btns">
                    ${p.colorVariants.map((cv,i) => `<button class="variant-btn ${i===0?'active':''}" onclick="selectMaterialVariant(this,'${pid}',${i})">${cv.name}</button>`).join('')}
                  </div>
                  ${firstSub.length ? `<div style="margin-top:14px"><span class="option-label" style="display:block;margin-bottom:8px">Colores disponibles</span><div class="subcolor-chips" id="subcol-${pid}">${firstSub.map(sc=>`<span class="subcolor-chip">${sc}</span>`).join('')}</div></div>` : ''}
                </div>`;
              }
              if (p.colorVariants ? p.colorVariants.length > 1 : p.colors.length > 1) {
                return `<div class="option-group">
                  <span class="option-label">Color</span>
                  <div class="color-swatches">
                    ${p.colorVariants
                      ? p.colorVariants.map((cv, i) => `<div class="color-swatch ${i===0?'active':''}" style="background:${cv.hex}" title="${cv.name}" onclick="selectProductColor(this,'${pid}',${i})"></div>`).join('')
                      : p.colors.map((c, i) => `<div class="color-swatch ${i===0?'active':''}" style="background:${c}" title="${COLOR_NAMES[c]||'Color '+(i+1)}"></div>`).join('')}
                  </div>
                  <div class="color-selected-name" id="csn-${pid}">${p.colorVariants ? p.colorVariants[0].name : (COLOR_NAMES[p.colors[0]]||'')}</div>
                </div>`;
              }
              return '';
            })()}
            ${versionHtml}
          </div>

          <div class="product-ctas">
            <button type="button" onclick="openCheckoutForProduct('${p.id}')" class="btn-primary btn-primary-full">
              ${icons.cart} Comprar ahora
            </button>
            <a href="${WA_MSG(`Hola! Quiero consultar antes de comprar: ${p.name}`)}" target="_blank" class="btn-whatsapp btn-whatsapp-full">${icons.waIcon} Consultar antes de comprar</a>
            <button type="button" onclick="addToCart('${p.id}');openCart()" class="btn-primary btn-primary-full" data-cart-btn="${p.id}" style="background:transparent;border:1.5px solid var(--red2);color:var(--red2);font-size:14px">${icons.cart} Sumar al carrito</button>
          </div>

          <div class="product-security-badge" style="display:flex;align-items:center;gap:8px;margin-top:16px;padding:16px;background:var(--dark3);border-radius:8px;border:1px solid var(--white08)">
            ${icons.shield}
            <span style="font-size:13px;color:var(--metal2)">Compra segura · Cambios en 30 días · Garantía de fábrica</span>
          </div>
        </div>
      </div>

      <!-- Tabs -->
      <div class="product-tabs-section">
        <div class="tabs-nav">
          <button class="tab-btn active" onclick="switchTab(this,'tab-desc')">Descripción</button>
          <button class="tab-btn" onclick="switchTab(this,'tab-materials')">Materiales</button>
          <button class="tab-btn" onclick="switchTab(this,'tab-install')">Instalación</button>
          <button class="tab-btn" onclick="switchTab(this,'tab-shipping')">Envíos</button>
          <button class="tab-btn" onclick="switchTab(this,'tab-guarantee')">Garantía</button>
          <button class="tab-btn" onclick="switchTab(this,'tab-faq')">Preguntas Frecuentes</button>
          <button class="tab-btn" onclick="switchTab(this,'tab-reviews')">Reseñas</button>
        </div>

        <div id="tab-desc" class="tab-content active">
          <div class="info-grid">
            <div class="info-block">
              <div class="info-block-title">${icons.package} Descripción del Producto</div>
              <p style="font-size:15px;color:var(--metal2);line-height:1.8;margin-bottom:20px">${p.desc} Fabricado con materiales seleccionados para garantizar durabilidad y buen aspecto a largo plazo.</p>
              <p style="font-size:15px;color:var(--metal2);line-height:1.8">Todos nuestros productos son fabricados en Argentina bajo estrictos controles de calidad. Más de 25 años avalan cada costura y cada metro de material.</p>
            </div>
            <div class="info-block">
              <div class="info-block-title">${icons.check} Características</div>
              <ul>
                <li>Fabricación propia · calidad controlada</li>
                <li>Materiales resistentes al uso diario</li>
                <li>Ajuste preciso para el modelo indicado</li>
                <li>Costuras reforzadas en puntos de tensión</li>
                <li>Fácil instalación sin herramientas</li>
                <li>Lavable y fácil de mantener</li>
              </ul>
            </div>
          </div>
        </div>

        <div id="tab-materials" class="tab-content">
          <div class="info-grid">
            <div class="info-block">
              <div class="info-block-title">${icons.award} Materiales Utilizados</div>
              <ul>
                ${matItems.map(item => `<li>${item}</li>`).join('')}
              </ul>
            </div>
            <div class="info-block">
              <div class="info-block-title">Por qué elegimos estos materiales</div>
              <p style="font-size:14px;color:var(--metal2);line-height:1.8">En MDRACING no usamos lo primero que aparece. Cada material fue probado durante años en condiciones reales: calor de verano, humedad de lluvia, uso diario y limpieza constante. Si algo no pasa nuestros estándares, no lo usamos.</p>
            </div>
          </div>
        </div>

        <div id="tab-install" class="tab-content">
          <div class="info-block" style="margin-bottom:20px">
            <div class="info-block-title">${icons.tool} Guía de Instalación</div>
            <p style="font-size:15px;color:var(--metal2);line-height:1.8;margin-bottom:20px">La instalación es simple y no requiere herramientas. Si preferís, ofrecemos servicio de instalación en nuestra fábrica de Villa Ballester.</p>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px">
              ${instSteps.map((step, i) => `
                <div style="display:flex;gap:12px;align-items:flex-start">
                  <div style="min-width:28px;height:28px;background:var(--red2);border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:var(--font-head);font-weight:700;font-size:14px">${i+1}</div>
                  <span style="font-size:14px;color:var(--metal2);line-height:1.5">${step}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <div id="tab-shipping" class="tab-content">
          <div class="info-grid">
            <div class="info-block">
              <div class="info-block-title">${icons.truck} Información de Envíos</div>
              <div class="delivery-highlight">
                <div class="delivery-highlight-icon">${icons.truck}</div>
                <div>
                  <div class="delivery-highlight-title">Entrega en 24 a 72 horas hábiles</div>
                  <div class="delivery-highlight-sub">Despacho el día hábil siguiente a la confirmación del pago</div>
                </div>
              </div>
              <ul>
                <li>Envíos a todo el país por Andreani, OCA y Correo Argentino</li>
                <li>GBA: 1-2 días hábiles</li>
                <li>Interior del país: 2-5 días hábiles según zona</li>
                <li>Tracking de tu pedido en tiempo real</li>
              </ul>
            </div>
            <div class="info-block">
              <div class="info-block-title">Costo de Envío</div>
              <p style="font-size:14px;color:var(--metal2);line-height:1.7">El costo se calcula según el destino y el peso del paquete. Te damos el presupuesto exacto antes de confirmar el pedido. Consultá por WhatsApp para obtener el costo para tu zona.</p>
              <div style="margin-top:16px">
                <a href="${WA_MSG('Hola! Quiero saber el costo de envío para mi zona')}" target="_blank" class="btn-whatsapp" style="font-size:13px;padding:10px 20px">${icons.waIcon} Consultar costo de envío</a>
              </div>
            </div>
          </div>
        </div>

        <div id="tab-guarantee" class="tab-content">
          <div class="info-grid">
            <div class="info-block">
              <div class="info-block-title">${icons.shield} Garantía y Cambios</div>
              <ul>
                <li>Garantía de fábrica de 30 días contra defectos de fabricación</li>
                <li>Si hay un defecto, lo cambiamos sin costo de envío</li>
                <li>Política de cambios en 30 días desde la recepción</li>
                <li>El producto debe estar sin uso y en su embalaje original para cambios por talle</li>
                <li>Devoluciones procesadas en 5-7 días hábiles</li>
              </ul>
            </div>
            <div class="info-block">
              <div class="info-block-title">Cómo iniciar un cambio</div>
              <p style="font-size:14px;color:var(--metal2);line-height:1.7;margin-bottom:16px">Escribinos por WhatsApp con tu número de pedido y el motivo del cambio. Te respondemos en menos de 24hs con las instrucciones. El proceso es simple y sin vueltas.</p>
              <a href="${WA_MSG('Hola, quiero iniciar un cambio o devolución')}" target="_blank" class="btn-whatsapp" style="font-size:13px;padding:10px 20px">${icons.waIcon} Iniciar cambio</a>
            </div>
          </div>
        </div>

        <div id="tab-faq" class="tab-content">
          <div class="faq-list">
            ${faqs.map(f => `
              <div class="faq-item">
                <button class="faq-q" onclick="toggleFaq(this)">${f.q} ${icons.chevDown}</button>
                <div class="faq-a">${f.a}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <div id="tab-reviews" class="tab-content">
          <div class="testimonials-grid">
            ${testimonials.filter(t => !t.img).map(t => renderTestimonial(t)).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

// ── About Page ──
function renderAboutPage() {
  return `
    <div class="page-wrapper">
      <div class="page-hero">
        <div class="page-hero-inner about-hero-content">
          <div class="page-breadcrumb"><a href="/" data-page="home">Inicio</a> <span>›</span> <span>Quiénes Somos</span></div>
          <h1 class="page-hero-title">25 años fabricando<br><span style="color:var(--red2)">con pasión.</span></h1>
          <p class="page-hero-sub">No somos un local de reventa. Somos fabricantes argentinos con historia real, equipo propio y más de 5.000 clientes satisfechos en todo el país.</p>
        </div>
      </div>
      <div class="about-body">

        <!-- HISTORIA -->
        <div class="about-grid">
          <div class="about-text">
            <h2>El origen de <span style="color:var(--red2)">MDRACING</span></h2>
            <p>En el año 2000, tres amigos con una pasión en común —los autos— tuvieron una idea que en ese momento era prácticamente nueva en Argentina: fabricar <strong>cubre capots y cubre trompas</strong> para proteger los vehículos. Lo que empezó como un proyecto innovador, con el tiempo se convirtió en una empresa de referencia en el rubro de accesorios automotrices.</p>
            <p>Con los años, el negocio creció, el catálogo se amplió y el equipo se consolidó. Hoy, MDRACING es conducida por uno de esos fundadores originales, con maquinaria propia y costureras especializadas que fabrican cada producto bajo el mismo techo.</p>
            <p>Dos mudanzas, miles de pedidos y más de dos décadas después, seguimos haciendo lo mismo que al principio: <strong>fabricar con criterio y atender con honestidad.</strong></p>
          </div>
          <div class="about-visual-card">
            <div class="about-big-num"><span>25</span>+</div>
            <div class="about-big-label">años en el rubro automotriz argentino</div>
            <div style="margin-top:24px;padding-top:24px;border-top:1px solid var(--white08);display:grid;grid-template-columns:1fr 1fr;gap:16px">
              <div style="text-align:center">
                <div style="font-family:var(--font-head);font-weight:900;font-size:34px;color:#ffffff">+5.000</div>
                <div style="font-size:12px;color:#c0c0c0;margin-top:4px">clientes en todo el país</div>
              </div>
              <div style="text-align:center">
                <div style="font-family:var(--font-head);font-weight:900;font-size:34px;color:#ffffff">23</div>
                <div style="font-size:12px;color:#c0c0c0;margin-top:4px">provincias con envíos</div>
              </div>
            </div>
          </div>
        </div>

        <!-- QUÉ FABRICAMOS -->
        <div class="about-manufacture-section">
          <span class="section-label">Lo que hacemos</span>
          <h2 class="section-title">Fabricamos nosotros.<br><span>No revendemos.</span></h2>
          <div class="divider-line" style="margin:16px auto 40px"></div>
          <div class="about-manufacture-grid">
            <div class="about-manufacture-card">
              <div class="about-manufacture-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              </div>
              <div class="about-manufacture-label">Producción propia</div>
              <ul class="about-manufacture-list">
                <li>Fundas para asientos</li>
                <li>Cubre autos y camionetas</li>
                <li>Cubre capots</li>
                <li>Cubre trompas</li>
                <li>Cubre cintos</li>
                <li>Cubre motos</li>
                <li>Fundas para mascotas</li>
              </ul>
            </div>
            <div class="about-manufacture-card">
              <div class="about-manufacture-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
              </div>
              <div class="about-manufacture-label">Materiales importados</div>
              <p style="color:var(--metal2);font-size:14px;line-height:1.7;margin:0">Los materiales eco cuero y cuero automotor que utilizamos en nuestras fundas son <strong style="color:var(--white)">importados directamente desde Brasil</strong>, garantizando durabilidad y terminación premium.</p>
              <div style="margin-top:16px;padding:14px 16px;background:rgba(209,0,0,.08);border-left:3px solid var(--red);border-radius:4px">
                <p style="margin:0;font-size:13px;color:var(--metal2);font-style:italic">"Tuvimos clientes que usaron una funda de eco cuero más de <strong style="color:var(--white)">5 años</strong> sin cambiarla."</p>
              </div>
            </div>
            <div class="about-manufacture-card">
              <div class="about-manufacture-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></svg>
              </div>
              <div class="about-manufacture-label">Clientes corporativos</div>
              <p style="color:var(--metal2);font-size:14px;line-height:1.7;margin:0">Proveemos productos a empresas grandes del sector automotriz argentino como <strong style="color:var(--white)">Norauto</strong>, <strong style="color:var(--white)">DM Distribuidora de Autopartes</strong> y <strong style="color:var(--white)">SUNRA Argentina</strong> (fábrica líder en tecnología eléctrica). Eso habla de la confianza que genera nuestra calidad.</p>
            </div>
          </div>
        </div>

        <!-- VALORES -->
        <div class="about-values">
          <div class="value-card">
            <div class="value-icon">${icons.factory}</div>
            <div class="value-title">Fabricantes, no revendedores</div>
            <div class="value-text">Producimos con maquinaria propia y costureras especializadas. Controlamos la calidad desde la tela hasta el producto terminado, sin depender de terceros.</div>
          </div>
          <div class="value-card">
            <div class="value-icon">${icons.award}</div>
            <div class="value-title">Productos que duran</div>
            <div class="value-text">No fabricamos para que dure una temporada. Nuestros materiales son seleccionados, y la durabilidad de nuestros productos es el testimonio más honesto que tenemos.</div>
          </div>
          <div class="value-card">
            <div class="value-icon">${icons.heart}</div>
            <div class="value-title">Transparencia ante todo</div>
            <div class="value-text">No vas a encontrar descripciones engañosas ni productos que no cumplen lo que prometen. Lo que decimos es lo que recibís. Así nos ganamos la confianza de miles de clientes.</div>
          </div>
        </div>

        <!-- CTA -->
        <div style="text-align:center;padding:60px 0;border-top:1px solid var(--white08)">
          <span class="section-label">Estamos para ayudarte</span>
          <h2 class="section-title" style="margin-bottom:16px">¿Querés conocer <span>nuestros productos?</span></h2>
          <div class="divider-line" style="margin:16px auto 32px"></div>
          <div style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap">
            <a href="${WA_MSG('Hola! Quiero saber más sobre MDRACING y sus productos')}" target="_blank" class="btn-whatsapp" style="font-size:16px;padding:15px 36px">${icons.waIcon} Escribinos por WhatsApp</a>
            <a href="/categorias" data-page="categorias" class="btn-outline-dark" style="font-size:15px;padding:15px 32px">Ver catálogo completo →</a>
          </div>
        </div>

      </div>
    </div>
  `;
}

// ── FAQ Page ──
function renderFaqPage() {
  return `
    <div class="page-wrapper">
      <div class="page-hero">
        <div class="page-hero-inner">
          <div class="page-breadcrumb"><a href="/" data-page="home">Inicio</a> <span>›</span> <span>Preguntas Frecuentes</span></div>
          <h1 class="page-hero-title">Preguntas<br><span style="color:var(--red2)">Frecuentes.</span></h1>
          <p class="page-hero-sub">Las dudas más comunes resueltas. Si necesitás algo más específico, escribinos por WhatsApp o consultá con Madi, nuestra asistente virtual.</p>
        </div>
      </div>
      <div class="faq-page-body">
        <div class="faq-list faq-list-page">
          ${faqs.map(f => `
            <div class="faq-item">
              <button class="faq-q" onclick="toggleFaq(this)">${f.q} ${icons.chevDown}</button>
              <div class="faq-a">${f.a}</div>
            </div>
          `).join('')}
        </div>

        <div class="faq-cta-block">
          <div class="faq-cta-icon">${icons.phone}</div>
          <div class="faq-cta-text">
            <h3>¿No encontraste tu respuesta?</h3>
            <p>Escribinos por WhatsApp y te responde una persona real, o consultá con <strong>Madi</strong>, nuestra asistente virtual del sitio.</p>
          </div>
          <a href="${WA_MSG('Hola! Tengo una consulta sobre productos MDRACING')}" target="_blank" class="btn-primary btn-primary-wa">${icons.waIcon} Consultar por WhatsApp</a>
        </div>
      </div>
    </div>
  `;
}

// ── How to Buy Page ──
function renderHowToBuyPage() {
  // 2 caminos paralelos: compra rápida online vs. compra con asesoramiento.
  const stepsFast = [
    { n: '01', title: 'Elegí tu producto',         text: 'Buscá en el catálogo o usá el filtro por marca. Cada ficha tiene fotos, descripción y precio actualizado.' },
    { n: '02', title: 'Tocá "Comprar ahora"',      text: 'El botón rojo en la ficha del producto. Se abre el checkout sin salir del sitio.' },
    { n: '03', title: 'Completá tus datos',        text: 'Nombre, email, teléfono, dirección de envío o retiro. Te calculamos el envío en segundos.' },
    { n: '04', title: 'Pagá y listo',              text: 'Elegí <strong>tarjeta de crédito o débito</strong> (cuotas según banco) <strong>o transferencia/efectivo con 10% OFF</strong>. Te llega un email con tu pedido confirmado y te avisamos por WhatsApp cuando despachamos.' },
  ];

  const stepsAdvised = [
    { n: '01', title: 'Tenés dudas, lo entendemos', text: 'Cubre autos, fundas a medida, cubre capots, cubre trompas · son productos donde elegir mal el modelo o talle es caro. Mejor preguntar.' },
    { n: '02', title: 'Consultá con Madi o por WhatsApp', text: 'Madi (el chat del sitio) responde 24/7 sobre precios, materiales y compatibilidad. Para casos especiales, escribinos directo al WhatsApp: <strong>+54 9 11 5490-7774</strong>.' },
    { n: '03', title: 'Te asesoramos sin compromiso', text: 'Vemos foto de tu auto si hace falta, confirmamos modelo y talle exacto, te recomendamos el material correcto según uso. Sin presión de venta.' },
    { n: '04', title: 'Cerramos por donde prefieras', text: 'Una vez claro el producto, podés finalizar online (volvés al sitio y tocás "Comprar ahora") o lo cerramos por WhatsApp coordinando pago y envío.' },
  ];

  return `
    <div class="page-wrapper">
      <div class="page-hero">
        <div class="page-hero-inner">
          <div class="page-breadcrumb"><a href="/" data-page="home">Inicio</a> <span>›</span> <span>Cómo Comprar</span></div>
          <h1 class="page-hero-title">Dos formas<br>de <span style="color:var(--red2)">comprar.</span></h1>
          <p class="page-hero-sub">Elegí la que mejor se adapte a vos: <strong>compra rápida online</strong> con tarjeta o transferencia, o <strong>asesoramiento por WhatsApp</strong> antes de decidir. Las dos son simples y seguras.</p>
        </div>
      </div>

      <div class="howto-body">

        <!-- TWO PATHS RECOMMENDATION -->
        <div style="margin-bottom:60px;display:grid;grid-template-columns:1fr 1fr;gap:20px" class="howto-two-paths">
          <div style="background:var(--dark2);border:2px solid var(--red2);border-radius:14px;padding:24px;position:relative">
            <span style="position:absolute;top:-12px;left:24px;background:var(--red2);color:#fff;padding:4px 12px;border-radius:6px;font-family:var(--font-small);font-size:11px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase">Recomendado para accesorios</span>
            <h3 style="font-family:var(--font-head);font-weight:800;font-size:22px;color:var(--white);margin:8px 0 10px;letter-spacing:-.3px">⚡ Compra rápida online</h3>
            <p style="color:var(--metal2);font-size:14.5px;line-height:1.6;margin:0">Cubre volantes, cubre alfombras, criques, portabicis y accesorios donde sabés exactamente qué necesitás. Se compra en 2 minutos sin salir del sitio.</p>
          </div>
          <div style="background:var(--dark2);border:2px solid #25d366;border-radius:14px;padding:24px;position:relative">
            <span style="position:absolute;top:-12px;left:24px;background:#25d366;color:#fff;padding:4px 12px;border-radius:6px;font-family:var(--font-small);font-size:11px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase">Recomendado para productos custom</span>
            <h3 style="font-family:var(--font-head);font-weight:800;font-size:22px;color:var(--white);margin:8px 0 10px;letter-spacing:-.3px">💬 Asesoramiento por WhatsApp</h3>
            <p style="color:var(--metal2);font-size:14.5px;line-height:1.6;margin:0">Fundas, cubre autos, cubre capots y trompas · donde el modelo/talle/material importa. Te asesoramos para evitar errores y luego elegís cómo cerrar la compra.</p>
          </div>
        </div>

        <!-- PATH A: FAST ONLINE -->
        <div style="margin-bottom:64px">
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:32px">
            <span style="background:var(--red2);color:#fff;width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:var(--font-head);font-weight:800;font-size:14px">A</span>
            <h2 class="section-title" style="margin:0">Comprá <span>online en 4 pasos</span></h2>
          </div>
          <div class="steps-list">
            ${stepsFast.map((s, i) => `
              ${i > 0 ? '<div class="step-connector"></div>' : ''}
              <div class="step-item">
                <div class="step-num">${s.n}</div>
                <div class="step-content">
                  <h3>${s.title}</h3>
                  <p>${s.text}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- PATH B: ADVISED -->
        <div style="margin-bottom:64px;padding-top:48px;border-top:1px solid var(--white08)">
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:32px">
            <span style="background:#25d366;color:#fff;width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:var(--font-head);font-weight:800;font-size:14px">B</span>
            <h2 class="section-title" style="margin:0">Te <span>asesoramos primero</span></h2>
          </div>
          <div class="steps-list">
            ${stepsAdvised.map((s, i) => `
              ${i > 0 ? '<div class="step-connector"></div>' : ''}
              <div class="step-item">
                <div class="step-num">${s.n}</div>
                <div class="step-content">
                  <h3>${s.title}</h3>
                  <p>${s.text}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- MEDIOS DE PAGO -->
        <div style="margin-bottom:64px;padding-top:48px;border-top:1px solid var(--white08)">
          <span class="section-label">Medios de pago</span>
          <h2 class="section-title" style="margin-bottom:16px">Pagá como <span>más te convenga</span></h2>
          <p style="color:var(--metal2);font-size:15px;line-height:1.6;margin-bottom:32px;max-width:680px">Todos los métodos están disponibles en el checkout online. Eligiendo <strong>transferencia o efectivo</strong> tenés <strong style="color:var(--red2)">10% OFF automático</strong> en cualquier producto.</p>

          <div class="payment-methods">
            <div class="payment-card">
              <div class="payment-icon">💳</div>
              <div class="payment-name">Tarjeta crédito o débito</div>
              <div class="payment-desc">Cuotas sin interés según tu banco · Vía Mercado Pago</div>
            </div>
            <div class="payment-card" style="border-color:var(--red2)">
              <div class="payment-icon">🏦</div>
              <div class="payment-name">Transferencia bancaria <span style="display:inline-block;background:var(--red2);color:#fff;padding:2px 8px;border-radius:4px;font-size:10px;margin-left:6px;letter-spacing:.5px">10% OFF</span></div>
              <div class="payment-desc">Te mostramos los datos en el checkout. Mandás el comprobante por WhatsApp.</div>
            </div>
            <div class="payment-card" style="border-color:var(--red2)">
              <div class="payment-icon">💵</div>
              <div class="payment-name">Efectivo <span style="display:inline-block;background:var(--red2);color:#fff;padding:2px 8px;border-radius:4px;font-size:10px;margin-left:6px;letter-spacing:.5px">10% OFF</span></div>
              <div class="payment-desc">Al retirar tu pedido en nuestra fábrica de Villa Ballester.</div>
            </div>
            <div class="payment-card">
              <div class="payment-icon">📱</div>
              <div class="payment-name">Mercado Pago</div>
              <div class="payment-desc">Dinero en cuenta, QR, Pago Fácil, Rapipago, tarjetas. Todo desde el checkout.</div>
            </div>
          </div>

          <div class="info-block" style="margin-top:24px">
            <div class="info-block-title">${icons.check} Lo importante en una línea</div>
            <ul>
              <li>El <strong>10% OFF se aplica solo</strong> al elegir "Transferencia o efectivo" en el checkout. No tenés que pedirlo.</li>
              <li><strong>Cuotas sin interés</strong> disponibles según tu tarjeta y banco emisor (se ve en el checkout de Mercado Pago).</li>
              <li>Pago 100% seguro vía Mercado Pago. Nosotros nunca vemos los datos de tu tarjeta.</li>
              <li>Una vez confirmado el pago, preparamos el pedido en <strong>24-72 hs hábiles</strong>.</li>
            </ul>
          </div>
        </div>

        <!-- ENVÍOS Y RETIROS -->
        <div style="margin-bottom:48px;padding-top:48px;border-top:1px solid var(--white08)">
          <span class="section-label">Envíos y retiros</span>
          <h2 class="section-title" style="margin-bottom:32px">A todo el país <span>o retirás vos</span></h2>
          <div class="payment-methods">
            <div class="payment-card">
              <div class="payment-icon">📦</div>
              <div class="payment-name">Envío a domicilio</div>
              <div class="payment-desc">Andreani · Correo Argentino · OCA. Costo automático en el checkout según zona. <strong style="color:var(--red2)">Envío GRATIS</strong> en pedidos de $200.000+.</div>
            </div>
            <div class="payment-card">
              <div class="payment-icon">🏭</div>
              <div class="payment-name">Retiro en fábrica</div>
              <div class="payment-desc">Paraná 2185, Villa Ballester · Lun-Vie 8-16hs. Sin costo.</div>
            </div>
          </div>
        </div>

        <!-- CTA FINAL -->
        <div style="text-align:center;padding:60px 0;border-top:1px solid var(--white08)">
          <span class="section-label">¿Quedó alguna duda?</span>
          <h2 class="section-title" style="margin-bottom:16px">Estamos <span>a tu disposición.</span></h2>
          <div class="divider-line" style="margin:16px auto 32px"></div>
          <div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap">
            <a href="/categorias" data-page="categorias" class="btn-primary" style="font-size:16px;padding:15px 36px">Ver catálogo</a>
            <a href="${WA_MSG('Hola! Quiero hacer una consulta antes de comprar')}" target="_blank" class="btn-whatsapp" style="font-size:16px;padding:15px 36px">${icons.waIcon} Consultar por WhatsApp</a>
          </div>
        </div>

      </div>
    </div>
  `;
}

// ── Returns Page ──
function renderReturnsPage() {
  return `
    <div class="page-wrapper">
      <div class="page-hero">
        <div class="page-hero-inner">
          <div class="page-breadcrumb"><a href="/" data-page="home">Inicio</a> <span>›</span> <span>Cambios y Devoluciones</span></div>
          <h1 class="page-hero-title">Cambios y<br><span style="color:var(--red2)">Devoluciones</span></h1>
          <p class="page-hero-sub">Política clara y transparente. Si hay un problema, lo resolvemos.</p>
        </div>
      </div>
      <div class="returns-body">

        <!-- CARDS RESUMEN -->
        <div class="policy-grid" style="margin-bottom:56px">
          <div class="policy-card">
            <div class="policy-card-icon">${icons.refresh}</div>
            <h3>Insatisfacción con el producto</h3>
            <p>Tenés <strong>10 días</strong> desde que recibís el pedido para solicitar la devolución si no estás conforme. El producto debe estar en perfecta condición y con su embalaje original sin daños.</p>
          </div>
          <div class="policy-card">
            <div class="policy-card-icon">${icons.shield}</div>
            <h3>Defecto de fabricación</h3>
            <p>Si el producto tiene un defecto de fábrica, falla en su funcionamiento o llegó dañado, tenés <strong>30 días</strong> desde la recepción para reclamarlo. El costo de devolución corre por nuestra cuenta.</p>
          </div>
          <div class="policy-card">
            <div class="policy-card-icon">${icons.truck}</div>
            <h3>Devolución del dinero</h3>
            <p>Una vez que recibimos el producto devuelto, procesamos el reembolso en los <strong>siguientes 30 días</strong> a través del mismo método de pago que utilizaste al comprar.</p>
          </div>
        </div>

        <!-- DEVOLUCIÓN POR INSATISFACCIÓN -->
        <div class="returns-section">
          <h2 class="returns-section-title">
            <span class="returns-section-num">1</span>
            Devolución por insatisfacción o arrepentimiento
          </h2>
          <p class="returns-section-text">Si no quedaste conforme con el producto o simplemente te arrepentiste de la compra, podés solicitar la devolución de tu dinero dentro de los <strong>10 días</strong> siguientes a la fecha de recepción del pedido.</p>
          <div class="info-block" style="margin-bottom:20px">
            <div class="info-block-title">${icons.check} Condiciones para que sea válida</div>
            <ul>
              <li>El producto debe estar en perfecta condición, sin daños evidentes por mal uso.</li>
              <li>Debe conservar el embalaje original sin signos de maltrato.</li>
              <li>Los gastos de envío de devolución corren a cargo del cliente.</li>
            </ul>
          </div>
          <p class="returns-section-text">Para iniciar el proceso, escribinos al <strong>+54 9 11 5490-7774</strong> indicando tu nombre completo y el producto que compraste. Una vez que recibamos el artículo, procesamos el reembolso en un plazo máximo de 30 días.</p>
        </div>

        <!-- DEVOLUCIÓN POR DEFECTO -->
        <div class="returns-section">
          <h2 class="returns-section-title">
            <span class="returns-section-num">2</span>
            Devolución por producto defectuoso o dañado
          </h2>
          <p class="returns-section-text">En caso de que el producto presente un defecto de fabricación, una falla en el funcionamiento, daños durante el envío o faltantes, tenés derecho a solicitar la devolución dentro de los <strong>30 días</strong> a partir de la recepción.</p>
          <div class="info-block" style="margin-bottom:20px">
            <div class="info-block-title">${icons.check} Qué necesitás para reclamar</div>
            <ul>
              <li>Tu nombre completo y el producto que compraste.</li>
              <li>Descripción del defecto con fotos o videos que lo evidencien.</li>
              <li>En este caso, el costo de devolución corre por nuestra cuenta.</li>
            </ul>
          </div>
          <p class="returns-section-text">Escribinos al <strong>+54 9 11 5490-7774</strong> con esa información. Analizamos tu caso y coordinamos la devolución. El reembolso se realiza por el mismo medio de pago utilizado en la compra.</p>
        </div>

        <!-- CÓMO DEVOLVER -->
        <div class="returns-section">
          <h2 class="returns-section-title">
            <span class="returns-section-num">3</span>
            ¿Cómo se hace la devolución?
          </h2>
          <p class="returns-section-text">Una vez que nos contactás, analizamos tu caso y nos comunicamos para coordinar todo. El producto debe enviarse tal como se recibió: con su embalaje original, etiquetas y accesorios incluidos.</p>
          <div class="info-block" style="margin-bottom:20px">
            <div class="info-block-title">${icons.check} Tené en cuenta</div>
            <ul>
              <li>Usá el mismo embalaje en que recibiste el producto (si no está dañado) o una caja adecuada que lo proteja durante el transporte.</li>
              <li>Los gastos de embalaje corren por cuenta del cliente.</li>
              <li>Devoluciones por insatisfacción: el costo de envío lo paga el cliente.</li>
              <li>Devoluciones por defecto o daño en envío: el costo lo cubrimos nosotros.</li>
            </ul>
          </div>
          <div class="returns-address-card">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <div>
              <div class="returns-address-label">Dirección para devoluciones</div>
              <div class="returns-address-value">Paraná 2185, Villa Ballester · San Martín, Buenos Aires (CP 1653)</div>
            </div>
          </div>
        </div>

        <!-- CTA -->
        <div style="text-align:center;padding:60px 0;border-top:1px solid var(--white08)">
          <span class="section-label">¿Tenés alguna duda?</span>
          <h2 class="section-title" style="margin-bottom:16px">Estamos <span>para ayudarte.</span></h2>
          <div class="divider-line" style="margin:16px auto 32px"></div>
          <p style="color:var(--metal);font-size:15px;margin-bottom:28px">Escribinos con tu nombre completo y el motivo de tu consulta. Respondemos a la brevedad.</p>
          <a href="${WA_MSG('Hola! Quiero consultar sobre cambios y devoluciones')}" target="_blank" class="btn-whatsapp" style="font-size:16px;padding:15px 36px">${icons.waIcon} Escribir al +54 9 11 5490-7774</a>
        </div>

      </div>
    </div>
  `;
}

// ── Terms & Conditions ──
function renderTermsPage() {
  const today = new Date().toLocaleDateString('es-AR');
  return `
    <div class="page-wrapper">
      <div class="page-hero">
        <div class="page-hero-inner">
          <div class="page-breadcrumb"><a href="/" data-page="home">Inicio</a> <span>›</span> <span>Términos y Condiciones</span></div>
          <h1 class="page-hero-title">Términos y<br><span style="color:var(--red2)">Condiciones</span></h1>
          <p class="page-hero-sub">Las reglas claras y por escrito de comprar en MDRACING.</p>
        </div>
      </div>

      <div class="legal-body" style="max-width:880px;margin:0 auto;padding:48px 24px 80px">

        <p style="color:var(--metal);font-size:14px;margin-bottom:32px">Última actualización: ${today}</p>

        <h2 class="legal-h2">1 · Datos del titular del sitio</h2>
        <p>El sitio <strong>www.mdracingfundas.com</strong> (en adelante, "el Sitio") es operado por <strong>Miguel Angel Di Vito</strong>, CUIT <strong>20-22862560-5</strong>, con domicilio comercial en <strong>Paraná 2185, Villa Ballester, San Martín, Provincia de Buenos Aires, Argentina</strong>. Comercializa la marca <strong>MDRACING</strong> (en adelante, "MDRACING", "nosotros").</p>

        <h2 class="legal-h2">2 · Aceptación de los términos</h2>
        <p>El uso del Sitio implica la aceptación plena de estos Términos y Condiciones (en adelante, "T&C") y de la Política de Privacidad. Si no estás de acuerdo con alguna de las cláusulas, no deberías utilizar el Sitio ni realizar compras.</p>

        <h2 class="legal-h2">3 · Productos y catálogo</h2>
        <p>Los productos exhibidos en el Sitio son fabricados por MDRACING o adquiridos a proveedores. Las imágenes son ilustrativas: pequeñas variaciones de color, textura o tono pueden existir entre el producto fotografiado y el entregado, sin que ello implique un defecto.</p>
        <p>Los precios y la disponibilidad pueden modificarse sin aviso previo. El precio vigente para cada compra es el publicado al momento de confirmar el pedido.</p>
        <p>Muchos productos (cubre autos, fundas a medida, cubre capots, cubre trompas) se fabrican <strong>a pedido</strong>. El plazo de producción se informa por WhatsApp al momento de coordinar la compra.</p>

        <h2 class="legal-h2">4 · Proceso de compra</h2>
        <p>La compra se concreta cuando:</p>
        <ul>
          <li>El cliente completa el formulario de checkout con sus datos y método de pago.</li>
          <li>Se acredita el pago a través de <strong>Mercado Pago</strong>, o bien</li>
          <li>El cliente envía el comprobante de transferencia bancaria por WhatsApp y MDRACING lo confirma.</li>
        </ul>
        <p>Hasta que el pago no esté acreditado/confirmado, el pedido se considera <strong>reservado</strong> pero no confirmado. MDRACING podrá cancelar pedidos reservados sin acreditación dentro de un plazo razonable.</p>

        <h2 class="legal-h2">5 · Medios de pago</h2>
        <ul>
          <li><strong>Tarjeta de crédito o débito</strong> a través de Mercado Pago. Aplican cuotas según el plan vigente del banco emisor.</li>
          <li><strong>Transferencia bancaria</strong> a la cuenta de Mercado Pago de Miguel Angel Di Vito (CUIT 20-22862560-5). El cliente envía el comprobante por WhatsApp.</li>
          <li><strong>Efectivo</strong> al momento de retirar en nuestra fábrica (Paraná 2185, Villa Ballester).</li>
        </ul>
        <p>Pagos por transferencia y efectivo tienen un <strong>descuento del 10%</strong> sobre el subtotal, ya aplicado en el checkout.</p>

        <h2 class="legal-h2">6 · Envíos</h2>
        <p>MDRACING realiza envíos a todo el territorio argentino a través de <strong>Andreani, Correo Argentino y OCA</strong>. Los costos y plazos varían según destino y se informan al confirmar el pedido. También se puede retirar sin costo en:</p>
        <ul>
          <li><strong>Fábrica:</strong> Villa Ballester, San Martín, Buenos Aires.</li>
          <li><strong>Fábrica:</strong> Paraná 2185, Villa Ballester, San Martín, Buenos Aires.</li>
        </ul>
        <p>Los plazos de entrega son estimativos y dependen del operador logístico. MDRACING no se responsabiliza por demoras del correo no imputables a la empresa.</p>
        <p>Una vez despachado, MDRACING informará el código de seguimiento al cliente por email o WhatsApp.</p>

        <h2 class="legal-h2">7 · Derecho de revocación (botón de arrepentimiento)</h2>
        <p>De acuerdo con el Art. 1110 del Código Civil y Comercial y la Ley 24.240 de Defensa del Consumidor, el cliente tiene derecho a revocar la compra <strong>dentro de los 10 días corridos</strong> desde la recepción del producto, sin necesidad de expresar causa, en compras realizadas fuera del establecimiento comercial.</p>
        <p>Para ejercer este derecho:</p>
        <ul>
          <li>El producto debe devolverse <strong>sin uso, sin lavado y con su empaque original</strong>.</li>
          <li>El cliente debe contactar a MDRACING por WhatsApp (<strong>+54 9 11 5490-7774</strong>) o por email a <strong>mdracingdv@gmail.com</strong> dentro del plazo de 10 días.</li>
          <li>Los costos de devolución son a cargo del cliente, salvo en caso de falla de fábrica.</li>
          <li>Una vez recibido el producto en perfecto estado, MDRACING reintegrará el monto abonado dentro de los 10 días hábiles, por el mismo medio de pago utilizado.</li>
        </ul>

        <h2 class="legal-h2">8 · Garantía</h2>
        <p>Todos los productos de MDRACING cuentan con <strong>garantía de 30 días</strong> por fallas de fábrica desde la fecha de entrega. La garantía cubre defectos de fabricación verificables y no aplica a daños por mal uso, lavado inadecuado, golpes, exposición prolongada a condiciones extremas o desgaste normal por uso.</p>
        <p>Para hacer efectiva la garantía, contactar por WhatsApp con fotos del producto y descripción del problema.</p>

        <h2 class="legal-h2">9 · Cambios de talle / color / modelo</h2>
        <p>Los cambios por talle, color o modelo equivocado están sujetos a stock y aceptación de MDRACING. Aplica el mismo plazo de 10 días desde la recepción. El producto debe estar sin uso.</p>
        <p>En productos fabricados a medida (fundas custom, cubre autos específicos), <strong>el cliente es responsable de verificar el modelo y año del vehículo antes de confirmar la compra</strong>. Ante duda, recomendamos consultar por WhatsApp o usar el asistente Madi en el sitio.</p>

        <h2 class="legal-h2">10 · Facturación</h2>
        <p>MDRACING emite <strong>Factura A</strong> para clientes con CUIT (a solicitud, indicando CUIT y razón social en el checkout) y <strong>Factura B/C</strong> para consumidores finales.</p>

        <h2 class="legal-h2">11 · Propiedad intelectual</h2>
        <p>Todos los contenidos del Sitio (textos, fotos, logos, diseño) son propiedad de MDRACING o de sus respectivos titulares. Está prohibida su reproducción, distribución o uso comercial sin autorización expresa por escrito.</p>

        <h2 class="legal-h2">12 · Asistente virtual (Madi)</h2>
        <p>El Sitio dispone de un asistente automático llamado "Madi" que brinda información de productos y precios. Las respuestas de Madi son orientativas y no constituyen un compromiso comercial. Ante duda, prevalece la información publicada en el catálogo y la confirmación por WhatsApp.</p>

        <h2 class="legal-h2">13 · Limitación de responsabilidad</h2>
        <p>MDRACING no se responsabiliza por:</p>
        <ul>
          <li>Daños indirectos o consecuentes derivados del uso del producto.</li>
          <li>Errores en los datos provistos por el cliente (dirección de envío, modelo de vehículo).</li>
          <li>Interrupciones temporales del Sitio por mantenimiento, fallas técnicas o causas de fuerza mayor.</li>
          <li>Demoras del operador logístico ajenas al control de MDRACING.</li>
        </ul>

        <h2 class="legal-h2">14 · Modificaciones de los T&C</h2>
        <p>MDRACING se reserva el derecho de modificar estos T&C en cualquier momento. Los cambios entran en vigencia desde su publicación en el Sitio. La fecha de "última actualización" siempre estará indicada al inicio del documento.</p>

        <h2 class="legal-h2">15 · Jurisdicción</h2>
        <p>Las partes acuerdan someter cualquier controversia derivada de la relación comercial a los tribunales ordinarios de <strong>San Martín, Provincia de Buenos Aires, Argentina</strong>, renunciando a cualquier otro fuero o jurisdicción que pudiera corresponder.</p>

        <h2 class="legal-h2">16 · Contacto</h2>
        <p>Para consultas sobre estos términos:</p>
        <ul>
          <li>WhatsApp: <strong>+54 9 11 5490-7774</strong></li>
          <li>Email: <strong>mdracingdv@gmail.com</strong></li>
          <li>Dirección: <strong>Paraná 2185, Villa Ballester, San Martín, Buenos Aires</strong></li>
        </ul>

        <p style="margin-top:48px;font-size:13px;color:var(--metal);font-style:italic">
          Para reclamos ante la Dirección de Defensa del Consumidor podés ingresar a
          <a href="https://www.argentina.gob.ar/produccion/defensadelconsumidor" target="_blank" style="color:var(--red2)">www.argentina.gob.ar/produccion/defensadelconsumidor</a>.
        </p>

      </div>
    </div>
  `;
}

// ── Privacy Policy ──
function renderPrivacyPage() {
  const today = new Date().toLocaleDateString('es-AR');
  return `
    <div class="page-wrapper">
      <div class="page-hero">
        <div class="page-hero-inner">
          <div class="page-breadcrumb"><a href="/" data-page="home">Inicio</a> <span>›</span> <span>Política de Privacidad</span></div>
          <h1 class="page-hero-title">Política de<br><span style="color:var(--red2)">Privacidad</span></h1>
          <p class="page-hero-sub">Cómo cuidamos los datos que nos confiás.</p>
        </div>
      </div>

      <div class="legal-body" style="max-width:880px;margin:0 auto;padding:48px 24px 80px">

        <p style="color:var(--metal);font-size:14px;margin-bottom:32px">Última actualización: ${today}</p>

        <h2 class="legal-h2">1 · Quiénes somos</h2>
        <p>Esta Política de Privacidad describe cómo <strong>MDRACING</strong> (operada por Miguel Angel Di Vito, CUIT 20-22862560-5, con domicilio en Paraná 2185, Villa Ballester, San Martín, Bs. As., Argentina) recolecta, usa y protege los datos personales de los usuarios del sitio <strong>www.mdracingfundas.com</strong> (el "Sitio").</p>
        <p>Esta política se ajusta a la <strong>Ley 25.326 de Protección de Datos Personales</strong> de la República Argentina.</p>

        <h2 class="legal-h2">2 · Qué datos recolectamos</h2>
        <p>Recolectamos los siguientes datos personales cuando interactuás con el Sitio:</p>
        <ul>
          <li><strong>Datos de identificación:</strong> nombre, apellido, DNI, CUIT (opcional para Factura A).</li>
          <li><strong>Datos de contacto:</strong> email, teléfono / WhatsApp.</li>
          <li><strong>Datos de envío:</strong> dirección, ciudad, provincia, código postal.</li>
          <li><strong>Datos de navegación:</strong> dirección IP, navegador, dispositivo, páginas visitadas (vía Google Analytics y Meta Pixel).</li>
          <li><strong>Datos de la compra:</strong> productos seleccionados, monto, fecha, método de pago.</li>
          <li><strong>Comunicaciones:</strong> mensajes enviados al asistente Madi o por WhatsApp.</li>
        </ul>
        <p>No recolectamos datos sensibles de tarjetas de crédito: el procesamiento de pagos se realiza directamente en la plataforma de <strong>Mercado Pago</strong>, que cumple con los estándares de seguridad PCI-DSS.</p>

        <h2 class="legal-h2">3 · Para qué usamos los datos</h2>
        <p>Los datos recolectados se utilizan para:</p>
        <ul>
          <li>Procesar y entregar tu pedido.</li>
          <li>Comunicarnos contigo respecto del estado del pedido (email, WhatsApp).</li>
          <li>Emitir factura conforme a la normativa fiscal.</li>
          <li>Brindar atención post-venta y soporte.</li>
          <li>Enviar comunicaciones promocionales <strong>solo si lo aceptaste expresamente</strong> (newsletter, ofertas).</li>
          <li>Analizar el uso del Sitio para mejorar la experiencia (estadísticas agregadas).</li>
          <li>Cumplir con obligaciones legales y normativas.</li>
        </ul>

        <h2 class="legal-h2">4 · Con quién compartimos los datos</h2>
        <p>Compartimos los datos estrictamente necesarios con:</p>
        <ul>
          <li><strong>Mercado Pago</strong> (procesamiento de pagos)</li>
          <li><strong>Andreani, Correo Argentino, OCA</strong> (envíos)</li>
          <li><strong>Resend</strong> (servicio de envío de emails transaccionales)</li>
          <li><strong>Vercel</strong> (hosting del Sitio)</li>
          <li><strong>Google Analytics, Meta (Facebook/Instagram)</strong> (análisis de uso y publicidad)</li>
          <li><strong>Anthropic</strong> (procesamiento de mensajes del asistente Madi)</li>
        </ul>
        <p>No vendemos ni cedemos datos personales a terceros con fines comerciales ajenos a la operación del Sitio.</p>

        <h2 class="legal-h2">5 · Conservación de los datos</h2>
        <p>Conservamos los datos por el tiempo necesario para cumplir con las finalidades descriptas y con las obligaciones legales (mínimo 10 años para datos de facturación, según normativa fiscal argentina).</p>

        <h2 class="legal-h2">6 · Tus derechos (ARCO)</h2>
        <p>De acuerdo con la Ley 25.326, podés ejercer en cualquier momento los siguientes derechos sobre tus datos:</p>
        <ul>
          <li><strong>Acceso:</strong> consultar qué datos tuyos tenemos.</li>
          <li><strong>Rectificación:</strong> corregir datos inexactos.</li>
          <li><strong>Cancelación / Supresión:</strong> solicitar la eliminación de tus datos cuando no sean ya necesarios.</li>
          <li><strong>Oposición:</strong> oponerte a que tus datos sean utilizados para fines de marketing.</li>
        </ul>
        <p>Para ejercerlos, escribinos a <strong>mdracingdv@gmail.com</strong> indicando "Solicitud ARCO" en el asunto, junto con copia de tu DNI para validar identidad. Tenemos 10 días hábiles para responder.</p>

        <h2 class="legal-h2">7 · Cookies y tecnologías similares</h2>
        <p>El Sitio utiliza cookies y tecnologías similares para:</p>
        <ul>
          <li>Mantener tu carrito de compras entre sesiones.</li>
          <li>Recordar preferencias de navegación.</li>
          <li>Medir tráfico y comportamiento agregado (Google Analytics, Vercel Analytics).</li>
          <li>Optimizar campañas publicitarias en Meta (Facebook, Instagram) e Instagram Shopping.</li>
        </ul>
        <p>Podés configurar tu navegador para rechazar cookies, aunque esto puede afectar el funcionamiento del Sitio (por ejemplo, el carrito).</p>

        <h2 class="legal-h2">8 · Seguridad</h2>
        <p>Implementamos medidas técnicas y organizativas razonables para proteger tus datos (HTTPS, almacenamiento cifrado, control de accesos). Sin embargo, ninguna transmisión por Internet es 100% segura. En caso de detectar una brecha de seguridad que afecte tus datos, te lo informaremos según lo establecido por la normativa.</p>

        <h2 class="legal-h2">9 · Menores de edad</h2>
        <p>El Sitio no está destinado a menores de 18 años. No recolectamos a sabiendas datos de menores. Si sos menor, abstenete de proporcionar datos personales.</p>

        <h2 class="legal-h2">10 · Cambios en esta política</h2>
        <p>Podemos actualizar esta política cuando sea necesario. Los cambios entran en vigencia al publicarse en el Sitio. La fecha de "última actualización" siempre estará indicada al inicio.</p>

        <h2 class="legal-h2">11 · Contacto</h2>
        <ul>
          <li>Responsable de datos: <strong>Miguel Angel Di Vito</strong></li>
          <li>Email: <strong>mdracingdv@gmail.com</strong></li>
          <li>WhatsApp: <strong>+54 9 11 5490-7774</strong></li>
          <li>Dirección: <strong>Paraná 2185, Villa Ballester, San Martín, Bs. As.</strong></li>
        </ul>

        <p style="margin-top:48px;font-size:13px;color:var(--metal);font-style:italic">
          La Agencia de Acceso a la Información Pública es el órgano de control de la Ley 25.326.
          Más información en <a href="https://www.argentina.gob.ar/aaip" target="_blank" style="color:var(--red2)">www.argentina.gob.ar/aaip</a>.
        </p>

      </div>
    </div>
  `;
}

// ── Contact Page ──
function renderContactPage() {
  const mayoristaBody = [
    'Hola MDRACING, quiero consultar precios mayoristas. Estos son mis datos:',
    '',
    'Nombre y apellido: ',
    'DNI: ',
    'CUIT / CUIL: ',
    'Condición frente al IVA (Responsable Inscripto / Monotributo / Consumidor Final): ',
    '¿Tenés un negocio? (nombre y rubro): ',
    'Localidad y provincia: ',
    'Teléfono / WhatsApp: ',
    '',
    'Productos que te interesan (detallá cuáles y la cantidad aproximada de unidades):',
    '- ',
    '- ',
    '- ',
    '',
    '¿Cómo nos conociste?: ',
  ].join('\n');
  const mayoristaMail = 'https://mail.google.com/mail/?view=cm&fs=1&to=mdracingdv@gmail.com&su=' + encodeURIComponent('Consulta precios mayoristas MDRACING') + '&body=' + encodeURIComponent(mayoristaBody);
  return `
    <div class="page-wrapper">
      <div class="page-hero">
        <div class="page-hero-inner">
          <div class="page-breadcrumb"><a href="/" data-page="home">Inicio</a> <span>›</span> <span>Contacto</span></div>
          <h1 class="page-hero-title">Hablemos<br><span style="color:var(--red2)">sin vueltas.</span></h1>
          <p class="page-hero-sub">Estamos disponibles para asesorarte, responder consultas y ayudarte a elegir el producto correcto.</p>
        </div>
      </div>
      <div class="contact-body">
        <div>
          <div class="contact-info-cards">
            <div class="contact-card">
              <div class="contact-card-icon">${icons.phone}</div>
              <div>
                <div class="contact-card-title">WhatsApp</div>
                <div class="contact-card-value">+54 9 11 5490-7774</div>
                <div style="margin-top:10px"><a href="${WA_MSG('Hola! Quiero hacer una consulta')}" target="_blank" class="btn-whatsapp" style="font-size:12px;padding:8px 16px">${icons.waIcon} Escribir ahora</a></div>
              </div>
            </div>
            <div class="contact-card">
              <div class="contact-card-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </div>
              <div>
                <div class="contact-card-title">Email</div>
                <div class="contact-card-value">mdracingdv@gmail.com</div>
              </div>
            </div>
            <div class="contact-card">
              <div class="contact-card-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>
              </div>
              <div>
                <div class="contact-card-title">Horario de Atención</div>
                <div class="contact-card-value">Lun a Vie: 8 a 16hs</div>
                <div class="contact-card-value">Sábados y domingos: Cerrado</div>
              </div>
            </div>
            <div class="contact-card">
              <div class="contact-card-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
              </div>
              <div>
                <div class="contact-card-title">Instagram</div>
                <div class="contact-card-value">@mdracingfundas</div>
              </div>
            </div>
          </div>
        </div>

        <div class="contact-form-wrap">
          <div class="form-title">¿Comprás por mayor?</div>
          <div class="form-sub">Somos fábrica directa: revendé nuestros productos con precios mayoristas.</div>
          <p style="color:var(--metal2);line-height:1.7;margin:0 0 22px">Tocá el botón y se abre un mail ya armado para consultarnos los precios mayoristas. Completá tus datos y los productos que te interesan, y te respondemos a la brevedad con precios y disponibilidad.</p>
          <a href="${mayoristaMail}" target="_blank" rel="noopener" class="btn-primary" style="width:100%;justify-content:center">Consultar precios mayoristas por mail ${icons.arrowRight}</a>
        </div>
      </div>
    </div>
  `;
}

// ── Categories overview ──
function renderCategoriesPage() {
  return `
    <div class="page-wrapper">
      <div class="page-hero">
        <div class="page-hero-inner">
          <div class="page-breadcrumb"><a href="/" data-page="home">Inicio</a> <span>›</span> <span>Productos</span></div>
          <h1 class="page-hero-title">Todo nuestro<br><span style="color:var(--red2)">catálogo.</span></h1>
          <p class="page-hero-sub">Fabricantes directos. Más de 25 años de experiencia en accesorios automotrices premium.</p>
        </div>
      </div>
      <div style="max-width:var(--max);margin:0 auto;padding:48px 24px">
        ${(() => {
          const featuredIds = ['cat-cubre-autos','cat-fundas-asientos','cat-alfombras-termoformadas'];
          const featured = featuredIds.map(id => categories.find(c => c.id === id)).filter(Boolean);
          const secondary = categories.filter(c => !featuredIds.includes(c.id) && !c.hotsaleOnly);
          const renderCard = (c, isSmall) => `
            <div class="cat-card${isSmall ? ' cat-card-sm' : ''}" data-cat="${c.cat}" onclick="navigate('${c.page}')" style="cursor:pointer">
              <div class="cat-card-bg"></div>
              <div class="cat-visual">${c.svg}</div>
              <div class="cat-card-overlay"></div>
              <div class="cat-card-content">
                <span class="cat-card-tag">${c.tag}</span>
                <h3 class="cat-card-title">${c.title.replace('\n','<br>')}</h3>
                <div class="cat-card-arrow">Ver productos ${icons.arrowRight}</div>
              </div>
            </div>`;
          const hotSaleBanner = HOT_SALE_ACTIVE ? `
            <div class="cat-hs-fullbanner" onclick="navigate('cat-hot-sale')" style="cursor:pointer">
              <div class="cat-hs-fb-flame">${flameSvg}</div>
              <div class="cat-hs-fb-text">
                <span class="cat-hs-fb-tag">🔥 HASTA EL 20/05</span>
                <h3 class="cat-hs-fb-title">HOT SALE MDRACING</h3>
                <p class="cat-hs-fb-sub">Precios que queman directo de fábrica</p>
              </div>
              <div class="cat-hs-fb-cta">Ver todas las ofertas ${icons.arrowRight}</div>
            </div>` : '';
          return `
            <div class="cat-grid cat-grid-featured">
              ${featured.map(c => renderCard(c, false)).join('')}
            </div>
            <div class="cat-grid cat-grid-secondary">
              ${secondary.map(c => renderCard(c, true)).join('')}
            </div>
            ${hotSaleBanner}
          `;
        })()}
      </div>
    </div>
  `;
}

// ═══════════════════════════════════════════════════════════
// ROUTER
// ═══════════════════════════════════════════════════════════

let currentPage = 'home';
let isNavigating = false;

function navigate(page) {
  if (!page) return;
  // Evita doble click / clicks múltiples rapidísimos
  if (isNavigating) return;
  // Si ya estamos en esa página, igual scrollear arriba (UX) pero no re-renderizar
  if (page === currentPage) {
    window.scrollTo(0, 0);
    closeMobileNav();
    return;
  }
  isNavigating = true;
  currentPage = page;
  history.pushState({ page }, '', pageToPath(page));
  renderPage(page);
  window.scrollTo(0, 0); // instantáneo, no bloquea
  closeMobileNav();
  updateActiveNav(page);
  applySEO(page);

  // ── Meta: ViewContent cuando entra a una ficha de producto ──
  try {
    if (page.startsWith('product-')) {
      const productId = page.slice('product-'.length);
      const product = products.find(p => p.id === productId);
      if (product) {
        const priceNum = parseInt(String(product.salePrice || product.price || '0').replace(/[^\d]/g, ''), 10) || 0;
        trackEvent('ViewContent', {
          content_ids: [product.id],
          content_type: 'product',
          content_name: product.name,
          content_category: product.cat,
          value: priceNum,
          currency: 'ARS',
        });
      }
    }
  } catch (e) { /* fail-soft */ }
  // Liberar lock en el próximo frame: el navegador pinta primero, después acepta más clicks
  requestAnimationFrame(() => {
    requestAnimationFrame(() => { isNavigating = false; });
  });
}

// ═══════════════════════════════════════════════════════════
// SEO · actualización dinámica de title / meta / OG por página
// ═══════════════════════════════════════════════════════════
const SITE_BASE = 'https://www.mdracingfundas.com';
const SITE_DEFAULT_IMAGE = SITE_BASE + '/og-image.jpg';

function setMeta(selector, attr, value) {
  const el = document.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

function applySEO(page) {
  let title, description, image, urlPath;
  image = SITE_DEFAULT_IMAGE;
  urlPath = pageToPath(page);

  // Producto
  if (page.startsWith('product-')) {
    const id = page.replace('product-', '');
    const p = products.find(pp => pp.id === id);
    if (p) {
      const offer = p.salePrice ? ` · Oferta $${p.salePrice}` : '';
      title = `${p.name} · $${p.price}${offer} | MDRACING`;
      description = (p.desc || `${p.name} fabricado por MDRACING. Calidad premium, envíos a todo el país.`).slice(0, 158);
      if (p.images && p.images[0]) image = p.images[0].startsWith('http') ? p.images[0] : SITE_BASE + '/' + p.images[0];
      injectProductJsonLd(p);
    }
  }
  // Categoría
  else if (page.startsWith('cat-')) {
    const cat = categories.find(c => c.id === page);
    if (cat) {
      const cleanTitle = cat.title.replace('\n', ' ');
      title = `${cleanTitle} para tu Vehículo | MDRACING`;
      description = `${cat.desc} Fabricantes directos con más de 25 años. Envíos a todo el país y retiro en Villa Ballester.`;
    } else {
      title = 'Productos | MDRACING';
      description = 'Catálogo completo de fundas, cubre autos, cubre capots, cubre trompas y accesorios automotrices MDRACING.';
    }
    removeProductJsonLd();
  }
  // Páginas estáticas
  else {
    removeProductJsonLd();
    const seoMap = {
      'home':                   { t: 'MDRACING · Fundas, Cubre Autos y Accesorios para tu Vehículo',
                                  d: 'Fabricantes de fundas para asientos, cubre autos antigranizo, cubre capots y accesorios. +25 años de trayectoria. Envíos a todo el país.' },
      'categorias':             { t: 'Productos | MDRACING',
                                  d: 'Catálogo completo de fundas para asientos, cubre autos, cubre capots, cubre trompas, alfombras termoformadas y accesorios.' },
      'quienes-somos':          { t: 'Quiénes Somos | MDRACING · 25 años fabricando en Argentina',
                                  d: 'MDRACING fabrica accesorios automotrices premium desde el año 2000. Conocé nuestra historia, nuestro proceso y por qué nos eligen.' },
      'como-comprar':           { t: 'Cómo Comprar | MDRACING · Compras simples por WhatsApp',
                                  d: 'Comprá fácil en 3 pasos. Envíos a todo el país, retiro en Villa Ballester y atención personalizada por WhatsApp.' },
      'preguntas-frecuentes':   { t: 'Preguntas Frecuentes | MDRACING',
                                  d: 'Resolvemos tus dudas sobre productos, materiales, envíos, talles y garantías de MDRACING.' },
      'cambios-devoluciones':   { t: 'Cambios y Devoluciones | MDRACING',
                                  d: 'Garantía de 30 días por fallas de fábrica. Política de cambios y devoluciones MDRACING.' },
      'contacto':               { t: 'Contacto | MDRACING · WhatsApp y Fábrica en Villa Ballester',
                                  d: 'Escribinos por WhatsApp +54 9 11 5490-7774 o visitá nuestra fábrica en Paraná 2185, Villa Ballester.' },
      'terminos-y-condiciones': { t: 'Términos y Condiciones | MDRACING',
                                  d: 'Condiciones de compra, envíos, garantía y derecho de revocación de MDRACING. Ajustado a la Ley 24.240 de Defensa del Consumidor.' },
      'politica-privacidad':    { t: 'Política de Privacidad | MDRACING',
                                  d: 'Cómo MDRACING recolecta, usa y protege tus datos personales. Conforme a la Ley 25.326 de Protección de Datos Personales (Argentina).' },
    };
    const seo = seoMap[page] || seoMap['home'];
    title = seo.t;
    description = seo.d;
  }

  if (!title) title = 'MDRACING · Fundas, Cubre Autos y Accesorios';
  if (!description) description = 'Fabricantes de accesorios automotrices premium con más de 25 años de trayectoria.';

  const fullUrl = SITE_BASE + urlPath;

  document.title = title;
  setMeta('meta[name="description"]', 'content', description);
  setMeta('#canonical-link', 'href', fullUrl);
  setMeta('#og-title', 'content', title);
  setMeta('#og-description', 'content', description);
  setMeta('#og-url', 'content', fullUrl);
  setMeta('#og-image', 'content', image);
  setMeta('#tw-title', 'content', title);
  setMeta('#tw-description', 'content', description);
  setMeta('#tw-image', 'content', image);
}

function injectProductJsonLd(p) {
  removeProductJsonLd();
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.id = 'product-jsonld';
  const priceNum = (p.salePrice || p.price || '0').replace(/\./g, '');
  const imageUrl = (p.images && p.images[0])
    ? (p.images[0].startsWith('http') ? p.images[0] : SITE_BASE + '/' + p.images[0])
    : SITE_DEFAULT_IMAGE;
  script.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Product",
    "name": p.name,
    "description": p.desc || p.name,
    "image": imageUrl,
    "brand": { "@type": "Brand", "name": "MDRACING" },
    "offers": {
      "@type": "Offer",
      "url": SITE_BASE + '/producto/' + p.id,
      "priceCurrency": "ARS",
      "price": priceNum,
      "availability": "https://schema.org/InStock",
      "seller": { "@type": "Organization", "name": "MDRACING" }
    }
  });
  document.head.appendChild(script);
}
function removeProductJsonLd() {
  const old = document.getElementById('product-jsonld');
  if (old) old.remove();
}

function renderPage(page) {
  const app = document.getElementById('app');
  let html = '';

  if (page === 'home') {
    app.style.paddingTop = '0';
    html = renderHome();
  } else {
    app.style.paddingTop = '0';
    if (page === 'categorias') html = renderCategoriesPage();
    else if (page === 'marcas') html = renderBrandsPage();
    else if (page.startsWith('brand-')) html = renderBrandPage(page.slice('brand-'.length));
    else if (page.startsWith('cat-')) html = renderCategoryPage(page);
    else if (page.startsWith('product-')) html = renderProductPage(page);
    else if (page === 'quienes-somos') html = renderAboutPage();
    else if (page === 'como-comprar') html = renderHowToBuyPage();
    else if (page === 'preguntas-frecuentes') html = renderFaqPage();
    else if (page === 'cambios-devoluciones') html = renderReturnsPage();
    else if (page === 'terminos-y-condiciones') html = renderTermsPage();
    else if (page === 'politica-privacidad') html = renderPrivacyPage();
    else if (page === 'contacto') html = renderContactPage();
    else html = renderHome();
  }

  app.innerHTML = html;
  bindLinks();
  initInteractives();
}

// ═══════════════════════════════════════════════════════════
// RENDER · Páginas de marca de auto
// ═══════════════════════════════════════════════════════════

/** /marcas · índice con tarjetas a cada marca y cantidad de productos. */
function renderBrandsPage() {
  const items = carBrands.map(b => {
    const count = getProductsForBrand(b).length;
    if (count === 0) return '';
    return `
      <a href="${pageToPath('brand-' + b.slug)}" data-page="brand-${b.slug}" class="brand-card">
        <div class="brand-card-name">${b.name}</div>
        <div class="brand-card-count">${count} ${count === 1 ? 'producto' : 'productos'}</div>
      </a>`;
  }).filter(Boolean).join('');

  return `
    <div class="page-wrapper">
      <div class="page-hero">
        <div class="page-hero-inner">
          <div class="page-breadcrumb">
            <a href="/" data-page="home">Inicio</a>
            <span>›</span>
            <span>Productos por Marca</span>
          </div>
          <h1 class="page-hero-title">Productos por <span style="color:var(--red2)">Marca de Auto</span></h1>
          <p class="page-hero-sub">Encontrá fundas, cubre autos, alfombras y accesorios MDRACING específicos para tu modelo. Fábrica directa hace 25 años.</p>
        </div>
      </div>
      <div style="max-width:var(--max);margin:0 auto;padding:48px 24px">
        <div class="brands-grid">${items}</div>
      </div>
    </div>
  `;
}

/** /marcas/<slug> · página de productos compatibles con una marca. */
function renderBrandPage(slug) {
  const brand = getCarBrand(slug);
  if (!brand) return renderBrandsPage();
  const list = getProductsForBrand(brand);

  // Agrupar por catId para mostrar secciones organizadas
  const grouped = {};
  for (const p of list) {
    const k = p.catId || 'otros';
    if (!grouped[k]) grouped[k] = [];
    grouped[k].push(p);
  }

  // Orden de categorías: fundas → cubre autos → cubre capots/trompas → alfombras → motos → accesorios
  const catOrder = ['cat-fundas-asientos', 'cat-cubre-autos', 'cat-cubre-capots', 'cat-cubre-trompas', 'cat-alfombras-termoformadas', 'cat-cubre-motos', 'cat-accesorios'];
  const orderedCats = catOrder.filter(c => grouped[c]).concat(Object.keys(grouped).filter(c => !catOrder.includes(c)));

  const sections = orderedCats.map(catId => {
    const cat = categories.find(c => c.id === catId);
    const catName = cat ? cat.title.replace('\n', ' ') : 'Otros';
    const items = grouped[catId];
    return `
      <section class="brand-cat-section">
        <h2 class="brand-cat-title">${catName} <span class="brand-cat-count">(${items.length})</span></h2>
        <div class="products-grid cat-products-grid">
          ${items.map(p => renderProductCard(p)).join('')}
        </div>
      </section>
    `;
  }).join('');

  if (list.length === 0) {
    return `
      <div class="page-wrapper">
        <div class="page-hero">
          <div class="page-hero-inner">
            <div class="page-breadcrumb">
              <a href="/" data-page="home">Inicio</a>
              <span>›</span>
              <a href="/marcas" data-page="marcas">Marcas</a>
              <span>›</span>
              <span>${brand.name}</span>
            </div>
            <h1 class="page-hero-title">Productos para <span style="color:var(--red2)">${brand.name}</span></h1>
            <p class="page-hero-sub">Estamos trabajando en sumar más productos para ${brand.name}. Consultanos por WhatsApp y te asesoramos sobre disponibilidad.</p>
          </div>
        </div>
      </div>
    `;
  }

  return `
    <div class="page-wrapper">
      <div class="page-hero">
        <div class="page-hero-inner">
          <div class="page-breadcrumb">
            <a href="/" data-page="home">Inicio</a>
            <span>›</span>
            <a href="/marcas" data-page="marcas">Marcas</a>
            <span>›</span>
            <span>${brand.name}</span>
          </div>
          <h1 class="page-hero-title">Productos para <span style="color:var(--red2)">${brand.name}</span></h1>
          <p class="page-hero-sub">Fundas a medida, cubre autos antigranizo, alfombras termoformadas y accesorios MDRACING específicos para tu ${brand.name}. ${list.length} productos compatibles · Fábrica directa hace 25 años.</p>
        </div>
      </div>
      <div style="max-width:var(--max);margin:0 auto;padding:48px 24px">
        ${sections}
      </div>
    </div>
  `;
}

// bindLinks() ya NO ata listeners por elemento.
// La delegación global en document se encarga de [data-page], color-swatches, variant-btns y product-thumbs.
function bindLinks() { /* noop · delegación global */ }

// Delegación global única: se ata UNA sola vez a document
function setupGlobalDelegation() {
  if (window.__mdGlobalDelegated) return;
  window.__mdGlobalDelegated = true;

  document.addEventListener('click', (e) => {
    // 1) Navegación por data-page
    const pageLink = e.target.closest('[data-page]');
    if (pageLink) {
      e.preventDefault();
      navigate(pageLink.getAttribute('data-page'));
      return;
    }

    // 2) Color swatch
    const swatch = e.target.closest('.color-swatch');
    if (swatch) {
      const wrap = swatch.closest('.color-swatches');
      if (wrap) {
        wrap.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
        swatch.classList.add('active');
      }
      return;
    }

    // 3) Variant button
    const vbtn = e.target.closest('.variant-btn');
    if (vbtn) {
      const wrap = vbtn.closest('.variant-btns');
      if (wrap) {
        wrap.querySelectorAll('.variant-btn').forEach(b => b.classList.remove('active'));
        vbtn.classList.add('active');
      }
      return;
    }

    // 4) Product thumbnail
    const thumb = e.target.closest('.product-thumb');
    if (thumb) {
      const wrap = thumb.closest('.product-thumbs');
      if (wrap) {
        wrap.querySelectorAll('.product-thumb').forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
      }
      return;
    }
  }, { passive: false });
}

function updateActiveNav(page) {
  document.querySelectorAll('.main-nav a').forEach(a => {
    a.classList.remove('active');
    const ap = a.getAttribute('data-page');
    if (ap === page || (page.startsWith('cat-') && ap === 'categorias')) {
      a.classList.add('active');
    }
  });
}

// ═══════════════════════════════════════════════════════════
// INTERACTIVES
// ═══════════════════════════════════════════════════════════

function initInteractives() {
  // Color swatches, variant buttons y product thumbs ahora se manejan por delegación global
  // (ver setupGlobalDelegation). Acá solo lo que necesita binding específico:

  // Carruseles y countdown · se inicializan al renderizar la home/categorías
  initTestimonialsCarousel();
  initMaterialsCarousel();
  initTopReviewsCarousel();
  initHotSaleCountdown();
  initLightboxTargets();
}

// ═══════════════════════════════════════════════════════════
// LIGHTBOX (zoom-in viewer for material slides + CTA images)
// ═══════════════════════════════════════════════════════════
function ensureLightbox() {
  let lb = document.getElementById('md-lightbox');
  if (lb) return lb;
  lb = document.createElement('div');
  lb.id = 'md-lightbox';
  lb.className = 'md-lightbox';
  lb.innerHTML = `
    <button class="md-lightbox-close" aria-label="Cerrar">×</button>
    <img alt="" draggable="false" />
  `;
  document.body.appendChild(lb);

  const img = lb.querySelector('img');
  const closeBtn = lb.querySelector('.md-lightbox-close');

  const close = () => {
    lb.classList.remove('open');
    lb.classList.remove('dragging');
    img.style.transform = '';
    lb.style.background = '';
    document.body.classList.remove('md-lightbox-open');
  };
  lb._close = close;

  // Click outside image to close
  lb.addEventListener('click', e => { if (e.target === lb) close(); });
  closeBtn.addEventListener('click', close);
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && lb.classList.contains('open')) close(); });

  // Swipe up/down to close (touch + mouse)
  let startY = 0, startX = 0, dy = 0, dragging = false, pointerId = null;
  const THRESHOLD = 90;

  const onDown = (e) => {
    if (!lb.classList.contains('open')) return;
    if (e.target === closeBtn) return;
    // Sólo gesto swipe-to-close en touch/pen · en mouse se cierra con X / click fuera / Escape
    if (e.pointerType === 'mouse') return;
    pointerId = e.pointerId;
    startY = e.clientY;
    startX = e.clientX;
    dy = 0;
    dragging = true;
    lb.classList.add('dragging');
    try { lb.setPointerCapture(pointerId); } catch(_) {}
  };
  const onMove = (e) => {
    if (!dragging || e.pointerId !== pointerId) return;
    dy = e.clientY - startY;
    const dx = e.clientX - startX;
    // Only respond to vertical drag (ignore mostly-horizontal)
    if (Math.abs(dx) > Math.abs(dy) * 1.5 && Math.abs(dy) < 20) return;
    e.preventDefault();
    img.style.transform = `translateY(${dy}px) scale(${Math.max(0.7, 1 - Math.abs(dy)/1200)})`;
    const fade = Math.max(0.3, 1 - Math.abs(dy)/500);
    lb.style.background = `rgba(0,0,0,${0.92 * fade})`;
  };
  const onUp = (e) => {
    if (!dragging) return;
    dragging = false;
    lb.classList.remove('dragging');
    try { lb.releasePointerCapture(pointerId); } catch(_) {}
    if (Math.abs(dy) > THRESHOLD) {
      close();
    } else {
      img.style.transform = '';
      lb.style.background = '';
    }
    pointerId = null;
  };
  lb.addEventListener('pointerdown', onDown);
  lb.addEventListener('pointermove', onMove);
  lb.addEventListener('pointerup', onUp);
  lb.addEventListener('pointercancel', onUp);

  // Block touchmove from bubbling to page (extra defense)
  lb.addEventListener('touchmove', e => { e.preventDefault(); }, { passive: false });

  return lb;
}
function openLightbox(src, alt) {
  const lb = ensureLightbox();
  const img = lb.querySelector('img');
  img.src = src;
  img.alt = alt || '';
  img.style.transform = '';
  lb.style.background = '';
  lb.classList.add('open');
  document.body.classList.add('md-lightbox-open');
}
function initLightboxTargets() {
  // Helper: attach click that ignores drag (so swipe doesn't trigger zoom)
  const attachClickNoDrag = (el, onClick) => {
    if (el.dataset.lbBound) return;
    el.dataset.lbBound = '1';
    let downX = 0, downY = 0, moved = false;
    el.addEventListener('pointerdown', e => { downX = e.clientX; downY = e.clientY; moved = false; });
    el.addEventListener('pointermove', e => {
      if (Math.abs(e.clientX - downX) > 8 || Math.abs(e.clientY - downY) > 8) moved = true;
    });
    el.addEventListener('click', e => {
      if (moved) { e.preventDefault(); e.stopPropagation(); return; }
      onClick(e);
    });
  };
  // Materials
  document.querySelectorAll('.mat-slide-img').forEach(box => {
    const img = box.querySelector('img');
    if (!img) return;
    attachClickNoDrag(box, () => openLightbox(img.src, img.alt));
  });
  // CTA Gallery
  document.querySelectorAll('.cta-gallery-img').forEach(box => {
    const img = box.querySelector('img');
    if (!img) return;
    attachClickNoDrag(box, () => openLightbox(img.src, img.alt));
  });
}

function initHotSaleCountdown() {
  const days  = document.getElementById('hsc-days');
  const hours = document.getElementById('hsc-hours');
  const mins  = document.getElementById('hsc-mins');
  const secs  = document.getElementById('hsc-secs');
  if (!days) return;

  const END = new Date('2026-05-21T00:00:00-03:00').getTime();
  let tid;

  const pad = n => String(n).padStart(2, '0');

  const tick = () => {
    const diff = END - Date.now();
    if (diff <= 0) {
      days.textContent = hours.textContent = mins.textContent = secs.textContent = '00';
      clearInterval(tid);
      const sec = document.querySelector('.hotsale-section');
      if (sec) sec.remove();
      return;
    }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    days.textContent  = pad(d);
    hours.textContent = pad(h);
    mins.textContent  = pad(m);
    secs.textContent  = pad(s);
  };

  tick();
  tid = setInterval(tick, 1000);
}

function initTestimonialsCarousel() {
  const track = document.getElementById('testimonials-track');
  if (!track) return;
  const prev = document.getElementById('t-prev');
  const next = document.getElementById('t-next');
  const dotsWrap = document.getElementById('t-dots');
  const cards = track.children;
  if (!cards.length) return;

  const perView = () => {
    if (window.innerWidth <= 720) return 1;
    if (window.innerWidth <= 960) return 2;
    return 3;
  };

  let index = 0;
  const totalPages = () => Math.max(1, cards.length - perView() + 1);

  const update = () => {
    const card = cards[0];
    const gap = parseFloat(getComputedStyle(track).gap) || 20;
    const step = card.getBoundingClientRect().width + gap;
    index = Math.min(index, totalPages() - 1);
    track.style.transform = `translate3d(-${index * step}px,0,0)`;
    if (prev) prev.disabled = index === 0;
    if (next) next.disabled = index >= totalPages() - 1;
    renderDots();
  };

  const renderDots = () => {
    if (!dotsWrap) return;
    const pages = totalPages();
    dotsWrap.innerHTML = '';
    for (let i = 0; i < pages; i++) {
      const b = document.createElement('button');
      if (i === index) b.classList.add('active');
      b.addEventListener('click', () => { index = i; update(); });
      dotsWrap.appendChild(b);
    }
  };

  const isMobile = () => window.matchMedia('(max-width: 720px)').matches;
  const scroller = track.parentElement; // .testimonials-carousel
  const mobileStep = () => (cards[0] ? cards[0].getBoundingClientRect().width + 16 : scroller.clientWidth);

  prev?.addEventListener('click', () => {
    if (isMobile()) { scroller.scrollBy({ left: -mobileStep(), behavior: 'smooth' }); return; }
    if (index > 0) { index--; update(); }
  });
  next?.addEventListener('click', () => {
    if (isMobile()) { scroller.scrollBy({ left:  mobileStep(), behavior: 'smooth' }); return; }
    if (index < totalPages() - 1) { index++; update(); }
  });

  // Desktop-only swipe (mobile uses native scroll which follows finger fluidly)
  let startX = 0, isDown = false;
  track.addEventListener('touchstart', (e) => {
    if (isMobile()) return;
    startX = e.touches[0].clientX; isDown = true;
  }, { passive: true });
  track.addEventListener('touchend', (e) => {
    if (isMobile() || !isDown) return;
    const dx = e.changedTouches[0].clientX - startX;
    if (dx < -40 && index < totalPages() - 1) { index++; update(); }
    else if (dx > 40 && index > 0) { index--; update(); }
    isDown = false;
  });

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { if (!isMobile()) update(); }, 120);
  });

  if (!isMobile()) update();
}

function initMaterialsCarousel() {
  const track = document.getElementById('mat-track');
  if (!track) return;
  const prevBtn = document.getElementById('mat-prev');
  const nextBtn = document.getElementById('mat-next');
  const viewport = track.parentElement; // .mat-viewport

  const GAP = 16;
  const pv = () => window.innerWidth <= 480 ? 1 : window.innerWidth <= 780 ? 2 : 4;

  // Collect original items (before any clones are added)
  const origItems = Array.from(track.children);
  const N = origItems.length; // 6

  let pos = 0;         // current logical position 0..N-1
  let clonesBefore = 0;
  let busy = false;

  function getSlideW() {
    const vw = viewport.getBoundingClientRect().width;
    const p = pv();
    return (vw - GAP * (p - 1)) / p;
  }

  function setWidths() {
    const w = getSlideW();
    Array.from(track.children).forEach(el => {
      el.style.width = w + 'px';
      el.style.minWidth = w + 'px';
      el.style.maxWidth = w + 'px';
    });
  }

  function buildClones() {
    // Remove old clones
    track.querySelectorAll('.mat-clone').forEach(el => el.remove());
    const p = pv();
    clonesBefore = p;
    // Prepend last p originals (in reverse so they appear in order)
    for (let i = N - 1; i >= N - p; i--) {
      const c = origItems[i].cloneNode(true);
      c.classList.add('mat-clone');
      track.insertBefore(c, track.firstChild);
    }
    // Append first p originals
    for (let i = 0; i < p; i++) {
      const c = origItems[i].cloneNode(true);
      c.classList.add('mat-clone');
      track.appendChild(c);
    }
  }

  function moveTo(trackIdx, animate) {
    const step = getSlideW() + GAP;
    track.style.transition = animate ? 'transform .42s cubic-bezier(.4,0,.2,1)' : 'none';
    track.style.transform = `translate3d(-${trackIdx * step}px,0,0)`;
  }

  function go(dir) {
    if (busy) return;
    busy = true;
    const nextPos = pos + dir;
    moveTo(clonesBefore + nextPos, true);

    track.addEventListener('transitionend', function done() {
      track.removeEventListener('transitionend', done);
      pos = ((nextPos % N) + N) % N;
      moveTo(clonesBefore + pos, false);
      // Force reflow so the snap is invisible
      void track.offsetHeight;
      busy = false;
    });
  }

  function init() {
    buildClones();
    setWidths();
    moveTo(clonesBefore + pos, false);
  }

  const isMobile = () => window.matchMedia('(max-width: 780px)').matches;
  const mobileStep = () => {
    const firstSlide = track.querySelector('.mat-slide:not(.mat-clone)') || track.firstElementChild;
    return firstSlide ? firstSlide.getBoundingClientRect().width + 16 : viewport.clientWidth;
  };

  prevBtn?.addEventListener('click', () => {
    if (isMobile()) { viewport.scrollBy({ left: -mobileStep(), behavior: 'smooth' }); return; }
    go(-1);
  });
  nextBtn?.addEventListener('click', () => {
    if (isMobile()) { viewport.scrollBy({ left:  mobileStep(), behavior: 'smooth' }); return; }
    go(1);
  });

  // Desktop-only swipe (mobile uses native fluid scroll)
  let startX = 0;
  track.addEventListener('touchstart', e => {
    if (isMobile()) return;
    startX = e.touches[0].clientX;
  }, { passive: true });
  track.addEventListener('touchend', e => {
    if (isMobile()) return;
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
  });

  // Resize
  let rsz;
  window.addEventListener('resize', () => {
    clearTimeout(rsz);
    rsz = setTimeout(() => {
      if (isMobile()) {
        setupMobileInfinite();
      } else {
        if (mobileScrollHandler) { viewport.removeEventListener('scroll', mobileScrollHandler); mobileScrollHandler = null; }
        buildClones(); setWidths(); moveTo(clonesBefore + pos, false);
      }
    }, 150);
  });

  // ── Mobile infinite scroll: 3 sets [clonesBefore, originals, clonesAfter] ──
  let mobileJumping = false;
  let mobileScrollHandler = null;

  function setupMobileInfinite() {
    // Strip inline widths so CSS flex (80%/86%) applies
    track.querySelectorAll('.mat-clone').forEach(el => el.remove());
    Array.from(track.children).forEach(el => { el.style.width = ''; el.style.minWidth = ''; el.style.maxWidth = ''; });
    // Append a full copy after originals
    origItems.forEach(item => {
      const c = item.cloneNode(true);
      c.classList.add('mat-clone');
      c.querySelectorAll('[data-lb-bound]').forEach(el => el.removeAttribute('data-lb-bound'));
      track.appendChild(c);
    });
    // Prepend a full copy before originals (insert in reverse to preserve order)
    for (let i = N - 1; i >= 0; i--) {
      const c = origItems[i].cloneNode(true);
      c.classList.add('mat-clone');
      c.querySelectorAll('[data-lb-bound]').forEach(el => el.removeAttribute('data-lb-bound'));
      track.insertBefore(c, track.firstChild);
    }
    // After layout, position viewport at start of originals (middle set)
    requestAnimationFrame(() => {
      const setWidth = track.scrollWidth / 3;
      viewport.scrollLeft = setWidth;
    });
    // Bind lightbox clicks on the new clones
    initLightboxTargets();
    // Scroll listener: silent jump when reaching edge sets
    if (mobileScrollHandler) viewport.removeEventListener('scroll', mobileScrollHandler);
    mobileScrollHandler = () => {
      if (mobileJumping) return;
      const sw = track.scrollWidth / 3;
      const sl = viewport.scrollLeft;
      if (sl >= sw * 2 - 2) {
        mobileJumping = true;
        const prevBehavior = viewport.style.scrollBehavior;
        viewport.style.scrollBehavior = 'auto';
        viewport.scrollLeft = sl - sw;
        requestAnimationFrame(() => { viewport.style.scrollBehavior = prevBehavior; mobileJumping = false; });
      } else if (sl <= 2) {
        mobileJumping = true;
        const prevBehavior = viewport.style.scrollBehavior;
        viewport.style.scrollBehavior = 'auto';
        viewport.scrollLeft = sl + sw;
        requestAnimationFrame(() => { viewport.style.scrollBehavior = prevBehavior; mobileJumping = false; });
      }
    };
    viewport.addEventListener('scroll', mobileScrollHandler, { passive: true });
  }

  // On initial load: build appropriate carousel
  if (isMobile()) {
    setupMobileInfinite();
  } else {
    init();
  }
}

// Tab switching
function switchTab(btn, tabId) {
  const section = btn.closest('.product-tabs-section');
  section.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  section.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById(tabId).classList.add('active');
}

// FAQ accordion
function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const ans = item.querySelector('.faq-a');
  const isOpen = btn.classList.contains('open');
  // Close all
  document.querySelectorAll('.faq-q.open').forEach(b => {
    b.classList.remove('open');
    b.nextElementSibling.classList.remove('open');
  });
  if (!isOpen) {
    btn.classList.add('open');
    ans.classList.add('open');
  }
}

// Vehicle selector
function updateSelector() {
  const brand = document.getElementById('sel-brand')?.value;
  const modelSel = document.getElementById('sel-model');
  if (!modelSel) return;
  if (brand && vehicleData[brand]) {
    modelSel.innerHTML = vehicleData[brand].map(m => `<option>${m}</option>`).join('');
  } else {
    modelSel.innerHTML = '<option>Primero elegí la marca</option>';
  }
}

function searchVehicle() {
  const type = document.getElementById('sel-type')?.value;
  const brand = document.getElementById('sel-brand')?.value;
  const model = document.getElementById('sel-model')?.value;
  if (!brand) {
    alert('Por favor seleccioná una marca para continuar.');
    return;
  }
  const msg = `Hola! Estoy buscando productos para mi ${type || 'vehículo'}: ${brand}${model ? ' ' + model : ''}. ¿Qué tienen disponible?`;
  window.open(WA_MSG(msg), '_blank');
}

function submitContact() {
  window.open(WA_MSG('Hola! Quiero hacer una consulta sobre productos MDRACING'), '_blank');
}

// ═══════════════════════════════════════════════════════════
// HEADER & MOBILE NAV
// ═══════════════════════════════════════════════════════════

function initHeader() {
  const header = document.getElementById('site-header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const current = window.scrollY;
    header.classList.toggle('scrolled', current > 20);
    // Auto-hide: hide when scrolling down past 120px, show when scrolling up
    if (current > 120) {
      if (current > lastScroll + 4) {
        header.classList.add('header-hidden');
      } else if (current < lastScroll - 4) {
        header.classList.remove('header-hidden');
      }
    } else {
      header.classList.remove('header-hidden');
    }
    lastScroll = current;
  }, { passive: true });

  document.getElementById('hamburger').addEventListener('click', openMobileNav);

  // Search button
  const searchBtn = document.getElementById('search-btn');
  if (searchBtn) searchBtn.addEventListener('click', openSearch);
}

function openSearch() {
  let overlay = document.getElementById('search-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'search-overlay';
    overlay.className = 'search-overlay';
    overlay.innerHTML = `
      <div class="search-overlay-inner">
        <div class="search-bar">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="text" id="search-input" placeholder="Buscá fundas, cubre autos, materiales..." autocomplete="off" />
          <button class="search-close" onclick="closeSearch()">✕</button>
        </div>
        <div class="search-results" id="search-results"></div>
      </div>
    `;
    document.body.appendChild(overlay);
    overlay.querySelector('#search-input').addEventListener('input', e => runSearch(e.target.value));
    overlay.addEventListener('click', e => { if (e.target === overlay) closeSearch(); });
  }
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  setTimeout(() => overlay.querySelector('#search-input').focus(), 100);
}

function closeSearch() {
  const overlay = document.getElementById('search-overlay');
  if (overlay) overlay.classList.remove('open');
  document.body.style.overflow = '';
}

function selectBrand(brand) {
  document.querySelectorAll('.brand-chip').forEach(b => b.classList.remove('active'));
  const clicked = Array.from(document.querySelectorAll('.brand-chip')).find(b => b.textContent === brand);
  if (clicked) clicked.classList.add('active');
  const input = document.getElementById('brand-model-input');
  if (input) {
    input.focus();
    input.placeholder = `Ej: modelo ${brand}...`;
  }
}

function buscarMarcaModelo() {
  const input = document.getElementById('brand-model-input');
  const activeChip = document.querySelector('.brand-chip.active');
  const brand = activeChip ? activeChip.textContent : '';
  const model = input ? input.value.trim() : '';
  const query = [brand, model].filter(Boolean).join(' ');
  if (!query) return;
  openSearch();
  setTimeout(() => {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.value = query;
      runSearch(query);
    }
  }, 80);
}

function runSearch(query) {
  const results = document.getElementById('search-results');
  if (!results) return;
  const q = query.trim().toLowerCase();
  if (q.length < 2) { results.innerHTML = ''; return; }
  const matches = products.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.cat.toLowerCase().includes(q) ||
    (p.desc && p.desc.toLowerCase().includes(q)) ||
    (p.material && p.material.toLowerCase().includes(q))
  ).slice(0, 8);
  if (!matches.length) {
    results.innerHTML = '<p class="search-empty">No encontramos resultados para "' + query + '"</p>';
    return;
  }
  results.innerHTML = matches.map(p => `
    <div class="search-result-item" onclick="closeSearch(); navigate('product-${p.id}')">
      <div class="search-result-cat">${p.cat}</div>
      <div class="search-result-name">${p.name}</div>
      ${p.material ? '<div class="search-result-mat">' + p.material + '</div>' : ''}
    </div>
  `).join('');
}

function buildMobileNav() {
  const nav = document.createElement('div');
  nav.className = 'mobile-nav-overlay';
  nav.id = 'mobile-nav';
  nav.innerHTML = `
    <button class="mobile-nav-close" onclick="closeMobileNav()">${icons.x}</button>
    <a href="/" data-page="home">Inicio</a>
    <div class="mobile-nav-section-label">Productos</div>
    <div class="mobile-nav-sub">
      <a href="/fundas-asientos" data-page="cat-fundas-asientos">Fundas para Asientos</a>
      <a href="/cubre-autos" data-page="cat-cubre-autos">Cubre Autos / Camionetas</a>
      <a href="/cubre-capots" data-page="cat-cubre-capots">Cubre Capots</a>
      <a href="/cubre-trompas" data-page="cat-cubre-trompas">Cubre Trompas</a>
      <a href="/cubre-motos" data-page="cat-cubre-motos">Cubre Motos</a>
      <a href="/alfombras-termoformadas" data-page="cat-alfombras-termoformadas">Alfombras Termoformadas</a>
      <a href="/accesorios" data-page="cat-accesorios">Accesorios</a>
    </div>
    <a href="/quienes-somos" data-page="quienes-somos">Quiénes Somos</a>
    <a href="/como-comprar" data-page="como-comprar">Cómo Comprar</a>
    <a href="/preguntas-frecuentes" data-page="preguntas-frecuentes">Preguntas Frecuentes</a>
    <a href="/cambios-devoluciones" data-page="cambios-devoluciones">Cambios y Devoluciones</a>
    <a href="/contacto" data-page="contacto">Contacto</a>
    <div class="mobile-nav-wa">
      <a href="${WA_MSG('Hola! Quiero consultar sobre productos MDRACING')}" target="_blank" class="btn-whatsapp" style="width:100%;justify-content:center">${icons.waIcon} Hablar por WhatsApp</a>
    </div>
  `;
  document.body.appendChild(nav);
  nav.querySelectorAll('[data-page]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      navigate(el.getAttribute('data-page'));
    });
  });
}

function openMobileNav() {
  const nav = document.getElementById('mobile-nav');
  if (nav) nav.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMobileNav() {
  const nav = document.getElementById('mobile-nav');
  if (nav) nav.classList.remove('open');
  document.body.style.overflow = '';
}

function toggleMobileFilters() {
  const sidebar = document.getElementById('filters-sidebar');
  if (!sidebar) return;
  sidebar.classList.toggle('mobile-open');
  document.body.style.overflow = sidebar.classList.contains('mobile-open') ? 'hidden' : '';
}

// ── Filtros de categoría ──
function applyFilters() {
  const sidebar = document.getElementById('filters-sidebar');
  const grid = document.getElementById('cat-products-grid');
  const countEl = document.getElementById('cat-results-count');
  if (!sidebar || !grid) return;

  const pageInner = document.querySelector('.cat-page-inner[data-catid]');
  const catId = pageInner ? pageInner.getAttribute('data-catid') : null;

  let filtered = catId ? products.filter(p => p.catId === catId) : [...products];

  // Filtro por marca
  const brandBlock = sidebar.querySelector('.filter-block[data-filter-type="brand"]');
  const checkedBrands = brandBlock
    ? Array.from(brandBlock.querySelectorAll('input:checked'))
        .map(cb => cb.nextElementSibling.textContent.trim().toLowerCase())
    : [];

  if (checkedBrands.length) {
    const brandTerms = {
      'volkswagen': ['vw ', 'volkswagen'],
      'citroën': ['citroën', 'citroen'],
      'chevrolet': ['chevrolet', 's10', 'montana'],
    };
    filtered = filtered.filter(p => {
      const name = p.name.toLowerCase();
      return checkedBrands.some(brand => {
        const terms = brandTerms[brand] || [brand];
        return terms.some(t => name.includes(t));
      });
    });
  }

  // Filtro por modelo
  const modelBlock = sidebar.querySelector('.filter-block[data-filter-type="model"]');
  const selectedModel = modelBlock ? (modelBlock.querySelector('select')?.value || '').trim().toLowerCase() : '';
  if (selectedModel) {
    filtered = filtered.filter(p => p.name.toLowerCase().includes(selectedModel));
  }

  // Filtro por material
  const matBlock = sidebar.querySelector('.filter-block[data-filter-type="material"]');
  const checkedMats = matBlock
    ? Array.from(matBlock.querySelectorAll('input:checked')).map(cb => cb.nextElementSibling.textContent.trim().toLowerCase())
    : [];

  if (checkedMats.length) {
    const matTerms = {
      'ecocuero acolchado 3mm': ['ecocuero acolchad'],
      'tela premium jakard': ['jakard'],
      'cuero automotor': ['cuero automotor'],
      'antigranizo 3 capas': ['antigranizo'],
      'tela silver (fiselina)': ['fiselina', 'silver'],
      'tela silver': ['silver'],
      'tela premium afelpada': ['afelpada'],
      'ecocuero': ['ecocuero'],
    };
    filtered = filtered.filter(p => {
      const text = (p.name + ' ' + (p.desc || '')).toLowerCase();
      return checkedMats.some(mat => {
        const terms = matTerms[mat] || [mat];
        return terms.some(t => text.includes(t));
      });
    });
  }

  // Filtro por badge
  const badgeBlock = sidebar.querySelector('.filter-block[data-filter-type="badge"]');
  const checkedBadges = badgeBlock
    ? Array.from(badgeBlock.querySelectorAll('input:checked')).map(cb => cb.dataset.badgeVal)
    : [];
  if (checkedBadges.length) {
    filtered = filtered.filter(p => {
      const b = (p.badge || '').toLowerCase();
      return checkedBadges.some(bv => b.includes(bv));
    });
  }

  if (countEl) countEl.textContent = filtered.length;

  if (filtered.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px 20px">
      <p style="font-size:16px;color:var(--metal);margin-bottom:20px">No encontramos productos con los filtros seleccionados.</p>
      <button onclick="clearFilters()" style="background:var(--red2);color:#fff;border:none;padding:10px 24px;border-radius:6px;cursor:pointer;font-family:var(--font-body);font-size:14px">Limpiar filtros</button>
    </div>`;
  } else {
    grid.innerHTML = filtered.map(p => renderProductCard(p)).join('');
  }
  bindLinks();
}

function clearFilters() {
  document.querySelectorAll('#filters-sidebar input[type="checkbox"]').forEach(cb => cb.checked = false);
  document.querySelectorAll('#filters-sidebar select').forEach(sel => sel.selectedIndex = 0);
  applyFilters();
}

function sortProducts(order) {
  const grid = document.getElementById('cat-products-grid');
  if (!grid) return;
  const pageInner = document.querySelector('.cat-page-inner[data-catid]');
  const catId = pageInner ? pageInner.getAttribute('data-catid') : null;
  let sorted = catId ? products.filter(p => p.catId === catId) : [...products];
  const parsePrice = p => parseInt((p.salePrice || p.price).replace(/\./g, ''), 10);
  if (order === 'asc') sorted.sort((a, b) => parsePrice(a) - parsePrice(b));
  else if (order === 'desc') sorted.sort((a, b) => parsePrice(b) - parsePrice(a));
  grid.innerHTML = sorted.map(p => renderProductCard(p)).join('');
  bindLinks();
}

// ═══════════════════════════════════════════════════════════
// CARRITO DE CONSULTA · persistido en localStorage,
// checkout via WhatsApp (no compra directa).
// ═══════════════════════════════════════════════════════════
const CART_KEY = 'mdracing_cart_v1';

function cartGet() {
  try {
    const items = JSON.parse(localStorage.getItem(CART_KEY)) || [];
    // Auto-aplicar Hot Sale price a items guardados (corrige carritos viejos)
    return items.map(i => {
      const hsPrice = (typeof HOT_SALE_PRICES !== 'undefined') && HOT_SALE_PRICES[i.id];
      if (hsPrice) return { ...i, salePrice: hsPrice };
      return i;
    });
  } catch { return []; }
}
function cartSave(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  cartUpdateBadge();
}
const CART_MAX_QTY = 10;

function cartUpdateBadge() {
  const badge = document.getElementById('cart-badge');
  const floatBtn = document.getElementById('float-cart-btn');
  const floatCount = document.getElementById('float-cart-count');
  if (!badge) return;
  const items = cartGet();
  const n = items.reduce((sum, i) => sum + (i.qty || 1), 0);
  badge.textContent = n;
  badge.hidden = n === 0;
  if (floatBtn) floatBtn.style.display = n === 0 ? 'none' : 'flex';
  if (floatCount) floatCount.textContent = n;
}
// ── Manejo del retorno de Mercado Pago ──
// MP redirige a /?compra=ok|pending|failure&id=MDR-XXX después del pago.
// Mostramos un modal de confirmación + limpiamos la URL + vaciamos carrito si compró desde ahí.
function handleMpReturn() {
  const params = new URLSearchParams(window.location.search);
  const status = params.get('compra');
  const orderId = params.get('id') || '';
  if (!status) return;

  // Limpiar URL para que al refrescar no aparezca el modal
  // (saca los query params ?compra=ok&id=... pero mantiene la ruta)
  history.replaceState(null, '', window.location.pathname);

  // Si la compra fue exitosa, vaciar carrito SIN preguntar (uso interno)
  if (status === 'ok' && typeof clearCartSilent === 'function') {
    try { clearCartSilent(); } catch (e) {}

    // ── Meta: Purchase (browser-side, con event_id determinístico por order_id) ──
    // El webhook MP también dispara Purchase server-side con el MISMO event_id,
    // así Meta deduplica y solo cuenta UN Purchase. Si el cliente cerró la
    // pestaña antes de volver, sólo queda el server-side. Si volvió pero el
    // webhook tardó, sólo queda el browser-side. Ambos cuentan como 1.
    try {
      if (orderId) {
        const eventId = `purchase-${orderId}`;
        // Acá no tenemos el value/items del carrito (ya se vació). Pasamos lo
        // mínimo necesario; el webhook MP completa con la data real desde DB.
        if (typeof window.fbq === 'function') {
          window.fbq('track', 'Purchase', { currency: 'ARS' }, { eventID: eventId });
        }
        fetch('/api/meta/event', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event_name: 'Purchase',
            event_id: eventId,
            event_source_url: window.location.href,
            user_data: {
              fbp: _mdReadCookie('_fbp'),
              fbc: _mdReadCookie('_fbc'),
            },
            custom_data: {
              currency: 'ARS',
              order_id: orderId,
            },
          }),
          keepalive: true,
        }).catch(() => {});
      }
    } catch (e) { /* fail-soft */ }
  }

  // Configurar contenido del modal según el estado
  const cfg = {
    ok: {
      title: '¡Pedido confirmado!',
      icon: '✅',
      iconBg: '#e6f7ec',
      iconColor: '#22a35e',
      text: `Recibimos tu pago. <strong>Pedido #${orderId}</strong>.<br>Te enviamos un email con todos los detalles. Te avisamos por WhatsApp cuando despachemos el producto.`,
      ctaLabel: 'Seguir comprando',
      ctaColor: '#d10000',
    },
    pending: {
      title: 'Pago pendiente',
      icon: '⏳',
      iconBg: '#fff7d9',
      iconColor: '#d4a020',
      text: `Tu pago de la <strong>#${orderId}</strong> está en proceso (puede tardar unas horas si pagaste en efectivo en Rapipago/Pago Fácil).<br>Cuando se acredite, te avisamos por email y empezamos a preparar el pedido.`,
      ctaLabel: 'Seguir navegando',
      ctaColor: '#d10000',
    },
    failure: {
      title: 'El pago no se completó',
      icon: '❌',
      iconBg: '#fee',
      iconColor: '#d10000',
      text: `Hubo un problema con tu pago${orderId ? ' (#' + orderId + ')' : ''}. No se realizó ningún cargo a tu cuenta.<br>Podés intentar de nuevo o consultarnos por WhatsApp.`,
      ctaLabel: 'Intentar de nuevo',
      ctaColor: '#0a0a0a',
    },
  };

  const c = cfg[status] || cfg.failure;

  // Crear modal de confirmación
  const backdrop = document.createElement('div');
  backdrop.id = 'mp-return-backdrop';
  backdrop.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.55);backdrop-filter:blur(4px);z-index:10010;display:flex;align-items:center;justify-content:center;padding:16px;animation:mpReturnFade .3s ease';
  backdrop.innerHTML = `
    <div style="background:#fff;border-radius:14px;max-width:480px;width:100%;padding:32px 28px;text-align:center;box-shadow:0 30px 80px rgba(0,0,0,.4);position:relative;animation:mpReturnPop .35s cubic-bezier(.4,0,.2,1)">
      <div style="display:inline-flex;align-items:center;justify-content:center;width:72px;height:72px;border-radius:50%;background:${c.iconBg};margin-bottom:18px;font-size:38px">
        ${c.icon}
      </div>
      <h2 style="margin:0;font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:28px;color:#0a0a0a;letter-spacing:-.3px;line-height:1.1">
        ${c.title}
      </h2>
      <p style="margin:14px 0 22px;color:#444;font-size:15px;line-height:1.55">
        ${c.text}
      </p>
      <button type="button" onclick="document.getElementById('mp-return-backdrop').remove()"
        style="display:inline-block;background:${c.ctaColor};color:#fff;border:none;padding:14px 32px;border-radius:8px;font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:15px;letter-spacing:1.2px;text-transform:uppercase;cursor:pointer;transition:transform .2s">
        ${c.ctaLabel}
      </button>
      ${status !== 'ok' ? `
        <p style="margin:18px 0 0;font-size:12.5px;color:#666">
          ¿Consultas? <a href="https://wa.me/5491154907774" target="_blank" style="color:#d10000;font-weight:600;text-decoration:none">WhatsApp +54 9 11 5490-7774</a>
        </p>
      ` : ''}
    </div>
    <style>
      @keyframes mpReturnFade { from{opacity:0} to{opacity:1} }
      @keyframes mpReturnPop { from{opacity:0;transform:scale(.9) translateY(20px)} to{opacity:1;transform:scale(1) translateY(0)} }
    </style>
  `;
  // Click fuera del modal → cerrar
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) backdrop.remove();
  });
  document.body.appendChild(backdrop);
}

// ── Checkout directo (Mercado Pago / Efectivo) ──
// Lookup en products + apertura del modal de checkout.
function openCheckoutForProduct(productId) {
  const p = products.find(pr => pr.id === productId);
  if (!p) {
    console.error('Producto no encontrado:', productId);
    return;
  }
  // Aplicar Hot Sale price si corresponde
  const hsPrice = typeof HOT_SALE_PRICES !== 'undefined' && HOT_SALE_PRICES[p.id];
  const effectivePriceStr = hsPrice || p.salePrice || p.price;
  const priceNum = parseInt(String(effectivePriceStr).replace(/[^\d]/g, ''), 10) || 0;
  // Primera imagen disponible (real o cdn)
  const firstImage = (p.images && p.images[0]) || '/logo.png';
  // Envío gratis si: badge "Envío Gratis" o precio >= $130k
  const freeShip = (p.badge === 'Envío Gratis') || priceNum >= 200000;

  if (typeof window.openCheckout !== 'function') {
    console.error('openCheckout no disponible. ¿Cargó checkout.js?');
    return;
  }

  // ── Meta: AddToCart (compra directa, sin pasar por carrito) ──
  try {
    trackEvent('AddToCart', {
      content_ids: [p.id],
      content_type: 'product',
      content_name: p.name,
      content_category: p.cat,
      value: priceNum,
      currency: 'ARS',
    });
  } catch (e) { /* fail-soft */ }

  window.openCheckout({
    id: p.id,
    name: p.name,
    image: firstImage,
    unitPrice: priceNum,
    freeShipping: freeShip,
  });
}
window.openCheckoutForProduct = openCheckoutForProduct;

function addToCart(productId) {
  let p = products.find(pr => pr.id === productId);
  if (!p) return;
  // Aplicar Hot Sale price si corresponde
  const hsPrice = HOT_SALE_PRICES && HOT_SALE_PRICES[p.id];
  if (hsPrice) p = { ...p, salePrice: hsPrice };
  // Precio efectivo: salePrice si existe, sino price
  const effectivePrice = p.salePrice || p.price;
  const items = cartGet();
  const existing = items.find(i => i.id === productId);
  if (existing) {
    if ((existing.qty || 1) >= CART_MAX_QTY) {
      // Ya en el máximo → abrir carrito y avisar
      openCart();
      return;
    }
    existing.qty = (existing.qty || 1) + 1;
    // Actualizar precio por si cambió (ej: Hot Sale activó después de agregar)
    existing.salePrice = p.salePrice || null;
    existing.price = p.price;
  } else {
    items.push({
      id: p.id,
      name: p.name,
      cat: p.cat,
      price: p.price,
      salePrice: p.salePrice || null,
      img: (p.images && p.images[0]) || p.img || null,
      qty: 1,
    });
  }
  cartSave(items);

  // ── Meta: AddToCart ──
  try {
    const priceNum = parseInt(String(p.salePrice || p.price || '0').replace(/[^\d]/g, ''), 10) || 0;
    trackEvent('AddToCart', {
      content_ids: [p.id],
      content_type: 'product',
      content_name: p.name,
      content_category: p.cat,
      value: priceNum,
      currency: 'ARS',
    });
  } catch (e) { /* fail-soft */ }

  // Feedback visual en el botón clickeado
  const btn = document.querySelector(`[data-cart-btn="${productId}"]`);
  if (btn) {
    btn.classList.add('added');
    btn.innerHTML = icons.check;
    setTimeout(() => {
      btn.classList.remove('added');
      btn.innerHTML = icons.plus;
    }, 1400);
  }
  cartRender();
}
function cartChangeQty(productId, delta) {
  const items = cartGet();
  const it = items.find(i => i.id === productId);
  if (!it) return;
  const newQty = (it.qty || 1) + delta;
  if (newQty <= 0) { cartSave(items.filter(i => i.id !== productId)); cartRender(); return; }
  if (newQty > CART_MAX_QTY) return;
  it.qty = newQty;
  cartSave(items);
  cartRender();
}
function removeFromCart(productId) {
  cartSave(cartGet().filter(i => i.id !== productId));
  cartRender();
}
// Vacía el carrito sin preguntar (uso interno, ej. post-compra exitosa)
function clearCartSilent() {
  cartSave([]);
  cartRender();
}
// Vacía el carrito pidiendo confirmación (uso desde botón "Vaciar carrito")
function clearCart() {
  if (!confirm('¿Vaciar el carrito?')) return;
  clearCartSilent();
}
function openCart() {
  const drawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('cart-overlay');
  if (!drawer || !overlay) return;
  drawer.hidden = false;
  overlay.hidden = false;
  // Forzar reflow para que la transición funcione
  void drawer.offsetWidth;
  drawer.classList.add('open');
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  cartRender();
}
function closeCart() {
  const drawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('cart-overlay');
  if (!drawer || !overlay) return;
  drawer.classList.remove('open');
  overlay.classList.remove('open');
  document.body.style.overflow = '';
  setTimeout(() => { drawer.hidden = true; overlay.hidden = true; }, 300);
}
function cartRender() {
  const body = document.getElementById('cart-body');
  const footer = document.getElementById('cart-footer');
  if (!body || !footer) return;
  const items = cartGet();

  if (items.length === 0) {
    body.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">${icons.cart}</div>
        <h4>Tu carrito está vacío</h4>
        <p>Sumá productos y consultá por todos juntos en un solo mensaje de WhatsApp.</p>
        <button class="cart-empty-cta" onclick="closeCart();navigate('categorias')">Ver catálogo</button>
      </div>
    `;
    footer.innerHTML = '';
    return;
  }

  body.innerHTML = items.map(i => {
    const price = i.salePrice || i.price;
    const qty = i.qty || 1;
    const imgHtml = i.img
      ? `<img src="${i.img}" alt="${i.name}" loading="lazy" />`
      : `<div style="color:var(--metal);display:flex;align-items:center;justify-content:center;width:100%;height:100%">${icons.tag}</div>`;
    const minusDisabled = qty <= 1 ? 'disabled' : '';
    const plusDisabled = qty >= CART_MAX_QTY ? 'disabled' : '';
    return `
      <div class="cart-item">
        <div class="cart-item-img">${imgHtml}</div>
        <div class="cart-item-info">
          <div class="cart-item-cat">${i.cat}</div>
          <div class="cart-item-name">${i.name}</div>
          <div class="cart-item-price">$${price}</div>
          <div class="cart-qty">
            <button class="cart-qty-btn" onclick="cartChangeQty('${i.id}',-1)" ${minusDisabled} aria-label="Restar">−</button>
            <span class="cart-qty-num">${qty}</span>
            <button class="cart-qty-btn" onclick="cartChangeQty('${i.id}',1)" ${plusDisabled} aria-label="Sumar">+</button>
            ${qty >= CART_MAX_QTY ? '<span class="cart-qty-max">máx 10</span>' : ''}
          </div>
        </div>
        <button class="cart-item-remove" onclick="removeFromCart('${i.id}')" aria-label="Quitar">${icons.trash}</button>
      </div>
    `;
  }).join('');

  // Mensaje WhatsApp con todos los productos (incluye cantidad si > 1)
  const productList = items.map(i => {
    const qty = i.qty || 1;
    const price = i.salePrice || i.price;
    const qtyTxt = qty > 1 ? `${qty}x ` : '';
    return `${qtyTxt}${i.name} (desde $${price})`;
  }).join(', ');
  const waMsg = `Hola! Quiero consultar por: ${productList}.`;
  const totalUnits = items.reduce((s, i) => s + (i.qty || 1), 0);
  const totalPrice = items.reduce((sum, i) => {
    const p = parseInt((i.salePrice || i.price || '0').replace(/\./g, ''), 10);
    return sum + p * (i.qty || 1);
  }, 0);
  const totalStr = totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  // Todos los productos del catálogo soportan compra online (MP o transferencia).
  const hasItems = items.length > 0;

  footer.innerHTML = `
    <div class="cart-summary">
      <div class="cart-summary-row">
        <span>${totalUnits} unidad${totalUnits === 1 ? '' : 'es'} en el carrito</span>
        <strong>Compra online</strong>
      </div>
      <div class="cart-total-row">
        <span>Total estimado</span>
        <span class="cart-total-price">$${totalStr}</span>
      </div>
    </div>
    ${hasItems ? `
      <button type="button" class="btn-cart-buynow" onclick="openCheckoutFromCart()">
        ${icons.cart} Comprar ahora · Tarjeta, efectivo o transferencia
      </button>
    ` : ''}
    <a href="${WA_MSG(waMsg)}" target="_blank" class="btn-cart-checkout secondary">
      ${icons.waIcon} Consultar antes de comprar
    </a>
    <p class="cart-note">Comprá online con tarjeta o transferencia (10% OFF). O consultá por WhatsApp si tenés dudas.</p>
    <button class="btn-cart-clear" onclick="clearCart()">Vaciar carrito</button>
  `;
}

// Abre el modal de checkout con los items del carrito (multi-item)
function openCheckoutFromCart() {
  const cartItems = (typeof cartGet === 'function') ? cartGet() : [];
  if (!cartItems.length) {
    console.warn('Carrito vacío');
    return;
  }
  // Construir items en formato esperado por openCheckout
  const checkoutItems = cartItems.map(ci => {
    const p = products.find(pr => pr.id === ci.id) || ci;
    const hsPrice = typeof HOT_SALE_PRICES !== 'undefined' && HOT_SALE_PRICES[p.id];
    const effectivePriceStr = hsPrice || ci.salePrice || ci.price || p.salePrice || p.price;
    const priceNum = parseInt(String(effectivePriceStr).replace(/[^\d]/g, ''), 10) || 0;
    const firstImage = (p.images && p.images[0]) || ci.img || '/logo.png';
    const freeShip = (p.badge === 'Envío Gratis') || priceNum >= 200000;
    return {
      id: p.id || ci.id,
      name: p.name || ci.name,
      image: firstImage,
      qty: ci.qty || 1,
      unitPrice: priceNum,
      freeShipping: freeShip,
    };
  });
  if (typeof window.openCheckout !== 'function') {
    console.error('openCheckout no disponible. ¿Cargó checkout.js?');
    return;
  }
  // Cerrar el cart drawer antes de abrir el modal
  if (typeof closeCart === 'function') closeCart();
  window.openCheckout({ items: checkoutItems });
}
window.openCheckoutFromCart = openCheckoutFromCart;

// ═══════════════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
  // Delegación global única · reemplaza cientos de listeners individuales
  setupGlobalDelegation();

  initHeader();
  buildMobileNav();

  // ── Detectar página inicial ──
  // Prioridad: 1) URL real (/cubre-autos), 2) Hash legacy (#cat-cubre-autos), 3) home
  let startPage = pathToPage(location.pathname);
  if (!startPage) {
    const legacyHash = location.hash.slice(1);
    if (legacyHash) {
      // Hash legacy detectado → redirigir silenciosamente a la URL real (sin recarga)
      startPage = legacyHash;
      history.replaceState({ page: startPage }, '', pageToPath(startPage));
    } else {
      startPage = 'home';
    }
  } else {
    // Asegurar que el state tenga la page id (necesario para popstate)
    history.replaceState({ page: startPage }, '', pageToPath(startPage));
  }

  currentPage = startPage;

  // ── Hidratación inteligente ──
  // Si el HTML ya vino pre-renderizado (build-time SSG con scripts/prerender.cjs),
  // skipeamos renderPage() para evitar un flash visual y reutilizamos el DOM.
  // Solo enganchamos interactividad (listeners, lazy load de imágenes, etc.).
  const isPrerendered =
    typeof window !== 'undefined' &&
    window.__PRERENDERED_PAGE === startPage &&
    document.getElementById('app') &&
    document.getElementById('app').children.length > 0;

  if (isPrerendered) {
    initInteractives();
  } else {
    renderPage(startPage);
  }

  updateActiveNav(startPage);
  applySEO(startPage);
  cartUpdateBadge();

  // ── Detectar retorno de Mercado Pago (post-checkout) ──
  handleMpReturn();

  window.addEventListener('popstate', (e) => {
    // Resolver page id: 1) state, 2) pathname, 3) hash legacy, 4) home
    const page = (e.state && e.state.page)
      || pathToPage(location.pathname)
      || location.hash.slice(1)
      || 'home';
    if (page === currentPage) return;
    currentPage = page;
    renderPage(page);
    window.scrollTo(0, 0);
    updateActiveNav(page);
    applySEO(page);
  });

  // ESC cierra el carrito
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      const drawer = document.getElementById('cart-drawer');
      if (drawer && drawer.classList.contains('open')) closeCart();
    }
  });

  // Floating WA button · show after 4.5s
  const waFloat = document.getElementById('wa-float');
  if (waFloat) {
    waFloat.style.opacity = '0';
    waFloat.style.pointerEvents = 'none';
    waFloat.style.transition = 'opacity 0.6s ease';
    setTimeout(() => {
      waFloat.style.opacity = '1';
      waFloat.style.pointerEvents = 'all';
    }, 4500);
  }
});

// ── Top Reviews Carousel (mobile) ──
function initTopReviewsCarousel() {
  const track = document.getElementById('top-reviews-track');
  if (!track) return;
  const prev = document.getElementById('tr-prev');
  const next = document.getElementById('tr-next');
  if (!prev || !next) return;
  let pos = 0;
  const cards = track.querySelectorAll('.top-review-card');
  const total = cards.length;

  function isMobile() { return window.innerWidth < 768; }

  function update() {
    if (!isMobile()) {
      track.style.transform = '';
      prev.style.display = 'none';
      next.style.display = 'none';
      return;
    }
    const w = track.parentElement.offsetWidth;
    track.style.transform = `translateX(-${pos * w}px)`;
    prev.style.display = pos === 0 ? 'none' : 'flex';
    next.style.display = pos === total - 1 ? 'none' : 'flex';
  }

  prev.addEventListener('click', () => { if (pos > 0) { pos--; update(); } });
  next.addEventListener('click', () => { if (pos < total - 1) { pos++; update(); } });

  // Swipe support
  let touchStartX = 0;
  track.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (dx < -40 && pos < total - 1) { pos++; update(); }
    else if (dx > 40 && pos > 0) { pos--; update(); }
  }, { passive: true });

  window.addEventListener('resize', update);
  update();
}

// ── Review Lightbox ──
const reviewLightboxData = [];

function buildReviewLightboxData() {
  reviewLightboxData.length = 0;
  testimonials.slice(0, 3).forEach(t => {
    reviewLightboxData.push({ img: t.img, product: t.product, text: t.text, name: t.name || 'Comprador verificado', source: t.source, stars: t.stars });
  });
}
buildReviewLightboxData();

function openReviewLightbox(idx) {
  const d = reviewLightboxData[idx];
  if (!d) return;
  let lb = document.getElementById('review-lightbox');
  if (!lb) {
    lb = document.createElement('div');
    lb.id = 'review-lightbox';
    lb.className = 'review-lightbox';
    lb.innerHTML = `
      <div class="rlb-overlay" onclick="closeReviewLightbox()"></div>
      <div class="rlb-content">
        <button class="rlb-close" onclick="closeReviewLightbox()">✕</button>
        <div class="rlb-img-wrap">
          <img id="rlb-img" src="" alt="" />
          <div class="rlb-overlay-info">
            <div class="rlb-stars"></div>
            <div class="rlb-product"></div>
            <p class="rlb-text"></p>
            <div class="rlb-author"></div>
          </div>
        </div>
      </div>`;
    document.body.appendChild(lb);
  }
  lb.querySelector('#rlb-img').src = d.img;
  lb.querySelector('#rlb-img').alt = d.product;
  lb.querySelector('.rlb-stars').textContent = '★'.repeat(d.stars);
  lb.querySelector('.rlb-product').textContent = d.product;
  lb.querySelector('.rlb-text').textContent = `"${d.text}"`;
  lb.querySelector('.rlb-author').textContent = `${d.name} · ${d.source}`;
  lb.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeReviewLightbox() {
  const lb = document.getElementById('review-lightbox');
  if (lb) lb.classList.remove('active');
  document.body.style.overflow = '';
}

function pgMove(uid, dir) {
  const wrap = document.getElementById('pg-' + uid);
  if (!wrap) return;
  const slides = wrap.querySelectorAll('.pg-slide');
  const dots   = wrap.querySelectorAll('.pg-dot');
  let cur = parseInt(wrap.dataset.cur) || 0;
  slides[cur].classList.add('pg-hidden');
  if (dots[cur]) dots[cur].classList.remove('pg-dot-active');
  cur = (cur + dir + slides.length) % slides.length;
  slides[cur].classList.remove('pg-hidden');
  if (dots[cur]) dots[cur].classList.add('pg-dot-active');
  wrap.dataset.cur = cur;
}

function ppThumb(thumb, src, mainId) {
  thumb.closest('.product-thumbs').querySelectorAll('.product-thumb').forEach(t => t.classList.remove('active'));
  thumb.classList.add('active');
  const main = document.getElementById(mainId);
  if (main) main.src = src;
}

function selectMaterialVariant(btnEl, pid, matIdx) {
  // Toggle active button
  btnEl.closest('.variant-btns').querySelectorAll('.variant-btn').forEach(b => b.classList.remove('active'));
  btnEl.classList.add('active');
  // Switch gallery images
  const gallery = document.getElementById('pp-gallery-' + pid);
  if (gallery) {
    const thumbs = gallery.querySelectorAll('.pp-color-thumb');
    thumbs.forEach(t => {
      const match = parseInt(t.dataset.colorIdx) === matIdx;
      t.style.display = match ? '' : 'none';
      t.classList.remove('active');
    });
    const first = Array.from(thumbs).find(t => parseInt(t.dataset.colorIdx) === matIdx);
    if (first) {
      first.classList.add('active');
      const mainImg = document.getElementById('pp-main-img-' + pid);
      if (mainImg) mainImg.src = first.querySelector('img').src;
    }
  }
  // Update sub-colors
  const prod = products.find(p => p.id === pid);
  const subColEl = document.getElementById('subcol-' + pid);
  if (prod && subColEl && prod.colorVariants && prod.colorVariants[matIdx]) {
    const sub = prod.colorVariants[matIdx].subColors || [];
    subColEl.innerHTML = sub.map(sc => `<span class="subcolor-chip">${sc}</span>`).join('');
  }
}

function selectSizeVariant(btn, pid, priceStr, salePriceStr) {
  btn.closest('.variant-btns').querySelectorAll('.variant-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const el = document.getElementById('pp-price-main-' + pid);
  if (!el) return;
  if (salePriceStr) {
    el.innerHTML = '<span class="price-old">$' + priceStr + '</span> <span class="currency">$</span>' + salePriceStr;
  } else {
    el.innerHTML = '<span class="currency">$</span>' + priceStr;
  }
}

function selectProductColor(swatchEl, pid, colorIdx) {
  // Update active swatch
  swatchEl.closest('.color-swatches').querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
  swatchEl.classList.add('active');
  // Update selected name
  const nameEl = document.getElementById('csn-' + pid);
  if (nameEl) nameEl.textContent = swatchEl.title;
  // Show/hide color thumbs
  const gallery = document.getElementById('pp-gallery-' + pid);
  if (!gallery) return;
  const thumbs = gallery.querySelectorAll('.pp-color-thumb');
  thumbs.forEach(t => {
    const match = parseInt(t.dataset.colorIdx) === colorIdx;
    t.style.display = match ? '' : 'none';
    t.classList.remove('active');
  });
  // Activate first thumb of selected color and update main image
  const first = Array.from(thumbs).find(t => parseInt(t.dataset.colorIdx) === colorIdx);
  if (first) {
    first.classList.add('active');
    const mainImg = document.getElementById('pp-main-img-' + pid);
    if (mainImg) mainImg.src = first.querySelector('img').src;
  }
}
