const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db-step1.json'); // Your db file
const middlewares = jsonServer.defaults();

// Increase limit for JSON bodies
server.use(jsonServer.bodyParser({ limit: '5mb' }));

server.use(middlewares);
server.use(router);
server.listen(3000, () => {
    console.log('JSON Server is running with increased limit');
});
