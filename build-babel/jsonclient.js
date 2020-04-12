"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var Cache_1 = require("./enums/Cache");
var Credentials_1 = require("./enums/Credentials");
var Mode_1 = require("./enums/Mode");
var Redirect_1 = require("./enums/Redirect");
var Referrer_1 = require("./enums/Referrer");
var utils_1 = require("./utils");
var MiddlewareStack_1 = require("./middlewares/MiddlewareStack");
exports.MiddlewareStack = MiddlewareStack_1.MiddlewareStack;
var Middlewares_1 = require("./middlewares/Middlewares");
exports.Middlewares = Middlewares_1.Middlewares;
var fetchJSON = require("fetch_json");
var getDefaults = function getDefaults() {
    return {
        qs: {}
    };
};
var postDefaults = function postDefaults() {
    return {
        data: {}
    };
};

var JsonClient = function () {
    function JsonClient() {
        _classCallCheck(this, JsonClient);

        this.enums = {
            Cache: Cache_1.Cache,
            Credentials: Credentials_1.Credentials,
            Mode: Mode_1.Mode,
            Redirect: Redirect_1.Redirect,
            Referrer: Referrer_1.Referrer
        };
        this.defaults = {
            globals: {
                data: {},
                qs: {},
                options: {},
                headers: {
                    "Content-Type": "application/json"
                }
            },
            GET: getDefaults(),
            POST: postDefaults(),
            PUT: postDefaults(),
            DELETE: postDefaults(),
            PATCH: postDefaults()
        };
    }

    _createClass(JsonClient, [{
        key: "constuctor",
        value: function constuctor() {}
    }, {
        key: "get",
        value: function get(path) {
            var _this = this;

            var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            data = utils_1.mergeDeep({}, fetchJSON.defaults.qs, data);
            if ((typeof data === "undefined" ? "undefined" : _typeof(data)) != "object" || data === null) throw new TypeError("'data' must be an Object");
            Object.values(data).forEach(utils_1.check);
            var qstring = utils_1.objToQueryString(path, data);
            return new Promise(function (resolve, reject) {
                if (typeof path == "string") {
                    var fetchOptions = utils_1.mergeDeep({}, _this.defaults.globals.options, _this.defaults.GET.options || {}, options, { method: "GET" });
                    fetchOptions.headers = utils_1.mergeDeep({}, _this.defaults.globals.headers, _this.defaults.GET.options || {}, fetchOptions.headers || {});
                    var f = fetch(path + qstring, fetchOptions);
                    f.then(function (response) {
                        return response.json().then(resolve).catch(function (_) {
                            var error = "Something went wrong during data inspection (data is not JSON or couldn't reach file)";
                            reject(error);
                            return Promise.reject(error);
                        });
                    });
                    return f;
                } else {
                    if (typeof path != "string") reject("The 1st argument must be a string");
                    return null;
                }
            });
        }
    }, {
        key: "method",
        value: function method(_method, url, data) {
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
                return this.__method_options(METHOD, url, data, utils_1.mergeDeep({}, $options, {
                    cache: cache,
                    credentials: credentials,
                    mode: mode,
                    redirect: redirect,
                    referrer: referrer
                }));
            }
            if ((arguments.length <= 3 ? 0 : arguments.length - 3) === 1) {
                var optionsObj = arguments.length <= 3 ? undefined : arguments[3];
                return this.__method_options(METHOD, url, data, utils_1.mergeDeep({}, $options, optionsObj));
            }
            return null;
        }
    }, {
        key: "__method_options",
        value: function __method_options(method, url, data, options) {
            delete options["body"];
            delete options["method"];
            var payload = {
                method: "POST",
                body: JSON.stringify(utils_1.mergeDeep({}, this.defaults.globals.data, this.defaults[method].data, data)),
                headers: utils_1.mergeDeep({}, this.defaults.globals.headers, this.defaults[method].headers)
            };
            var finalPayload = utils_1.mergeDeep({}, payload, options);
            var promise = new Promise(function (resolve, reject) {
                var f = fetch(url, finalPayload);
                f.then(function (response) {
                    return response.json().then(resolve).catch(function (_) {
                        var error = "Something went wrong during data inspection (data is not JSON)";
                        reject(error);
                        return Promise.reject(error);
                    });
                });
                return f;
            });
            return promise;
        }
    }]);

    return JsonClient;
}();

exports.JsonClient = JsonClient;
["post", "put", "delete", "patch"].forEach(function (method) {
    var METHOD = method.toUpperCase();
    if (method != "post") JsonClient.prototype.method[method] = function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return this.method.apply(this, [METHOD].concat(args));
    };
    JsonClient.prototype[method] = function (url, data) {
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
    Object.defineProperty(JsonClient.prototype, "__" + method + "_data", {
        value: function value(url, data) {
            return this["__" + method + "_options"](url, data, this.defaults[METHOD].options);
        }
    });
    Object.defineProperty(JsonClient.prototype, "__" + method + "_allArgs", {
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
    Object.defineProperty(JsonClient.prototype, "__" + method + "_options", {
        value: function value(url, data, options) {
            delete options["body"];
            delete options["method"];
            var payload = {
                method: METHOD,
                body: JSON.stringify(utils_1.mergeDeep({}, this.defaults.globals.data, this.defaults[METHOD].data, data)),
                headers: this.defaults[METHOD].headers
            };
            var finalPayload = utils_1.mergeDeep({}, payload, options);
            var promise = new Promise(function (resolve, reject) {
                var f = fetch(url, finalPayload);
                f.then(function (response) {
                    return response.json().then(resolve).catch(function (_) {
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
var $json = new JsonClient();
exports.$json = $json;
//# sourceMappingURL=jsonclient.js.map