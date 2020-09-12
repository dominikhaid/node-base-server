function startExpress(server, serverOptions, protocol) {
	const apiStatus = require("../routers/routes");
	server.use("/api", apiStatus);

	if (serverOptions.jwt) {
		const jwtRoutes = require("../routers/jwt");
		server.use("/api/jwt", jwtRoutes);
	}

	if (serverOptions.fireadmin) {
		const fireAdminRoutes = require("../routes/fireadmin");
		server.use("/api/auth/firebase/admin", fireAdminRoutes);
	}

	if (serverOptions.uploads) {
		const uploads = require("../routes/uploads");
		server.use("/api/auth/upload", uploads);
	}

	if (serverOptions.mail) {
		const mail = require("../routes/mail");
		server.use("/api/auth/mail", mail);
	}

	port = process.env.PORT || 5000;
	if (protocol.httpServer) protocol.httpServer.listen(port);
	if (protocol.httpsServer) protocol.httpsServer.listen(port);
	if (!protocol.httpServer && !protocol.httpsServer) server.listen(port);

	if (process.env.NODE_ENV === "development") {
		console.debug(
			`\nWebpack Server at: ${process.env.HOST}:${port}/?reload=true`,
			"\nConfig:",
			serverOptions
		);
	}
}

module.exports.startExpress = startExpress;
