const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    if (req.url === '/' || req.url === '/index.html') {
        serveFile(res, './public/index.html', 'text/html');
    } else if (req.url === '/style.css') {
        serveFile(res, './public/style.css', 'text/css');
    } else if (req.url === '/script.js') {
        serveFile(res, './public/script.js', 'application/javascript');
    } else if (req.url === '/questions') {
        serveFile(res, './questions.json', 'application/json');
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

function serveFile(res, filePath, contentType) {
    fs.readFile(path.join(__dirname, filePath), (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    });
}

server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});