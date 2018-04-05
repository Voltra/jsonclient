"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Cache_1 = require("./enums/Cache");
const Credentials_1 = require("./enums/Credentials");
const Mode_1 = require("./enums/Mode");
const Redirect_1 = require("./enums/Redirect");
const Referrer_1 = require("./enums/Referrer");
const fetchJSON = require("fetch_json");
const $json = {
    postOptionsEnums: { Cache: Cache_1.Cache, Credentials: Credentials_1.Credentials, Mode: Mode_1.Mode, Redirect: Redirect_1.Redirect, Referrer: Referrer_1.Referrer },
    defaults: {
        POST: {
            options: {},
            headers: {
                "content-type": "application/json"
            }
        }
    },
    get(path, data = {}) {
        return fetchJSON(path, data);
    },
    post(url, data, ...options) {
        if (options.length === 0)
            return this.__post_data(url, data);
        if (options.length === 5) {
            const cache = options[0];
            const credentials = options[1];
            const mode = options[2];
            const redirect = options[3];
            const referrer = options[4];
            return this.__post_allArgs(url, data, cache, credentials, mode, redirect, referrer);
        }
        if (options.length === 1) {
            const optionsObj = options[0];
            return this.__post_options(url, data, optionsObj);
        }
        return null;
    },
};
exports.$json = $json;
Object.defineProperty($json, "__post_data", {
    value: function __post_data(url, data) {
        return this.__post_options(url, data, this.defaults.POST.options);
    }
});
Object.defineProperty($json, "__post_allArgs", {
    value: function __post_allArgs(url, data, cache, credentials, mode, redirect, referrer) {
        const payload = {
            cache,
            credentials,
            mode,
            redirect,
            referrer
        };
        return this.__post_options(url, data, payload);
    }
});
Object.defineProperty($json, "__post_options", {
    value: function __post_options(url, data, options) {
        delete options["body"];
        delete options["headers"];
        delete options["method"];
        const payload = {
            method: "POST",
            body: JSON.stringify(data),
            headers: this.defaults.POST.headers
        };
        const finalPayload = Object.assign({}, payload, options);
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
//# sourceMappingURL=jsonclient.js.map