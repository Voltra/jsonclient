"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MiddlewareStack_1 = require("./MiddlewareStack");
class Middlewares {
    constructor() {
        [
            "beforeRequest",
            "beforeResponse",
            "afterResponse",
            "afterError",
        ].forEach(ms => this[ms] = MiddlewareStack_1.MiddlewareStack.empty());
    }
    static create() {
        return new this();
    }
    pipeBeforeRequest(mw) {
        this.beforeRequest.pipe(mw);
        return this;
    }
    pipeBeforeResponse(mw) {
        this.beforeResponse.pipe(mw);
        return this;
    }
    pipeAfterResponse(mw) {
        this.afterResponse.pipe(mw);
        return this;
    }
    pipeAfterError(mw) {
        this.afterError.pipe(mw);
        return this;
    }
}
exports.Middlewares = Middlewares;
//# sourceMappingURL=Middlewares.js.map