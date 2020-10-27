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
      console.log(err);
      checkReqErrors({msg: 'Server down', err: err}, res);
    });
}

export default (req, res) => {
  if (Object.keys(req.query).length > 0 || Object.keys(req.body).length > 0) {
    if (req.method === 'GET') {
      auth(db)
        .then(() => {
          products.findOne(req).then(erg => {
            checkReqErrors(erg, res);
          });
        })
        .catch(err => {
          checkReqErrors({error: 'Something went wrong', err: err}, res);
        });
    } else if (req.method === 'DELETE') {
      auth(db)
        .then(() => {
          products.deleteOne(req).then(erg => {
            checkReqErrors(erg, res);
          });
        })
        .catch(err => {
          checkReqErrors({error: 'Something went wrong', err: err}, res);
        });
    } else if (req.method === 'POST') {
      auth(db)
        .then(() => {
          products.createOne(req).then(erg => {
            checkReqErrors(erg, res);
          });
        })
        .catch(err => {
          checkReqErrors({error: 'Something went wrong', err: err}, res);
        });
    } else if (req.method === 'PATCH') {
      auth(db)
        .then(() => {
          products.updateOne(req).then(erg => {
            checkReqErrors(erg, res);
          });
        })
        .catch(err => {
          checkReqErrors({error: 'Something went wrong', err: err}, res);
        });
    } else {
      checkReqErrors({error: 'No End Point to this Request'}, res);
    }
  } else {
    auth(db)
      .then(() => {
        products.findAll(req).then(erg => {
          checkReqErrors(erg, res);
        });
      })
      .catch(err => {
        checkReqErrors({error: 'Something went wrong', err: err}, res);
      });
  }
};

export const config = {
  api: {
    externalResolver: true,
    bodyParser: false,
  },
};
