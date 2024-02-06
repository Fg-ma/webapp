const webpack = require("webpack");
const dotenv = require("dotenv");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

dotenv.config();

module.exports = {
    entry: "./index.jsx",
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
        },
        extensions: [".js", ".jsx", ".json"],
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
