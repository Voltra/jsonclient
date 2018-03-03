"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var Cache_1 = require("./enums/Cache");
var Credentials_1 = require("./enums/Credentials");
var Mode_1 = require("./enums/Mode");
var Redirect_1 = require("./enums/Redirect");
var Referrer_1 = require("./enums/Referrer");
var fetchJSON = require("fetch_json");

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