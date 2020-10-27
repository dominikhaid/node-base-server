const db = require('@/src/sequelize/db/db');
const checkReqErrors = require('@/includes/status').checkReqErrors;
const products = require('@/src/sequelize/querys/products');

async function auth(db) {
  return db
    .authenticate()
    .then(() => {
      return {msg: 'Server alive'};
    })
    .catch(err => {
      checkReqErrors({msg: 'Server down', err: err}, res);
    });
}

export default (req, res) => {
  if (req.method === 'GET') {
    auth(db)
      .then(() => {
        products.searchOne(req).then(erg => {
          checkReqErrors(erg, res);
        });
      })
      .catch(err => {
        checkReqErrors({error: 'Something went wrong', err: err}, res);
      });
  } else {
    checkReqErrors({error: 'No End Point to this Request'}, res);
  }
};

export const config = {
  api: {
    externalResolver: true,
    bodyParser: false,
  },
};
