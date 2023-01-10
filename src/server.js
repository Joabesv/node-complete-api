import { createServer } from 'node:http';
import { randomUUID } from 'node:crypto';

const users = [];

const server = createServer((req, res) => {
  const { method, url } = req;

  if (method === 'GET' && url === '/users') {
    return res
      .setHeader('Content-Type', 'application/json')
      .end(JSON.stringify(users));
  }

  if (method === 'POST' && url === '/users') {
    users.push({
      id: randomUUID(),
      name: 'Joaozinho123',
      email: 'joaozinhoMaisBrabo@gmail.com',
    });

    return res.end('criando um usuário');
  }

  return res.end('Salve rapa');
});

server.listen(5000, () => {
  console.log(`Server started!!`);
});
