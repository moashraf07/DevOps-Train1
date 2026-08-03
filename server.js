const http = require('http');

const port = 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end('<!DOCTYPE html><html><head><meta charset="utf-8"><title>My Page</title></head><body><h1>Hello My name Mohamed</h1></body></html>');
});

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
