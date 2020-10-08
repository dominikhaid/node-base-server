'use strict';
var Fields = require('../models/customer.js').Fields;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Customers', Fields);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Customers');
  },
};
