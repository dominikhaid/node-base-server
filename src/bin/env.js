module.exports.startDotenv = function (app) {
	var dotenv;
	console.debug("System Env: ", process.env.NODE_ENV);
	if (!process.env.NODE_ENV) {
		process.env.NODE_ENV = "production";
	}
	process.env.NODE_ENV === "development"
		? (dotenv = require("dotenv").config({ path: "./.env.development" }))
		: (dotenv = require("dotenv").config({
				path: "./.env.production",
		  }));

	if (dotenv.error) {
		throw dotenv.error;
	}
	if (process.env.NODE_ENV === "development")
		console.debug("Envoriement variables:\n", dotenv.parsed);
};
