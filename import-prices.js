const XLSX = require('xlsx');
const fs = require('fs');

// ── Read Excel ──────────────────────────────────────────────────────────────
const wb = XLSX.readFile('C:/Users/valen/OneDrive/MDRACING - Lista de Precios.xlsx');
const xlsData = XLSX.utils.sheet_to_json(wb.Sheets['Lista de Precios']);

// ── Extract current values from app.js ─────────────────────────────────────
const src = fs.readFileSync('app.js', 'utf8');
const arrStart = src.indexOf('[', src.indexOf('const products = ['));
const current = {};

function skipStr(s, i) {
  const q = s[i]; i++;
  while (i < s.length) {
    if (s[i] === '\\') { i += 2; continue; }
    if (s[i] === q) { i++; break; }
    i++;
  }
  return i;
}

let i = arrStart + 1, depth = 0, objStart = -1;
while (i < src.length) {
  const ch = src[i];
  if (ch === "'" || ch === '"' || ch === '`') { i = skipStr(src, i); continue; }
  if (ch === ']' && depth === 0) break;
  if (ch === '{') { if (depth === 0) objStart = i; depth++; }
  else if (ch === '}') {
    depth--;
    if (depth === 0 && objStart !== -1) {
      const block = src.slice(objStart, i + 1);
      const g = (f) => { const m = block.match(new RegExp(f + ":\\s*'([^']*)'")); return m ? m[1] : ''; };
      const id = g('id');
      if (id) {
        const badgeMatch = block.match(/badge:\s*'([^']*)'/);
        current[id] = {
          name: g('name'),
          price: g('price'),
          salePrice: g('salePrice'),
          badge: badgeMatch ? badgeMatch[1] : '',
          start: objStart,
          end: i + 1,
        };
      }
      objStart = -1;
    }
  }
  i++;
}

// ── Helpers ─────────────────────────────────────────────────────────────────
function toStr(n) {
  if (!n && n !== 0) return '';
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

// ── Detect changes ──────────────────────────────────────────────────────────
const changes = [];
xlsData.forEach(row => {
  const id = row['ID'];
  const cur = current[id];
  if (!cur) return;
  const xlsName  = (row['Nombre'] || '').trim();
  const xlsPrice = row['Precio Normal'] ? toStr(row['Precio Normal']) : '';
  const xlsPromo = row['Precio Promoción'] ? toStr(row['Precio Promoción']) : '';
  const xlsBadge = (row['Badge'] || '').trim();

  const diffs = [];
  if (xlsName  && xlsName  !== cur.name)      diffs.push({ field: 'name',      from: cur.name,      to: xlsName  });
  if (xlsPrice && xlsPrice !== cur.price)      diffs.push({ field: 'price',     from: cur.price,     to: xlsPrice });
  if (xlsPromo !== (cur.salePrice || ''))      diffs.push({ field: 'salePrice', from: cur.salePrice, to: xlsPromo });
  if (xlsBadge !== (cur.badge || ''))          diffs.push({ field: 'badge',     from: cur.badge,     to: xlsBadge });
  if (diffs.length) changes.push({ id, diffs });
});

console.log('Cambios detectados:', changes.length);
changes.forEach(c => {
  console.log('\n' + c.id);
  c.diffs.forEach(d => console.log('  ' + d.field + ': "' + d.from + '" → "' + d.to + '"'));
});

if (changes.length === 0) { console.log('No hay cambios que aplicar.'); process.exit(0); }

// ── Apply changes to app.js ─────────────────────────────────────────────────
let out = src;
let offset = 0; // track position shifts from replacements

changes.forEach(({ id, diffs }) => {
  const cur = current[id];
  // Find block in (potentially shifted) source
  const blockStart = cur.start + offset;
  const blockEnd   = cur.end   + offset;
  let block = out.slice(blockStart, blockEnd);

  diffs.forEach(({ field, from, to }) => {
    if (field === 'name') {
      block = block.replace(new RegExp("(name:\\s*)'([^']*)'"), "$1'" + to.replace(/'/g, "\\'") + "'");
    } else if (field === 'price') {
      block = block.replace(new RegExp("(price:\\s*)'([^']*)'"), "$1'" + to + "'");
    } else if (field === 'salePrice') {
      if (to === '') {
        // Remove salePrice entirely
        block = block.replace(/,?\s*salePrice:\s*'[^']*'/, '');
      } else if (from === '') {
        // Add salePrice after price field
        block = block.replace(/(price:\s*'[^']*')/, "$1, salePrice: '" + to + "'");
      } else {
        block = block.replace(new RegExp("(salePrice:\\s*)'([^']*)'"), "$1'" + to + "'");
      }
    } else if (field === 'badge') {
      if (to === '') {
        block = block.replace(/badge:\s*'[^']*'/, 'badge: null');
      } else if (from === '') {
        block = block.replace(/(badge:\s*null)/, "badge: '" + to + "'");
      } else {
        block = block.replace(new RegExp("(badge:\\s*)'([^']*)'"), "$1'" + to + "'");
      }
    }
  });

  const newOut = out.slice(0, blockStart) + block + out.slice(blockEnd);
  offset += newOut.length - out.length;
  out = newOut;
});

fs.writeFileSync('app.js', out);
console.log('\napp.js actualizado con', changes.length, 'productos modificados.');
