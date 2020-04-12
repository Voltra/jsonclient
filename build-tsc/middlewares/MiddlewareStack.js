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
        return 0 <= index && index < this.length;
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
        return this.validIndex(index) ? this.stack[index] : null;
    }
    execute(obj) {
        return this.__execute(obj, 0);
    }
    __execute(obj, index) {
        const current = this.at(index);
        if (current === null)
            return obj;
        try {
            const res = current(obj);
            const promise = res instanceof Promise ? res : Promise.resolve(res);
            return promise.then(obj => this.__execute(obj, index + 1));
        }
        catch (e) {
            return Promise.reject(e);
        }
    }
}
exports.MiddlewareStack = MiddlewareStack;
;
//# sourceMappingURL=MiddlewareStack.js.map