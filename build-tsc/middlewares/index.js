"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const allMethods = ["GET", "POST", "PUT", "DELETE", "PATCH"];
const postLikeMethods = ["POST", "PUT", "DELETE", "PATCH"];
const __typeCheckPath = ({ path, data, options }) => {
    if (typeof path !== "string")
        return Promise.reject("The 1st argument must be a string");
    return {
        path,
        data,
        options,
    };
};
exports.typeCheckPath = ($json, methods = allMethods) => {
    allMethods.forEach(method => {
        $json.middlewares[method]
            .pipeBeforeRequest(__typeCheckPath);
    });
};
const __typeCheckData = ({ path, data, options }) => {
    if (typeof data !== "object" || data === null)
        throw new TypeError("'data' must be an Object");
    return {
        path,
        data,
        options,
    };
};
exports.typeCheckData = ($json, methods = allMethods) => {
    allMethods.forEach(method => {
        $json.middlewares[method]
            .pipeBeforeRequest(__typeCheckData);
    });
};
exports.mergePayload = ($json) => {
    $json.middlewares.GET
        .pipeBeforeRequest(({ path, data, options }) => {
        const newData = utils_1.mergeDeep({}, $json.defaults.globals.qs || {}, $json.defaults.GET.qs || {}, data);
        const fetchOptions = utils_1.mergeDeep({}, $json.defaults.globals.options, $json.defaults.GET.options || {}, options, { method: "GET" });
        fetchOptions.headers = utils_1.mergeDeep({}, $json.defaults.globals.headers, $json.defaults.GET.options || {}, fetchOptions.headers || {});
        return {
            path,
            data: newData,
            options: fetchOptions,
        };
    });
};
exports.mergePostPayload = ($json, methods = postLikeMethods) => {
    methods.forEach(method => {
        $json.middlewares[method]
            .pipeBeforeRequest(({ path, data, options }) => {
            const payload = {
                method,
                body: JSON.stringify(utils_1.mergeDeep({}, $json.defaults.globals.data, $json.defaults[method].data, data)),
                headers: utils_1.mergeDeep({}, $json.defaults.globals.headers, $json.defaults[method].headers),
            };
            const finalPayload = utils_1.mergeDeep({}, $json.defaults.globals.options, $json.defaults[method].options, payload, options);
            return {
                path,
                data,
                options: finalPayload,
            };
        });
    });
};
const __processQueryString = ({ path, data, options }) => {
    Object.values(data).forEach(utils_1.check);
    const newPath = path + utils_1.objToQueryString(path, data);
    return {
        path: newPath,
        data,
        options,
    };
};
exports.processQueryString = ($json) => {
    $json.middlewares.GET
        .pipeBeforeRequest(__processQueryString);
};
const __responseHandler = async (response) => {
    try {
        if (response.ok)
            return response.json();
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
exports.responseHandler = ($json, methods = allMethods) => {
    allMethods.forEach(method => {
        $json.middlewares[method]
            .pipeBeforeResponse(__responseHandler);
    });
};
exports.installGlobals = ($json, methods = allMethods) => {
    exports.typeCheckPath($json, methods);
    exports.typeCheckData($json, methods);
    exports.responseHandler($json, methods);
};
exports.installGet = ($json) => {
    exports.mergePayload($json);
    exports.processQueryString($json);
};
exports.installPostLike = ($json, methods = postLikeMethods) => {
    exports.mergePostPayload($json, methods);
};
exports.installAllDefaults = ($json) => {
    exports.installGlobals($json);
    exports.installGet($json);
    exports.installPostLike($json);
};
//# sourceMappingURL=index.js.map