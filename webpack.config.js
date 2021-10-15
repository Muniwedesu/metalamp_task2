const path = require("path");
const webpack = require("webpack");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const { rulesList } = require("./rules-list.js");
const { pages } = require("./pages");
const { pluginList } = require("./plugin-list");
console.log(pages);
const entryPoints = pages.reduce((config, page) => {
  console.log(page);
  let file = page.filename ? page.filename : page.name;
  config[file] = `./src/views/${page.folder}/${page.name}.js`;
  return config;
}, {});
console.log("entries: ");
console.log(entryPoints);

module.exports = {
  entry: { app: "./src/app.js", ...entryPoints },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: rulesList,
  },
  plugins: pluginList,
  resolve: {
    alias: {
      // "jquery-ui": "jquery-ui/jquery-ui.js",
      icons: path.resolve(__dirname, "src/assets/img/icons"),
      rooms: path.resolve(__dirname, "src/assets/img/rooms"),
      room: path.resolve(__dirname, "src/assets/img/room"),
      assets: path.resolve(__dirname, "src/assets"),
      modules: path.join(__dirname, "node_modules"),
    },
  },
  //devtool      : "inline-source-map",
  devServer: {
    //check development guide for static files
    contentBase: "./dist", //
    compress: true,
  },
  optimization: {
    // runtimeChunk: true,
    splitChunks: {
      chunks: "all",
    },
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      // new TerserPlugin({ terserOptions: { mangle: true }, extractComments: false }), //{terserOptions : {//https://github.com/terser/terser#minify-options}}
    ],
  },
};
