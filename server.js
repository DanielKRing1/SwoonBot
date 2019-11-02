const http = require('http');

const server = http.createServer((req, res) => {
    const rng = Math.random();

    const payload = JSON.stringify({
        processID: process.pid,
        rng
    });

    console.log(`Rng ${rng}...\n...from Process ${process.pid}\n\n`)

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(payload);
}).listen(3005);

console.log("Running Rng Server");