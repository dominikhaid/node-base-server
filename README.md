
# Node.js Express Server with Webpack


## Includet Modules

- Morgan Logger
- Multer Upload Handler
- Bodypaser
- Nodemailer
- Jwt
- Cors
- Helmet
- Webpack
- Firebase Admin SDK
- .env

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

1.  run yarn install
2.  run yarn start -> prod mode
3.  run yarn dev -> dev mode live reloade @ host:port/?reload=true 
4.  run yarn build -> webpack build
5.  run yarn format -> format files with prettier
