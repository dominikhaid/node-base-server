const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const { parse } = require('url');
const handle = nextApp.getRequestHandler();
const multer = require('multer');
var upload = multer();

function startServer(server, serverOptions, protocol) {
  nextApp
    .prepare()
    .then(() => {
      server.get('*', upload.none(), (req, res) => {
        return handle(req, res);
      });

      server.post('*', upload.none(), (req, res) => {
        return handle(req, res);
      });

      server.delete('*', upload.none(), (req, res) => {
        return handle(req, res);
      });

      server.patch('*', upload.none(), (req, res) => {
        return handle(req, res);
      });

      server.put('*', upload.none(), (req, res) => {
        return handle(req, res);
      });

      server.get('/', (req, res) => {
        const parsedUrl = parse(req.url, true);
        return handle(req, res, parsedUrl);
      });

      port = process.env.PORT || 5000;
      if (protocol.httpServer) protocol.httpServer.listen(port);
      if (protocol.httpsServer) protocol.listen(port);
      if (!protocol.httpServer && !protocol.httpsServer) server.listen(port);

      console.debug('\nNext.js start at: ' + port);
    })
    .catch((ex) => {
      console.error(ex.stack);
      process.exit(1);
    });
}

module.exports.startServer = startServer;
