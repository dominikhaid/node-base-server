const fireBaseUserObj = ({
	uid = null,
	email = null,
	phoneNumber = undefined,
	emailVerified = false,
	displayName = null,
	photoURL = undefined,
	disabled = false,
	customClaims = null,
	exp = null,
	provider = null,
}) => {
	return {
		uid: uid,
		phoneNumber: phoneNumber,
		emailVerified: emailVerified,
		displayName: displayName,
		photoURL: photoURL,
		disabled: disabled,
		customClaims: customClaims,
		exp: exp,
		provider: provider,
	};
};

module.exports.fireBaseUserObj = fireBaseUserObj;

/**
 *
 * @param {'express|request object'} req
 */
const reqToFirebase = (req) => {
	// get user object from the data source, Ex: database
	let pwd =
		req.fields && req.fields.pwd
			? req.fields.pwd
			: req.headers && req.headers.pwd
			? req.headers.pwd
			: null;

	let email =
		req.fields && req.fields.email
			? req.fields.email
			: req.headers && req.headers.email
			? req.headers.email
			: null;

	let uid =
		req.fields && req.fields.uid
			? req.fields.uid
			: req.headers && req.headers.uid
			? req.headers.uid
			: null;

	let admin =
		req.fields && req.fields.admin
			? req.fields.admin
			: req.headers && req.headers.admin
			? req.headers.admin
			: null;

	let provider =
		req.fields && req.fields.fbprovider ? req.fields.fbprovider : null;

	provider =
		!provider && req.headers && req.headers.fbprovider
			? req.headers.fbprovider
			: null;

	let params =
		req.fields && req.fields.params ? JSON.parse(req.fields.params) : null;

	params =
		!params && req.headers && req.headers.params
			? JSON.parse(req.headers.params)
			: null;

	let callback = null;
	//console.debug(email, pwd, provider, params, uid, admin, callback);
	return { email, pwd, provider, params, uid, admin, callback };
};

module.exports.reqToFirebase = reqToFirebase;
