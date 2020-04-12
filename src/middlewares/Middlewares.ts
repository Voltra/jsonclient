import { JsonClientRequest, Json, FetchError, Middleware } from "./types"
import { MiddlewareStack } from "./MiddlewareStack"
// import { factory } from "../utils"

// @factory("create")
export class Middlewares{
	protected beforeRequest: MiddlewareStack<JsonClientRequest>;
	protected beforeResponse: MiddlewareStack<Response>;
	protected afterResponse: MiddlewareStack<Json>;
	protected afterError: MiddlewareStack<FetchError>;

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

	public pipeBeforeRequest(mw: Middleware<JsonClientRequest>): ThisType<this>{
		this.beforeRequest.pipe(mw);
		return this;
	}

	public pipeBeforeResponse(mw: Middleware<Response>): ThisType<this>{
		this.beforeResponse.pipe(mw);
		return this;
	}

	public pipeAfterResponse(mw: Middleware<Json>): ThisType<this>{
		this.afterResponse.pipe(mw);
		return this;
	}

	public pipeAfterError(mw: Middleware<FetchError>): ThisType<this>{
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