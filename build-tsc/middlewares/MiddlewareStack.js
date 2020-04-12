"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MiddlewareStack {
    constructor() {
        this.stack = [];
    }
    static empty() {
        return new this();
    }
    get length() {
        return this.stack.length;
    }
    validIndex(index) {
        return !(index < 0 || index >= this.length);
    }
    pipe(middleware) {
        this.stack.push(middleware);
        return this;
    }
    removeAt(index) {
        if (!this.validIndex(index))
            return this;
        this.stack = [
            ...this.stack.slice(0, index),
            ...this.stack.slice(index + 1, this.length)
        ];
        return this;
    }
    at(index) {
        return this.stack[index] || null;
    }
    execute(obj) {
        return this.__execute(obj, 0);
    }
    __execute(obj, index) {
        const current = this.at(index);
        if (current === null)
            return obj;
        const res = current.process(obj, obj => this.__execute(obj, index + 1));
        return res instanceof Promise ? res : Promise.resolve(res);
    }
}
exports.MiddlewareStack = MiddlewareStack;
;
//# sourceMappingURL=MiddlewareStack.js.map