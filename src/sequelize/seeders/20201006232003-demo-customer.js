'use strict';

const data = [
  {
    email: 'example@exaple.de',
    password: 'dom53361.',
    customerNumber: '103',
    customerPhoto:
      'https://www.dominikhaid.de/wordpress/wp-content/uploads/2020/04/dom-1zu1-sw-mid-768x785.jpg',
    customerName: 'Atelier graphique',
    contactLastName: 'Schmitt',
    contactFirstName: 'Carine ',
    phone: '40.32.2555',
    addressLine1: '54, rue Royale',
    addressLine2: '',
    city: 'Nantes',
    state: '',
    postalCode: '44000',
    country: 'France',
    salesRepEmployeeNumber: '1370',
    creditLimit: '21000.00',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

module.exports = {
  up: (queryInterface, Sequelize) => {
    data.forEach(user => {
      user.customerName = user.contactFirstName + ' ' + user.contactLastName;
    });

    return queryInterface.bulkInsert('customers', data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('customers', null, {});
  },
};
