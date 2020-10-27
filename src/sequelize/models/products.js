const {Sequelize, DataTypes} = require('sequelize');

module.exports.productsInit = function (db) {
  return db.define('products', Fields, TableOptions);
};

const TableOptions = {
  modelName: 'Products',
  comment: 'Shop Products',
  // hooks: createHooks,
  defaultScope: {},
  // scopes: createScopes,
  //sequelize,
};

const Fields = {
  productCode: {
    comment: 'Product Id',
    type: DataTypes.STRING(16),
    unique: true,
    primaryKey: true,
    autoIncrement: false,
    validate: {
      args: ['^Sdd_dddd$'],
      isNull: {msg: 'Must be Empty or null Autoinc'},
    },
  },
  productName: {
    type: DataTypes.STRING(32),
    comment: 'Product name not null',
    allowNull: false,
    validate: {
      notEmpty: {msg: 'no valid product name'},
    },
  },
  colors: {
    type: DataTypes.STRING(32),
    comment: 'Product colors',
    allowNull: true,
    validate: {
      notEmpty: {msg: 'no valid color value'},
    },
  },
  productPhotos: {
    type: DataTypes.STRING(255),
    allowNull: true,
    validate: {
      is: {
        args: [
          '^(?:(?<scheme>[^:/?#]+):)?(?://(?<authority>[^/?#]*))?(?<path>[^?#]*/)?(?<file>[^?#]*.(?<extension>[Jj][Pp][Ee]?[Gg]|[Pp][Nn][Gg]|[Gg][Ii][Ff]))(?:?(?<query>[^#]*))?(?:#(?<fragment>.*))?$',
          'gm',
        ],
        msg: 'no valid phone number',
      },
    },
  },
  productLine: {
    type: DataTypes.STRING(16),
    comment: 'Product category not null',
    allowNull: false,
    validate: {
      notEmpty: {msg: 'no valid product category'},
    },
  },
  productVendor: {
    type: DataTypes.STRING(32),
    comment: 'Product vendor not null',
    allowNull: false,
    validate: {
      notEmpty: {msg: 'no valid product vendor'},
    },
  },
  productDescription: {
    type: DataTypes.STRING(255),
    comment: 'Product description',
    allowNull: true,
  },
  quantityInStock: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      isInt: {msg: 'no valid number'},
    },
  },
  buyPrice: {
    type: DataTypes.FLOAT,
    allowNull: true,
    validate: {
      isFloat: {msg: 'no valid price'},
    },
  },
  MSRP: {
    type: DataTypes.FLOAT,
    allowNull: true,
    validate: {
      isFloat: {msg: 'no valid resale price'},
    },
  },
  createdAt: {type: DataTypes.DATE, defaultValue: Sequelize.NOW},
  updatedAt: {type: DataTypes.DATE, defaultValue: Sequelize.NOW},
};

module.exports.Fields = Fields;
