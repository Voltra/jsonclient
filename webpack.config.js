const path = require("path");
const webpack = require("webpack");
const thisPath = __dirname;

module.exports = {
    mode: "production",
    target: "web",
    // devtool: "source-map",
    entry: "./src/jsonclient.js",
    output: {
        filename: "jsonclient.js",
        path: path.resolve(thisPath, "dist")
    },
    resolve: {
        alias: {
            "@ts": path.resolve(thisPath, "src")
        }
    },
    optimization: {
        minimize: true
    }
};