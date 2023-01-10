export async function json(req, res) {
  const buffers = [];

  for await (const chunks of req) {
    buffers.push(chunks);
  }

  try {
    // Buffer: espaço de memória binaria, ótima para movimentar
    // grandes dados de maneira rápida na memória
    req.body = JSON.parse(Buffer.concat(buffers).toString());
  } catch (err) {
    req.body = null;
  }

  res.setHeader('Content-Type', 'application/json');
}
