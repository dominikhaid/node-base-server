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
    unique: false,
    comment: 'User Password',
    validate: {
      is: {
        args: [
          /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/gm,
        ],
        msg: 'The password you entered is not valid',
      },
    },
  },
  userName: {
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
        args: [/(\+\d{1})?[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s-.]?\d{4}/gm],
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
