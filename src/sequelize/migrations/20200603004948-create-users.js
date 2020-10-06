'use strict';
var Fields = require('../models/User').Fields;

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', Fields);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  },
};
