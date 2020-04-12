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
    global.Redirect = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function () {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Redirect;

  (function (Redirect) {
    Redirect["FOLLOW"] = "follow";
    Redirect["MANUAL"] = "manual";
    Redirect["ERROR"] = "error";
  })(Redirect = exports.Redirect || (exports.Redirect = {}));
});