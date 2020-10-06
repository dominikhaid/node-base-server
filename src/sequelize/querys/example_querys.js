const {Sequelize, Model, DataTypes, Op} = require('sequelize');
const db = require('../db/db');

const userInit = require('../models/User').userInit;
const User = userInit(db);

async function run() {
  res = await db
    .authenticate()
    .then(() => {
      console.info('Connection to db has been established successfully.');

      // findAll(User);
      // findAll(User,{ offset: 10, limit: 2 })
      // findAll(User,{ order: [['email', 'DESC']] })
      // findAll(User,{ group: ['firstname','id'],  limit: 2})

      //update(User,{where: {firstname:"Whilemina"}},{lastname:"UPDATED"})
      //createRow(User,{firstname:"New",lastname:"User",email:"user@example.de"})
      //deleteRow(User,{where: {firstname:"New"}})

      // findAndCount(User, {
      // 	where: {
      // 		firstname: { [Op.like]: '%Te%' },
      // 	},
      // 	offset: 0,
      // 	limit: 10,
      // })

      //scopes see user model
      // scopeFind(User,'random')
      // scopeFind(User, { method: ['idby2', 10] })

      // countRows(User, { where: { id: { [Op.gt]: 50 } } })
      // maxVal(User,'id')
      // minVal(User,'id')
      // sumVal(User,'id')

      // transaction(db)
    })
    .catch(err => {
      console.error('Unable to connect to the db database:', err);
    });

  close(db);
}

run();

/**
 *
 * Manage DB
 */

const newModel = db => {
  return db.define(
    'user',
    {
      firstname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING,
      },
    },
    {},
  );
};

const syncModel = Model => {
  // Note: using `force: true` will drop the table if it already exists
  Model.sync({force: true}).then(() => {
    // Now the `users` table in the database corresponds to the model definition
    return User.create({
      firstname: 'John',
      lastName: 'Hancock',
    });
  });
};

function dropTable(Model) {
  Model.drop();
  return;
}

const close = con => {
  return con.close().then(e => {
    console.log('Connection db closed', e);
  });
};

/**
 *
 * Basic
 */

const findAll = (Model, Condition) => {
  // Find all users
  return Model.findAll(Condition).then(users => {
    console.log('All users:', users);
    return users;
  });
};

const update = (Model, Condition, Value) => {
  return User.update(Value, Condition).then(user => {
    console.log('Updated', user);
  });
};

const createRow = (Model, Value) => {
  // // Create a new user
  Model.create(Value).then(result => {
    console.log('Created:', result.dataValues);
  });
};

const deleteRow = (Model, Condition) => {
  // // Delete everyone named "Jane"
  Model.destroy(Condition).then(user => {
    console.log('Done', user);
  });
};

/**
 *
 * Advanced Selectors
 */
const findAndCount = (Model, Condition) => {
  Model.findAndCountAll(Condition).then(result => {
    console.log('COUNT', result.count);
    console.log('ROWS', result.rows);
  });
};

const scopeFind = (Model, Condition) => {
  Model.scope(Condition)
    .findAll()
    .then(result => {
      console.log('Done', result);
    });
};

/**
 *
 * Count Selectors
 */

const countRows = (Model, Condition) => {
  Model.count(Condition).then(result => {
    console.log(
      'There are ' + result + ' projects with an id greater than 50.',
    );
  });
};

const maxVal = (Model, Condition) => {
  Model.max(Condition).then(result => {
    console.log('Highest ID', result);
  });
};

const minVal = (Model, Condition) => {
  Model.min(Condition).then(result => {
    console.log('Lowest ID', result);
  });
};

const sumVal = (Model, Condition) => {
  Model.sum(Condition).then(result => {
    console.log('SUM', result);
  });
};

/**
 *
 * Transaction multiple Actions with rollback
 */

const transaction = db => {
  return db
    .transaction(t1 => {
      return db.transaction(t2 => {
        // With CLS enable, queries here will by default use t2
        // Pass in the `transaction` option to define/alter the transaction they belong to.
        return Promise.all([
          User.create(
            {name: 'Bob Murry', email: 'murry@me.de'},
            {transaction: null},
          ),
          User.create(
            {name: 'Mallo Sweat', email: 'mallo@myass.de'},
            {transaction: t1},
          ),
          User.create({name: 'Bob Murry', email: 'murry@meto.de'}), // this would default to t2
        ]);
      });
    })
    .then(e => {
      console.log(e);
    })
    .catch(err => {
      console.log('ERROR', err);
    });
};

//ALL user with model PRofil attached
// User.findAndCountAll({
// include: [{ model: Profile, where: { active: true } }],
// limit: 3,
// }).then((result) => {
// console.log(result.count)
// console.log(result.rows)
// })
