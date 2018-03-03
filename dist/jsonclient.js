/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/jsonclient.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./build-babel/enums/Cache.js":
/*!************************************!*\
  !*** ./build-babel/enums/Cache.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var Cache;
(function (Cache) {
    Cache["DEFAULT"] = "default";
    Cache["NONE"] = "no-cache";
    Cache["RELOAD"] = "reload";
    Cache["FORCE"] = "force-cache";
    Cache["IFCACHED"] = "only-if-cached";
})(Cache = exports.Cache || (exports.Cache = {}));
//# sourceMappingURL=Cache.js.map
//# sourceMappingURL=Cache.js.map

/***/ }),

/***/ "./build-babel/enums/Credentials.js":
/*!******************************************!*\
  !*** ./build-babel/enums/Credentials.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var Credentials;
(function (Credentials) {
    Credentials["INCLUDE"] = "include";
    Credentials["OMIT"] = "omit";
    Credentials["SAMEORIGIN"] = "same-origin";
})(Credentials = exports.Credentials || (exports.Credentials = {}));
//# sourceMappingURL=Credentials.js.map
//# sourceMappingURL=Credentials.js.map

/***/ }),

/***/ "./build-babel/enums/Mode.js":
/*!***********************************!*\
  !*** ./build-babel/enums/Mode.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var Mode;
(function (Mode) {
    Mode["CORS"] = "cors";
    Mode["NOCORS"] = "no-cors";
    Mode["SAMEORIGIN"] = "same-origin";
})(Mode = exports.Mode || (exports.Mode = {}));
//# sourceMappingURL=Mode.js.map
//# sourceMappingURL=Mode.js.map

/***/ }),

/***/ "./build-babel/enums/Redirect.js":
/*!***************************************!*\
  !*** ./build-babel/enums/Redirect.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var Redirect;
(function (Redirect) {
    Redirect["FOLLOW"] = "follow";
    Redirect["MANUAL"] = "manual";
    Redirect["ERROR"] = "error";
})(Redirect = exports.Redirect || (exports.Redirect = {}));
//# sourceMappingURL=Redirect.js.map
//# sourceMappingURL=Redirect.js.map

/***/ }),

/***/ "./build-babel/enums/Referrer.js":
/*!***************************************!*\
  !*** ./build-babel/enums/Referrer.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var Referrer;
(function (Referrer) {
    Referrer["NONE"] = "no-referrer";
    Referrer["CLIENT"] = "client";
})(Referrer = exports.Referrer || (exports.Referrer = {}));
//# sourceMappingURL=Referrer.js.map
//# sourceMappingURL=Referrer.js.map

/***/ }),

/***/ "./build-babel/jsonclient.js":
/*!***********************************!*\
  !*** ./build-babel/jsonclient.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var Cache_1 = __webpack_require__(/*! ./enums/Cache */ "./build-babel/enums/Cache.js");
var Credentials_1 = __webpack_require__(/*! ./enums/Credentials */ "./build-babel/enums/Credentials.js");
var Mode_1 = __webpack_require__(/*! ./enums/Mode */ "./build-babel/enums/Mode.js");
var Redirect_1 = __webpack_require__(/*! ./enums/Redirect */ "./build-babel/enums/Redirect.js");
var Referrer_1 = __webpack_require__(/*! ./enums/Referrer */ "./build-babel/enums/Referrer.js");
var fetchJSON = __webpack_require__(/*! fetch_json */ "./node_modules/fetch_json/fetchJSON.js");

var $json = function () {
    function $json() {
        _classCallCheck(this, $json);
    }

    _createClass($json, null, [{
        key: "get",
        value: function get(path, functor) {
            return fetchJSON(path, functor);
        }
    }, {
        key: "__post_options",
        value: function __post_options(url, data, options) {
            delete options["body"];
            delete options["headers"];
            delete options["method"];
            var payload = {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "content-type": "application/json"
                }
            };
            var finalPayload = Object.assign({}, payload, options);
            var promise = new Promise(function (resolve, reject) {
                var f = fetch(url, finalPayload);
                f.then(function (response) {
                    var contentType = response.headers.get("content-type");
                    if (contentType && contentType.includes("application/json")) return response.json().then(resolve);else {
                        reject("Something went wrong during data inspection (data is not JSON or couldn't reach file)");
                        return null;
                    }
                });
                return f;
            });
            return promise;
        }
    }, {
        key: "__post_allArgs",
        value: function __post_allArgs(url, data, cache, credentials, mode, redirect, referrer) {
            var payload = {
                cache: cache,
                credentials: credentials,
                mode: mode,
                redirect: redirect,
                referrer: referrer
            };
            return $json.__post_options(url, data, payload);
        }
    }, {
        key: "__post_data",
        value: function __post_data(url, data) {
            return $json.__post_options(url, data, {});
        }
    }, {
        key: "post",
        value: function post(url, data) {
            if ((arguments.length <= 2 ? 0 : arguments.length - 2) === 0) return $json.__post_data(url, data);
            if ((arguments.length <= 2 ? 0 : arguments.length - 2) === 5) {
                var cache = arguments.length <= 2 ? undefined : arguments[2];
                var credentials = arguments.length <= 3 ? undefined : arguments[3];
                var mode = arguments.length <= 4 ? undefined : arguments[4];
                var redirect = arguments.length <= 5 ? undefined : arguments[5];
                var referrer = arguments.length <= 6 ? undefined : arguments[6];
                return $json.__post_allArgs(url, data, cache, credentials, mode, redirect, referrer);
            }
            if ((arguments.length <= 2 ? 0 : arguments.length - 2) === 1) {
                var optionsObj = arguments.length <= 2 ? undefined : arguments[2];
                return $json.__post_options(url, data, optionsObj);
            }
            return null;
        }
    }]);

    return $json;
}();

$json.enums = { Cache: Cache_1.Cache, Credentials: Credentials_1.Credentials, Mode: Mode_1.Mode, Redirect: Redirect_1.Redirect, Referrer: Referrer_1.Referrer };
exports.default = $json;
;
//# sourceMappingURL=jsonclient.js.map
//# sourceMappingURL=jsonclient.js.map

/***/ }),

/***/ "./node_modules/fetch_json/fetchJSON.js":
/*!**********************************************!*\
  !*** ./node_modules/fetch_json/fetchJSON.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**@function fetchJSON
*use the Fetch API to retrieve data from a JSON file
*@param {string} path - the complete path to the file
*@param {function} functor - the function to which the JSON data will be passed
*
*@return the Promise object of the fetch request
*/

(function UniversalModuleDefinition(root, factory){
    if(true)
        module.exports = factory();
    else {}
})(this, function(){
    return function(path, functor){
        return new Promise((resolve, reject)=>{
            if(typeof path == typeof "42xyz"){
                const f = fetch(path);

                f.then((response)=>{
                    var contentType= response.headers.get("content-type");

                    if(contentType && contentType.includes("application/json"))
                        return response.json().then(jsonData=>{
                            if(typeof functor == "function")
                                functor(jsonData);
                            resolve(jsonData);
                        });
                    else{
                        //throw new Error("Something went wrong during data inspection (data is not JSON or couldn't reach file)");
                        reject("Something went wrong during data inspection (data is not JSON or couldn't reach file)");
                        return null;
                    }
                });

                return f;
            }
            else{
                //console.error("fetchJSON.js : The first argument must be a string, the second argument must be a function");
                if(typeof path != typeof "42xyz")
                    //throw new TypeError("The 1st argument must be a string");
                    reject("The 1st argument must be a string");
                return null;
            }
        });
    }
});

/***/ }),

/***/ "./node_modules/webpack/buildin/amd-options.js":
/*!****************************************!*\
  !*** (webpack)/buildin/amd-options.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(this, {}))

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./node_modules/webpack/buildin/harmony-module.js":
/*!*******************************************!*\
  !*** (webpack)/buildin/harmony-module.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(originalModule) {
	if (!originalModule.webpackPolyfill) {
		var module = Object.create(originalModule);
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		Object.defineProperty(module, "exports", {
			enumerable: true
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./src/jsonclient.js":
/*!***************************!*\
  !*** ./src/jsonclient.js ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global, module) {/* harmony import */ var _build_babel_jsonclient__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../build-babel/jsonclient */ "./build-babel/jsonclient.js");
/* harmony import */ var _build_babel_jsonclient__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_build_babel_jsonclient__WEBPACK_IMPORTED_MODULE_0__);


(function UniversalModuleDefinition(root, factory){
	if(typeof exports === 'object' && typeof module === 'object')
        module.exports = factory();
    else{
		var module_name = "$json";
		if(typeof define === 'function' && __webpack_require__(/*! !webpack amd options */ "./node_modules/webpack/buildin/amd-options.js"))
			define(module_name, [], factory);
		else
			if(typeof exports === 'object')
				exports[module_name] = factory();
			else
				root[module_name] = factory();
	}
})(window || (global || undefined), function(){
    return _build_babel_jsonclient__WEBPACK_IMPORTED_MODULE_0___default.a;
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

/******/ });
//# sourceMappingURL=jsonclient.js.map