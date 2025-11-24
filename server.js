const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 3000;

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.svg': 'image/svg+xml',
  '.json': 'application/json'
};

// Function to serve files with proper MIME types
function serveFile(res, filePath, contentType) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        serve404(res);
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 - Internal Server Error');
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
}

// 404 Error handler
function serve404(res) {
  fs.readFile('./404.html', (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 - Page Not Found');
    } else {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end(data);
    }
  });
}

const server = http.createServer((req, res) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  
  // Parse URL
  const parsedUrl = url.parse(req.url, true);
  let pathname = parsedUrl.pathname;
  
  // Set default file for root path
  if (pathname === '/') {
    pathname = '/dashboard.html';
  }
  
  // Get file path and extension
  const filePath = '.' + pathname;
  const extname = path.extname(filePath);
  
  // Set content type
  const contentType = MIME_TYPES[extname] || 'text/plain';
  
  // Serve the file
  serveFile(res, filePath, contentType);
});

server.listen(PORT, () => {
  console.log('🚀 Network Learning Dashboard Server Started!');
  console.log(`📍 Server running at: http://localhost:${PORT}`);
  console.log('📖 Available Pages:');
  console.log('   • Dashboard: http://localhost:3000');
  console.log('   • What is Networking: http://localhost:3000/What_is_Networking.html');
  console.log('   • PAN: http://localhost:3000/PAN.html');
  console.log('   • LAN: http://localhost:3000/LAN.html');
  console.log('   • WAN: http://localhost:3000/WAN.html');
  console.log('\nPress Ctrl+C to stop the server');
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down server...');
  server.close(() => {
    console.log('✅ Server stopped successfully');
    process.exit(0);
  });
});