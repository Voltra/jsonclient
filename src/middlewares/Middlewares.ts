import { JsonClientRequest, Json, FetchError, Middleware } from "./types"
import { MiddlewareStack } from "./MiddlewareStack"
// import { factory } from "../utils"

// @factory("create")
export class Middlewares{
	public readonly beforeRequest: MiddlewareStack<JsonClientRequest>;
	public readonly beforeResponse: MiddlewareStack<Response>;
	public readonly afterResponse: MiddlewareStack<Json>;
	public readonly afterError: MiddlewareStack<FetchError>;

	public constructor(){
		[
			"beforeRequest",
			"beforeResponse",
			"afterResponse",
			"afterError",
		].forEach(ms => this[ms] = MiddlewareStack.empty());
	}

	public static create(){
		return new this();
	}

	public pipeBeforeRequest(mw: Middleware<JsonClientRequest>): this{
		this.beforeRequest.pipe(mw);
		return this;
	}

	public pipeBeforeResponse(mw: Middleware<Response>): this{
		this.beforeResponse.pipe(mw);
		return this;
	}

	public pipeAfterResponse(mw: Middleware<Json>): this{
		this.afterResponse.pipe(mw);
		return this;
	}

	public pipeAfterError(mw: Middleware<FetchError>): this{
		this.afterError.pipe(mw);
		return this;
	}


	public async processReponse(response: Response): Promise<any>{
		try{
			let beforeResponse = await this.beforeResponse.execute(response);
			if(beforeResponse instanceof Response){
				beforeResponse = await beforeResponse.json();
			}

			return this.afterResponse.execute(beforeResponse);
		}catch(e){
			const error = await this.afterError.execute(e);
			throw error;
		}
	}
}