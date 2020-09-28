function startServer(server, serverOptions, protocol) {
  const apiStatus = require('../routers/routes');
  server.use('/api', apiStatus);

  port = process.env.PORT || 5000;
  if (protocol.httpServer) protocol.httpServer.listen(port);
  if (protocol.httpsServer) protocol.httpsServer.listen(port);
  if (!protocol.httpServer && !protocol.httpsServer) server.listen(port);

  if (process.env.NODE_ENV === 'development') {
    console.debug(`Server at: ${process.env.HOST}:${port}`);
  }
}

module.exports.startServer = startServer;
