"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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
//# sourceMappingURL=utils.js.map