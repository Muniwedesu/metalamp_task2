const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const sassIncludes = ["src/views/"];

exports.rulesList = [
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
        options: { pretty: false, root: path.resolve(__dirname, "src") },
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
];
