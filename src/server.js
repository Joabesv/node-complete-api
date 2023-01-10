import { createServer } from 'node:http';

const server = createServer((req, res) => {
  const { method, url } = req;

  if (method === 'GET' && url === '/users') {
    return res.end('Listagem de usuários');
  }

  if (method === 'POST' && url === '/users') {
    return res.end('criando um usuário');
  }

  return res.end('Salve rapa');
});

server.listen(5000, () => {
  console.log(`Server started!!`);
});
