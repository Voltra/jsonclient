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
    global.Referrer = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function () {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Referrer;

  (function (Referrer) {
    Referrer["NONE"] = "no-referrer";
    Referrer["CLIENT"] = "client";
  })(Referrer = exports.Referrer || (exports.Referrer = {}));
});