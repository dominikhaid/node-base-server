const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
// const Dotenv = require('dotenv-webpack');
const TerserPlugin = require("terser-webpack-plugin");
//const WorkboxPlugin = require('workbox-webpack-plugin');
const nodeExternals = require("webpack-node-externals");

const webpack = require("webpack");
const path = require("path");
//const hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';
const doc = require(path.resolve(__dirname, "doc.js"));
const dot = require(path.resolve(__dirname, "../../bin/env.js"));
dot.startDotenv();

module.exports = function (env) {
	if (
		(env.NODE_ENV && env.NODE_ENV !== "production") ||
		(process.env.NODE_ENV && process.env.NODE_ENV !== "production") ||
		(!env.NODE_ENV && !process.env.NODE_ENV)
	) {
		throw new Error("MODE NOT SET TO PRODUCTION");
	}
	let publicPath = `${process.env.HOST}:${process.env.PORT}/`;

	const isProduction = true;
	return {
		mode: process.env.NODE_ENV || "production",
		entry: {
			app: [process.env.WEBPACK_ENTRY],
		},
		//target: 'node', //prod only
		externals: [nodeExternals()], //prod only exclude scripts
		devtool: isProduction ? "source-map" : "inline-source-map",
		plugins: [
			new webpack.optimize.OccurrenceOrderPlugin(),
			new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
			new HtmlWebpackPlugin(doc),
			new MiniCssExtractPlugin({
				filename: !isProduction ? "[name].css" : "[name].[hash].css",
				chunkFilename: !isProduction ? "[id].css" : "[id].[hash].css",
			}),
			// new Dotenv({
			//   path: path.resolve('./.env.production'),
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
			filename: "[name].[hash].js",
			path: path.resolve(__dirname, "../build"),
			publicPath: publicPath,
		},
		optimization: {
			minimize: true, //true for prod
			minimizer: [
				new TerserPlugin({ extractComments: true }),
				new OptimizeCSSAssetsPlugin({
					//assetNameRegExp: /\.css$g/,
					cssProcessor: require("cssnano"),
					cssProcessorPluginOptions: {
						preset: ["default", { discardComments: { removeAll: true } }],
					},
					canPrint: true,
				}),
			],
			usedExports: true,
			sideEffects: false,
			removeAvailableModules: true,
			removeEmptyChunks: true,
			//splitChunks: false,
			moduleIds: "hashed",
			runtimeChunk: "single",
			splitChunks: {
				cacheGroups: {
					vendor: {
						test: /[\\/]node_modules[\\/]/,
						name: "vendors",
						chunks: "all",
					},
				},
			},
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
						failOnError: false,
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
						//'style-loader',
						MiniCssExtractPlugin.loader,
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
					test: /\.less$/,
					include: path.resolve(`./${process.env.PUBLIC_FOLDER}/less/`),
					//loader: 'less-loader', // compiles Less to CSS
					use: [
						{
							loader: MiniCssExtractPlugin.loader,
							//loader: 'style-loader', // creates style nodes from JS strings
						},
						{
							loader: "css-loader",
							//loader: 'css-loader', // translates CSS into CommonJS
						},
						{
							loader: "less-loader", // compiles Less to CSS
						},
					],
				},
				{
					test: /\.css$/,
					include: path.resolve(`./${process.env.PUBLIC_FOLDER}/css/`),
					//use: ['style-loader', 'css-loader'],
					use: [MiniCssExtractPlugin.loader, "css-loader"],
				},
				{
					test: /\.(png|svg|jpg|gif)$/,
					include: path.resolve(
						__dirname,
						`./${process.env.PUBLIC_FOLDER}/images`
					),
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
