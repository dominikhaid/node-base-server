const {Sequelize} = require('sequelize');

let configDb;
try {
  configDb = require('../../../config/sql-conf.json');
} catch (error) {
  console.log(error);
}

if (process.env.NODE_ENV === 'development') {
  configDb = configDb.development;
} else if (process.env.NODE_ENV === 'production') {
  configDb = configDb.production;
} else {
  configDb = configDb.test;
}

module.exports = db = new Sequelize(
  configDb.database,
  configDb.username,
  configDb.password,
  {
    host: configDb.host,
    dialect:
      configDb.dialect /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' |'sqllite */,
    storage: configDb.storage,
  },
  {
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
      evict: 1000,
    },
  },
);
