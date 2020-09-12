const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
//const Dotenv = require('dotenv-webpack');

const webpack = require("webpack");
const path = require("path");
const hotMiddlewareScript = "webpack-hot-middleware/client?reload=true";
const doc = require(path.resolve(__dirname, "doc.js"));

module.exports = function (env) {
	if (
		(env.NODE_ENV && env.NODE_ENV !== "development") ||
		(process.env.NODE_ENV && process.env.NODE_ENV !== "development") ||
		(!env.NODE_ENV && !process.env.NODE_ENV)
	) {
		env.NODE_ENV = "development";
		process.env.NODE_ENV = "development";
	}
	const publicPath = `${process.env.HOST}:${process.env.PORT}/`;
	console.log(publicPath);
	const isProduction = false;
	return {
		mode: process.env.NODE_ENV || "development",
		entry: {
			app: [process.env.WEBPACK_ENTRY, hotMiddlewareScript],
		},
		//target: 'node', //prod only
		//externals: [nodeExternals()], //prod only
		devtool: isProduction ? "source-map" : "inline-source-map",
		plugins: [
			new webpack.optimize.OccurrenceOrderPlugin(),
			new webpack.HotModuleReplacementPlugin(),
			new webpack.NoEmitOnErrorsPlugin(),
			new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
			new HtmlWebpackPlugin(doc),
			// new Dotenv({
			//   path: path.resolve('./.env.development'),
			//   safe: true,
			// }),
			new webpack.optimize.LimitChunkCountPlugin({
				maxChunks: 5,
			}),
			//new RemoveServiceWorkerPlugin({ filename: 'sw.js' }),
			// new WorkboxPlugin.GenerateSW({
			//   clientsClaim: true,
			//   skipWaiting: true,
			// }),
		],
		output: {
			filename: "[name].js",
			path: path.resolve(__dirname, "build"),
			publicPath: publicPath,
		},
		optimization: {
			usedExports: true,
			sideEffects: false,
			removeAvailableModules: false,
			removeEmptyChunks: false,
			moduleIds: "hashed",
			runtimeChunk: "single",
		},
		module: {
			rules: [
				{
					enforce: "pre",
					test: /\.js$/,
					exclude: /node_modules/,
					loader: "eslint-loader",
					options: {
						cache: true,
						fix: true,
						emitWarning: true,
						failOnError: true,
						outputReport: {
							filePath: "./checkstyle.xml",
							formatter: "checkstyle",
						},
					},
				},
				{
					test: /\.m?js$/,
					use: {
						loader: "babel-loader",
						options: {
							presets: ["@babel/preset-env", "@babel/preset-react"],
						},
					},
				},
				{
					test: /\.s[ac]ss$/i,
					include: path.resolve(`./${process.env.PUBLIC_FOLDER}/scss/`),
					use: [
						"style-loader",
						{
							loader: "css-loader",
							options: {
								sourceMap: true,
							},
						},
						{
							loader: "sass-loader",
							options: {
								sourceMap: true,
							},
						},
					],
				},
				{
					test: /\.less$/i,
					include: path.resolve(`./${process.env.PUBLIC_FOLDER}/less/`),
					use: [
						{
							loader: "style-loader",
						},
						{
							loader: "css-loader",
						},
						{
							loader: "less-loader",
						},
					],
				},
				{
					test: /\.css$/,
					include: path.resolve(`./${process.env.PUBLIC_FOLDER}/css/`),
					use: ["style-loader", "css-loader"],
				},
				{
					test: /\.(png|svg|jpg|gif)$/,
					include: path.resolve(`./${process.env.PUBLIC_FOLDER}/images`),
					use: ["file-loader"],
				},
				{
					test: /\.(woff|woff2|eot|ttf|otf)$/,
					include: path.resolve(
						__dirname,
						`./${process.env.PUBLIC_FOLDER}/fonts/`
					),
					use: ["file-loader"],
				},
				{ test: /\.(csv|tsv)$/, use: ["csv-loader"] },
				{
					test: /\.xml$/,
					include: path.resolve(
						__dirname,
						`./${process.env.PUBLIC_FOLDER}/data/`
					),
					use: ["xml-loader"],
				},
			],
		},
	};
};
