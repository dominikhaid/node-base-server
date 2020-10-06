# Modular Express.js Server

---

</br>

- [Modular Express.js Server](#modular-expressjs-server)
	- [Description](#description)
	- [Setup](#setup)
	- [Usage](#usage)
	- [Core Modules](#core-modules)
		- [Express.js](#expressjs)
		- [Cors](#cors)
		- [Helmet / CSP](#helmet--csp)
		- [Jwt](#jwt)
		- [Xss](#xss)
		- [Other](#other)
	- [Plugins](#plugins)
		- [Server](#server)
			- [Next.js](#nextjs)
			- [Apollo GraphQL](#apollo-graphql)
		- [Database](#database)
			- [MySql / Sqlite / PostgreSQL](#mysql--sqlite--postgresql)
			- [JSON file DB](#json-file-db)
			- [MongoDB](#mongodb)
			- [Firebase](#firebase)
		- [Ui](#ui)
			- [Ant Design](#ant-design)
			- [Bootstrap / React Bootstrap](#bootstrap--react-bootstrap)
			- [Material Ui](#material-ui)
			- [Semantic Ui](#semantic-ui)
			- [Fluent Ui](#fluent-ui)
		- [Build](#build)
			- [Webpack](#webpack)
			- [Docker](#docker)
		- [Tools](#tools)
			- [Pm2](#pm2)
			- [Nodemailer](#nodemailer)
			- [System](#system)
			- [Upload](#upload)

</br>

## Description

---

Modular Express.js Server with many ready to use and preconfigured plugins.
Small and secure by default but extendable to what ever you whant. Focused on
react development and Integration of different databases. </br></br>

## Setup

---

1.  git clone https://github.com/dominikhaid/node-base-server.git my-app
2.  cd my-app
3.  npm i
4.  npm run dev </br></br>

## Usage

---

can be used as a standlone secure node.js server for web devlepoment. Or
extended with on of our plugins to extend the functionality. see
[plugins](#plugins) section.

</br></br>

## Core Modules

---

### Express.js

Base Node.js server which can be used as standalone or middleware for our other
server plugins like next or apollo.

**More details** [@Express.js](https://www.npmjs.com/package/express)

</br>

---

### Cors

Set your allowed urls in the .env files and set cors to true in server-config.js
to use cors for your app.

**More details** [@Cors](https://www.npmjs.com/package/cors)

</br>

---

### Helmet / CSP

Set the urls in the .env files and enable helmet in the server-config.js to use
helmet / CSP. You can modify the module if you want. Like every other core
module it's located in the ./src/bin folder.

**More details** [@Helmet](https://www.npmjs.com/package/helmet)

</br>

---

### Jwt

To use jwt set the secret in the .env files and enable jwt in the server-conf.js
You can use jwt to protect the entire app or just single routes. As default when
jwt is activated everything behind /api/jwt is protected. The config is located
in ./src/bin/main.js.

**More details** [@jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

</br>

---

### Xss

Xss is always one we add a functions to filter an sanitize every request object.
It's available to every request your app receives.

```
//filter the filds 'email' and 'name' from the request sanatize them and destructure them base on the requestr ype
let [queryFields, bodyFields] = req.xssFilter(['email','name']);
```

**More details** [@xss](https://www.npmjs.com/package/xss)

</br>

---

### Other

The base server image comes with a few other things added bye default like
presets for prettier, bable or eslint.

</br>

---

</br></br>

## Plugins

---

### Server

#### Next.js

Adds React and Next.js to the base image ready to run configured. for details
see the doc's of the module
[@module- next](https://github.com/dominikhaid/node-module-next.git)

> npm run plugin p=https://github.com/dominikhaid/node-module-next.git
>
> npm run dev

</br>

#### Apollo GraphQL

Adds Apollo GraphQL Server along with some sample data and routes
[@module-apollo](https://github.com/dominikhaid/node-module-apollo-server.git)

> npm run plugin p=https://github.com/dominikhaid/node-module-apollo-server.git
>
> npm run dev
>
> visit http://localhost/graphql/

</br>

---

### Database

#### MySql / Sqlite / PostgreSQL

Adds Sql support for almost all Sql dialects. Some data example routes for
express.js and next.js. For MySql and PostgreSQLbit comes with ready to use
docker-compose files.

**More details**
[@module-sql](https://github.com/dominikhaid/node-module-sql.git)

> npm run Plugin p=https://github.com/dominikhaid/node-module-sql.git
>
> npm run dev //default db is Sql lite
>
> npm run docker-mysql-up //start mysql
>
> npm run docker-mysql-down //stop mysql
>
> docker-pg-up //start postgres
>
> docker-pg-down //stop postgres

**Note:** All sample routes will are shown in ./src/http

</br>

#### JSON file DB

Adds simple file base json db.

**More details**
[@module-json-db](https://github.com/dominikhaid/node-module-json-db.git)

> npm run Plugin p=https://github.com/dominikhaid/node-module-json-db.git
>
> npm run dev 
> 
> visit http:/localhost/api/json-users



**Note:** All sample routes will are shown in ./src/http

</br>
#### MongoDB

Adds MongoDB support to the base image along with some sample data and routes
and a ready to use docker-compose.

**More details**
[@module-mongo-db](https://github.com/dominikhaid/node-module-mongodb.git)

> npm run plugin p=https://github.com/dominikhaid/node-module-mongodb
>
> npm run docker-mongo-up
>
> npm run dev

**Note:** All sample routes will are shown in ./src/http

</br>

#### Firebase

Adds support for the firebase node.js admin sdk. It comes with some example data
and routes for both firebase auth and firestore

**More details**
[@module-firebase](https://github.com/dominikhaid/node-module-next.git)

> npm run plugin p=https://github.com/dominikhaid/node-module-firebase.git
>
> npm run dev

**Note:** All sample routes will are shown in ./src/http

</br>

---

### Ui

#### Ant Design

Adds Ant Design to next.js and sets some defaults fore easy themeing via less

**More details**
[@module-ant-design](https://github.com/dominikhaid/node-module-react-ant.git)

> npm run plugin p=https://github.com/dominikhaid/node-module-react-ant.git
>
> npm run dev

</br>

#### Bootstrap / React Bootstrap

Adds bootstrap and react bootstrap to next.js (next module must be installed
first). Has some default setups for customize bootstrap (themeing) with scss

**More details**
[@module-bootstrap](https://github.com/dominikhaid/node-module-react-bootstrap.git)

> npm run plugin
> p=https://github.com/dominikhaid/node-module-react-bootstrap.git
>
> npm run dev

</br>

#### Material Ui

Adds Material Ui to next.js

**More details**
[@module-material-ui](https://github.com/dominikhaid/node-module-react-material.git)

> npm run plugin p=https://github.com/dominikhaid/node-module-react-material.git
>
> npm run dev

</br>

#### Semantic Ui

Adds Semantic Ui React to next. It come with some less themes and easy themeing
options via less

**More details**
[@module- next](https://github.com/dominikhaid/node-module-react-semantic.git)

> npm run plugin p=https://github.com/dominikhaid/node-module-react-semantic.git
>
> npm run dev

</br>

#### Fluent Ui

Adds Microsoft Fluent Ui to next.js

**More details**
[@module-fluent-ui](https://github.com/dominikhaid/node-module-react-fluent.git)

> npm run plugin p=https://github.com/dominikhaid/node-module-react-fluent.git
>
> npm run dev

</br>

---

### Build

#### Webpack

Adds a custome webpack to the base server ready for building plain webpack apps
with live reload for css, scss and less. This module is not compatible to the
Next.js module since Next.js uses a different webpack setup

**More details**
[@module-webpack](https://github.com/dominikhaid/node-module-webpack.git)

> npm run plugin p=https://github.com/dominikhaid/node-module-webpack.git
>
> npm run dev || npm run webpack-build

</br>

#### Docker

Build a image from your app using npm

**More details**
[@module- next](https://github.com/dominikhaid/node-module-docker-build.git)

> npm run plugin p=https://github.com/dominikhaid/node-module-docker-build.git
>
> npm run dev

</br>

---

### Tools

#### Pm2

Adds Pm2 Node Manager with some sample configuration.

**More details**
[@module-mail](https://github.com/dominikhaid/node-module-pm2.git)

> npm run plugin p=https://github.com/dominikhaid/node-module-pm2.git
>
> edit the ecosystem.config.js
>
> pm2 start

</br>

#### Nodemailer

Adds a Email server to the package with some sample functions and routes.

**More details**
[@module-mail](https://github.com/dominikhaid/node-module-nodemailer.git)

> npm run plugin p=https://github.com/dominikhaid/node-module-nodemailer.git
>
> edit the newly added variables in the .env files
>
> npm run dev
>
> visit http://localhost/api/auth/mail/

**Note:** All sample routes will are shown in ./src/http

</br>

#### System

System tools like cron jobs and child processes

**More details**
[@module-system](https://github.com/dominikhaid/node-module-system.git)

> npm run plugin p=https://github.com/dominikhaid/node-module-system.git

</br>

#### Upload

Add File handler using multer along with some sample functions and routes.

**More details**
[@module-upload](https://github.com/dominikhaid/node-module-upload.git)

> npm run plugin p=https://github.com/dominikhaid/node-module-upload.git
>
> npm run dev visit http://localhost/api/auth/upload

**Note:** All sample routes will are shown in ./src/http

</br>
