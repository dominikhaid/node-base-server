const ProductsInit = require('../models/products.js').productsInit;
const Products = ProductsInit(db);

async function findAll(req) {
  let erg = await Products.findAll()
    .then(products => {
      if (products) return products;
      return {error: 404, msg: 'No Product found'};
    })
    .catch(err => {
      return {error: 500, msg: err};
    });

  return erg;
}

module.exports.findAll = findAll;

async function findOne(req) {
  let [queryFields, bodyFields] = req.xssFilter(['productCode']);

  let erg = await Products.findByPk(
    queryFields && queryFields.productCode
      ? queryFields.productCode
      : bodyFields.productCode,
  )
    .then(product => {
      if (product) return product.dataValues;
      return {error: 404, msg: 'No Product found'};
    })
    .catch(err => {
      return {error: 500, msg: err};
    });

  return erg;
}

module.exports.findOne = findOne;

async function searchOne(req) {
  let [queryFields, bodyFields] = req.xssFilter(['productCode']);

  let erg = await Products.findOne({
    where: {
      productCode:
        queryFields && queryFields.productCode
          ? queryFields.productCode
          : bodyFields.productCode,
    },
  })
    .then(product => {
      if (product) return product.dataValues;
      return {error: 404, msg: 'No Product found'};
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

  let erg = await Product.findOrCreate({
    where: {
      email:
        queryFields && queryFields.email ? queryFields.email : bodyFields.email,
    },
    defaults: bodyFields ? bodyFields : queryFields,
  })
    .then(([product, created]) => {
      if (created) return {msg: 'Product created', Product: product};
      return {error: 5, msg: 'Product already exists'};
    })
    .catch(err => {
      return {error: 500, msg: err};
    });
  return erg;
}

module.exports.createOne = createOne;

async function deleteOne(req) {
  let [queryFields, bodyFields] = req.xssFilter(['email']);

  let erg = await Products.destroy({
    where: {
      email:
        queryFields && queryFields.email ? queryFields.email : bodyFields.email,
    },
  })
    .then(product => {
      if (product) return {msg: 'Product deleted', Product: req.params.email};
      return {error: 404, msg: `Product not found ${req.params.email}`};
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

  let erg = await Products.update(update, {
    where: {
      email:
        queryFields && queryFields.email ? queryFields.email : bodyFields.email,
    },
  })
    .then(product => {
      if (product[0] === 1) return {msg: 'Product updated', product: req.body};
      return {error: 404, msg: 'Product not found'};
    })
    .catch(err => {
      return {error: 500, msg: err};
    });
  return erg;
}

module.exports.updateOne = updateOne;
