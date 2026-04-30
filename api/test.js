module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const key = process.env.ANTHROPIC_API_KEY;

  if (!key) {
    return res.status(200).json({ ok: false, error: 'ANTHROPIC_API_KEY no encontrada en las variables de entorno' });
  }

  try {
    const Anthropic = require('@anthropic-ai/sdk');
    const client = new Anthropic({ apiKey: key });

    const response = await client.messages.create({
      model: 'claude-haiku-4-5',
      max_tokens: 50,
      messages: [{ role: 'user', content: 'Responde solo: OK' }],
    });

    return res.status(200).json({ ok: true, reply: response.content[0].text });
  } catch (err) {
    return res.status(200).json({ ok: false, error: err.message, status: err.status });
  }
};
