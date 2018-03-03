const path = require("path");
const thisPath = __dirname;

module.exports = {
    mode: "development",
    target: "web",
    devtool: "source-map",
    entry: "./src/jsonclient.js",
    output: {
        filename: "jsonclient.js",
        path: path.resolve(thisPath, "dist")
    },
    resolve: {
        alias: {
            "@ts": path.resolve(thisPath, "src")
        }
    }
};