let { pages } = require("./pages");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

let handler = (percentage, message, ...args) => {
  console.info(percentage, message, ...args);
};
exports.pluginList = [
  new webpack.ProvidePlugin({
    $: "jquery/dist/jquery.min",
    jQuery: "jquery/dist/jquery.min",
    "window.jQuery": "jquery/dist/jquery.min",
  }),
  new MiniCssExtractPlugin(),
  //OccurrenceOrderPlugin(), //is on by default
  //DedupePlugin(), //has been semoved in v2 or v3
  //UglifyJsPlugin({ //is now terser-webpack-plugin
  new webpack.ProgressPlugin(handler),
].concat(
  pages.map(
    (page) =>
      new HtmlWebpackPlugin({
        inject: true,
        template: `src/views/${page.folder}/${page.name}.pug`,
        minify: false,
        filename: `${page.filename ? page.filename : page.name}.html`,
        chunks: ["app", page.name],
      })
  )
);
