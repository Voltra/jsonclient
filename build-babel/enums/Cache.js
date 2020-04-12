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
    global.Cache = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function () {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Cache;

  (function (Cache) {
    Cache["DEFAULT"] = "default";
    Cache["NONE"] = "no-cache";
    Cache["RELOAD"] = "reload";
    Cache["FORCE"] = "force-cache";
    Cache["IFCACHED"] = "only-if-cached";
  })(Cache = exports.Cache || (exports.Cache = {}));
});