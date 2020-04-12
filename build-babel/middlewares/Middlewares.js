"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var MiddlewareStack_1 = require("./MiddlewareStack");

var Middlewares = function () {
    function Middlewares() {
        var _this = this;

        _classCallCheck(this, Middlewares);

        ["beforeRequest", "beforeResponse", "afterResponse", "afterError"].forEach(function (ms) {
            return _this[ms] = MiddlewareStack_1.MiddlewareStack.empty();
        });
    }

    _createClass(Middlewares, [{
        key: "pipeBeforeRequest",
        value: function pipeBeforeRequest(mw) {
            this.beforeRequest.pipe(mw);
            return this;
        }
    }, {
        key: "pipeBeforeResponse",
        value: function pipeBeforeResponse(mw) {
            this.beforeResponse.pipe(mw);
            return this;
        }
    }, {
        key: "pipeAfterResponse",
        value: function pipeAfterResponse(mw) {
            this.afterResponse.pipe(mw);
            return this;
        }
    }, {
        key: "pipeAfterError",
        value: function pipeAfterError(mw) {
            this.afterError.pipe(mw);
            return this;
        }
    }, {
        key: "processReponse",
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(response) {
                var beforeResponse, error;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.prev = 0;
                                _context.next = 3;
                                return this.beforeResponse.execute(response);

                            case 3:
                                beforeResponse = _context.sent;

                                if (!(beforeResponse instanceof Response)) {
                                    _context.next = 8;
                                    break;
                                }

                                _context.next = 7;
                                return beforeResponse.json();

                            case 7:
                                beforeResponse = _context.sent;

                            case 8:
                                return _context.abrupt("return", this.afterResponse.execute(beforeResponse));

                            case 11:
                                _context.prev = 11;
                                _context.t0 = _context["catch"](0);
                                _context.next = 15;
                                return this.afterError.execute(_context.t0);

                            case 15:
                                error = _context.sent;
                                throw error;

                            case 17:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[0, 11]]);
            }));

            function processReponse(_x) {
                return _ref.apply(this, arguments);
            }

            return processReponse;
        }()
    }], [{
        key: "create",
        value: function create() {
            return new this();
        }
    }]);

    return Middlewares;
}();

exports.Middlewares = Middlewares;
//# sourceMappingURL=Middlewares.js.map