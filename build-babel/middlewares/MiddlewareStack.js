"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });

var MiddlewareStack = function () {
    function MiddlewareStack() {
        _classCallCheck(this, MiddlewareStack);

        this.stack = [];
    }

    _createClass(MiddlewareStack, [{
        key: "validIndex",
        value: function validIndex(index) {
            return !(index < 0 || index >= this.length);
        }
    }, {
        key: "pipe",
        value: function pipe(middleware) {
            this.stack.push(middleware);
            return this;
        }
    }, {
        key: "removeAt",
        value: function removeAt(index) {
            if (!this.validIndex(index)) return this;
            this.stack = [].concat(_toConsumableArray(this.stack.slice(0, index)), _toConsumableArray(this.stack.slice(index + 1, this.length)));
            return this;
        }
    }, {
        key: "at",
        value: function at(index) {
            return this.stack[index] || null;
        }
    }, {
        key: "execute",
        value: function execute(obj) {
            return this.__execute(obj, 0);
        }
    }, {
        key: "__execute",
        value: function __execute(obj, index) {
            var _this = this;

            var current = this.at(index);
            if (current === null) return obj;
            var res = current.process(obj, function (obj) {
                return _this.__execute(obj, index + 1);
            });
            return res instanceof Promise ? res : Promise.resolve(res);
        }
    }, {
        key: "length",
        get: function get() {
            return this.stack.length;
        }
    }], [{
        key: "empty",
        value: function empty() {
            return new this();
        }
    }]);

    return MiddlewareStack;
}();

exports.MiddlewareStack = MiddlewareStack;
;
//# sourceMappingURL=MiddlewareStack.js.map