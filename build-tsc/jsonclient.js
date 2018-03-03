"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Cache_1 = require("./enums/Cache");
const Credentials_1 = require("./enums/Credentials");
const Mode_1 = require("./enums/Mode");
const Redirect_1 = require("./enums/Redirect");
const Referrer_1 = require("./enums/Referrer");
const fetchJSON = require("fetch_json");
class $json {
    static get(path, functor) {
        return fetchJSON(path, functor);
    }
    static __post_options(url, data, options) {
        delete options["body"];
        delete options["headers"];
        delete options["method"];
        const payload = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "content-type": "application/json"
            }
        };
        const finalPayload = Object.assign({}, payload, options);
        const promise = new Promise((resolve, reject) => {
            const f = fetch(url, finalPayload);
            f.then(response => {
                var contentType = response.headers.get("content-type");
                if (contentType && contentType.includes("application/json"))
                    return response.json().then(resolve);
                else {
                    reject("Something went wrong during data inspection (data is not JSON or couldn't reach file)");
                    return null;
                }
            });
            return f;
        });
        return promise;
    }
    static __post_allArgs(url, data, cache, credentials, mode, redirect, referrer) {
        const payload = {
            cache,
            credentials,
            mode,
            redirect,
            referrer
        };
        return $json.__post_options(url, data, payload);
    }
    static __post_data(url, data) {
        return $json.__post_options(url, data, {});
    }
    static post(url, data, ...options) {
        if (options.length === 0)
            return $json.__post_data(url, data);
        if (options.length === 5) {
            const cache = options[0];
            const credentials = options[1];
            const mode = options[2];
            const redirect = options[3];
            const referrer = options[4];
            return $json.__post_allArgs(url, data, cache, credentials, mode, redirect, referrer);
        }
        if (options.length === 1) {
            const optionsObj = options[0];
            return $json.__post_options(url, data, optionsObj);
        }
        return null;
    }
}
$json.enums = { Cache: Cache_1.Cache, Credentials: Credentials_1.Credentials, Mode: Mode_1.Mode, Redirect: Redirect_1.Redirect, Referrer: Referrer_1.Referrer };
exports.default = $json;
;
//# sourceMappingURL=jsonclient.js.map