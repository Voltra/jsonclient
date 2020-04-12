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

  exports.typeCheckPath = function (_ref) {
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

  exports.typeCheckData = function (_ref2) {
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

  exports.processQueryString = function (_ref3) {
    var path = _ref3.path,
        data = _ref3.data,
        options = _ref3.options;
    Object.values(data).forEach(utils_1.check);
    var newPath = utils_1.objToQueryString(path, data);
    return {
      path: newPath,
      data: data,
      options: options
    };
  };

  exports.responseHandler = /*#__PURE__*/function () {
    var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(response) {
      var json;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!response.ok) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return", response.json());

            case 2:
              _context.prev = 2;
              _context.next = 5;
              return response.json();

            case 5:
              json = _context.sent;
              return _context.abrupt("return", Promise.reject(json));

            case 9:
              _context.prev = 9;
              _context.t0 = _context["catch"](2);
              return _context.abrupt("return", Promise.reject({
                response: response,
                error: _context.t0
              }));

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[2, 9]]);
    }));

    return function (_x) {
      return _ref4.apply(this, arguments);
    };
  }();
});