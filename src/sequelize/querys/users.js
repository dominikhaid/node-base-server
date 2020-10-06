const userInit = require('../models/User.js').userInit;
const User = userInit(db);

async function findAll(req) {
  let erg = await User.findAll()
    .then(users => {
      if (users) return users;
      return {error: 404, msg: 'No User found'};
    })
    .catch(err => {
      return {error: 500, msg: err};
    });

  return erg;
}

module.exports.findAll = findAll;

async function findOne(req) {
  let [queryFields, bodyFields] = req.xssFilter(['id']);

  let erg = await User.findByPk(
    Number(queryFields && queryFields.id ? queryFields.id : bodyFields.id),
  )
    .then(user => {
      if (user) return user.dataValues;
      return {error: 404, msg: 'No User found'};
    })
    .catch(err => {
      return {error: 500, msg: err};
    });

  return erg;
}

module.exports.findOne = findOne;

async function searchOne(req) {
  let [queryFields, bodyFields] = req.xssFilter(['email']);

  let erg = await User.findOne({
    where: {
      email:
        queryFields && queryFields.email ? queryFields.email : bodyFields.email,
    },
  })
    .then(user => {
      if (user) return user.dataValues;
      return {error: 404, msg: 'No User found'};
    })
    .catch(() => {
      return {error: 500, msg: err};
    });
  return erg;
}

module.exports.searchOne = searchOne;

async function createOne(req) {
  let [queryFields, bodyFields] = req.xssFilter([
    'name',
    'lastname',
    'firstname',
    'email',
  ]);

  let erg = await User.findOrCreate({
    where: {
      email:
        queryFields && queryFields.email ? queryFields.email : bodyFields.email,
    },
    defaults: bodyFields ? bodyFields : queryFields,
  })
    .then(([user, created]) => {
      if (created) return {msg: 'User created', user: user};
      return {error: 5, msg: 'User already exists'};
    })
    .catch(err => {
      return {error: 500, msg: err};
    });
  return erg;
}

module.exports.createOne = createOne;

async function deleteOne(req) {
  let [queryFields, bodyFields] = req.xssFilter(['email']);

  let erg = await User.destroy({
    where: {
      email:
        queryFields && queryFields.email ? queryFields.email : bodyFields.email,
    },
  })
    .then(user => {
      if (user) return {msg: 'User deleted', user: req.params.email};
      return {error: 404, msg: `User not found ${req.params.email}`};
    })
    .catch(err => {
      return {error: 500, msg: err};
    });
  return erg;
}

module.exports.deleteOne = deleteOne;

async function updateOne(req) {
  let [queryFields, bodyFields] = req.xssFilter([
    'name',
    'lastname',
    'firstname',
    'email',
    'new_email',
  ]);

  let update = bodyFields
    ? JSON.parse(JSON.stringify(bodyFields))
    : JSON.parse(JSON.stringify(queryFields));

  update.email = update.new_email;
  delete update.new_email;

  let erg = await User.update(update, {
    where: {
      email:
        queryFields && queryFields.email ? queryFields.email : bodyFields.email,
    },
  })
    .then(user => {
      if (user[0] === 1) return {msg: 'User updated', user: req.body};
      return {error: 404, msg: 'User not found'};
    })
    .catch(err => {
      return {error: 500, msg: err};
    });
  return erg;
}

module.exports.updateOne = updateOne;
