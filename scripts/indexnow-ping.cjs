#!/usr/bin/env node
/**
 * IndexNow API ping — notifica Bing/Yandex/Seznam de URLs nuevas o actualizadas
 *
 * Se ejecuta automáticamente como parte del build de Vercel (en vercel-build,
 * después del prerender). Lee data/products.json + sitemap para armar la lista
 * de URLs y manda un único POST con todas.
 *
 * Aunque Google no usa IndexNow directamente, su crawler lee Bing índice y
 * los rumores indican que están testeando aceptarlo. Bing/Yandex sí lo procesan
 * en horas (vs días/semanas de Google).
 *
 * Setup: necesita el archivo de verificación en raíz (KEY.txt) que ya está.
 * Sin necesidad de API key adicional, sin env vars.
 *
 * Modo SAFE: si falla el ping (red, rate limit, etc.) no rompe el build.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const https = require('https');

const ROOT = path.resolve(__dirname, '..');
const SITE_BASE = 'https://www.mdracingfundas.com';
const HOST = 'www.mdracingfundas.com';
const KEY = '12aed6056dfda8df60a59c9ec96409f2';
const KEY_LOCATION = `${SITE_BASE}/${KEY}.txt`;

function buildUrlList() {
  // Tomamos todas las URLs del sitemap (es la lista canónica generada por prerender).
  const sitemapPath = path.join(ROOT, 'sitemap.xml');
  if (!fs.existsSync(sitemapPath)) {
    console.warn('[indexnow] sitemap.xml no existe — skipeando ping');
    return [];
  }
  const xml = fs.readFileSync(sitemapPath, 'utf8');
  const matches = xml.match(/<loc>([^<]+)<\/loc>/g) || [];
  return matches.map(m => m.replace(/<\/?loc>/g, ''));
}

function pingIndexNow(urls) {
  return new Promise((resolve) => {
    if (!urls.length) return resolve({ ok: false, error: 'no urls' });

    const body = JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList: urls,
    });

    const req = https.request({
      method: 'POST',
      hostname: 'api.indexnow.org',
      path: '/IndexNow',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(body),
        'Host': 'api.indexnow.org',
      },
      timeout: 15000,
    }, (res) => {
      let chunks = '';
      res.on('data', c => { chunks += c; });
      res.on('end', () => {
        const ok = res.statusCode >= 200 && res.statusCode < 300;
        resolve({ ok, status: res.statusCode, body: chunks });
      });
    });
    req.on('error', err => resolve({ ok: false, error: err.message }));
    req.on('timeout', () => { req.destroy(); resolve({ ok: false, error: 'timeout' }); });
    req.write(body);
    req.end();
  });
}

async function main() {
  // Skip si está deshabilitado por env var (útil en CI/staging)
  if (process.env.INDEXNOW_DISABLED === '1') {
    console.log('[indexnow] disabled via INDEXNOW_DISABLED=1');
    return;
  }

  const urls = buildUrlList();
  console.log(`[indexnow] enviando ${urls.length} URLs a IndexNow (Bing/Yandex/Seznam)...`);

  const result = await pingIndexNow(urls);
  if (result.ok) {
    console.log(`[indexnow] OK — status ${result.status} (Bing/Yandex/Seznam notificados)`);
  } else {
    // Soft-fail: log el error y seguimos. Que falle el ping no debería romper el deploy.
    console.warn(`[indexnow] ping falló: ${result.error || 'status ' + result.status} — no es crítico`);
    if (result.body) console.warn('[indexnow] response body:', String(result.body).slice(0, 200));
  }
}

main().catch(err => {
  console.warn('[indexnow] exception:', err.message);
  process.exit(0); // siempre exit 0 para no romper el build
});
