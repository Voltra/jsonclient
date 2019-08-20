"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Cache_1 = require("./enums/Cache");
const Credentials_1 = require("./enums/Credentials");
const Mode_1 = require("./enums/Mode");
const Redirect_1 = require("./enums/Redirect");
const Referrer_1 = require("./enums/Referrer");
const fetchJSON = require("fetch_json");
function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}
function mergeDeep(target, ...sources) {
    if (!sources.length)
        return target;
    const source = sources.shift();
    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key])
                    Object.assign(target, { [key]: {} });
                mergeDeep(target[key], source[key]);
            }
            else {
                Object.assign(target, { [key]: source[key] });
            }
        }
    }
    return mergeDeep(target, ...sources);
}
const $json = {
    enums: { Cache: Cache_1.Cache, Credentials: Credentials_1.Credentials, Mode: Mode_1.Mode, Redirect: Redirect_1.Redirect, Referrer: Referrer_1.Referrer },
    defaults: {
        GET: fetchJSON.defaults,
    },
    get(path, data = {}, options = {}) {
        return fetchJSON(path, data, options);
    },
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
            return this.__method_options(METHOD, url, data, mergeDeep({}, $options, {
                cache,
                credentials,
                mode,
                redirect,
                referrer,
            }));
        }
        if (options.length === 1) {
            const optionsObj = options[0];
            return this.__method_options(METHOD, url, data, mergeDeep({}, $options, optionsObj));
        }
        return null;
    },
};
exports.$json = $json;
$json["__method_options"] = function (method, url, data, options) {
    delete options["body"];
    delete options["method"];
    const payload = {
        method: "POST",
        body: JSON.stringify(mergeDeep({}, this.defaults[method].data, data)),
        headers: this.defaults[method].headers
    };
    const finalPayload = mergeDeep({}, payload, options);
    const promise = new Promise((resolve, reject) => {
        const f = fetch(url, finalPayload);
        f.then(response => {
            return response.json().then(resolve)
                .catch(() => {
                const error = "Something went wrong during data inspection (data is not JSON)";
                reject(error);
                return Promise.reject(error);
            });
        });
        return f;
    });
    return promise;
};
["post", "put", "delete", "patch"].forEach(method => {
    const METHOD = method.toUpperCase();
    $json.defaults[METHOD] = {
        data: {},
        options: {},
        headers: {
            "Content-Type": "application/json"
        }
    };
    if (method != "post")
        $json.method[method] = $json.method.bind($json, METHOD);
    $json[method] = function (url, data, ...options) {
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
    Object.defineProperty($json, `__${method}_data`, {
        value: function (url, data) {
            return this[`__${method}_options`](url, data, this.defaults[METHOD].options);
        }
    });
    Object.defineProperty($json, `__${method}_allArgs`, {
        value: function (url, data, cache, credentials, mode, redirect, referrer) {
            const payload = {
                cache,
                credentials,
                mode,
                redirect,
                referrer
            };
            return this[`__${method}_options`](url, data, payload);
        }
    });
    Object.defineProperty($json, `__${method}_options`, {
        value: function (url, data, options) {
            delete options["body"];
            delete options["method"];
            const payload = {
                method: METHOD,
                body: JSON.stringify(mergeDeep({}, this.defaults[METHOD].data, data)),
                headers: this.defaults[METHOD].headers
            };
            const finalPayload = mergeDeep({}, payload, options);
            const promise = new Promise((resolve, reject) => {
                const f = fetch(url, finalPayload);
                f.then(response => {
                    return response.json().then(resolve)
                        .catch(() => {
                        const error = "Something went wrong during data inspection (data is not JSON)";
                        reject(error);
                        return Promise.reject(error);
                    });
                });
                return f;
            });
            return promise;
        }
    });
});
//# sourceMappingURL=jsonclient.js.map