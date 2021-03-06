import { Cache } from "./enums/Cache"
import { Credentials } from "./enums/Credentials"
import { Mode } from "./enums/Mode"
import { Redirect } from "./enums/Redirect"
import { Referrer } from "./enums/Referrer"
import { mergeDeep, check, objToQueryString } from "./utils"
import { MiddlewareStack } from "./middlewares/MiddlewareStack"
import { Middlewares } from "./middlewares/Middlewares"
import { installAllDefaults } from "./middlewares"
import * as middlewares from "./middlewares"

const getDefaults = () => ({
	qs: {},
	options: {},
	headers: {},
});

const postDefaults = () => ({
	data: {},
	options: {},
	headers: {},
});

class JsonClient{
	public static readonly enums = {
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

	public middlewares: any = {
		GET: Middlewares.create(),
		POST: Middlewares.create(),
		PUT: Middlewares.create(),
		DELETE: Middlewares.create(),
		PATCH: Middlewares.create(),
	};

	constructor(){
		installAllDefaults(this);
	}


	public async get(path: string, data: object = {}, options: object = {}){
		const middlewares = this.middlewares.GET;
		try{
			const {
				path: fetchPath,
				options: fetchOptions,
			} = await middlewares.beforeRequest.execute({
				path,
				data,
				options,
			});

			const response = await fetch(fetchPath, fetchOptions);
			const parsedResponse = await middlewares.beforeResponse.execute(response);
			return middlewares.afterResponse.execute(parsedResponse);
		}catch(e){
			const err = await middlewares.afterError.execute(e);
			throw err;
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
			return this[`__${method}_data`](url, data);

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

		return Promise.reject(`Invalid $json.${method} call`);
	};

	JsonClient.prototype[`__${method}_data`] = function(url: string, data: any = {}): Promise<any> {
		return this[`__${method}_options`](
			url,
			data,
			this.defaults[METHOD].options
		);
	};

	JsonClient.prototype[`__${method}_allArgs`] = function(
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

		return this[`__${method}_options`](url, data, payload);
	};

	JsonClient.prototype[`__${method}_options`] = async function(url: string, data: any, options: object): Promise<any> {
		const middlewares = this.middlewares[METHOD];
		try{
			const {
				path: fetchPath,
				options: finalPayload,
			} = await middlewares.beforeRequest.execute({
				path: url,
				data,
				options,
			});

			const response = await fetch(fetchPath, finalPayload);
			const parsedResponse = await middlewares.beforeResponse.execute(response);
			return middlewares.afterResponse.execute(parsedResponse);
		}catch(e){
			const err = await middlewares.afterError.execute(e);
			throw err;
		}
	};
});



const $json = new JsonClient();



//TODO: export default middlewares
export {
	$json,
	JsonClient,
	MiddlewareStack,
	Middlewares,
	middlewares,
};
