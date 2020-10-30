'use strict';

var data = require('../../../data/customers.json');

module.exports = {
  up: (queryInterface, Sequelize) => {
    // data.forEach(user => {
    //   user.userName = user.contactFirstName + ' ' + user.contactLastName;
    // });

    return queryInterface.bulkInsert('customers', data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('customers', null, {});
  },
};
