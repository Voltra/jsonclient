const path = require('path');
const thisPath = __dirname;

module.exports = {
    devtool: "source-map",
    entry: './build-babel/jsonclient.js',
    output: {
        filename: 'jsonclient.js',
        path: path.resolve(thisPath, "dist")
    },
    resolve: {
        alias: {
            "@ts": path.resolve(thisPath, "src")
        }
    }
};