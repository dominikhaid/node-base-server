# Node.js Express Server with Webpack

This is our base node Express.js server. It comes with some advanced node
modules. All future packages will build on to of this server. If you start a new
project this repository is you entrance point. Any of our node projects will be
an extension and completely compatible to this.

## Included Modules

- Express.js
- Morgan Logger
- Multer Upload Handler
- Bodypaser
- Jwt
- Cors
- Helmet
- Webpack
- .env
- XSS

## Files And Folders

- server-config.json -> CORS, HELMET, JWT and some other options
- /public -> assets
- /log -> morgan server logs
- /src/bin -> basic server modules
- /src/includes -> expresss middelware
- /src/routers/ -> express routes
- /src/webpack/config -> config files for webpack
- /src/webpack/app -> pages default entry point
- /src/webpack/build -> your build will go here

## Use

1.  yarn run install
2.  yarn run start -> prod mode
3.  yarn run dev -> dev mode live reloade @ host:port/?reload=true
4.  yarn run build -> webpack build
5.  yarn run format -> format files with prettier
