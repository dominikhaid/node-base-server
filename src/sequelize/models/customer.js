const {Sequelize, DataTypes} = require('sequelize');

module.exports.customersInit = function (db) {
  return db.define('customers', Fields, TableOptions);
};

const TableOptions = {
  modelName: 'Customers',
  comment: 'THE BUYERS',
  // hooks: createHooks,
  defaultScope: {},
  // scopes: createScopes,
  //sequelize,
};

const Fields = {
  customerNumber: {
    type: DataTypes.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
    validate: {
      isNull: {msg: 'Must be Empty or null Autoinc'},
    },
  },
  email: {
    type: DataTypes.STRING(64),
    allowNull: false,
    unique: true,
    comment: 'Email not null unique secondary index',
    set(value) {
      this.setDataValue('email', value.toLowerCase());
    },
    validate: {
      isEmail: {msg: 'no valid email'},
    },
  },
  password: {
    type: DataTypes.STRING(16),
    allowNull: false,
    unique: true,
    comment: 'User Password',
    validate: {
      is: {
        args: [
          '^(?=.*d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^wds:])([^s]){8,16}$',
          'gm',
        ],
        msg: 'no valid phone number',
      },
    },
  },
  customerName: {
    type: DataTypes.STRING(64),
    allowNull: true,
  },
  customerPhoto: {
    type: DataTypes.STRING(64),
    allowNull: true,
    validate: {
      isUrl: {msg: 'no valid url'},
    },
  },
  contactLastName: {
    type: DataTypes.STRING,
    comment: 'Lastname not null',
    allowNull: false,
    validate: {
      notEmpty: {msg: 'no valid lastname'},
    },
  },
  contactFirstName: {
    type: DataTypes.STRING(32),
    comment: 'Firstname not null',
    allowNull: false,
    validate: {
      notEmpty: {msg: 'no valid firstname'},
    },
  },
  phone: {
    type: DataTypes.STRING(15),
    allowNull: true,
    validate: {
      is: {
        args: [
          '^(?(?P<prefix>(?=1)|+|(?:0(?:0(?:0|1|9)?|1(?:0|1))?|119))[-. ]?(?(?P<CC>1([-. ]?)[0-9]{3}|2(?:0|[0-9]{2})|3(?:[0-469]|[0-9]{2})|4(?:[013-9]|[0-9]{2})|5(?:[1-8]|[0-9]{2})|6(?:[0-6]|[0-9]{2})|7(?:[-. ]?[67]|[0-9]{3})|8(?:[1246]|[0-9]{2})|9(?:[0-58]|[0-9]{2}))(?:)?[-. ])?(?P<number>(?:[0-9]+[-. ]?)+)$',
          'gm',
        ],
        msg: 'no valid phone number',
      },
    },
  },
  addressLine1: {
    type: DataTypes.STRING(64),
    allowNull: true,
  },
  addressLine2: {
    type: DataTypes.STRING(64),
    allowNull: true,
  },
  city: {
    type: DataTypes.STRING(32),
    allowNull: true,
  },

  state: {
    type: DataTypes.STRING(32),
    allowNull: true,
  },
  postalCode: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      isInt: {msg: 'no valid postcode'},
    },
  },
  country: {
    type: DataTypes.STRING(32),
    allowNull: true,
  },
  salesRepEmployeeNumber: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      isInt: {msg: 'no valid employee id'},
    },
  },
  creditLimit: {
    type: DataTypes.FLOAT,
    allowNull: true,
    validate: {
      isFloat: {msg: 'no valid cerditlimit'},
    },
  },
  createdAt: {type: DataTypes.DATE, defaultValue: Sequelize.NOW},
  updatedAt: {type: DataTypes.DATE, defaultValue: Sequelize.NOW},
};

module.exports.Fields = Fields;
