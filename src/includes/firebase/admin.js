const reqToFirebase = require("./shared").reqToFirebase;
const fireBaseUserObj = require("./shared").fireBaseUserObj;
const firebase = require("firebase/app");

const fireAdmin = require("firebase-admin");
var serviceAccount = require("../../gitignore/dominikhaid-1576294119040-firebase-adminsdk-kzt6d-ea27633196.json");

async function fireAdminDB() {
	let result = await fireAdmin.initializeApp({
		credential: fireAdmin.credential.cert(serviceAccount),
		databaseURL: "https://dominikhaid-1576294119040.firebaseio.com",
	});
	return result;
}

module.exports.fireAdminDB = fireAdminDB;

async function status() {
	let name = await fireAdmin.app().name;
	return name;
}

module.exports.status = status;

/**
 *
 * @param {'Firebase Admin Instance'} fireAdmin
 * @param {'Express request'} req
 */
async function fireAdminSetRole(req) {
	let { params: params } = reqToFirebase(req);
	return fireAdmin
		.auth()
		.setCustomUserClaims(params.uid, params.customClaims)
		.then(() => {
			if (
				params.customClaims.admin === true ||
				params.customClaims.admin === "true"
			)
				return { msg: "Benutzer Rechte geändert Admin" };
			return { msg: "Benutzer Rechte geändert User" };
		})
		.catch((error) => {
			return error;
		});
}

module.exports.fireAdminSetRole = fireAdminSetRole;

/**
 *
 * @param {'Firebase Admin Instance'} fireAdmin
 * @param {'Express request'} req
 */
async function fireAdminGetClaims(req) {
	let { email: email, pwd: pwd } = reqToFirebase(req);

	async function run(email, pwd) {
		let user = await firebase
			.auth()
			.signInWithEmailAndPassword(email, pwd)
			.then((result) => {
				return result.user;
			})
			.catch(function (error) {
				return error;
			});

		let idToken = user.xa;

		return fireAdmin
			.auth()
			.verifyIdToken(idToken)
			.then((claims) => {
				return claims;
			})
			.catch((error) => {
				return error;
			});
	}
	return run(email, pwd);
}

module.exports.fireAdminGetClaims = fireAdminGetClaims;

/**
 *
 * @param {'Firebase Admin Instance'} fireAdmin
 * @param {'Express request'} req
 */
async function fireAdminUserRecord(req) {
	let { params: params } = reqToFirebase(req);
	return fireAdmin
		.auth()
		.getUser(params.uid)
		.then((userRecord) => {
			return userRecord;
		})
		.catch((error) => {
			return error;
		});
}

module.exports.fireAdminUserRecord = fireAdminUserRecord;

/**
 *
 * @param {'Firebase Admin Instance'} fireAdmin
 * @param {'Firbase Instance'} fireBase
 * @param {'Express request'} req
 */
async function fireAdminUser(req) {
	let { params: params } = reqToFirebase(req);
	if (!params.email) {
		return fireAdmin
			.auth()
			.getUser(params.uid)
			.then(function (userRecord) {
				return userRecord;
			})
			.catch(function (error) {
				return error;
			});
	} else {
		return fireAdmin
			.auth()
			.getUserByEmail(params.email)
			.then(function (userRecord) {
				return userRecord;
			})
			.catch(function (error) {
				return error;
			});
	}
}

module.exports.fireAdminUser = fireAdminUser;

/**
 *
 * @param {'Firebase Admin Instance'} fireAdmin
 * @param {'Express request'} req
 */
async function fireAdminCreateUser(req) {
	let { params: params } = reqToFirebase(req);
	params = fireBaseUserObj(params);
	return fireAdmin
		.auth()
		.createUser(params)
		.then(function (userRecord) {
			return userRecord;
		})
		.catch(function (error) {
			return error;
		});
}

module.exports.fireAdminCreateUser = fireAdminCreateUser;

/**
 *
 * @param {'Firebase Admin Instance'} fireAdmin
 * @param {'Express request'} req
 */
async function fireAdminUpdateUser(req) {
	let { params: params } = reqToFirebase(req);

	let update = fireBaseUserObj(params);
	update.password = params.password;
	return fireAdmin
		.auth()
		.updateUser(params.uid, update)
		.then(function (userRecord) {
			return fireBaseUserObj(userRecord);
		})
		.catch(function (error) {
			return error;
		});
}

module.exports.fireAdminUpdateUser = fireAdminUpdateUser;

/**
 *
 * @param {'Firebase Admin Instance'} fireAdmin
 * @param {'Express request'} req
 */
async function fireAdminDeleteUser(req) {
	let { params: params } = reqToFirebase(req);
	let uids = params.uid.split(",");

	if (Array.isArray(uids) && uids.length > 1) {
		return fireAdminDeletUsers(fireAdmin, uids);
	} else {
		return fireAdmin
			.auth()
			.deleteUser(uids[0])
			.then(function () {
				return { msg: "Benutzer gelöscht" };
			})
			.catch(function (error) {
				return error;
			});
	}
}

module.exports.fireAdminDeleteUser = fireAdminDeleteUser;

/**
 *
 * @param {'Firebase Admin Instance'} fireAdmin
 * @param {'array|uids'} uids
 */
async function fireAdminDeletUsers(uids) {
	return fireAdmin
		.auth()
		.deleteUsers(uids)
		.then(function (e) {
			return e;
		})
		.catch(function (error) {
			return error;
		});
}

module.exports.fireAdminDeletUsers = fireAdminDeletUsers;
/**
 *
 * @param {'Firebase Admin Instance'} fireAdmin
 */
async function fireAdminGetAllUsers() {
	if (!fireAdmin)
		return {
			error: { code: "internal", msg: "Inernal error please try Again later" },
		};
	let userList = [];
	async function listAllUsers(nextPageToken) {
		return fireAdmin
			.auth()
			.listUsers(1000, nextPageToken)
			.then(function (listUsersResult) {
				listUsersResult.users.forEach(function (userRecord) {
					userList.push(fireBaseUserObj(userRecord));
				});
				if (listUsersResult.pageToken) {
					listAllUsers(listUsersResult.pageToken);
				}
			})
			.finally(() => {
				return userList;
			})
			.catch(function (error) {
				return error;
			});
	}
	await listAllUsers();
	return userList;
}

module.exports.fireAdminGetAllUsers = fireAdminGetAllUsers;
