# Auditoría Técnica SEO — MDRACING

**Sitio:** https://www.mdracingfundas.com
**Fecha:** 2026-05-28
**Alcance:** HTML pre-renderizados (raíz + `/producto/*`), `sitemap.xml`, `robots.txt`, `vercel.json`
**Total páginas analizadas:** 17 raíz + 210 productos = 227

---

## 1. Sitemap.xml ✅ (con observaciones menores)

- **URLs listadas:** 226 (16 estáticas + 210 productos).
- **HTML reales:** 17 en raíz + 210 productos = 227. **Coincide en productos (210/210)**.
- **Campos presentes:** `loc`, `lastmod` (2026-05-28), `changefreq`, `priority` — ✅ correctos.
- ⚠️ **`home-v2.html` existe en raíz pero NO está en sitemap** — probable archivo legacy/staging. Si no se usa, eliminar; si se usa, debería agregarse o eliminarse del disco para evitar indexación accidental.
- ⚠️ **`lastmod` uniforme** (2026-05-28) para los 226 URLs. Google ignora `lastmod` cuando se ve "all-the-same"; idealmente reflejar la fecha real de modificación de cada producto (build-time del producto puntual).
- ⚠️ **`changefreq` y `priority` son hints históricamente ignorados por Google** desde 2017+. No es crítico mantenerlos, pero tampoco sumar.
- ✅ Faltantes importantes: ninguno detectado. Las 6 categorías principales y las 8 páginas institucionales están todas.

**Sugerencia:** decidir destino de `home-v2.html` (renombrar a `.bak` fuera del deploy o borrar). Hacer `lastmod` por-producto en build.

---

## 2. Robots.txt ✅

- ✅ Sitemap apunta correctamente a `https://www.mdracingfundas.com/sitemap.xml` (dominio `.com`, no `.com.ar`).
- ✅ `Disallow: /api/` y `/admin/` correctos — bloquean correctamente lo no-indexable.
- ✅ Reglas explícitas `Allow: /` para `facebookexternalhit` y `meta-externalagent` — permite que Meta scrape OG y catálogo.
- ⚠️ **No hay regla para `Googlebot-Image`** ni `Bingbot`. No es crítico (con `User-agent: *` ya alcanza), pero podrías agregar `Allow: /` explícito para `Googlebot` por claridad.
- ⚠️ **No bloquea `/checkout`**, `/cart`, ni URLs de query con parámetros tipo `?utm_*` — si existieran en algún momento se indexarían. No urgente.
- ⚠️ **No declara `Disallow: /home-v2.html`** (si decidís dejarlo en disco, debería bloquearse).

---

## 3. Meta tags estructurales

| Página | `<title>` len | `<desc>` len | Canonical | Robots | Viewport | lang |
|---|---|---|---|---|---|---|
| index.html | 73 ⚠️ | 219 🚨 | ✅ | ✅ index,follow | ✅ | ✅ es |
| cubre-autos.html | 39 ✅ | 142 ✅ | ✅ | ✅ | ✅ | ✅ es |
| quienes-somos.html | 61 ⚠️ (límite) | 135 ✅ | ✅ | ✅ | ✅ | ✅ es |
| producto/funda-…-vw-tera-…-qj9az | 86 🚨 | 144 ✅ | ✅ | ✅ | ✅ | ✅ es |
| producto/funda-cubre-auto-antigranizo-3-capas-impermeable | 91 🚨 | 188 🚨 | ✅ | ✅ | ✅ | ✅ es |

### Hallazgos

- 🚨 **Títulos de productos demasiado largos.** Patrón: `Funda X — $210.000 — Oferta $189.999 | MDRACING`. Google trunca ~60 chars en SERP. Sample: 73–91 chars. Sugerencia: dropear los dos precios del title (van en el snippet/structured data) o solo mostrar el precio oferta corto: `Funda VW Tera Cuero Acolchado — MDRACING` (~45 chars).
- 🚨 **`<title>` de `index.html` (73)** y **meta description (219)** exceden recomendados. Description ideal 120–160 chars.
- ✅ Todos los 210 productos tienen `<title>` únicos (verificado: 210/210 únicos).
- 🚨 **`<meta name="keywords">` es idéntico en TODOS los productos** (genérico de marca) — Google la ignora hace 15 años, pero copy-pasted en 210 fichas indica falta de personalización; sería más útil eliminarla del template o personalizarla.
- ✅ `canonical` apunta a URL absoluta `https://www.mdracingfundas.com/...` sin trailing slash, consistente con `vercel.json` (`trailingSlash:false`).
- ✅ `<meta name="robots" content="index, follow">` correcto en todas.
- ✅ `<meta name="viewport">` presente, `<html lang="es">` correcto.

---

## 4. Open Graph + Twitter Cards

- ✅ Todos los samples tienen `og:type`, `og:title`, `og:description`, `og:url`, `og:image`, `og:site_name`, `og:locale=es_AR`.
- ✅ `twitter:card = summary_large_image` correcto.
- ✅ Productos tienen `og:image` apuntando a imagen real del producto (Tiendanube CDN / MercadoLibre static).
- 🚨 **`og:image:width=1641` y `og:image:height=630` están HARDCODEADOS en TODOS los productos**, incluso cuando la imagen real es cuadrada (Tiendanube WebP 1024×1024). Esto rompe el preview en Facebook/WhatsApp (mostrará crop incorrecto o imagen distorsionada). Sugerencia: omitir width/height en productos, o calcular dinámicamente en build.
- ⚠️ `og:image:alt` también hardcoded a "MDRACING — Fábrica de fundas..." en todas las fichas (debería ser el nombre del producto).
- ⚠️ No hay `og:image:secure_url` ni `og:image:type` — opcionales pero buena práctica.

---

## 5. Schema.org Structured Data

- ✅ **210/210 productos tienen `Product` JSON-LD** con `name`, `description`, `image`, `brand`, `offers.price`, `offers.priceCurrency=ARS`, `offers.availability=InStock`, `offers.url`, `offers.seller`. **Excelente cobertura.**
- ⚠️ Faltan campos opcionales pero valiosos: `sku`, `gtin`/`mpn`, `aggregateRating`, `review`, `category`, `priceValidUntil` (este último es **requerido por Merchant Center si hay precio con descuento**).
- ✅ **Home tiene `LocalBusiness`** completo con `address`, `telephone`, `email`, `openingHours`, `foundingDate`, `sameAs` (Instagram, TikTok, YouTube, MercadoLibre). Muy bien.
- 🚨 **El mismo `LocalBusiness` JSON-LD se repite en TODAS las páginas** (incluyendo productos y categorías). No es estrictamente malo, pero **debería ser `Organization` reducido** o moverse solo a la home + `quienes-somos` + `contacto`. En productos pisa el foco y puede confundir a Google sobre qué schema priorizar.
- 🚨 **Categorías NO tienen `BreadcrumbList` ni `ItemList`** (verificado en cubre-autos.html). Esto es una pérdida clara — `ItemList` con los productos de la categoría daría rich results.
- 🚨 **Productos NO tienen `BreadcrumbList` schema** (sí tienen breadcrumb visual HTML, pero sin marcado). Google podría mostrar la ruta en SERP si se agrega.

---

## 6. Estructura HTML / Heading Hierarchy

- ✅ **Único H1** confirmado en los 3 productos sampleados y en index/cubre-autos. (grep `<h1`: 1 ocurrencia por página).
- ✅ Jerarquía aceptable en productos: H1 (nombre) → H3 (secciones de info) → H4 (subsecciones).
- ⚠️ **Salto H1 → H3 sin H2 en fichas de producto** — Google es tolerante pero no es ideal. Las secciones "Materiales", "Instalación", "Envíos" en tabs deberían ser H2.
- ⚠️ En `cubre-autos.html`: H1 (hero) → H3 (`product-name`). Los nombres de producto en una grid de categoría deberían ser **H2 o H3 consistente**, y debería existir H2 estructural intermedio (ej. "Productos destacados").
- ✅ Imágenes principales tienen `alt` descriptivo (ej. `alt="Funda VW Tera Cuero Automotor Acolchado 3mm"`). Thumbnails también con color (ej. `Negro`, `Gris`).
- ⚠️ Logo en header: `alt="MDRACING"` — correcto pero podría ser más descriptivo (`alt="MDRACING — Logo"`).

---

## 7. Internal linking 🚨 (CRITICAL)

- 🚨 **TODAS las navegaciones internas son `href="#"` con `data-page="..."` manejado por JS**. Ejemplos en producto:
  - `<a href="#" data-page="cat-fundas-asientos">Fundas para Asientos</a>` (breadcrumb)
  - `<a href="#" data-page="home">Inicio</a>` (nav, breadcrumb)
  - 31 `href="#"` totales en una sola ficha de producto.
- **Consecuencia SEO:** los crawlers no pasan PageRank entre páginas porque no hay enlaces reales (`<a href="/cubre-autos">`). El sitemap permite descubrir las URLs, pero **la equity de los productos no fluye a las categorías y viceversa**. Es el problema #1 a resolver.
- ✅ Breadcrumb visual SÍ existe en productos (Inicio › Categoría › Producto), pero como pseudo-link `href="#"`.
- 🚨 **No hay sección de "productos relacionados" ni "también te puede interesar"** en las fichas de producto. Es estándar en e-commerce y mejora dwell time, internal linking, y conversión.
- 🚨 Página de categoría (`cubre-autos.html`) lista productos con `<h3 onclick="navigate(...)">` — los nombres de producto NO son `<a href>`. Crawlers no llegan al producto desde la categoría salvo por sitemap.

**Sugerencia urgente:** cambiar todos los `<a href="#" data-page="X">` por `<a href="/X">` con `data-page` opcional para mejorar UX SPA. Vercel ya tiene `cleanUrls:true` y los HTML pre-rendereados existen, así que la navegación real funciona.

---

## 8. Performance / Loading hints

- ✅ `<link rel="preconnect" href="https://fonts.googleapis.com">` y `fonts.gstatic.com` con crossorigin.
- ✅ Scripts de terceros con `async` (GA4) y `defer` (Vercel Analytics).
- ⚠️ Meta Pixel se inyecta inline sin `async`/`defer` — bloquea parsing brevemente.
- ✅ `loading="lazy"` presente en thumbnails de producto (7 en ficha, 13 en categoría, 8 en index). Buen uso.
- ⚠️ La imagen **principal del producto NO tiene `loading="lazy"` ni `fetchpriority="high"`**. Para LCP debería tener `fetchpriority="high"` (no lazy, ya que es above-the-fold).
- ✅ Favicon configurado (`/favicon.png`, apple-touch-icon, theme-color).
- ⚠️ **No hay `preload` para la fuente principal** ni para el CSS crítico. Las 3 familias Google Fonts (Barlow Condensed + Barlow + Inter, con muchos pesos) cargan ~150KB de fuentes — auditar si todas se usan.
- ⚠️ 3 CSS separados (`/styles.css`, `/chat-widget.css`, `/checkout.css`) cargan en `<head>` sin diferir — `chat-widget` y `checkout` podrían ser diferidos.

---

## 9. URLs

- ✅ URLs legibles, kebab-case, con keywords (`funda-cubre-auto-antigranizo-3-capas-impermeable`).
- ✅ `vercel.json` tiene `trailingSlash:false` y `cleanUrls:true` — consistente con canonicals.
- ⚠️ **Algunos productos tienen URLs largas** (>70 chars), las top:
  - `funda-cubre-asientos-vw-polo-track-eco-cuero-cubre-volante-plano-8asgz.html` (75)
  - `funda-cubre-camioneta-antigranizo-3-capas-impermeable-mitsubishi-l200.html` (74)
  - `funda-cubre-camioneta-antigranizo-3-capas-impermeable-chevrolet-s10.html` (72)
  - Google recomienda <75 chars en URL path. No crítico pero ajustado al límite.
- ⚠️ Algunos slugs tienen sufijos aleatorios (`-qj9az`, `-8asgz`, `-utryx`) — probablemente IDs de Tiendanube. **Restan claridad SEO**; mejor slug puro si no hay colisión.
- ✅ No se detectan duplicados con/sin www (vercel.json + canonicals fuerzan www).
- 🚨 **No vi redirect 301 explícito de apex → www en `vercel.json`** (ver punto 10).

---

## 10. vercel.json

- ✅ `cleanUrls: true`, `trailingSlash: false` correctos.
- ✅ Headers de seguridad robustos: HSTS preload, CSP detallada, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy.
- ✅ Cache headers correctos: imágenes 1 año immutable, HTML home/index `max-age=0 must-revalidate`, CSS/JS `must-revalidate`.
- ✅ `/admin/*` con `X-Robots-Tag: noindex, nofollow, noarchive, nosnippet` — perfecto.
- ✅ `/api/*` con `X-Robots-Tag: noindex, nofollow` y `Cache-Control: no-store`.
- ✅ `/meta-feed.xml` con `noindex` y cache 1h.
- 🚨 **No hay sección `redirects`** declarada. Si alguien visita `mdracingfundas.com` (apex) o `mdracing.com.ar` (viejo), no veo aquí redirect 301 a `www.mdracingfundas.com`. Verificar a nivel DNS/Vercel domain config — si no existe a ese nivel, **agregar `redirects` en vercel.json es crítico** para consolidar autoridad.
- ⚠️ No hay redirects 301 para URLs históricas del sitio viejo `.com.ar` → nuevo `.com` (si las hubo). Si migraron de dominio, se pierde equity sin estos.
- ⚠️ Falta header opcional `X-DNS-Prefetch-Control: on`.

---

## TOP 5 ACCIONES PRIORITARIAS

### 🚨 1. Internal linking real — reemplazar `href="#"` por URLs reales
Es el problema SEO más grave. Los crawlers no pueden seguir links internos porque toda la nav es JS-driven con `href="#"`. Cambiar `<a href="#" data-page="cat-cubre-autos">` por `<a href="/cubre-autos">` en todas las fichas, categorías, breadcrumbs y nav. **Impact: enorme** (recupera flujo de PageRank entre 227 páginas).

### 🚨 2. Productos relacionados + BreadcrumbList schema en fichas
Agregar sección "Productos relacionados" (4–6 productos de la misma categoría) en cada ficha + JSON-LD `BreadcrumbList`. Mejora tiempo en sitio, conversión, y rich results en SERP.

### 🚨 3. Acortar `<title>` de productos
Quitar los precios del title (van en el JSON-LD `Product.offers`). Target: ≤60 chars. Ej: `Funda VW Tera Cuero Automotor Acolchado 3mm | MDRACING`. Aplica a los 210 productos.

### 🚨 4. Arreglar OG image dimensions hardcodeadas en productos
Las 210 fichas declaran `og:image:width=1641 height=630` pero la imagen real es cuadrada/diferente. Quitar las metas hardcodeadas en el template de producto, o calcular dimensiones reales en build. Rompe previews en redes sociales.

### 🚨 5. ItemList schema en categorías + redirects 301 apex → www
- Agregar `ItemList` JSON-LD en las 7 páginas de categoría (cubre-autos, fundas-asientos, etc.).
- Verificar/agregar redirect 301 de `mdracingfundas.com` (apex) → `www.mdracingfundas.com` en `vercel.json` o domain config. Sin esto, hay riesgo de canonicalización split.

---

## Quick Wins adicionales (esfuerzo bajo)

- Eliminar/`Disallow` `home-v2.html` del deploy.
- Quitar `<meta name="keywords">` duplicada en 210 productos (es ruido).
- Agregar `fetchpriority="high"` a la imagen principal del producto.
- Mover `LocalBusiness` JSON-LD solo a home + quienes-somos + contacto (en lugar de las 227 páginas).
- Agregar `priceValidUntil` al `Product.offers` para que Merchant Center no marque warnings.
- Agregar `Disallow: /checkout`, `/cart`, `/*?utm_*` en robots.txt como precaución.
- Diferir `chat-widget.css` y `checkout.css` (no son críticos para FCP).

---

**Resumen ejecutivo:** El sitio tiene una base SEO técnica **mejor que la media de e-commerce argentino**: sitemap completo, canonicals correctos, Product schema en el 100% de los productos, robots y vercel headers bien configurados. **El problema más grave es estructural: la navegación interna en `href="#"` está bloqueando el flujo de autoridad entre páginas.** Resolverlo es el cambio de mayor ROI SEO.
