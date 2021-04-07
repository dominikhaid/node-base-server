const server = require('./src/bin/main').server;
const serverOptions = require('./src/bin/main').serverOptions;
const fs = require('fs');

let port = process.env.PORT || 5000;
let protocol = serverOptions.https ? require('http') : require('http');
let httpServer = serverOptions.https
  ? protocol.createServer(
      {
        key: fs.readFileSync('certificates/key.pem', 'utf8'),
        cert: fs.readFileSync('certificates/cert.pem', 'utf8'),
      },
      server,
    )
  : protocol.createServer(server);

if (serverOptions.server === 'express') {
  const routes = require('./src/routers/routes');
  routes && server.use('/api', routes);

  httpServer ? httpServer.listen(port) : server.listen(port);

  console.debug(`Express server at: ${process.env.HOST}:${port}`);

  return;
}
