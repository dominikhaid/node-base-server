const customersInit = require('../models/customer.js').customersInit;
const Customer = customersInit(db);

async function findAll(req) {
  let erg = await Customer.findAll()
    .then(Customers => {
      if (Customers) return Customers;
      return {error: 404, msg: 'No Customer found'};
    })
    .catch(err => {
      return {error: 500, msg: err};
    });

  return erg;
}

module.exports.findAll = findAll;

async function findOne(req) {
  let [queryFields, bodyFields] = req.xssFilter(['id']);

  let erg = await Customer.findByPk(
    Number(queryFields && queryFields.id ? queryFields.id : bodyFields.id),
  )
    .then(Customer => {
      if (Customer) return Customer.dataValues;
      return {error: 404, msg: 'No Customer found'};
    })
    .catch(err => {
      return {error: 500, msg: err};
    });

  return erg;
}

module.exports.findOne = findOne;

async function searchOne(req) {
  let [queryFields, bodyFields] = req.xssFilter(['email']);

  let erg = await Customer.findOne({
    where: {
      email:
        queryFields && queryFields.email ? queryFields.email : bodyFields.email,
    },
  })
    .then(Customer => {
      if (Customer) return Customer.dataValues;
      return {error: 404, msg: 'No Customer found'};
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

  let erg = await Customer.findOrCreate({
    where: {
      email:
        queryFields && queryFields.email ? queryFields.email : bodyFields.email,
    },
    defaults: bodyFields ? bodyFields : queryFields,
  })
    .then(([Customer, created]) => {
      if (created) return {msg: 'Customer created', Customer: Customer};
      return {error: 5, msg: 'Customer already exists'};
    })
    .catch(err => {
      return {error: 500, msg: err};
    });
  return erg;
}

module.exports.createOne = createOne;

async function deleteOne(req) {
  let [queryFields, bodyFields] = req.xssFilter(['email']);

  let erg = await Customer.destroy({
    where: {
      email:
        queryFields && queryFields.email ? queryFields.email : bodyFields.email,
    },
  })
    .then(Customer => {
      if (Customer)
        return {msg: 'Customer deleted', Customer: req.params.email};
      return {error: 404, msg: `Customer not found ${req.params.email}`};
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

  let erg = await Customer.update(update, {
    where: {
      email:
        queryFields && queryFields.email ? queryFields.email : bodyFields.email,
    },
  })
    .then(Customer => {
      if (Customer[0] === 1)
        return {msg: 'Customer updated', Customer: req.body};
      return {error: 404, msg: 'Customer not found'};
    })
    .catch(err => {
      return {error: 500, msg: err};
    });
  return erg;
}

module.exports.updateOne = updateOne;