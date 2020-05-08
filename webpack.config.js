const path = require("path");
const webpack = require("webpack");
const thisPath = __dirname;

module.exports = {
    mode: "production",
    target: "web",
    // devtool: "source-map",
	entry: "./build-babel/jsonclient.js",
    output: {
        filename: "jsonclient.js",
		path: path.resolve(thisPath, "dist"),
		libraryTarget: "umd",
		library: "jsonclient",
		globalObject: "this",
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