const Anthropic = require('@anthropic-ai/sdk');
const { SYSTEM_PROMPT } = require('../bot/knowledge.js');
const { applyCors } = require('../lib/cors');

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

module.exports = async function handler(req, res) {
  if (applyCors(req, res)) return;
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Se requiere un array de messages.' });
  }

  try {
    const response = await client.messages.create({
      model: 'claude-haiku-4-5',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages,
    });

    return res.status(200).json({ message: response.content[0].text });
  } catch (err) {
    console.error('Error Claude API:', err.message);
    return res.status(500).json({ error: 'Error al procesar tu consulta. Intentá de nuevo.' });
  }
};
