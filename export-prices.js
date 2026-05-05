const fs = require('fs');
const XLSX = require('xlsx');

const src = fs.readFileSync('app.js', 'utf8');
const arrStart = src.indexOf('[', src.indexOf('const products = ['));
const products = [];

let i = arrStart + 1;
let depth = 0;
let objStart = -1;

function skipString(src, i) {
  const quote = src[i];
  i++;
  while (i < src.length) {
    const ch = src[i];
    if (ch === '\\') { i += 2; continue; }
    if (ch === quote) { i++; break; }
    i++;
  }
  return i;
}

while (i < src.length) {
  const ch = src[i];

  if (ch === "'" || ch === '"' || ch === '`') {
    i = skipString(src, i);
    continue;
  }

  if (ch === ']' && depth === 0) break;

  if (ch === '{') {
    if (depth === 0) objStart = i;
    depth++;
  } else if (ch === '}') {
    depth--;
    if (depth === 0 && objStart !== -1) {
      const block = src.slice(objStart, i + 1);
      const get = (field) => {
        const re = new RegExp(field + ":\\s*'([^']*)'");
        const m = block.match(re);
        return m ? m[1] : '';
      };
      const badge = block.match(/badge:\s*'([^']*)'/) ? block.match(/badge:\s*'([^']*)'/)[1] : '';
      const p = {
        ID:              get('id'),
        Nombre:          get('name'),
        'Categoría':     get('cat'),
        CatID:           get('catId'),
        Badge:           badge,
        'Precio Normal': get('price'),
        'Precio Promoción': get('salePrice'),
      };
      if (p.ID && p.Nombre) products.push(p);
      objStart = -1;
    }
  }
  i++;
}

console.log('Total productos:', products.length);
const conPromo = products.filter(p => p['Precio Promoción']);
console.log('Con precio de promoción:', conPromo.length);
conPromo.forEach(p => console.log(' ', p.Nombre, '| Normal:', p['Precio Normal'], '| Promo:', p['Precio Promoción']));

// Build Excel
const wb = XLSX.utils.book_new();

// Sheet data
const header = ['ID', 'Nombre', 'Categoría', 'CatID', 'Badge', 'Precio Normal', 'Precio Promoción'];
const ws = XLSX.utils.json_to_sheet(products, { header });

// Column widths
ws['!cols'] = [
  { wch: 58 },  // ID
  { wch: 52 },  // Nombre
  { wch: 26 },  // Categoría
  { wch: 26 },  // CatID
  { wch: 13 },  // Badge
  { wch: 17 },  // Precio Normal
  { wch: 19 },  // Precio Promoción
];

// Freeze top row
ws['!freeze'] = { xSplit: 0, ySplit: 1 };

XLSX.utils.book_append_sheet(wb, ws, 'Lista de Precios');

// Instructions sheet
const instrData = [
  { Instrucción: '📋 INSTRUCCIONES DE USO' },
  { Instrucción: '' },
  { Instrucción: '1. Modificá los valores en las columnas "Precio Normal" y/o "Precio Promoción".' },
  { Instrucción: '2. Para quitar un precio de promoción, dejá la celda vacía.' },
  { Instrucción: '3. Los precios deben tener el formato: 99.000 (sin $ ni puntos de miles en distinción).' },
  { Instrucción: '4. NO modifiques la columna ID — es usada para identificar cada producto en el código.' },
  { Instrucción: '5. NO agregues ni borres filas.' },
  { Instrucción: '6. Una vez modificado, enviame el archivo y ejecuto los cambios automáticamente.' },
];
const wsInstr = XLSX.utils.json_to_sheet(instrData, { header: ['Instrucción'], skipHeader: true });
wsInstr['!cols'] = [{ wch: 90 }];
XLSX.utils.book_append_sheet(wb, wsInstr, 'Instrucciones');

const outPath = 'C:/Users/valen/OneDrive/MDRACING - Lista de Precios.xlsx';
XLSX.writeFile(wb, outPath);
console.log('\nExcel guardado en:', outPath);
