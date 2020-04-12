import { Cache } from "./enums/Cache"
import { Credentials } from "./enums/Credentials"
import { Mode } from "./enums/Mode"
import { Redirect } from "./enums/Redirect"
import { Referrer } from "./enums/Referrer"
import { mergeDeep, check, objToQueryString } from "./utils"
import { MiddlewareStack } from "./middlewares/MiddlewareStack"
import { Middlewares } from "./middlewares/Middlewares"
import { processQueryString, typeCheckData, typeCheckPath, responseHandler } from "./middlewares"
import * as fetchJSON from "fetch_json"

const getDefaults = () => ({
	qs: {},
});

const postDefaults = () => ({
	data: {},
});

class JsonClient{
	public readonly enums = {
		Cache,
		Credentials,
		Mode,
		Redirect,
		Referrer,
	};

	public defaults: any = {
		globals: {
			data: {},
			qs: {},
			options: {},
			headers: {
				"Content-Type": "application/json",
			},
		},
		GET: getDefaults(),
		POST: postDefaults(),
		PUT: postDefaults(),
		DELETE: postDefaults(),
		PATCH: postDefaults(),
	}

	public middlewares = {
		GET: Middlewares.create(),
		POST: Middlewares.create(),
		PUT: Middlewares.create(),
		DELETE: Middlewares.create(),
		PATCH: Middlewares.create(),
	}

	private pipeGlobalMiddlewares(){
		["GET", "POST", "PUT", "DELETE", "PATCH"]
		.forEach(method => {
			this.middlewares[method]
			// Before Requst
			.pipeBeforeRequest(typeCheckPath)
			.pipeBeforeRequest(typeCheckData)
			//BeforeResponse
			.pipeBeforeResponse(responseHandler)
		});
	}

	private pipeGetMiddlewares(){
		this.middlewares.GET
		.pipeBeforeRequest(({ path, data, options }) => {
			const newData = mergeDeep(
				{},
				this.defaults.globals.qs || {},
				this.defaults.GET.qs || {},
				data,
			);


			const fetchOptions = mergeDeep(
				{},
				this.defaults.globals.options,
				this.defaults.GET.options || {},
				options,
				{method: "GET"}
			);

			fetchOptions.headers = mergeDeep(
				{},
				this.defaults.globals.headers,
				this.defaults.GET.options || {},
				fetchOptions.headers || {}
			);

			return {
				path,
				data: newData,
				options: fetchOptions,
			};
		}).pipeBeforeRequest(processQueryString);
	}

	private pipePostLikeMiddlewares(){
		["POST", "PUT", "DELETE", "PATCH"]
		.forEach(method => {
			this.middlewares[method]
				.pipeBeforeRequest(({ path, data, options }) => {
					delete options["body"];
					delete options["method"];

					const payload = {
						method,
						body: JSON.stringify(mergeDeep(
							{},
							this.defaults.globals.data,
							this.defaults[method].data,
							data
						)),
						headers: this.defaults[method].headers,
					};

					const finalPayload = mergeDeep({}, payload, options);
					return {
						path,
						data: finalPayload,
						options,
					};
				})
		});
	}

	public constuctor(){
		this.pipeGlobalMiddlewares();
		this.pipeGetMiddlewares();
		this.pipePostLikeMiddlewares();
	}


	public async get(path: string, data: object = {}, options: object = {}){
		try{
			const {
				path: fetchPath,
				options: fetchOptions,
			} = await this.middlewares.GET.beforeRequest.execute({
				path,
				data,
				options,
			});

			const response = await fetch(fetchPath, fetchOptions);
			const parsedResponse = await this.middlewares.GET.beforeResponse.execute(response);
			return this.middlewares.GET.afterResponse.execute(parsedResponse);
		}catch(e){
			return this.middlewares.GET.afterError.execute(e);
		}
	}
}



["post", "put", "delete", "patch"].forEach(method => {
	const METHOD = method.toUpperCase();

	JsonClient.prototype[method] = function(
		url: string,
		data: any,
		...options: any[]
	): Promise<any> | null {
		if (options.length === 0)
			return this[`__${method}_data`](url, data) as Promise<any>;

		if (options.length === 5) {
			const cache = options[0] as Cache;
			const credentials = options[1] as Credentials;
			const mode = options[2] as Mode;
			const redirect = options[3] as Redirect;
			const referrer = options[4] as Referrer;

			return this[`__${method}_allArgs`](
				url,
				data,
				cache,
				credentials,
				mode,
				redirect,
				referrer
			);
		}

		if (options.length === 1) {
			const optionsObj = options[0] as object;
			return this[`__${method}_options`](
				url,
				data,
				optionsObj
			);
		}

		return null;
	};

	Object.defineProperty(JsonClient.prototype, `__${method}_data`, {
		value: function(url: string, data: any): Promise<any> {
			return this[`__${method}_options`](
				url,
				data,
				this.defaults[METHOD].options
			);
		},
	});

	Object.defineProperty(JsonClient.prototype, `__${method}_allArgs`, {
		value: function(
			url: string,
			data: any,
			cache: Cache,
			credentials: Credentials,
			mode: Mode,
			redirect: Redirect,
			referrer: Referrer
		): Promise<any> {
			const payload = {
				cache,
				credentials,
				mode,
				redirect,
				referrer,
			};

			return this[`__${method}_options`](url, data, payload) as Promise<
				any
			>;
		},
	});

	Object.defineProperty(JsonClient.prototype, `__${method}_options`, {
		value: async function(url: string, data: any, options: object): Promise<any> {
			try{
				const {
					path: fetchPath,
					data: finalPayload,
				} = await this.middlewares.GET.beforeRequest.execute({
					path: url,
					data,
					options,
				});

				const response = await fetch(fetchPath, finalPayload);
				const parsedResponse = await this.middlewares[METHOD].beforeResponse.execute(response);
				return this.middlewares[METHOD].afterResponse.execute(parsedResponse);
			}catch(e){
				return this.middlewares[METHOD].afterError.execute(e);
			}
		},
	});
});



const $json = new JsonClient();

export {
	$json,
	JsonClient,
	MiddlewareStack,
	Middlewares,
};
