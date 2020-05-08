(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["@babel/runtime/regenerator", "@babel/runtime/helpers/asyncToGenerator", "@babel/runtime/helpers/typeof"], factory);
  } else if (typeof exports !== "undefined") {
    factory(require("@babel/runtime/regenerator"), require("@babel/runtime/helpers/asyncToGenerator"), require("@babel/runtime/helpers/typeof"));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.regenerator, global.asyncToGenerator, global._typeof);
    global.index = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_regenerator, _asyncToGenerator2, _typeof2) {
  "use strict";

  var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

  _regenerator = _interopRequireDefault(_regenerator);
  _asyncToGenerator2 = _interopRequireDefault(_asyncToGenerator2);
  _typeof2 = _interopRequireDefault(_typeof2);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var utils_1 = require("../utils");

  var allMethods = ["GET", "POST", "PUT", "DELETE", "PATCH"];
  var postLikeMethods = ["POST", "PUT", "DELETE", "PATCH"];

  var __typeCheckPath = function __typeCheckPath(_ref) {
    var path = _ref.path,
        data = _ref.data,
        options = _ref.options;
    if (typeof path !== "string") return Promise.reject("The 1st argument must be a string");
    return {
      path: path,
      data: data,
      options: options
    };
  };

  exports.typeCheckPath = function ($json) {
    var methods = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : allMethods;
    allMethods.forEach(function (method) {
      $json.middlewares[method].pipeBeforeRequest(__typeCheckPath);
    });
  };

  var __typeCheckData = function __typeCheckData(_ref2) {
    var path = _ref2.path,
        data = _ref2.data,
        options = _ref2.options;
    if ((0, _typeof2["default"])(data) !== "object" || data === null) throw new TypeError("'data' must be an Object");
    return {
      path: path,
      data: data,
      options: options
    };
  };

  exports.typeCheckData = function ($json) {
    var methods = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : allMethods;
    allMethods.forEach(function (method) {
      $json.middlewares[method].pipeBeforeRequest(__typeCheckData);
    });
  };

  exports.mergePayload = function ($json) {
    $json.middlewares.GET.pipeBeforeRequest(function (_ref3) {
      var path = _ref3.path,
          data = _ref3.data,
          options = _ref3.options;
      var newData = utils_1.mergeDeep({}, $json.defaults.globals.qs || {}, $json.defaults.GET.qs || {}, data);
      var fetchOptions = utils_1.mergeDeep({}, $json.defaults.globals.options, $json.defaults.GET.options || {}, options, {
        method: "GET"
      });
      fetchOptions.headers = utils_1.mergeDeep({}, $json.defaults.globals.headers, $json.defaults.GET.options || {}, fetchOptions.headers || {});
      return {
        path: path,
        data: newData,
        options: fetchOptions
      };
    });
  };

  exports.mergePostPayload = function ($json) {
    var methods = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : postLikeMethods;
    methods.forEach(function (method) {
      $json.middlewares[method].pipeBeforeRequest(function (_ref4) {
        var path = _ref4.path,
            data = _ref4.data,
            options = _ref4.options;
        var payload = {
          method: method,
          body: JSON.stringify(utils_1.mergeDeep({}, $json.defaults.globals.data, $json.defaults[method].data, data)),
          headers: utils_1.mergeDeep({}, $json.defaults.globals.headers, $json.defaults[method].headers)
        };
        var finalPayload = utils_1.mergeDeep({}, $json.defaults.globals.options, $json.defaults[method].options, payload, options);
        return {
          path: path,
          data: data,
          options: finalPayload
        };
      });
    });
  };

  var __processQueryString = function __processQueryString(_ref5) {
    var path = _ref5.path,
        data = _ref5.data,
        options = _ref5.options;
    Object.values(data).forEach(utils_1.check);
    var newPath = path + utils_1.objToQueryString(path, data);
    return {
      path: newPath,
      data: data,
      options: options
    };
  };

  exports.processQueryString = function ($json) {
    $json.middlewares.GET.pipeBeforeRequest(__processQueryString);
  };

  var __responseHandler = /*#__PURE__*/function () {
    var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(response) {
      var json;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;

              if (!response.ok) {
                _context.next = 3;
                break;
              }

              return _context.abrupt("return", response.json());

            case 3:
              _context.next = 5;
              return response.json();

            case 5:
              json = _context.sent;
              return _context.abrupt("return", Promise.reject(json));

            case 9:
              _context.prev = 9;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", Promise.reject({
                response: response,
                error: _context.t0
              }));

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 9]]);
    }));

    return function __responseHandler(_x) {
      return _ref6.apply(this, arguments);
    };
  }();

  exports.responseHandler = function ($json) {
    var methods = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : allMethods;
    allMethods.forEach(function (method) {
      $json.middlewares[method].pipeBeforeResponse(__responseHandler);
    });
  };

  exports.installGlobals = function ($json) {
    var methods = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : allMethods;
    exports.typeCheckPath($json, methods);
    exports.typeCheckData($json, methods);
    exports.responseHandler($json, methods);
  };

  exports.installGet = function ($json) {
    exports.mergePayload($json);
    exports.processQueryString($json);
  };

  exports.installPostLike = function ($json) {
    var methods = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : postLikeMethods;
    exports.mergePostPayload($json, methods);
  };

  exports.installAllDefaults = function ($json) {
    exports.installGlobals($json);
    exports.installGet($json);
    exports.installPostLike($json);
  };
});