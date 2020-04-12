(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof exports !== "undefined") {
    factory();
  } else {
    var mod = {
      exports: {}
    };
    factory();
    global.Credentials = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function () {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Credentials;

  (function (Credentials) {
    Credentials["INCLUDE"] = "include";
    Credentials["OMIT"] = "omit";
    Credentials["SAMEORIGIN"] = "same-origin";
  })(Credentials = exports.Credentials || (exports.Credentials = {}));
});