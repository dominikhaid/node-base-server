'use strict';

const data = [
  {
    productCode: 'S10_1949',
    productName: '1952 Alpine Renault 1300',
    productLine: 'Classic Cars',
    productPhotos:
      'https://cdn.shopify.com/s/files/1/1772/1703/t/16/assets/cowboy-3-absolute-black_w_6.png,https://cdn.shopify.com/s/files/1/1772/1703/t/16/assets/cowboy-3-absolute-black_w_6.png',
    productVendor: 'Classic Metal Creations',
    productDescription:
      'Turnable front wheels; steering function; detailed interior; detailed engine; opening hood; opening trunk; opening doors; and detailed chassis.',
    quantityInStock: '7305',
    buyPrice: '98.58',
    MSRP: '214.30',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

module.exports = {
  up: (queryInterface, Sequelize) => {
    // data.forEach(user => {
    //   user.customerName = user.contactFirstName + ' ' + user.contactLastName;
    // });

    return queryInterface.bulkInsert('products', data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('products', null, {});
  },
};
