(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["@babel/runtime/helpers/construct", "@babel/runtime/helpers/classCallCheck", "@babel/runtime/helpers/createClass", "@babel/runtime/helpers/inherits", "@babel/runtime/helpers/possibleConstructorReturn", "@babel/runtime/helpers/getPrototypeOf", "@babel/runtime/helpers/slicedToArray", "@babel/runtime/helpers/defineProperty", "@babel/runtime/helpers/typeof"], factory);
  } else if (typeof exports !== "undefined") {
    factory(require("@babel/runtime/helpers/construct"), require("@babel/runtime/helpers/classCallCheck"), require("@babel/runtime/helpers/createClass"), require("@babel/runtime/helpers/inherits"), require("@babel/runtime/helpers/possibleConstructorReturn"), require("@babel/runtime/helpers/getPrototypeOf"), require("@babel/runtime/helpers/slicedToArray"), require("@babel/runtime/helpers/defineProperty"), require("@babel/runtime/helpers/typeof"));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.construct, global.classCallCheck, global.createClass, global.inherits, global.possibleConstructorReturn, global.getPrototypeOf, global.slicedToArray, global.defineProperty, global._typeof);
    global.utils = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_construct2, _classCallCheck2, _createClass2, _inherits2, _possibleConstructorReturn2, _getPrototypeOf2, _slicedToArray2, _defineProperty2, _typeof2) {
  "use strict";

  var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

  _construct2 = _interopRequireDefault(_construct2);
  _classCallCheck2 = _interopRequireDefault(_classCallCheck2);
  _createClass2 = _interopRequireDefault(_createClass2);
  _inherits2 = _interopRequireDefault(_inherits2);
  _possibleConstructorReturn2 = _interopRequireDefault(_possibleConstructorReturn2);
  _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf2);
  _slicedToArray2 = _interopRequireDefault(_slicedToArray2);
  _defineProperty2 = _interopRequireDefault(_defineProperty2);
  _typeof2 = _interopRequireDefault(_typeof2);

  function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var sequency_1 = require("sequency");

  function isObject(item) {
    return item && (0, _typeof2["default"])(item) === "object" && !Array.isArray(item);
  }

  exports.isObject = isObject;

  function mergeDeep(target) {
    for (var _len = arguments.length, sources = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      sources[_key - 1] = arguments[_key];
    }

    if (!sources.length) return target;
    var source = sources.shift();

    if (isObject(target) && isObject(source)) {
      for (var key in source) {
        if (isObject(source[key])) {
          if (!target[key]) Object.assign(target, (0, _defineProperty2["default"])({}, key, {}));
          mergeDeep(target[key], source[key]);
        } else {
          Object.assign(target, (0, _defineProperty2["default"])({}, key, source[key]));
        }
      }
    }

    return mergeDeep.apply(void 0, [target].concat(sources));
  }

  exports.mergeDeep = mergeDeep;

  exports.check = function (elem) {
    var innerCheck = function innerCheck(elem) {
      if (!(typeof elem == "string" || typeof elem == "number")) throw new TypeError("Invalid data object (elements are not all arrays of strings/numbers or strings or numbers)");
    };

    if (elem instanceof Array) {
      elem.forEach(innerCheck);
      return;
    }

    innerCheck(elem);
  };

  exports.primitiveToQstring = function (e) {
    return encodeURIComponent(e.key) + "=" + encodeURIComponent(e.value);
  };

  exports.objToQueryString = function (path, data) {
    var qstring = sequency_1.asSequence(Object.entries(data)).map(function (_ref) {
      var _ref2 = (0, _slicedToArray2["default"])(_ref, 2),
          key = _ref2[0],
          value = _ref2[1];

      return {
        key: key,
        value: value
      };
    }).map(function (_ref3) {
      var key = _ref3.key,
          value = _ref3.value;

      if (value instanceof Array) {
        return sequency_1.asSequence(value).map(function (val) {
          return {
            key: key,
            value: val
          };
        }).map(exports.primitiveToQstring).joinToString({
          separator: "&"
        });
      }

      return exports.primitiveToQstring({
        key: key,
        value: value
      });
    }).joinToString({
      separator: "&"
    });

    if (qstring !== "") {
      if (!/\?/.test(path)) return "?" + qstring;else if (!/\?$/.test(path)) return /&$/.test(path) ? qstring : "&" + qstring;
    }

    return qstring;
  };

  function factory(name) {
    return function (constructor) {
      return /*#__PURE__*/function (_constructor) {
        (0, _inherits2["default"])(_class, _constructor);

        var _super = _createSuper(_class);

        function _class() {
          (0, _classCallCheck2["default"])(this, _class);
          return _super.apply(this, arguments);
        }

        (0, _createClass2["default"])(_class, null, [{
          key: name,
          value: function value() {
            for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
              args[_key2] = arguments[_key2];
            }

            return (0, _construct2["default"])(this, args);
          }
        }]);
        return _class;
      }(constructor);
    };
  }

  exports.factory = factory;
  ;
});