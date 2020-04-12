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
    global.Mode = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function () {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Mode;

  (function (Mode) {
    Mode["CORS"] = "cors";
    Mode["NOCORS"] = "no-cors";
    Mode["SAMEORIGIN"] = "same-origin";
  })(Mode = exports.Mode || (exports.Mode = {}));
});