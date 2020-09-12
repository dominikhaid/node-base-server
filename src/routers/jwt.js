const express = require("express");
const router = express.Router();
const jwtUtils = require("../includes/jwt");

router.post("/", (req, res) => {
	jwtUtils.geToken(req, res);
});

router.get("/verify/", (req, res) => {
	jwtUtils.verfiyToken(req, res);
});

router.get("/verify/:token", (req, res) => {
	jwtUtils.verfiyToken(req, res);
});

module.exports = router;
