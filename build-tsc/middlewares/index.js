"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
exports.typeCheckPath = ({ path, data, options }) => {
    if (typeof path !== "string")
        return Promise.reject("The 1st argument must be a string");
    return {
        path,
        data,
        options,
    };
};
exports.typeCheckData = ({ path, data, options }) => {
    if (typeof data !== "object" || data === null)
        throw new TypeError("'data' must be an Object");
    return {
        path,
        data,
        options,
    };
};
exports.processQueryString = ({ path, data, options }) => {
    Object.values(data).forEach(utils_1.check);
    const newPath = utils_1.objToQueryString(path, data);
    return {
        path: newPath,
        data,
        options,
    };
};
exports.responseHandler = async (response) => {
    if (response.ok)
        return response.json();
    try {
        const json = await response.json();
        return Promise.reject(json);
    }
    catch (error) {
        return Promise.reject({
            response,
            error,
        });
    }
};
//# sourceMappingURL=index.js.map