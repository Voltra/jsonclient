(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["@babel/runtime/helpers/toConsumableArray", "@babel/runtime/helpers/classCallCheck", "@babel/runtime/helpers/createClass"], factory);
  } else if (typeof exports !== "undefined") {
    factory(require("@babel/runtime/helpers/toConsumableArray"), require("@babel/runtime/helpers/classCallCheck"), require("@babel/runtime/helpers/createClass"));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.toConsumableArray, global.classCallCheck, global.createClass);
    global.MiddlewareStack = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_toConsumableArray2, _classCallCheck2, _createClass2) {
  "use strict";

  var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

  _toConsumableArray2 = _interopRequireDefault(_toConsumableArray2);
  _classCallCheck2 = _interopRequireDefault(_classCallCheck2);
  _createClass2 = _interopRequireDefault(_createClass2);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var MiddlewareStack = /*#__PURE__*/function () {
    function MiddlewareStack() {
      (0, _classCallCheck2["default"])(this, MiddlewareStack);
      this.stack = [];
    }

    (0, _createClass2["default"])(MiddlewareStack, [{
      key: "validIndex",
      value: function validIndex(index) {
        return 0 <= index && index < this.length;
      }
    }, {
      key: "pipe",
      value: function pipe(middleware) {
        this.stack.push(middleware);
        return this;
      }
    }, {
      key: "removeAt",
      value: function removeAt(index) {
        if (!this.validIndex(index)) return this;
        this.stack = [].concat((0, _toConsumableArray2["default"])(this.stack.slice(0, index)), (0, _toConsumableArray2["default"])(this.stack.slice(index + 1, this.length)));
        return this;
      }
    }, {
      key: "at",
      value: function at(index) {
        return this.validIndex(index) ? this.stack[index] : null;
      }
    }, {
      key: "execute",
      value: function execute(obj) {
        return this.__execute(obj, 0);
      }
    }, {
      key: "__execute",
      value: function __execute(obj, index) {
        var _this = this;

        var current = this.at(index);
        if (current === null) return obj;

        try {
          var res = current(obj);
          var promise = res instanceof Promise ? res : Promise.resolve(res);
          return promise.then(function (obj) {
            return _this.__execute(obj, index + 1);
          });
        } catch (e) {
          return Promise.reject(e);
        }
      }
    }, {
      key: "length",
      get: function get() {
        return this.stack.length;
      }
    }], [{
      key: "empty",
      value: function empty() {
        return new this();
      }
    }]);
    return MiddlewareStack;
  }();

  exports.MiddlewareStack = MiddlewareStack;
  ;
});