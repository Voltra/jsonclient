"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequency_1 = require("sequency");
function isObject(item) {
    return item && typeof item === "object" && !Array.isArray(item);
}
exports.isObject = isObject;
function mergeDeep(target, ...sources) {
    if (!sources.length)
        return target;
    const source = sources.shift();
    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key])
                    Object.assign(target, { [key]: {} });
                mergeDeep(target[key], source[key]);
            }
            else {
                Object.assign(target, { [key]: source[key] });
            }
        }
    }
    return mergeDeep(target, ...sources);
}
exports.mergeDeep = mergeDeep;
exports.check = function (elem) {
    const innerCheck = function (elem) {
        if (!(typeof elem == "string" || typeof elem == "number"))
            throw new TypeError("Invalid data object (elements are not all arrays of strings/numbers or strings or numbers)");
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
    const qstring = sequency_1.asSequence(Object.entries(data))
        .map(([key, value]) => ({ key, value }))
        .map(({ key, value }) => {
        if (value instanceof Array) {
            return sequency_1.asSequence(value)
                .map(function (val) {
                return { key, value: val };
            }).map(exports.primitiveToQstring)
                .joinToString({
                separator: "&"
            });
        }
        return exports.primitiveToQstring({ key, value });
    }).joinToString({
        separator: "&"
    });
    if (qstring !== "") {
        if (!/\?/.test(path))
            return "?" + qstring;
        else if (!/\?$/.test(path))
            return /&$/.test(path) ? qstring : "&" + qstring;
    }
    return qstring;
};
//# sourceMappingURL=utils.js.map