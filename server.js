const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 4178;
const HOST = '0.0.0.0';
const DIST_DIR = path.join(__dirname, 'dist');

const MIME_TYPES = {
	'.html': 'text/html',
	'.js': 'text/javascript',
	'.css': 'text/css',
	'.json': 'application/json',
	'.png': 'image/png',
	'.jpg': 'image/jpg',
	'.gif': 'image/gif',
	'.svg': 'image/svg+xml',
	'.wav': 'audio/wav',
	'.mp4': 'video/mp4',
	'.woff': 'application/font-woff',
	'.ttf': 'application/font-ttf',
	'.eot': 'application/vnd.ms-fontobject',
	'.otf': 'application/font-otf',
	'.wasm': 'application/wasm',
};

const server = http.createServer((req, res) => {
	// Логирование запросов для отладки
	console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);

	// CORS headers
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

	if (req.method === 'OPTIONS') {
		res.writeHead(200);
		res.end();
		return;
	}

	// Убираем query string и нормализуем путь
	let filePath = req.url.split('?')[0];
	if (filePath === '/') {
		filePath = '/index.html';
	}

	const fullPath = path.join(DIST_DIR, filePath);
	const ext = path.extname(fullPath).toLowerCase();
	const contentType = MIME_TYPES[ext] || 'application/octet-stream';

	fs.readFile(fullPath, (err, content) => {
		if (err) {
			if (err.code === 'ENOENT') {
				// Если файл не найден, пробуем index.html (для SPA роутинга)
				fs.readFile(path.join(DIST_DIR, 'index.html'), (err2, content2) => {
					if (err2) {
						console.error(`Error serving ${req.url}: ${err2.message}`);
						res.writeHead(404);
						res.end('File not found');
					} else {
						console.log(`Serving index.html for ${req.url}`);
						res.writeHead(200, { 'Content-Type': 'text/html' });
						res.end(content2, 'utf-8');
					}
				});
			} else {
				console.error(`Error reading ${req.url}: ${err.message}`);
				res.writeHead(500);
				res.end(`Server Error: ${err.code}`);
			}
		} else {
			res.writeHead(200, { 'Content-Type': contentType });
			res.end(content, 'utf-8');
		}
	});
});

server.on('error', (err) => {
	console.error('Server error:', err);
	process.exit(1);
});

server.listen(PORT, HOST, () => {
	console.log(`Server running at http://${HOST}:${PORT}/`);
	console.log(`Listening on all interfaces (0.0.0.0)`);
	
	// Проверяем, что сервер действительно слушает
	const address = server.address();
	console.log(`Server address: ${JSON.stringify(address)}`);
});

// Обработка необработанных ошибок
process.on('uncaughtException', (err) => {
	console.error('Uncaught Exception:', err);
	process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
	console.error('Unhandled Rejection at:', promise, 'reason:', reason);
	process.exit(1);
});

