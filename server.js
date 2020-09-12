const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer')
var upload = multer({ dest: 'uploads/' })
const server = express();

const startDotenv = require('./src/bin/env').startDotenv;
startDotenv();

const bodyParser = require('body-parser');
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'log/access.log'),
  {
    flags: 'a',
  },
);

const startMorgan = require('./src/bin/morgan').startMorgan;
startMorgan(server, accessLogStream);

let serverOptions;
try {
  serverOptions = require('./server-config.json');
} catch (error) {
  //console.debug(error)
}

if (!serverOptions) {
  serverOptions = {
    server: 'express',
    mail: false,
    cors: false,
    helment: false,
    jwt: false,
    fireadmin: false,
    uploads: false,
    http: true,
    https: false,
    static: 'public',
    webpack: true,
  };
}

server.post('*', upload.single('file'), function (req, res, next) {
	next();
})

server.delete('*', upload.single('file'), function (req, res, next) {
	next();
})

if (serverOptions.webpack) {
  const webpack = require('webpack'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware');

  const webpackDevConfig = require(`./src/webpack/config/webpack.${
    process.env.NODE_ENV ? process.env.NODE_ENV : 'development'
  }.js`);

  var compiler = webpack(webpackDevConfig(process.env));

  server.use(
    webpackDevMiddleware(compiler, {
      publicPath: webpackDevConfig.publicPath,
      stats: 'errors-only',
      noInfo: true,
      requestTimeout: 200000,
    }),
  );

  server.use(webpackHotMiddleware(compiler));
}

if (serverOptions.static) {
  server.use(
    process.env.PUBLIC_FOLDER,
    express.static(process.env.PUBLIC_FOLDER),
  );
}

if (serverOptions.helment) {
  const startHelmet = require('./src/bin/helmet').startHelmet;
  startHelmet(server);
}

if (serverOptions.cors) {
  const startCors = require('./src/bin/cors').startCors;
  startCors(server);
}

if (serverOptions.jwt) {
  const checkReqErrors = require('./src/includes/status').checkReqErrors;
  const jsonWebToken = require('jsonwebtoken');
  const myJWTSecretKey = require('./src/includes/jwt').myJWTSecretKey;

  server.use('/api/auth', (req, res, next) => {
    try {
      if (!req.headers.authorization) {
        checkReqErrors({error: 'You are not Authorized'}, res);
        return;
      }
      jsonWebToken.verify(
        req.headers.authorization.replace(/^Bearer\s/, ''),
        myJWTSecretKey(),
      );
      next();
    } catch (error) {
      console.debug('JWT LOGIN ERROR', error);
      checkReqErrors({error: error}, res);
    }
  });
}

if (serverOptions.fireadmin) {
  const fireAdminDB = require('./src/includes/firebase/admin').fireAdminDB;

  fireAdminDB()
    .then(base => {
      if (process.env.NODE_ENV === 'development')
        console.debug('Firebase Admin: ', base.name);
    })
    .catch(err => {
      console.debug(err);
    });
}

let http, https, httpServer, httpsServer;

if (serverOptions.http) {
  http = require('http');
  httpServer = http.createServer(server);
}

if (serverOptions.https) {
  https = require('https');
  privateKey = fs.readFileSync('certificates/key.pem', 'utf8');
  certificate = fs.readFileSync('certificates/cert.pem', 'utf8');
  credentials = {key: privateKey, cert: certificate};
  httpsServer = https.createServer(credentials, server);
}

//./bin/express.js
if (serverOptions.server === 'express') {
  const startExpress = require('./src/bin/express').startExpress;
  startExpress(server, serverOptions, {
    http: http,
    httpServer: httpServer,
    https: https,
    httpsServer: httpsServer,
  });
  return;
}

module.exports.server = server;
module.exports.serverOptions = serverOptions;
