(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["@babel/runtime/regenerator", "@babel/runtime/helpers/asyncToGenerator", "@babel/runtime/helpers/classCallCheck", "@babel/runtime/helpers/createClass"], factory);
  } else if (typeof exports !== "undefined") {
    factory(require("@babel/runtime/regenerator"), require("@babel/runtime/helpers/asyncToGenerator"), require("@babel/runtime/helpers/classCallCheck"), require("@babel/runtime/helpers/createClass"));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.regenerator, global.asyncToGenerator, global.classCallCheck, global.createClass);
    global.jsonclient = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_regenerator, _asyncToGenerator2, _classCallCheck2, _createClass2) {
  "use strict";

  var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

  _regenerator = _interopRequireDefault(_regenerator);
  _asyncToGenerator2 = _interopRequireDefault(_asyncToGenerator2);
  _classCallCheck2 = _interopRequireDefault(_classCallCheck2);
  _createClass2 = _interopRequireDefault(_createClass2);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

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

  var middlewares_1 = require("./middlewares");

  var getDefaults = function getDefaults() {
    return {
      qs: {},
      options: {},
      headers: {}
    };
  };

  var postDefaults = function postDefaults() {
    return {
      data: {},
      options: {},
      headers: {}
    };
  };

  var JsonClient = /*#__PURE__*/function () {
    function JsonClient() {
      (0, _classCallCheck2["default"])(this, JsonClient);
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
      this.middlewares = {
        GET: Middlewares_1.Middlewares.create(),
        POST: Middlewares_1.Middlewares.create(),
        PUT: Middlewares_1.Middlewares.create(),
        DELETE: Middlewares_1.Middlewares.create(),
        PATCH: Middlewares_1.Middlewares.create()
      };
      this.pipeGlobalMiddlewares();
      this.pipeGetMiddlewares();
      this.pipePostLikeMiddlewares();
    }

    (0, _createClass2["default"])(JsonClient, [{
      key: "pipeGlobalMiddlewares",
      value: function pipeGlobalMiddlewares() {
        var _this = this;

        ["GET", "POST", "PUT", "DELETE", "PATCH"].forEach(function (method) {
          _this.middlewares[method].pipeBeforeRequest(middlewares_1.typeCheckPath).pipeBeforeRequest(middlewares_1.typeCheckData).pipeBeforeResponse(middlewares_1.responseHandler);
        });
      }
    }, {
      key: "pipeGetMiddlewares",
      value: function pipeGetMiddlewares() {
        var _this2 = this;

        this.middlewares.GET.pipeBeforeRequest(function (_ref) {
          var path = _ref.path,
              data = _ref.data,
              options = _ref.options;
          var newData = utils_1.mergeDeep({}, _this2.defaults.globals.qs || {}, _this2.defaults.GET.qs || {}, data);
          var fetchOptions = utils_1.mergeDeep({}, _this2.defaults.globals.options, _this2.defaults.GET.options || {}, options, {
            method: "GET"
          });
          fetchOptions.headers = utils_1.mergeDeep({}, _this2.defaults.globals.headers, _this2.defaults.GET.options || {}, fetchOptions.headers || {});
          return {
            path: path,
            data: newData,
            options: fetchOptions
          };
        }).pipeBeforeRequest(middlewares_1.processQueryString);
      }
    }, {
      key: "pipePostLikeMiddlewares",
      value: function pipePostLikeMiddlewares() {
        var _this3 = this;

        ["POST", "PUT", "DELETE", "PATCH"].forEach(function (method) {
          _this3.middlewares[method].pipeBeforeRequest(function (_ref2) {
            var path = _ref2.path,
                data = _ref2.data,
                options = _ref2.options;
            var payload = {
              method: method,
              body: JSON.stringify(utils_1.mergeDeep({}, _this3.defaults.globals.data, _this3.defaults[method].data, data)),
              headers: utils_1.mergeDeep({}, _this3.defaults.globals.headers, _this3.defaults[method].headers)
            };
            var finalPayload = utils_1.mergeDeep({}, _this3.defaults.globals.options, _this3.defaults[method].options, payload, options);
            return {
              path: path,
              data: data,
              options: finalPayload
            };
          });
        });
      }
    }, {
      key: "get",
      value: function () {
        var _get = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(path) {
          var data,
              options,
              middlewares,
              _yield$middlewares$be,
              fetchPath,
              fetchOptions,
              response,
              parsedResponse,
              err,
              _args = arguments;

          return _regenerator["default"].wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  data = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
                  options = _args.length > 2 && _args[2] !== undefined ? _args[2] : {};
                  middlewares = this.middlewares.GET;
                  _context.prev = 3;
                  _context.next = 6;
                  return middlewares.beforeRequest.execute({
                    path: path,
                    data: data,
                    options: options
                  });

                case 6:
                  _yield$middlewares$be = _context.sent;
                  fetchPath = _yield$middlewares$be.path;
                  fetchOptions = _yield$middlewares$be.options;
                  _context.next = 11;
                  return fetch(fetchPath, fetchOptions);

                case 11:
                  response = _context.sent;
                  _context.next = 14;
                  return middlewares.beforeResponse.execute(response);

                case 14:
                  parsedResponse = _context.sent;
                  return _context.abrupt("return", middlewares.afterResponse.execute(parsedResponse));

                case 18:
                  _context.prev = 18;
                  _context.t0 = _context["catch"](3);
                  _context.next = 22;
                  return middlewares.afterError.execute(_context.t0);

                case 22:
                  err = _context.sent;
                  throw err;

                case 24:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this, [[3, 18]]);
        }));

        function get(_x) {
          return _get.apply(this, arguments);
        }

        return get;
      }()
    }]);
    return JsonClient;
  }();

  JsonClient.enums = {
    Cache: Cache_1.Cache,
    Credentials: Credentials_1.Credentials,
    Mode: Mode_1.Mode,
    Redirect: Redirect_1.Redirect,
    Referrer: Referrer_1.Referrer
  };
  exports.JsonClient = JsonClient;
  ["post", "put", "delete", "patch"].forEach(function (method) {
    var METHOD = method.toUpperCase();

    JsonClient.prototype[method] = function (url, data) {
      if ((arguments.length <= 2 ? 0 : arguments.length - 2) === 0) return this["__".concat(method, "_data")](url, data);

      if ((arguments.length <= 2 ? 0 : arguments.length - 2) === 5) {
        var cache = arguments.length <= 2 ? undefined : arguments[2];
        var credentials = arguments.length <= 3 ? undefined : arguments[3];
        var mode = arguments.length <= 4 ? undefined : arguments[4];
        var redirect = arguments.length <= 5 ? undefined : arguments[5];
        var referrer = arguments.length <= 6 ? undefined : arguments[6];
        return this["__".concat(method, "_allArgs")](url, data, cache, credentials, mode, redirect, referrer);
      }

      if ((arguments.length <= 2 ? 0 : arguments.length - 2) === 1) {
        var optionsObj = arguments.length <= 2 ? undefined : arguments[2];
        return this["__".concat(method, "_options")](url, data, optionsObj);
      }

      return Promise.reject("Invalid $json.".concat(method, " call"));
    };

    JsonClient.prototype["__".concat(method, "_data")] = function (url) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this["__".concat(method, "_options")](url, data, this.defaults[METHOD].options);
    };

    JsonClient.prototype["__".concat(method, "_allArgs")] = function (url, data, cache, credentials, mode, redirect, referrer) {
      var payload = {
        cache: cache,
        credentials: credentials,
        mode: mode,
        redirect: redirect,
        referrer: referrer
      };
      return this["__".concat(method, "_options")](url, data, payload);
    };

    JsonClient.prototype["__".concat(method, "_options")] = /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(url, data, options) {
        var middlewares, _yield$middlewares$be2, fetchPath, finalPayload, response, parsedResponse, err;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                middlewares = this.middlewares[METHOD];
                _context2.prev = 1;
                _context2.next = 4;
                return middlewares.beforeRequest.execute({
                  path: url,
                  data: data,
                  options: options
                });

              case 4:
                _yield$middlewares$be2 = _context2.sent;
                fetchPath = _yield$middlewares$be2.path;
                finalPayload = _yield$middlewares$be2.options;
                _context2.next = 9;
                return fetch(fetchPath, finalPayload);

              case 9:
                response = _context2.sent;
                _context2.next = 12;
                return middlewares.beforeResponse.execute(response);

              case 12:
                parsedResponse = _context2.sent;
                return _context2.abrupt("return", middlewares.afterResponse.execute(parsedResponse));

              case 16:
                _context2.prev = 16;
                _context2.t0 = _context2["catch"](1);
                _context2.next = 20;
                return middlewares.afterError.execute(_context2.t0);

              case 20:
                err = _context2.sent;
                throw err;

              case 22:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[1, 16]]);
      }));

      return function (_x2, _x3, _x4) {
        return _ref3.apply(this, arguments);
      };
    }();
  });
  var $json = new JsonClient();
  exports.$json = $json;
});