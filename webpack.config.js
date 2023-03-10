/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const webpack = require("webpack");
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  //mode: "development",
  mode: "production",
  entry: {
    main: "./src/index.tsx",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "/",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    modules: ["node_modules"],
    alias: {
      "@": path.join(__dirname, ".", "src/"),
    },
  },
  devServer: {
    overlay: true,
    stats: "errors-only",
    hot: true,
    port: 3000,
    host: "0.0.0.0",
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|svg|gif|jpeg|eot|svg|ttf|woff|woff2|webp)$/,
        loader: "url-loader",
        options: {
          name: "[name].[ext]?[hash]",
          limit: 10000, // 10Kb
          outputPath: "asset",
        },
        type: "javascript/auto",
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, ".", "public/index.html"),
      filename: "index.html",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "public/",
          to: "public/",
          globOptions: {
            ignore: ["**/*.html"],
          },
        },
      ],
    }),
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),
  ],
};
