"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Cache_1 = require("./enums/Cache");
const Credentials_1 = require("./enums/Credentials");
const Mode_1 = require("./enums/Mode");
const Redirect_1 = require("./enums/Redirect");
const Referrer_1 = require("./enums/Referrer");
const utils_1 = require("./utils");
const fetchJSON = require("fetch_json");
const getDefaults = () => ({
    qs: {},
});
const postDefaults = () => ({
    data: {},
});
class JsonClient {
    constructor() {
        this.enums = {
            Cache: Cache_1.Cache,
            Credentials: Credentials_1.Credentials,
            Mode: Mode_1.Mode,
            Redirect: Redirect_1.Redirect,
            Referrer: Referrer_1.Referrer,
        };
        this.defaults = {
            globals: {
                data: {},
                qs: {},
                options: {},
                headers: {
                    "Content-Type": "application/json",
                },
            },
            GET: getDefaults(),
            POST: postDefaults(),
            PUT: postDefaults(),
            DELETE: postDefaults(),
            PATCH: postDefaults(),
        };
    }
    constuctor() { }
    get(path, data = {}, options = {}) {
        data = utils_1.mergeDeep({}, fetchJSON.defaults.qs, data);
        if (typeof data != "object" || data === null)
            throw new TypeError("'data' must be an Object");
        Object.values(data).forEach(utils_1.check);
        const qstring = utils_1.objToQueryString(path, data);
        return new Promise((resolve, reject) => {
            if (typeof path == "string") {
                const fetchOptions = utils_1.mergeDeep({}, this.defaults.globals.options, this.defaults.GET.options || {}, options, { method: "GET" });
                fetchOptions.headers = utils_1.mergeDeep({}, this.defaults.globals.headers, this.defaults.GET.options || {}, fetchOptions.headers || {});
                const f = fetch(path + qstring, fetchOptions);
                f.then(response => {
                    return response.json()
                        .then(resolve)
                        .catch(_ => {
                        const error = "Something went wrong during data inspection (data is not JSON or couldn't reach file)";
                        reject(error);
                        return Promise.reject(error);
                    });
                });
                return f;
            }
            else {
                if (typeof path != "string")
                    reject("The 1st argument must be a string");
                return null;
            }
        });
    }
    method(method, url, data, ...options) {
        const METHOD = method.toUpperCase();
        const $options = {
            headers: {
                "X-HTTP-Method-Override": METHOD,
                "X-HTTP-Method": METHOD,
                "X-Method-Override": METHOD,
            },
        };
        if (options.length === 0)
            return this.__method_options(METHOD, url, data, $options);
        if (options.length === 5) {
            const cache = options[0];
            const credentials = options[1];
            const mode = options[2];
            const redirect = options[3];
            const referrer = options[4];
            return this.__method_options(METHOD, url, data, utils_1.mergeDeep({}, $options, {
                cache,
                credentials,
                mode,
                redirect,
                referrer,
            }));
        }
        if (options.length === 1) {
            const optionsObj = options[0];
            return this.__method_options(METHOD, url, data, utils_1.mergeDeep({}, $options, optionsObj));
        }
        return null;
    }
    __method_options(method, url, data, options) {
        delete options["body"];
        delete options["method"];
        const payload = {
            method: "POST",
            body: JSON.stringify(utils_1.mergeDeep({}, this.defaults.globals.data, this.defaults[method].data, data)),
            headers: utils_1.mergeDeep({}, this.defaults.globals.headers, this.defaults[method].headers),
        };
        const finalPayload = utils_1.mergeDeep({}, payload, options);
        const promise = new Promise((resolve, reject) => {
            const f = fetch(url, finalPayload);
            f.then(response => {
                return response.json()
                    .then(resolve)
                    .catch(_ => {
                    const error = "Something went wrong during data inspection (data is not JSON)";
                    reject(error);
                    return Promise.reject(error);
                });
            });
            return f;
        });
        return promise;
    }
}
exports.JsonClient = JsonClient;
["post", "put", "delete", "patch"].forEach(method => {
    const METHOD = method.toUpperCase();
    if (method != "post")
        JsonClient.prototype.method[method] = function (...args) {
            return this.method(METHOD, ...args);
        };
    JsonClient.prototype[method] = function (url, data, ...options) {
        if (options.length === 0)
            return this[`__${method}_data`](url, data);
        if (options.length === 5) {
            const cache = options[0];
            const credentials = options[1];
            const mode = options[2];
            const redirect = options[3];
            const referrer = options[4];
            return this[`__${method}_allArgs`](url, data, cache, credentials, mode, redirect, referrer);
        }
        if (options.length === 1) {
            const optionsObj = options[0];
            return this[`__${method}_options`](url, data, optionsObj);
        }
        return null;
    };
    Object.defineProperty(JsonClient.prototype, `__${method}_data`, {
        value: function (url, data) {
            return this[`__${method}_options`](url, data, this.defaults[METHOD].options);
        },
    });
    Object.defineProperty(JsonClient.prototype, `__${method}_allArgs`, {
        value: function (url, data, cache, credentials, mode, redirect, referrer) {
            const payload = {
                cache,
                credentials,
                mode,
                redirect,
                referrer,
            };
            return this[`__${method}_options`](url, data, payload);
        },
    });
    Object.defineProperty(JsonClient.prototype, `__${method}_options`, {
        value: function (url, data, options) {
            delete options["body"];
            delete options["method"];
            const payload = {
                method: METHOD,
                body: JSON.stringify(utils_1.mergeDeep({}, this.defaults.globals.data, this.defaults[METHOD].data, data)),
                headers: this.defaults[METHOD].headers,
            };
            const finalPayload = utils_1.mergeDeep({}, payload, options);
            const promise = new Promise((resolve, reject) => {
                const f = fetch(url, finalPayload);
                f.then(response => {
                    return response.json()
                        .then(resolve)
                        .catch(_ => {
                        const error = "Something went wrong during data inspection (data is not JSON)";
                        reject(error);
                        return Promise.reject(error);
                    });
                });
                return f;
            });
            return promise;
        },
    });
});
const $json = new JsonClient();
exports.$json = $json;
//# sourceMappingURL=jsonclient.js.map