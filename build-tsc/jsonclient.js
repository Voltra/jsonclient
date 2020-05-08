"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Cache_1 = require("./enums/Cache");
const Credentials_1 = require("./enums/Credentials");
const Mode_1 = require("./enums/Mode");
const Redirect_1 = require("./enums/Redirect");
const Referrer_1 = require("./enums/Referrer");
const MiddlewareStack_1 = require("./middlewares/MiddlewareStack");
exports.MiddlewareStack = MiddlewareStack_1.MiddlewareStack;
const Middlewares_1 = require("./middlewares/Middlewares");
exports.Middlewares = Middlewares_1.Middlewares;
const middlewares_1 = require("./middlewares");
const middlewares = require("./middlewares");
exports.middlewares = middlewares;
const getDefaults = () => ({
    qs: {},
    options: {},
    headers: {},
});
const postDefaults = () => ({
    data: {},
    options: {},
    headers: {},
});
class JsonClient {
    constructor() {
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
        this.middlewares = {
            GET: Middlewares_1.Middlewares.create(),
            POST: Middlewares_1.Middlewares.create(),
            PUT: Middlewares_1.Middlewares.create(),
            DELETE: Middlewares_1.Middlewares.create(),
            PATCH: Middlewares_1.Middlewares.create(),
        };
        middlewares_1.installAllDefaults(this);
    }
    async get(path, data = {}, options = {}) {
        const middlewares = this.middlewares.GET;
        try {
            const { path: fetchPath, options: fetchOptions, } = await middlewares.beforeRequest.execute({
                path,
                data,
                options,
            });
            const response = await fetch(fetchPath, fetchOptions);
            const parsedResponse = await middlewares.beforeResponse.execute(response);
            return middlewares.afterResponse.execute(parsedResponse);
        }
        catch (e) {
            const err = await middlewares.afterError.execute(e);
            throw err;
        }
    }
}
JsonClient.enums = {
    Cache: Cache_1.Cache,
    Credentials: Credentials_1.Credentials,
    Mode: Mode_1.Mode,
    Redirect: Redirect_1.Redirect,
    Referrer: Referrer_1.Referrer,
};
exports.JsonClient = JsonClient;
["post", "put", "delete", "patch"].forEach(method => {
    const METHOD = method.toUpperCase();
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
        return Promise.reject(`Invalid $json.${method} call`);
    };
    JsonClient.prototype[`__${method}_data`] = function (url, data = {}) {
        return this[`__${method}_options`](url, data, this.defaults[METHOD].options);
    };
    JsonClient.prototype[`__${method}_allArgs`] = function (url, data, cache, credentials, mode, redirect, referrer) {
        const payload = {
            cache,
            credentials,
            mode,
            redirect,
            referrer,
        };
        return this[`__${method}_options`](url, data, payload);
    };
    JsonClient.prototype[`__${method}_options`] = async function (url, data, options) {
        const middlewares = this.middlewares[METHOD];
        try {
            const { path: fetchPath, options: finalPayload, } = await middlewares.beforeRequest.execute({
                path: url,
                data,
                options,
            });
            const response = await fetch(fetchPath, finalPayload);
            const parsedResponse = await middlewares.beforeResponse.execute(response);
            return middlewares.afterResponse.execute(parsedResponse);
        }
        catch (e) {
            const err = await middlewares.afterError.execute(e);
            throw err;
        }
    };
});
const $json = new JsonClient();
exports.$json = $json;
//# sourceMappingURL=jsonclient.js.map