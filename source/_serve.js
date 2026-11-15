const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3847;
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.glb': 'model/gltf-binary',
  '.json': 'application/json'
};

const server = http.createServer(async (req, res) => {
  const urlPath = req.url.split('?')[0];

  // Handle serverless API route locally
  if (urlPath === '/api/coding-stats') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status = function(code) { this.statusCode = code; return this; };
    res.json = function(obj) {
      this.setHeader('Content-Type', 'application/json');
      this.end(JSON.stringify(obj));
    };
    try {
      const handler = require('./api/coding-stats.js');
      await handler(req, res);
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    }
    return;
  }

  let fp = path.join(__dirname, urlPath === '/' ? 'index.html' : urlPath);

  fs.stat(fp, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }
    const ext = path.extname(fp).toLowerCase();
    const ct = MIME[ext] || 'application/octet-stream';
    res.writeHead(200, {
      'Content-Type': ct,
      'Content-Length': stats.size,
      'Access-Control-Allow-Origin': '*'
    });
    fs.createReadStream(fp).pipe(res);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
