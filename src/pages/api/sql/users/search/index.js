const db = require('../../../../../sequelize/db/db');
const checkReqErrors = require('@/includes/status').checkReqErrors;
const usersQuery = require('../../../../../sequelize/querys/users');

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
  if (req.method === 'GET') {
    auth(db)
      .then(() => {
        usersQuery.searchOne(req).then(erg => {
          checkReqErrors({msg: 'Found Users', user: erg}, res);
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
