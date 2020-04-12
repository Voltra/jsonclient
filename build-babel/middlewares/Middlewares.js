(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["@babel/runtime/helpers/classCallCheck", "@babel/runtime/helpers/createClass"], factory);
  } else if (typeof exports !== "undefined") {
    factory(require("@babel/runtime/helpers/classCallCheck"), require("@babel/runtime/helpers/createClass"));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.classCallCheck, global.createClass);
    global.Middlewares = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_classCallCheck2, _createClass2) {
  "use strict";

  var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

  _classCallCheck2 = _interopRequireDefault(_classCallCheck2);
  _createClass2 = _interopRequireDefault(_createClass2);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var MiddlewareStack_1 = require("./MiddlewareStack");

  var Middlewares = /*#__PURE__*/function () {
    function Middlewares() {
      var _this = this;

      (0, _classCallCheck2["default"])(this, Middlewares);
      ["beforeRequest", "beforeResponse", "afterResponse", "afterError"].forEach(function (ms) {
        return _this[ms] = MiddlewareStack_1.MiddlewareStack.empty();
      });
    }

    (0, _createClass2["default"])(Middlewares, [{
      key: "pipeBeforeRequest",
      value: function pipeBeforeRequest(mw) {
        this.beforeRequest.pipe(mw);
        return this;
      }
    }, {
      key: "pipeBeforeResponse",
      value: function pipeBeforeResponse(mw) {
        this.beforeResponse.pipe(mw);
        return this;
      }
    }, {
      key: "pipeAfterResponse",
      value: function pipeAfterResponse(mw) {
        this.afterResponse.pipe(mw);
        return this;
      }
    }, {
      key: "pipeAfterError",
      value: function pipeAfterError(mw) {
        this.afterError.pipe(mw);
        return this;
      }
    }], [{
      key: "create",
      value: function create() {
        return new this();
      }
    }]);
    return Middlewares;
  }();

  exports.Middlewares = Middlewares;
});