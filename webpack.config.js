const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const sassIncludes = ["src/views/"];
const handler = (percentage, message, ...args) => {
  console.info(percentage, message, ...args);
};
let pageNames = ["index", "search", "details", "ui"].map((p) => {
  return { name: p, folder: p };
});
const pages = [
  ...pageNames,
  { name: "__login", folder: "account/__login", filename: "login" },
  { name: "__register", folder: "account/__register", filename: "register" },
];

module.exports = {
  entry: "./src/app.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: "pre",
        use: ["source-map-loader"],
      },
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
        include: [path.resolve(__dirname, "src/assets/fonts")],
      },
      {
        test: path.resolve(__dirname, "src/assets/favicon.svg"),
        type: "asset/resource",
      },
      {
        test: /\.(jpg|png|svg)$/i,
        type: "asset/resource",
        include: [path.resolve(__dirname, "src/assets/img")],
        generator: {
          filename: "img/[hash][ext][query]",
        },
      },
    ],
  },
  plugins: [
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
          template: `src/views/${page.folder}/${page.name}.pug`,
          minify: false,
          filename: `${page.filename ? page.filename : page.name}.html`,
        })
    )
  ),
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
    // splitChunks: {
    //   chunks: "all",
    // },
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      // new TerserPlugin({ terserOptions: { mangle: true }, extractComments: false }), //{terserOptions : {//https://github.com/terser/terser#minify-options}}
    ],
  },
};
