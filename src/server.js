import { createServer } from 'node:http';

const server = createServer((req, res) => {
  return res.end('Salve rapa')
})

server.listen(5000, () => {
  console.log(`Server started!!`)
})