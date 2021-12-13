let { pages } = require("./pages");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const CompressionPlugin = require("compression-webpack-plugin");

const zlib = require("zlib");

const generalCompressionOptions = {
  test: /\.(js|css|html|svg|eot|ttf|woff)$/,
  algorithm: "brotliCompress",
  filename: "[path][base].br",
  compressionOptions: {
    params: {
      [zlib.constants.BROTLI_PARAM_MODE]: zlib.constants.BROTLI_MODE_GENERIC,
      [zlib.constants.BROTLI_PARAM_QUALITY]: zlib.constants.BROTLI_MAX_QUALITY,
    },
  },
  // threshold: 10240,
  minRatio: 0.8,
  deleteOriginalAssets: false,
};

const fontCompressionOptions = {
  test: /\.woff$/,
  algorithm: "brotliCompress",
  filename: "[path][base].br",
  compressionOptions: {
    params: {
      [zlib.constants.BROTLI_PARAM_MODE]: zlib.constants.BROTLI_MODE_FONT,
      [zlib.constants.BROTLI_PARAM_QUALITY]: zlib.constants.BROTLI_MAX_QUALITY,
    },
  },
  // threshold: 10240,
  minRatio: 0.8,
  deleteOriginalAssets: false,
};

let handler = (percentage, message, ...args) => {
  console.info(Math.round(percentage * 100), message, ...args);
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
  new CompressionPlugin(generalCompressionOptions),
  new CompressionPlugin(fontCompressionOptions),
  new CompressionPlugin({
    test: /\.(js|css|html|svg|eot|ttf|woff)$/,
    algorithm: "gzip",
    filename: "[path][base].gz",
    compressionOptions: {
      level: 9,
    },
    // threshold: 10240,
    minRatio: 0.8,
    deleteOriginalAssets: false,
  }),
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
