const db = require('../../../sequelize/db/db');
const checkReqErrors = require('@/includes/status').checkReqErrors;
const customers = require('../../../sequelize/querys/customers');

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
          customers.findOne(req).then(erg => {
            checkReqErrors({msg: 'Found Users', user: erg}, res);
          });
        })
        .catch(err => {
          checkReqErrors({error: 'Something went wrong', err: err}, res);
        });
    } else if (req.method === 'DELETE') {
      auth(db)
        .then(() => {
          customers.deleteOne(req).then(erg => {
            checkReqErrors(erg, res);
          });
        })
        .catch(err => {
          checkReqErrors({error: 'Something went wrong', err: err}, res);
        });
    } else if (req.method === 'POST') {
      auth(db)
        .then(() => {
          customers.createOne(req).then(erg => {
            checkReqErrors(erg, res);
          });
        })
        .catch(err => {
          checkReqErrors({error: 'Something went wrong', err: err}, res);
        });
    } else if (req.method === 'PATCH') {
      auth(db)
        .then(() => {
          customers.updateOne(req).then(erg => {
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
        customers.findAll(req).then(erg => {
          checkReqErrors({msg: 'Found Users', users: erg}, res);
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
