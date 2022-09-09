const http = require('http');
const routes = require('./routes')

console.log(routes.someText)

const server = http.createServer(routes.handler);

server.listen(3000, () => {
    console.log("server running on port 3000")
});
