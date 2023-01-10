// node recommends to still import;
// https://nodejs.org/api/buffer.html#buffer
import { Buffer } from 'node:buffer';
import { createServer } from 'node:http';
import { randomUUID } from 'node:crypto';
import { Transform } from 'node:stream';

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, cb) {
    const modifiedData = Number(chunk.toString()) * -1;

    console.log(modifiedData);

    cb(null, Buffer.from(String(modifiedData)));
  }
}

const users = [];
const server = createServer(async (req, res) => {
  const { method, url } = req;
  const buffers = [];

  for await (const chunks of req) {
    buffers.push(chunks);
  }

  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString());
  } catch (err) {
    req.body = null;
  }

  if (method === 'GET' && url === '/users') {
    return res
      .setHeader('Content-Type', 'application/json')
      .end(JSON.stringify(users));
  }

  if (method === 'POST' && url === '/users') {
    const { name, email } = req.body;

    users.push({
      id: randomUUID(),
      name,
      email,
    });
    return res.writeHead(201).end('criando um usuário');
  }

  return res.writeHead(404).end('No routes found');
});

server.listen(5000, () => {
  console.log(`Server started!!`);
});
