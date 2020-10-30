'use strict';
var data = require('../../../data/products.json');

module.exports = {
  up: (queryInterface, Sequelize) => {
    // data.forEach(user => {
    //   user.username = user.contactFirstName + ' ' + user.contactLastName;
    // });

    return queryInterface.bulkInsert('products', data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('products', null, {});
  },
};
