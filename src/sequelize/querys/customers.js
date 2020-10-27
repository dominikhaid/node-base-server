const customersInit = require('../models/customer.js').customersInit;
const Customer = customersInit(db);

async function findAll(req) {
  let erg = await Customer.findAll()
    .then(customers => {
      if (customers) return customers;
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
    .then(customer => {
      if (customer) return customer.dataValues;
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
    .then(customer => {
      if (customer) return customer.dataValues;
      return {error: 404, msg: 'No Customer found'};
    })
    .catch(() => {
      return {error: 500, msg: err};
    });
  return erg;
}

module.exports.searchOne = searchOne;

async function createOne(req) {
  console.log(req.body, req.query);
  let [queryFields, bodyFields] = req.xssFilter([
    'customerNumber',
    'email',
    'password',
    'userName',
    'customerPhoto',
    'contactLastName',
    'contactFirstName',
    'phone',
    'addressLine1',
    'addressLine2',
    'city',
    'state',
    'postalCode',
    'country',
  ]);
  console.log(queryFields, bodyFields);
  let erg = await Customer.findOrCreate({
    where: {
      email:
        queryFields && queryFields.email ? queryFields.email : bodyFields.email,
    },
    defaults: bodyFields ? bodyFields : queryFields,
  })
    .then(([customer, created]) => {
      if (created) return customer;
      return {error: 5, msg: 'E-Mail already taken!'};
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
    .then(customer => {
      if (customer)
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
    .then(customer => {
      if (customer[0] === 1)
        return {msg: 'Customer updated', Customer: req.body};
      return {error: 404, msg: 'Customer not found'};
    })
    .catch(err => {
      return {error: 500, msg: err};
    });
  return erg;
}

module.exports.updateOne = updateOne;
