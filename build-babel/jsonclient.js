"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

Object.defineProperty(exports, "__esModule", { value: true });
var Cache_1 = require("./enums/Cache");
var Credentials_1 = require("./enums/Credentials");
var Mode_1 = require("./enums/Mode");
var Redirect_1 = require("./enums/Redirect");
var Referrer_1 = require("./enums/Referrer");
var fetchJSON = require("fetch_json");
function isObject(item) {
    return item && (typeof item === "undefined" ? "undefined" : _typeof(item)) === 'object' && !Array.isArray(item);
}
function mergeDeep(target) {
    for (var _len = arguments.length, sources = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        sources[_key - 1] = arguments[_key];
    }

    if (!sources.length) return target;
    var source = sources.shift();
    if (isObject(target) && isObject(source)) {
        for (var key in source) {
            if (isObject(source[key])) {
                if (!target[key]) Object.assign(target, _defineProperty({}, key, {}));
                mergeDeep(target[key], source[key]);
            } else {
                Object.assign(target, _defineProperty({}, key, source[key]));
            }
        }
    }
    return mergeDeep.apply(undefined, [target].concat(sources));
}
var $json = {
    enums: { Cache: Cache_1.Cache, Credentials: Credentials_1.Credentials, Mode: Mode_1.Mode, Redirect: Redirect_1.Redirect, Referrer: Referrer_1.Referrer },
    defaults: {
        GET: fetchJSON.defaults
    },
    get: function get(path) {
        var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        return fetchJSON(path, data, options);
    },
    method: function method(_method, url, data) {
        var METHOD = _method.toUpperCase();
        var $options = {
            headers: {
                "X-HTTP-Method-Override": METHOD,
                "X-HTTP-Method": METHOD,
                "X-Method-Override": METHOD
            }
        };
        if ((arguments.length <= 3 ? 0 : arguments.length - 3) === 0) return this.__method_options(METHOD, url, data, $options);
        if ((arguments.length <= 3 ? 0 : arguments.length - 3) === 5) {
            var cache = arguments.length <= 3 ? undefined : arguments[3];
            var credentials = arguments.length <= 4 ? undefined : arguments[4];
            var mode = arguments.length <= 5 ? undefined : arguments[5];
            var redirect = arguments.length <= 6 ? undefined : arguments[6];
            var referrer = arguments.length <= 7 ? undefined : arguments[7];
            return this.__method_options(METHOD, url, data, mergeDeep({}, $options, {
                cache: cache,
                credentials: credentials,
                mode: mode,
                redirect: redirect,
                referrer: referrer
            }));
        }
        if ((arguments.length <= 3 ? 0 : arguments.length - 3) === 1) {
            var optionsObj = arguments.length <= 3 ? undefined : arguments[3];
            return this.__method_options(METHOD, url, data, mergeDeep({}, $options, optionsObj));
        }
        return null;
    }
};
exports.$json = $json;
$json["__method_options"] = function (method, url, data, options) {
    delete options["body"];
    delete options["method"];
    var payload = {
        method: "POST",
        body: JSON.stringify(mergeDeep({}, this.defaults[method].data, data)),
        headers: this.defaults[method].headers
    };
    var finalPayload = mergeDeep({}, payload, options);
    var promise = new Promise(function (resolve, reject) {
        var f = fetch(url, finalPayload);
        f.then(function (response) {
            return response.json().then(resolve).catch(function () {
                var error = "Something went wrong during data inspection (data is not JSON)";
                reject(error);
                return Promise.reject(error);
            });
        });
        return f;
    });
    return promise;
};
["post", "put", "delete", "patch"].forEach(function (method) {
    var METHOD = method.toUpperCase();
    $json.defaults[METHOD] = {
        data: {},
        options: {},
        headers: {
            "Content-Type": "application/json"
        }
    };
    if (method != "post") $json.method[method] = $json.method.bind($json, METHOD);
    $json[method] = function (url, data) {
        if ((arguments.length <= 2 ? 0 : arguments.length - 2) === 0) return this["__" + method + "_data"](url, data);
        if ((arguments.length <= 2 ? 0 : arguments.length - 2) === 5) {
            var cache = arguments.length <= 2 ? undefined : arguments[2];
            var credentials = arguments.length <= 3 ? undefined : arguments[3];
            var mode = arguments.length <= 4 ? undefined : arguments[4];
            var redirect = arguments.length <= 5 ? undefined : arguments[5];
            var referrer = arguments.length <= 6 ? undefined : arguments[6];
            return this["__" + method + "_allArgs"](url, data, cache, credentials, mode, redirect, referrer);
        }
        if ((arguments.length <= 2 ? 0 : arguments.length - 2) === 1) {
            var optionsObj = arguments.length <= 2 ? undefined : arguments[2];
            return this["__" + method + "_options"](url, data, optionsObj);
        }
        return null;
    };
    Object.defineProperty($json, "__" + method + "_data", {
        value: function value(url, data) {
            return this["__" + method + "_options"](url, data, this.defaults[METHOD].options);
        }
    });
    Object.defineProperty($json, "__" + method + "_allArgs", {
        value: function value(url, data, cache, credentials, mode, redirect, referrer) {
            var payload = {
                cache: cache,
                credentials: credentials,
                mode: mode,
                redirect: redirect,
                referrer: referrer
            };
            return this["__" + method + "_options"](url, data, payload);
        }
    });
    Object.defineProperty($json, "__" + method + "_options", {
        value: function value(url, data, options) {
            delete options["body"];
            delete options["method"];
            var payload = {
                method: METHOD,
                body: JSON.stringify(mergeDeep({}, this.defaults[METHOD].data, data)),
                headers: this.defaults[METHOD].headers
            };
            var finalPayload = mergeDeep({}, payload, options);
            var promise = new Promise(function (resolve, reject) {
                var f = fetch(url, finalPayload);
                f.then(function (response) {
                    return response.json().then(resolve).catch(function () {
                        var error = "Something went wrong during data inspection (data is not JSON)";
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