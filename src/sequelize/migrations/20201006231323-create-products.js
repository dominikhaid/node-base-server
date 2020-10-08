'use strict';
var Fields = require('../models/products.js').Fields;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', Fields);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Products');
  },
};
