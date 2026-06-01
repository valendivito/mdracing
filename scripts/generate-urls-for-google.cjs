#!/usr/bin/env node
/**
 * Genera urls-prioridad.txt con las 240 URLs del sitio ordenadas por prioridad
 * SEO. El usuario puede pegar las primeras N en Google Search Console →
 * Inspección de URLs → Solicitar indexación.
 *
 * Google Search Console tiene un límite de ~10-20 URLs/día via "Solicitar
 * indexación" manual. Para procesar las 240 conviene ir por tandas de 10/día
 * priorizando las que más tráfico pueden traer.
 *
 * Orden de prioridad:
 *   1. Home y páginas estáticas principales (quienes-somos, contacto)
 *   2. Índice de marcas + páginas de marca (alto tráfico long-tail)
 *   3. Categorías
 *   4. Top 30 productos (los que tienen más imágenes / descripción más larga)
 *   5. Resto de productos
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SITE_BASE = 'https://www.mdracingfundas.com';

const STATIC_PRIORITY = [
  '/',
  '/quienes-somos',
  '/como-comprar',
  '/preguntas-frecuentes',
  '/marcas',
  '/categorias',
  '/fundas-asientos',
  '/cubre-autos',
  '/cubre-capots',
  '/cubre-trompas',
  '/alfombras-termoformadas',
  '/cubre-motos',
  '/accesorios',
  '/cambios-devoluciones',
  '/contacto',
];

const BRANDS_BY_PRIORITY = [
  '/marcas/volkswagen',  // 30 productos
  '/marcas/renault',     // 26
  '/marcas/peugeot',     // 24
  '/marcas/ford',        // 21
  '/marcas/chevrolet',   // 21
  '/marcas/fiat',        // 15
  '/marcas/toyota',      // 14
  '/marcas/citroen',     // 6
  '/marcas/nissan',      // 6
  '/marcas/honda',       // 4
  '/marcas/jeep',        // 3
  '/marcas/mitsubishi',  // 1
  '/marcas/bmw',         // 1
];

function main() {
  const productsPath = path.join(ROOT, 'data', 'products.json');
  if (!fs.existsSync(productsPath)) {
    console.error('No existe data/products.json — correr npm run build:ssg primero');
    process.exit(1);
  }
  const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

  // Productos ordenados por "calidad" (más imágenes + descripción más larga = más probable que ranqueen rápido)
  const sortedProds = products
    .filter(p => p.metaFeedEligible !== false)
    .map(p => ({
      url: '/producto/' + p.id,
      score: (Array.isArray(p.images) ? p.images.length : 0) * 10 + (p.desc ? p.desc.length : 0),
      name: p.name,
    }))
    .sort((a, b) => b.score - a.score);

  const lines = [];
  lines.push('# MDRACING — URLs en orden de prioridad para Google Search Console');
  lines.push('# Pegá de a 10/día en: https://search.google.com/search-console → Inspección de URLs');
  lines.push('# Total: ' + (STATIC_PRIORITY.length + BRANDS_BY_PRIORITY.length + sortedProds.length) + ' URLs');
  lines.push('# Generado: ' + new Date().toISOString().slice(0, 10));
  lines.push('');
  lines.push('## TANDA 1 — DÍA 1 (las 10 más críticas: home + páginas principales + marcas grandes)');
  for (const p of STATIC_PRIORITY.slice(0, 5)) lines.push(SITE_BASE + p);
  for (const p of BRANDS_BY_PRIORITY.slice(0, 5)) lines.push(SITE_BASE + p);

  lines.push('');
  lines.push('## TANDA 2 — DÍA 2 (10 categorías + páginas estáticas + marcas medianas)');
  for (const p of STATIC_PRIORITY.slice(5, 13)) lines.push(SITE_BASE + p);
  for (const p of BRANDS_BY_PRIORITY.slice(5, 7)) lines.push(SITE_BASE + p);

  lines.push('');
  lines.push('## TANDA 3 — DÍA 3 (cierra estáticas + restantes marcas chicas)');
  for (const p of STATIC_PRIORITY.slice(13)) lines.push(SITE_BASE + p);
  for (const p of BRANDS_BY_PRIORITY.slice(7)) lines.push(SITE_BASE + p);

  lines.push('');
  lines.push('## TANDAS 4-25 — TOP PRODUCTOS (10/día, ordenados por calidad SEO)');
  let day = 4;
  for (let i = 0; i < sortedProds.length; i += 10) {
    lines.push('');
    lines.push(`# DÍA ${day} (productos ${i + 1}-${Math.min(i + 10, sortedProds.length)} de ${sortedProds.length})`);
    for (const p of sortedProds.slice(i, i + 10)) {
      lines.push(SITE_BASE + p.url);
    }
    day++;
  }

  const outPath = path.join(ROOT, 'urls-prioridad-google.txt');
  fs.writeFileSync(outPath, lines.join('\n') + '\n', 'utf8');
  console.log(`Generado: ${outPath}`);
  console.log(`Total URLs: ${STATIC_PRIORITY.length + BRANDS_BY_PRIORITY.length + sortedProds.length}`);
  console.log(`Tandas: ${3 + Math.ceil(sortedProds.length / 10)}`);
}

main();
