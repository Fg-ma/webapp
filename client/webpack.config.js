const webpack = require("webpack");
const dotenv = require("dotenv");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

dotenv.config();

module.exports = {
  entry: "./index.tsx",
  mode: "development",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "index_bundle.js",
  },
  target: "web",
  devServer: {
    port: process.env.FRONTEND_PORT || 5000,
    static: {
      directory: path.join(__dirname, "public"),
    },
    open: true,
    hot: true,
    liveReload: true,
  },
  resolve: {
    alias: {
      "@config": path.resolve(__dirname, "config"),
      "@redux": path.resolve(__dirname, "src/redux"),
      "@components": path.resolve(__dirname, "src/components"),
      "@FgTypes": path.resolve(__dirname, "src/types"),
      "@context": path.resolve(__dirname, "src/context"),
      "@IDB": path.resolve(__dirname, "src/IDB"),
      "@left": path.resolve(__dirname, "src/left"),
      "@middle": path.resolve(__dirname, "src/middle"),
      "@right": path.resolve(__dirname, "src/right"),
    },
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.pdf$/,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
    }),
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),
  ],
};
