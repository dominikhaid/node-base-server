module.exports.startDotenv = function (app) {
  var dotenv;

  if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'production';
  }
  process.env.NODE_ENV === 'development'
    ? (dotenv = require('dotenv').config({path: './.env.development'}))
    : (dotenv = require('dotenv').config({
        path: './.env.production',
      }));

  if (dotenv.error) {
    throw dotenv.error;
  }
};
