const http = require('http');
const os = require('os');

// Create an HTTP server
const server = http.createServer((req, res) => {
    // Set the appropriate headers for SSE
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });

    // Send a welcome message to the client
    res.write('data: Welcome to the SSE server!\n\n');

    // Periodically send events to the client
    const intervalId = setInterval(() => {
        const eventData = `data: ${JSON.stringify({ message: 'Hello from the server!' })}\n\n`;
        res.write(eventData);
    }, 3000);

    // Close the connection when the client closes the connection
    req.on('close', () => {
        clearInterval(intervalId);
        console.log('Client disconnected');
    });
});

// Start the server
const port = 3000; // You can change this to any port you prefer
server.listen(port, () => {
    const networkInterfaces = os.networkInterfaces();
    const ipAddresses = Object.values(networkInterfaces)
        .flat()
        .filter((iface) => iface.family === 'IPv4' && !iface.internal)
        .map((iface) => iface.address);
    console.log(`Server running at http://${ipAddresses[0]}:${port}/`);
});
