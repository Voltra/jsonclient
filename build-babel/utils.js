"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

Object.defineProperty(exports, "__esModule", { value: true });
var sequency_1 = require("sequency");
function isObject(item) {
    return item && (typeof item === "undefined" ? "undefined" : _typeof(item)) === "object" && !Array.isArray(item);
}
exports.isObject = isObject;
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
        var _ref2 = _slicedToArray(_ref, 2),
            key = _ref2[0],
            value = _ref2[1];

        return { key: key, value: value };
    }).map(function (_ref3) {
        var key = _ref3.key,
            value = _ref3.value;

        if (value instanceof Array) {
            return sequency_1.asSequence(value).map(function (val) {
                return { key: key, value: val };
            }).map(exports.primitiveToQstring).joinToString({
                separator: "&"
            });
        }
        return exports.primitiveToQstring({ key: key, value: value });
    }).joinToString({
        separator: "&"
    });
    if (qstring !== "") {
        if (!/\?/.test(path)) return "?" + qstring;else if (!/\?$/.test(path)) return (/&$/.test(path) ? qstring : "&" + qstring
        );
    }
    return qstring;
};
function factory(name) {
    return function (constructor) {
        return function (_constructor) {
            _inherits(_class, _constructor);

            function _class() {
                _classCallCheck(this, _class);

                return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
            }

            _createClass(_class, null, [{
                key: name,
                value: function value() {
                    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                        args[_key2] = arguments[_key2];
                    }

                    return new (Function.prototype.bind.apply(this, [null].concat(args)))();
                }
            }]);

            return _class;
        }(constructor);
    };
}
exports.factory = factory;
;
//# sourceMappingURL=utils.js.map