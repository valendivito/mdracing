/**
 * MDRACING — Análisis de videos con Claude
 *
 * Recibe transcript + options del usuario y genera los outputs seleccionados.
 *
 * Options disponibles (booleanos):
 *   - transcript_clean: limpiar la transcripción cruda con puntuación y formato
 *   - subtitles: subtítulos timestampeados estilo CapCut (formato SRT)
 *   - structure_analysis: análisis de hook/retención/payoff/CTA del video original
 *   - mdracing_adaptation: 2-3 versiones de guion adaptadas al estilo MDRACING
 *   - caption_ig: caption sugerido para Instagram MDRACING
 *   - hashtags: hashtags relevantes para el rubro automotor argentino
 *   - hook_variants: 3 variantes de hook (indignación / curiosidad / autoridad)
 *   - summary: resumen corto de qué es el video
 *
 * Devuelve un objeto JSON con SOLO los campos que el usuario pidió.
 */

'use strict';

const Anthropic = require('@anthropic-ai/sdk');

let _client = null;
function getClient() {
  if (_client) return _client;
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) throw new Error('ANTHROPIC_API_KEY no configurada');
  _client = new Anthropic({ apiKey: key });
  return _client;
}

const MODEL = process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-6';

function buildSystemPrompt() {
  return `Sos analista experto en marketing de contenido viral para Instagram y TikTok, trabajando para MDRACING.

CONTEXTO DE LA MARCA MDRACING:
- Fábrica argentina de fundas para asientos, cubre autos antigranizo, cubre capots, alfombras termoformadas, accesorios.
- 25 años de trayectoria (desde 2000). Fábrica en Villa Ballester, San Martín, Bs As.
- Sitio: mdracingfundas.com · IG: @mdracingfundas · WhatsApp: +54 9 11 5490-7774
- Diferenciales: fábrica directa, productos a medida por marca y modelo de auto, 10% OFF transferencia, envíos a todo el país, garantía 30 días.

ESTILO MDRACING:
- Argentino directo (vos), sin vueltas.
- Confianza basada en hechos concretos (25 años, fábrica propia, modelo de auto). NO superlativos huecos.
- Fondo BLANCO en diseños (light theme), no negro. Rojo MDRACING #d10000 como acento.
- NUNCA mencionar "Autopartes M3" (es OTRA marca, no MDRACING).

ESTRUCTURA OBLIGATORIA DE TODO CONTENIDO:
1. GANCHO (0-2s): viral probado (pattern interrupt, loss aversion, curiosity gap, contrarian, comparativa visceral). NUNCA genérico tipo "¿Sabías que...?".
2. RETENCIÓN: razones concretas para seguir mirando. Cortes cada 2-3s en reels. Subtítulos siempre.
3. CTA: UNO SOLO, específico y medible. WhatsApp, comentar, guardar, etiquetar, seguir.

Tus respuestas SIEMPRE son un objeto JSON válido. Sin texto extra fuera del JSON.`;
}

function buildUserPrompt({ transcript, options, videoUrl, title, description, hasCaptions }) {
  const parts = [];
  const hasTranscript = !!(transcript && transcript.length >= 10);

  if (hasTranscript) {
    parts.push(`Analicé este video. Tenés su transcripción completa abajo. Generá el JSON con SOLO los campos que te pido (no inventes campos extras).`);
  } else {
    parts.push(`MODO BEST-EFFORT: este video NO tiene captions/subtítulos disponibles, así que no tengo la transcripción del audio. Trabajá con la metadata que sí tengo (título + descripción + URL) e indicá en cada campo cuando estés inferiendo. Si pide algo que requiere el audio (subtitles SRT por ejemplo), devolvé un string que diga "No disponible — el video no tiene captions accesibles".`);
  }

  if (title) parts.push(`Título del video: "${title}"`);
  if (description) parts.push(`Descripción del video:\n"""${description.slice(0, 2000)}"""`);
  if (videoUrl) parts.push(`URL original: ${videoUrl}`);

  if (hasTranscript) {
    parts.push(`\n=== TRANSCRIPCIÓN ===\n${transcript}\n=== FIN TRANSCRIPCIÓN ===\n`);
  } else {
    parts.push(`\n=== TRANSCRIPCIÓN ===\n[NO DISPONIBLE — trabajá con metadata]\n=== FIN TRANSCRIPCIÓN ===\n`);
  }

  parts.push(`CAMPOS QUE TENÉS QUE GENERAR (incluí SOLO los marcados):\n`);

  if (options.transcript_clean) {
    parts.push(`* "transcript_clean": string. Reescribí la transcripción cruda con puntuación correcta, párrafos, sin muletillas.`);
  }
  if (options.subtitles) {
    parts.push(`* "subtitles": string en formato SRT. Cortá cada subtítulo en máximo 2 líneas de ~7 palabras.`);
  }
  if (options.structure_analysis) {
    parts.push(`* "structure_analysis": objeto { "hook": string, "retention": string, "payoff": string, "cta": string, "score": número 1-10, "strengths": string[], "weaknesses": string[] }.`);
  }
  if (options.mdracing_adaptation) {
    parts.push(`* "mdracing_adaptation": array de 2-3 objetos { "title": string, "angle": string (qué producto MDRACING encaja), "script": string (guion completo segundo a segundo con fórmula gancho→retención→CTA), "estimated_duration": string }. CTA siempre concreto: WhatsApp +54 9 11 5490-7774 o link en bio.`);
  }
  if (options.caption_ig) {
    parts.push(`* "caption_ig": objeto { "short": string (~100 chars), "long": string (200-400 chars con storytelling) }. Tono argentino directo, vos.`);
  }
  if (options.hashtags) {
    parts.push(`* "hashtags": array de 10-15 hashtags para rubro automotor argentino. Mix amplios + nicho + intent.`);
  }
  if (options.hook_variants) {
    parts.push(`* "hook_variants": array de 3 objetos { "type": string ("indignación"|"curiosidad"|"autoridad"), "text": string (texto on-screen en MAYÚSCULAS) }.`);
  }
  if (options.summary) {
    parts.push(`* "summary": string. Resumen de 2-3 oraciones de qué es el video.`);
  }

  parts.push(`\nDevolveme el JSON puro, sin markdown wrapper (sin triple backtick), sin texto antes ni después.`);
  return parts.join('\n');
}

async function analyzeVideo({ transcript, segments, options, videoUrl, title, description, hasCaptions }) {
  // NO fallar si no hay transcript — el análisis trabaja "best effort" con
  // metadata (título + descripción) y le aclara a Claude que no tiene audio.
  const hasTranscript = !!(transcript && transcript.length >= 10);

  // Si el usuario no marcó ningún output, ponemos summary por default
  const activeOptions = Object.keys(options || {}).filter(k => options[k]);
  if (activeOptions.length === 0) {
    options = { ...(options || {}), summary: true };
  }

  // Si no hay transcript pero tampoco metadata, ahí sí no podemos hacer nada
  if (!hasTranscript && !title && !description) {
    return { ok: false, error: 'No hay ni transcripción ni metadata del video. Verificá que la URL sea pública y accesible.' };
  }

  try {
    const client = getClient();
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 4000,
      system: buildSystemPrompt(),
      messages: [
        { role: 'user', content: buildUserPrompt({ transcript, options, videoUrl, title, description, hasCaptions }) },
      ],
    });

    const text = response.content
      .filter(c => c.type === 'text')
      .map(c => c.text)
      .join('');

    // Claude a veces wrappea el JSON en ```json ... ```. Lo limpio.
    const cleaned = text
      .trim()
      .replace(/^```(?:json)?\s*/i, '')
      .replace(/\s*```\s*$/, '');

    let analysis;
    try {
      analysis = JSON.parse(cleaned);
    } catch (e) {
      // Fallback: extraer entre primer { y último }
      const start = cleaned.indexOf('{');
      const end = cleaned.lastIndexOf('}');
      if (start >= 0 && end > start) {
        try { analysis = JSON.parse(cleaned.slice(start, end + 1)); }
        catch (e2) { return { ok: false, error: 'Claude devolvió respuesta no parseable como JSON', raw: cleaned.slice(0, 500) }; }
      } else {
        return { ok: false, error: 'Claude devolvió respuesta sin JSON', raw: cleaned.slice(0, 500) };
      }
    }

    return { ok: true, analysis };
  } catch (e) {
    return { ok: false, error: e.message };
  }
}

module.exports = {
  analyzeVideo,
};
