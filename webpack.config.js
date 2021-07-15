const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
// const { node } = require("webpack");

module.exports = {
	entry   : "./src/app.js",
	output  : {
		filename : "bundle.js",
		path     : path.resolve(__dirname, "dist")
	},
	module  : {
		rules : [
			{
				test : /\.pug$/i,
				use  : [ { loader: "pug-loader", options: { pretty: true } } ]
			},
			{
				test : /\.scss$/i,
				use  : [ "style-loader", "css-loader", "sass-loader" ]
			}
		]
	},
	plugins : [
		new HtmlWebpackPlugin({
			template : "src/templates/views/index.pug",
			minify   : false
		}),
		new HtmlWebpackPlugin({
			filename : "account.html",
			template : "src/templates/views/account.pug",
			minify   : false
		}),
		new HtmlWebpackPlugin({
			filename : "details.html",
			template : "src/templates/views/details.pug",
			minify   : false
		}),
		new HtmlWebpackPlugin({
			filename : "search.html",
			template : "src/templates/views/search.pug",
			minify   : false
		})
	]
};
