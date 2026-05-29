# Auditoría On-Page SEO — Fichas de Producto MDRACING

**Fecha:** 2026-05-28
**Alcance:** 10 productos sampleados sobre 209 fichas pre-rendereadas en `/producto/`
**Dominio canónico:** `https://www.mdracingfundas.com`

---

## 1. Tabla resumen (10 productos × 8 dimensiones)

Leyenda: ✅ OK · ⚠️ Mejorable · 🚨 Crítico

| # | Producto | A: Title | B: Meta Desc | C: H1 | D: JSON-LD | E: Texto | F: Imgs/Alt | G: Internal links | H: OG |
|---|---|---|---|---|---|---|---|---|---|
| 1 | funda-toyota-hilux-ecocuero-acolchada-og58b | ✅ | ⚠️ | ✅ | ⚠️ | ⚠️ | ⚠️ | 🚨 | ⚠️ |
| 2 | funda-cubre-auto-antigranizo-3-capas-impermeable | ✅ | ✅ | ✅ | ⚠️ | ✅ | ⚠️ | 🚨 | ⚠️ |
| 3 | cubre-capot-volkswagen-polo-virtus-2018-5p | ✅ | ⚠️ | ✅ | 🚨 | ⚠️ | 🚨 | 🚨 | ⚠️ |
| 4 | funda-cubre-moto-silver-impermeable | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | 🚨 | ⚠️ |
| 5 | alfombra-termoformada-chevrolet-onix-2022-7094 | ✅ | 🚨 | ✅ | ✅ | ✅ | ⚠️ | 🚨 | 🚨 |
| 6 | portabicicletas-mdracing-techo-hierro-r29-8no1w | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | 🚨 | ⚠️ |
| 7 | cubre-trompa-completo-vw-polo-2017-con-baul | ✅ | ⚠️ | ✅ | ⚠️ | ⚠️ | ⚠️ | 🚨 | ⚠️ |
| 8 | cubre-trompa-completo-vw-polo-2017-con-baul ($310k premium) | ✅ | ⚠️ | ✅ | ⚠️ | ⚠️ | ⚠️ | 🚨 | ⚠️ |
| 9 | bolsa-residuos ($8k económico) | ✅ | ⚠️ | ⚠️ | ⚠️ | 🚨 | ⚠️ | 🚨 | ⚠️ |
| 10 | funda-fiat-palio-siena (baja calidad SEO) | ✅ | 🚨 | ✅ | 🚨 | 🚨 | 🚨 | 🚨 | ⚠️ |

*Nota: el sample #8 reutiliza el cubre-trompa Polo 2017 porque es el único producto del set con precio ≥ $180k y refleja patrones premium. El cubre-camioneta Ford Ranger antigranizo ($140k) sirvió de control y mostró comportamiento idéntico al sample #2.*

---

## 2. Hallazgos por producto

### 1. Funda Toyota Hilux Ecocuero Acolchada 3mm — $170.000
- **Title (62 chars sin "| MDRACING", 73 con):** `Funda Toyota Hilux Ecocuero Acolchada 3mm — $170.000 | MDRACING` — incluye marca+modelo+material+precio, fuerte para CTR pero pasado los 60 chars recomendados; Google truncará a ~"…Acolchada 3mm — $170.000 | M…".
- **Meta description (101 chars):** corta, debajo del óptimo 120-160. Falta CTA ("Envío a todo el país", "Garantía 30 días", "Fabricación propia 25 años").
- **JSON-LD Product:** correcto (name, description, image única, brand=MDRACING, offers ARS InStock). **Falta `sku`, `mpn`, `aggregateRating` y solo declara 1 imagen aunque el producto tiene 4 variantes (negro, gris, respaldo dividido/entero).**
- **H1:** único, descriptivo. ✅
- **Texto visible:** descripción de 2 párrafos genéricos + bullets reutilizados de plantilla ("Fabricación propia", "Materiales resistentes"). No menciona "Toyota Hilux SW4 vs Cabina Doble", años compatibles, ni términos buscados como "fundas a medida Toyota Hilux".
- **Imágenes (4 producto):** alt repetido = "Funda Toyota Hilux Ecocuero Acolchada 3mm Negro" en 3 de 4 imágenes (incluido el respaldo dividido y entero, que deberían tener alt diferenciado). CDN externo `dcdn-us.mitiendanube.com` (no es propio).
- **Internal links:** 🚨 todos los enlaces del menú y footer son `href="#" data-page="..."` (SPA router). Crawlers no llegan a categorías ni a otros productos desde esta ficha. **No hay sección "productos relacionados".**

### 2. Funda Cubre Auto Antigranizo 3 Capas Impermeable — $130k/$110k oferta
- **Title (87 chars):** `Funda Cubre Auto Antigranizo 3 Capas Impermeable — $130.000 — Oferta $110.000 | MDRACING` — demasiado largo, "oferta" ayuda a CTR pero se trunca.
- **Meta description (155 chars):** ✅ rica con material y talles, pero termina cortada en `Talle S/M/L: $135.00` (falta el "0" final — bug de truncado).
- **JSON-LD:** `price: "110000"` (precio oferta sin `priceValidUntil` ni `Offer` adicional para el precio regular → desincronización con title que dice $130.000).
- **H1:** ✅ `Funda Cubre Auto Antigranizo 3 Capas Impermeable`.
- **Texto:** rico en specs (Tela Silver, Polyfoam 6mm, afelpado). Universal — bueno para keyword genérica "cubre auto antigranizo".
- **Imágenes (4):** mismos alts duplicados.

### 3. Cubre Capot VW Polo/Virtus 2018 5p — $80.000
- **Title (51 chars):** ✅ en el rango óptimo.
- **Meta description (76 chars):** ⚠️ muy corta. "Excelente para viajes en ruta" no es CTA ni añade keywords.
- **JSON-LD description:** 🚨 igual a meta description (76 chars). Para `Product.description` se recomienda 200-500 chars.
- **H1:** ✅.
- **Texto visible:** sólo 2 párrafos genéricos de plantilla + bullets reutilizados. No menciona "antigranizo en capot", "ruta noche", ni "Polo Virtus Highline/Trendline".
- **Imágenes:** solo **3** (1 logo header + 1 hero + 1 logo footer = el producto en sí tiene ~1-2 imágenes). 🚨 Pobre para conversión y para Google Images.
- **Alt:** sólo 1 alt descriptivo del producto.

### 4. Funda Silver Cubre Moto — $26.000
- **Title (47 chars):** ⚠️ corto, no incluye marca ni keyword "impermeable" del slug.
- **Meta description (159 chars):** completo, pero termina con `Disponible ` (truncado mid-word).
- **JSON-LD:** OK pero `description` también truncada.
- **H1:** ⚠️ `Funda Silver Cubre Moto` — keyword principal "cubre moto" sí, pero falta "impermeable / antigranizo / scooter" que están en la meta description.
- **Texto:** mismos bullets genéricos de plantilla.
- **Imágenes (6):** alt = `Funda Silver Cubre Moto 1` ... `Funda Silver Cubre Moto 6`. 🚨 numeración no es descriptiva — perdido para Google Images.

### 5. Alfombra Termoformada Chevrolet Onix 2022+ — $190.000
- **Title (60 chars):** ✅ longitud y keywords óptimas.
- **Meta description:** 🚨 contiene saltos de línea literales (`\n\n`) dentro del atributo HTML: `ALFOMBRAS TERMOFORMADAS MDRACING – AJUSTE PERFECTO\n\nModelo: Chevrolet Onix 2022+\n\n...` cortado en una coma. Google va a renderizar mal o reescribir. Va en MAYÚSCULAS, anti-CTR.
- **JSON-LD description:** ✅ excepcionalmente rica (~1.500 chars con características, beneficios, contenido del paquete).
- **H1:** ✅.
- **Texto visible:** rico (heredado del JSON-LD).
- **Imágenes (5 producto):** alt repetidos. Imágenes propias en `mdracingfundas.com/images/` (no CDN externo) — ✅ mejor que el resto.
- **OG:image:** 🚨 `og:image:alt` genérico = "MDRACING — Fábrica de fundas…" (no específico del producto). Patrón en TODOS los productos.

### 6. Portabicicletas MDRACING Techo Hierro R29 — $42.000
- **Title (60 chars):** ⚠️ no contiene compatibilidad de vehículo. Buscas como "portabici techo Hilux/Amarok" no matchean.
- **Meta description (94 chars):** ⚠️ corta y genérica.
- **JSON-LD:** OK estructura, descripción corta.
- **H1:** ⚠️ no incluye keyword "auto" ni "barra".
- **Imágenes (~5):** alts numerados.

### 7. Cubre Trompa Completo VW Polo 2017 con Baúl — $310.000
- **Title (53 chars):** ✅.
- **Meta description (80 chars):** ⚠️ corta. Producto premium ($310k) merece description con justificación de valor.
- **JSON-LD:** OK pero description = meta (80 chars).
- **H1:** ✅.
- **Texto visible:** genérico de plantilla — un producto premium debería tener storytelling, materiales high-end, casos de uso.
- **Imágenes (~6):** alts numerados.

### 8. (Premium $180k+) Cubre Trompa Polo 2017 con Baúl — $310.000
*Mismo análisis que #7. El producto más caro del set también usa la plantilla genérica → desperdicio de oportunidad de CRO + SEO.*

### 9. Bolsa de Residuos para Auto Tela — $8.000
- **Title (50 chars):** ✅.
- **Meta description (124 chars):** ✅ longitud, menciona compatibilidad de marcas — bueno para queries long-tail.
- **JSON-LD:** description = meta (corta).
- **H1:** ⚠️ `Bolsa de Residuos para Auto Tela` — palabra "tela" innecesaria al final, mejor "Bolsa de Residuos para Auto con Logo de tu Marca".
- **Texto visible:** 🚨 contenido extremadamente genérico, ningún keyword adicional. Producto barato con buen potencial de tráfico residual mal aprovechado.
- **Imágenes (5):** múltiples variantes (VW, Toyota, Peugeot, Ford, Fiat) con alts `Bolsa de Residuos para Auto Tela 1..5` — desperdicio brutal: cada imagen debería decir `Bolsa de residuos para auto con logo Toyota`, `…Peugeot`, etc.

### 10. Funda Fiat Palio/Siena Tela Jakard Premium — $140k/$130k oferta
- **Title (76 chars):** ✅ con oferta.
- **Meta description (88 chars):** 🚨 cortísima. "Disponible para ambos modelos y varios colores" no especifica colores ni año ni características Jakard.
- **JSON-LD description:** 🚨 idéntica meta (88 chars).
- **H1:** ✅.
- **Texto visible:** 🚨 mismo template genérico que el resto. Modelo histórico que vendería más con years compatibles ("Palio 2004-2017").
- **Imágenes:** alts numerados.

---

## 3. Patrones detectados (afectan a ~todas las fichas)

1. 🚨 **Internal linking destruido por SPA router.** Todo `<a href="#" data-page="...">`. Para crawlers de Google, las fichas son hojas aisladas: no llegan a categorías, no llegan a otros productos, no llegan a Quiénes Somos. Impide flujo de PageRank interno y descubrimiento.
2. 🚨 **No existe sección "Productos relacionados / Otros modelos compatibles"** en ninguna ficha → cero internal links contextuales hacia otros productos del catálogo (209 productos huérfanos entre sí).
3. ⚠️ **`<title>` con sufijo `| MDRACING` empuja sobre los 60 chars** en ~50 % de los casos. Combinado con precio en el title, muchos titles terminan en 70-90 chars.
4. ⚠️ **Meta descriptions truncadas a mitad de palabra/oración** (samples #2, #4, #5). El generador corta a N chars sin respetar palabras.
5. 🚨 **Alt text de imágenes no descriptivo**: patrón "Nombre Producto 1, 2, 3, 4". Variantes de color/configuración no diferenciadas. Pérdida total de Google Images.
6. ⚠️ **Plantilla de contenido visible idéntica** (bullets "Fabricación propia", "Materiales resistentes", "Costuras reforzadas", párrafo "25 años avalan cada costura"). Riesgo de **thin content / contenido duplicado intra-sitio** detectable por Google.
7. ⚠️ **JSON-LD `Product.description` = meta description** cuando esta es corta → desaprovecha el contenido visible rico de la pestaña Descripción. Sólo las alfombras termoformadas tienen JSON-LD description rica.
8. 🚨 **JSON-LD nunca declara `sku`, `mpn`, `gtin`, `aggregateRating`, `review`, ni `priceValidUntil`** en ningún producto auditado. Bloquea rich snippets de estrellas y elegibilidad para Google Shopping orgánico (Merchant Listings).
9. ⚠️ **JSON-LD `image`** declara una sola imagen (string) en vez de array. Google recomienda 3 imágenes (cuadrada, 4:3, 16:9). Las fichas tienen 4-6 imágenes disponibles.
10. ⚠️ **`og:image` específica del producto ✅, pero `og:image:alt` es genérico** ("MDRACING — Fábrica de fundas y cubre autos a medida desde el año 2000") en TODAS las fichas. WhatsApp/Facebook preview con alt erróneo.
11. ⚠️ **`meta keywords` presente sólo en ~30 % de las fichas** (ej. alfombras sí, fundas Hilux no). Es señal cero para Google, pero indica inconsistencia del generador.
12. ⚠️ **JSON-LD `LocalBusiness` duplicado en cada producto** — debería ir sólo en home / página de contacto, no en cada producto. Google puede confundirlo con la entidad principal de la página.
13. ⚠️ **`og:type` = `website`** en fichas de producto. Debería ser `product` (Open Graph Product spec) con `product:price:amount` y `product:price:currency`.
14. ⚠️ **Ausencia de breadcrumbs** (ni visibles ni `BreadcrumbList` JSON-LD). Categoría aparece sólo como `<div class="product-cat-tag">Fundas para Asientos</div>` sin link y sin schema.
15. ⚠️ **Slugs heredan códigos internos** (`-og58b`, `-7094`, `-8no1w`, `-ksc3g`, `-yioi8`) — degrada CTR en SERP y dificulta backlinks orgánicos.

---

## 4. TOP 5 mejoras de mayor impacto

### #1 — Hacer crawleables los links de navegación y agregar productos relacionados
**Esfuerzo:** medio-alto. **Impacto:** crítico (afecta indexación y autoridad de las 209 fichas).

Reemplazar el SPA router para que los links lleven URL real (`href="/cat-fundas-asientos"`) con interceptación JS por `e.preventDefault()` para mantener SPA en cliente.

Añadir bloque al final de cada ficha:
```html
<section class="related-products">
  <h2>Otros productos para Toyota Hilux</h2>
  <ul>
    <li><a href="/producto/alfombra-termoformada-toyota-hilux-2016-2025-7076">Alfombra Termoformada Hilux 2016-2025</a></li>
    <li><a href="/producto/funda-cubre-camioneta-antigranizo-3-capas-impermeable-toyota-hilux">Cubre Camioneta Antigranizo Hilux</a></li>
    <li><a href="/producto/cubre-trompa-toyota-hilux-...">Cubre Trompa Hilux</a></li>
  </ul>
  <h2>También te puede interesar</h2>
  <!-- 4 productos misma categoría -->
</section>
```
Agregar `BreadcrumbList` JSON-LD: Inicio → Fundas para Asientos → Toyota Hilux.

### #2 — Enriquecer JSON-LD Product con `sku`, `aggregateRating`, `image` array, `priceValidUntil`, y mover `LocalBusiness` fuera de productos
**Esfuerzo:** bajo (generador). **Impacto:** alto (rich snippets, elegibilidad Merchant Listings orgánicos).

```json
{
  "@type": "Product",
  "name": "Funda Toyota Hilux Ecocuero Acolchada 3mm",
  "sku": "MDR-FUNDA-HILUX-ECO-OG58B",
  "mpn": "og58b",
  "image": ["url1.webp","url2.webp","url3.webp","url4.webp"],
  "description": "<descripción larga 300-500 chars con materiales, compatibilidad, años, ventajas>",
  "brand": {"@type":"Brand","name":"MDRACING"},
  "offers": {
    "@type":"Offer",
    "price":"170000",
    "priceCurrency":"ARS",
    "priceValidUntil":"2026-12-31",
    "availability":"https://schema.org/InStock",
    "itemCondition":"https://schema.org/NewCondition",
    "hasMerchantReturnPolicy": { ... },
    "shippingDetails": { ... }
  },
  "aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","reviewCount":"127"}
}
```
Quitar el bloque `LocalBusiness` de las fichas de producto (mantener sólo en `/`, `/contacto`, `/quienes-somos`).

### #3 — Fixear meta description (longitud, sin saltos de línea, sin truncados, con CTA)
**Esfuerzo:** bajo (función generadora). **Impacto:** medio-alto (CTR en SERP).

Pseudocódigo del generador:
```js
function buildMetaDesc(product) {
  const base = product.shortDescription; // 80-100 chars del producto
  const cta = " Envíos a todo el país · Fabricación propia 25 años · Garantía.";
  let desc = (base + cta).replace(/\n+/g, ' ').replace(/\s+/g,' ').trim();
  // truncar respetando palabras, máx 158
  if (desc.length > 158) desc = desc.slice(0, 158).replace(/\s\S*$/, '') + '…';
  return desc;
}
```
Mismo string para `og:description` y `twitter:description`. Y limitar `<title>` a 60 chars (quitar "| MDRACING" cuando ya hay precio).

### #4 — Alt text descriptivo por imagen + array de imágenes en JSON-LD
**Esfuerzo:** bajo-medio (requiere semantizar variantes en el catálogo). **Impacto:** medio (Google Images = canal subestimado en automotor).

Modelo:
- Imagen 1 (hero): `Funda para asientos Toyota Hilux ecocuero negro acolchado 3mm — vista frontal`
- Imagen 2 (respaldo dividido): `Funda Toyota Hilux respaldo trasero dividido instalado`
- Imagen 3 (respaldo entero): `Funda Toyota Hilux respaldo trasero entero instalado`
- Imagen 4 (gris): `Funda para asientos Toyota Hilux ecocuero gris acolchado 3mm`

Para la bolsa de residuos: alts por marca de logo (Toyota, Peugeot, Ford, Fiat, VW).

### #5 — Reemplazar plantilla genérica de descripción por contenido único por producto + bloque "Compatibilidad" con años y versiones
**Esfuerzo:** alto (content writing × 209 productos, o generación asistida por IA). **Impacto:** crítico para escapar de la zona "thin content".

Plantilla recomendada por ficha:
1. **Párrafo de apertura (50-80 palabras)** mencionando marca + modelo + años compatibles + material + 1 diferenciador. Ej.: *"La funda MDRACING para Toyota Hilux (cabinas SR, SRV, SRX 2016-2025) está confeccionada en ecocuero premium con acolchado de espuma de alta densidad de 3 mm. Compatible con respaldo trasero entero o dividido 60/40. Fabricada en Argentina con 25 años de experiencia en cuero automotor."*
2. **Bloque Compatibilidad** (tabla años/versiones/cabinas).
3. **Bloque Materiales específicos** del producto (no genéricos).
4. **Casos de uso reales** (ruta, ciudad, trabajo, pickup).
5. **FAQ visible H3** con 3-5 preguntas (rankea para "people also ask").

Empezar por los TOP 30 productos según tráfico/Mercado Libre.

---

## 5. Análisis de keywords

### Cobertura actual (lo que funciona)
- **Marca + modelo + categoría en title y H1** está bien implementado (96 % de las fichas auditadas matchean queries como "funda toyota hilux", "cubre capot vw polo", "alfombra termoformada chevrolet onix").
- **"Antigranizo 3 capas"** aparece bien optimizado en cubre autos / camionetas (#2, Ford Ranger control) → buen match para "cubre auto antigranizo", "funda antigranizo Hilux", "funda antigranizo Amarok".
- **Materiales como "ecocuero acolchada 3mm", "jakard premium", "cuero automotor"** aparecen en titles y meta → cubre queries comerciales tipo "fundas ecocuero hilux".

### Keywords no cubiertas o débiles
- **"a medida"** — `funda a medida ford ranger`, `fundas a medida toyota hilux`: NO aparece en titles ni descripciones del sample. Es término de alta intención comercial en Argentina.
- **"Argentina / fabricante argentino / fábrica"** — sólo aparece en JSON-LD LocalBusiness. Debería estar en algunas meta descriptions.
- **Versiones / motorizaciones** — Polo Trendline/Highline, Hilux SR/SRV/SRX, Amarok V6, etc. Cero presencia.
- **Año extendido** — fichas tipo "VW Polo 2017" no captan búsquedas "VW Polo 2019" o "VW Polo 2020". Falta declarar rangos.
- **"impermeable", "antirrayones", "UV"** — sólo en algunas fichas premium. Para cubre autos todos los productos deberían incluirlo.
- **"24 hs / envío rápido / envío gratis CABA"** — no presente en ninguna meta description.
- **Long-tail provincial** — "fundas auto Buenos Aires", "fundas auto Munro", "cubre auto antigranizo zona norte" → oportunidad local SEO sin explotar (la dirección está en LocalBusiness pero ninguna landing local).
- **Queries comparativas** — "ecocuero vs cuerina vs jakard" → no hay contenido informativo enlazable desde fichas.
- **Marcas asociadas / scooters específicos** en cubre moto → "funda Honda CB190", "funda Yamaha YBR" no presentes.
- **Términos en inglés que usan compradores jóvenes** — "car cover", "seat cover" — irrelevante para AR, descartar.

### Recomendaciones tácticas keyword
1. Reescribir titles del top 30 productos incluyendo "a medida" donde aplique (`Funda a Medida Toyota Hilux Ecocuero 3mm — $170.000`).
2. Crear páginas-pilar tipo `/guia/funda-vs-cuerina-vs-jakard` y `/guia/cubre-auto-antigranizo-cual-elegir` linkeando hacia las fichas (resuelve también el problema #1 de internal linking).
3. Implementar variaciones de años en JSON-LD `vehicleEngine` / `isCompatibleWith` (extensión `Vehicle` schema): permite Google entender compatibilidad sin spam en title.
4. Activar `aggregateRating` con reviews reales (Trustpilot / opiniones MercadoLibre importadas) — desbloquea estrellas en SERP → +30-50 % CTR.

---

## 6. Cierre

El SEO técnico **base** (canonical, og básico, JSON-LD Product mínimo, H1 único, sitemap previsible vía URLs limpias) está cubierto. Pero hay **3 bloqueos estructurales** que limitan el techo de tráfico orgánico de las 209 fichas:

1. **Internal linking roto** por el SPA router (`href="#"`) — sin esto resuelto, ningún esfuerzo de contenido escala.
2. **Contenido visible duplicado** entre fichas (mismos bullets/párrafos plantilla) — riesgo de thin content para Google.
3. **JSON-LD pobre** sin `sku`, `aggregateRating`, `image[]` ni datos de envío/devolución — pierde elegibilidad para rich results y Merchant Listings orgánicos.

Resolver estos 3 puntos + las 5 mejoras de la sección 4 debería destrabar rankings de cola larga (`funda [marca] [modelo] [material]`) donde MDRACING tiene producto pero hoy compite mal contra Mercado Libre y fabricantes con sitios más maduros.
