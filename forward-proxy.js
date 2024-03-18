const http = require('http');
const https = require('https');
const { URL } = require('url');

const PORT = 3456;

const requestHandler = (clientReq, clientRes) => {
    const parsedUrl = new URL(clientReq.url);

    const requestOptions = {
        hostname: parsedUrl.hostname,
        port: parsedUrl.port || (parsedUrl.protocol === 'https:' ? 443 : 80),
        path: parsedUrl.pathname + parsedUrl.search,
        method: clientReq.method,
        headers: clientReq.headers
    };

    const proxyReq = (parsedUrl.protocol === 'https:' ? https : http).request(requestOptions, (proxyRes) => {
        if (proxyRes.headers['content-type'] && proxyRes.headers['content-type'].includes('text/html')) {
            let responseData = '';
            proxyRes.on('data', (chunk) => {
                responseData += chunk;
            });
            proxyRes.on('end', () => {
                if (responseData.toLowerCase().includes('html')) {
                    responseData += 'NODEJS';
                }
                clientRes.writeHead(proxyRes.statusCode, proxyRes.headers);
                clientRes.end(responseData);
            });
        } else {
            proxyRes.pipe(clientRes, {
                end: true
            });
        }
    });

    proxyReq.on('error', (err) => {
        console.error('Proxy Request Error:', err);
        clientRes.writeHead(500);
        clientRes.end('Proxy Request Error');
    });

    clientReq.pipe(proxyReq, {
        end: true
    });
};

const server = http.createServer(requestHandler);

server.on('error', (err) => {
    console.error('Server Error:', err);
});

server.listen(PORT, () => {
    console.log(`Forward Proxy Server is listening on port ${PORT}`);
});
