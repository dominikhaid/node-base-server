const express = require("express");
const router = express.Router();

const fireAdminUtils = require("../includes/firebase/admin");
const checkReqErrors = require("../includes/status").checkReqErrors;
const checkRole = require("../includes/status").checkRole;

router.get("/list", (req, res, next) => {
	checkRole(req.userData.role, "admin") ||
		checkReqErrors({ error: "Access denied" }, res);
	fireAdminUtils
		.fireAdminGetAllUsers()
		.then((query) => {
			checkReqErrors(query, res);
		})
		.catch((error) => {
			checkReqErrors(error, res);
		});
});

router.post("/user", (req, res, next) => {
	fireAdminUtils
		.fireAdminUser(req)
		.then((query) => {
			checkReqErrors(query, res);
		})
		.catch((error) => {
			checkReqErrors(error, res);
		});
});

router.post("/caims", (req, res, next) => {
	checkRole(req.userData.role, "admin") ||
		checkReqErrors({ error: "Access denied" }, res);
	fireAdminUtils
		.fireAdminGetClaims(req)
		.then((query) => {
			checkReqErrors(query, res);
		})
		.catch((error) => {
			checkReqErrors(error, res);
		});
});

router.post("/record", (req, res, next) => {
	checkRole(req.userData.role, "admin") ||
		checkReqErrors({ error: "Access denied" }, res);
	fireAdminUtils
		.fireAdminUserRecord(req)
		.then((query) => {
			checkReqErrors(query, res);
		})
		.catch((error) => {
			checkReqErrors(error, res);
		});
});

router.post("/update", (req, res, next) => {
	fireAdminUtils
		.fireAdminUpdateUser(req)
		.then((query) => {
			checkReqErrors(query, res);
		})
		.catch((error) => {
			checkReqErrors(error, res);
		});
});

router.post("/role", (req, res, next) => {
	checkRole(req.userData.role, "admin") ||
		checkReqErrors({ error: "Access denied" }, res);
	fireAdminUtils
		.fireAdminSetRole(req)
		.then((query) => {
			checkReqErrors(query, res);
		})
		.catch((error) => {
			checkReqErrors(error, res);
		});
});

router.post("/create", (req, res, next) => {
	checkRole(req.userData.role, "admin") ||
		checkReqErrors({ error: "Access denied" }, res);
	fireAdminUtils
		.fireAdminCreateUser(req)
		.then((query) => {
			checkReqErrors(query, res);
		})
		.catch((error) => {
			checkReqErrors(error, res);
		});
});

router.post("/delete", (req, res, next) => {
	checkRole(req.userData.role, "admin") ||
		checkReqErrors({ error: "Access denied" }, res);
	fireAdminUtils
		.fireAdminDeleteUser(req)
		.then((query) => {
			checkReqErrors(query, res);
		})
		.catch((error) => {
			checkReqErrors(error, res);
		});
});

module.exports = router;
