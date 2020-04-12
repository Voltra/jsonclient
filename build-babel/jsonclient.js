"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

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
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(path) {
                var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
                var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
                var qstring, fetchOptions, response, error;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                data = utils_1.mergeDeep({}, fetchJSON.defaults.qs, data);

                                if (!((typeof data === "undefined" ? "undefined" : _typeof(data)) != "object" || data === null)) {
                                    _context.next = 3;
                                    break;
                                }

                                throw new TypeError("'data' must be an Object");

                            case 3:
                                Object.values(data).forEach(utils_1.check);
                                qstring = utils_1.objToQueryString(path, data);

                                if (!(typeof path == "string")) {
                                    _context.next = 21;
                                    break;
                                }

                                fetchOptions = utils_1.mergeDeep({}, this.defaults.globals.options, this.defaults.GET.options || {}, options, { method: "GET" });

                                fetchOptions.headers = utils_1.mergeDeep({}, this.defaults.globals.headers, this.defaults.GET.options || {}, fetchOptions.headers || {});
                                _context.prev = 8;
                                _context.next = 11;
                                return fetch(path + qstring, fetchOptions);

                            case 11:
                                response = _context.sent;
                                return _context.abrupt("return", response.json());

                            case 15:
                                _context.prev = 15;
                                _context.t0 = _context["catch"](8);
                                error = "Something went wrong during data inspection (data is not JSON or couldn't reach file)";
                                return _context.abrupt("return", Promise.reject(error));

                            case 19:
                                _context.next = 22;
                                break;

                            case 21:
                                return _context.abrupt("return", Promise.reject("The 1st argument must be a string"));

                            case 22:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[8, 15]]);
            }));

            function get(_x3) {
                return _ref.apply(this, arguments);
            }

            return get;
        }()
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
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(method, url, data, options) {
                var payload, finalPayload, response, error;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                delete options["body"];
                                delete options["method"];
                                payload = {
                                    method: method,
                                    body: JSON.stringify(utils_1.mergeDeep({}, this.defaults.globals.data, this.defaults[method].data, data)),
                                    headers: utils_1.mergeDeep({}, this.defaults.globals.headers, this.defaults[method].headers)
                                };
                                finalPayload = utils_1.mergeDeep({}, payload, options);
                                _context2.prev = 4;
                                _context2.next = 7;
                                return fetch(url, finalPayload);

                            case 7:
                                response = _context2.sent;
                                return _context2.abrupt("return", response.json());

                            case 11:
                                _context2.prev = 11;
                                _context2.t0 = _context2["catch"](4);
                                error = "Something went wrong during data inspection (data is not JSON)";
                                return _context2.abrupt("return", Promise.reject(error));

                            case 15:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[4, 11]]);
            }));

            function __method_options(_x4, _x5, _x6, _x7) {
                return _ref2.apply(this, arguments);
            }

            return __method_options;
        }()
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
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(url, data, options) {
                var payload, finalPayload, response, error;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                delete options["body"];
                                delete options["method"];
                                payload = {
                                    method: METHOD,
                                    body: JSON.stringify(utils_1.mergeDeep({}, this.defaults.globals.data, this.defaults[METHOD].data, data)),
                                    headers: this.defaults[METHOD].headers
                                };
                                finalPayload = utils_1.mergeDeep({}, payload, options);
                                _context3.prev = 4;
                                _context3.next = 7;
                                return fetch(url, finalPayload);

                            case 7:
                                response = _context3.sent;
                                return _context3.abrupt("return", response.json());

                            case 11:
                                _context3.prev = 11;
                                _context3.t0 = _context3["catch"](4);
                                error = "Something went wrong during data inspection (data is not JSON)";
                                return _context3.abrupt("return", Promise.reject(error));

                            case 15:
                            case "end":
                                return _context3.stop();
                        }
                    }
                }, _callee3, this, [[4, 11]]);
            }));

            function value(_x8, _x9, _x10) {
                return _ref3.apply(this, arguments);
            }

            return value;
        }()
    });
});
var $json = new JsonClient();
exports.$json = $json;
//# sourceMappingURL=jsonclient.js.map