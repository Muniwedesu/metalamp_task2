const path = require("path");
const webpack = require("webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const sassIncludes = ["src/views/"];
const handler = (percentage, message, ...args) => {
  console.info(percentage, message, ...args);
};

module.exports = {
  entry: "./src/app.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.pug$/i,
        use: [
          {
            loader: "pug-loader",
            options: { pretty: true, root: path.resolve(__dirname, "src") },
          },
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                includePaths: sassIncludes,
              },
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/i,
        type: "asset/resource",
        generator: {
          filename: "fonts/[hash][ext][query]",
        },
      },
      {
        test: /\.(jpg|png)$/i,
        type: "asset/resource",
        generator: {
          filename: "img/[hash][ext][query]",
        },
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
    }),
    new HtmlWebpackPlugin({
      template: "src/views/index/index.pug",
      minify: false,
    }),
    new HtmlWebpackPlugin({
      filename: "account.html",
      template: "src/views/account/account.pug",
      minify: false,
    }),
    new HtmlWebpackPlugin({
      filename: "details.html",
      template: "src/views/details/details.pug",
      minify: false,
    }),
    new HtmlWebpackPlugin({
      filename: "search.html",
      template: "src/views/search/search.pug",
      minify: false,
    }),
    new HtmlWebpackPlugin({
      filename: "ui.html",
      template: "src/views/ui/ui.pug",
      minify: false,
    }),
    new MiniCssExtractPlugin(),
    //OccurrenceOrderPlugin(), //is on by default
    //DedupePlugin(), //has been semoved in v2 or v3
    //UglifyJsPlugin({ //is now terser-webpack-plugin
    new webpack.ProgressPlugin(handler),
  ],
  resolve: {
    alias: {
      "jquery-ui": "jquery-ui/jquery-ui.js",
      icons: path.resolve(__dirname, "src/assets/img/icons"),
      rooms: path.resolve(__dirname, "src/assets/img/rooms"),
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

    minimize: true,
    minimizer: [
      new TerserPlugin(), //{terserOptions : {//https://github.com/terser/terser#minify-options}}
    ],
  },
};
