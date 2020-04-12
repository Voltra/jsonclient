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
    async processReponse(response) {
        try {
            let beforeResponse = await this.beforeResponse.execute(response);
            if (beforeResponse instanceof Response) {
                beforeResponse = await beforeResponse.json();
            }
            return this.afterResponse.execute(beforeResponse);
        }
        catch (e) {
            const error = await this.afterError.execute(e);
            throw error;
        }
    }
}
exports.Middlewares = Middlewares;
//# sourceMappingURL=Middlewares.js.map