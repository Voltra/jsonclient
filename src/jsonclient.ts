import { Cache } from "./enums/Cache"
import { Credentials } from "./enums/Credentials"
import { Mode } from "./enums/Mode"
import { Redirect } from "./enums/Redirect"
import { Referrer } from "./enums/Referrer"
import { mergeDeep, check, objToQueryString } from "./utils"
import { MiddlewareStack } from "./middlewares/MiddlewareStack"
import { Middlewares } from "./middlewares/Middlewares"
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



	public constuctor(){}


	public get(path: string, data: object = {}, options: object = {}){
		data = mergeDeep({}, fetchJSON.defaults.qs, data);

		if(typeof data != "object" || data === null)
			throw new TypeError("'data' must be an Object");

		Object.values(data).forEach(check);
		const qstring = objToQueryString(path, data);

		return new Promise((resolve, reject) => {
            if(typeof path == "string"){
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

                const f = fetch(path + qstring, fetchOptions);

                f.then(response => {
                    return response.json()
                    .then(resolve)
                    .catch(_ => {
                        const error = "Something went wrong during data inspection (data is not JSON or couldn't reach file)";
                        reject(error);
                        return Promise.reject(error);
                    });
                });

                return f;
            }
            else{
                if(typeof path != "string")
                    reject("The 1st argument must be a string");
                return null;
            }
        });
	}


	public method(
		method: string,
		url: string,
		data: any,
		...options: any[]
	): Promise<any> | null {
		const METHOD = method.toUpperCase();
		const $options = {
			headers: {
				"X-HTTP-Method-Override": METHOD,
				"X-HTTP-Method": METHOD,
				"X-Method-Override": METHOD,
			},
		};
		if (options.length === 0)
			return this.__method_options(
				METHOD,
				url,
				data,
				$options
			) as Promise<any>;

		if (options.length === 5) {
			const cache = options[0] as Cache;
			const credentials = options[1] as Credentials;
			const mode = options[2] as Mode;
			const redirect = options[3] as Redirect;
			const referrer = options[4] as Referrer;

			return this.__method_options(
				METHOD,
				url,
				data,
				mergeDeep({}, $options, {
					cache,
					credentials,
					mode,
					redirect,
					referrer,
				})
			) as Promise<any>;
		}

		if (options.length === 1) {
			const optionsObj = options[0] as object;
			return this.__method_options(
				METHOD,
				url,
				data,
				mergeDeep({}, $options, optionsObj)
			) as Promise<any>;
		}

		return null;
	}

	private __method_options(
		method: string,
		url: string,
		data: any,
		options: object
	): Promise<any> {
		delete options["body"];
		delete options["method"];

		const payload = {
			method: "POST",
			body: JSON.stringify(mergeDeep(
				{},
				this.defaults.globals.data,
				this.defaults[method].data,
				data
			)),
			headers: mergeDeep(
				{},
				this.defaults.globals.headers,
				this.defaults[method].headers
			),
		};

		const finalPayload = mergeDeep({}, payload, options);

		const promise = new Promise((resolve, reject) => {
			const f = fetch(url, finalPayload);
			f.then(response => {
				return response.json()
				.then(resolve)
				.catch(_ => {
					const error =
						"Something went wrong during data inspection (data is not JSON)";
					reject(error);
					return Promise.reject(error);
				});
			});
			return f;
		});

		return promise as Promise<any>;
	}
}



["post", "put", "delete", "patch"].forEach(method => {
	const METHOD = method.toUpperCase();

	if (method != "post")
		JsonClient.prototype.method[method] = function(...args){
			return this.method(METHOD, ...args);
		};

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
			) as Promise<any>;
		}

		if (options.length === 1) {
			const optionsObj = options[0] as object;
			return this[`__${method}_options`](
				url,
				data,
				optionsObj
			) as Promise<any>;
		}

		return null;
	};

	Object.defineProperty(JsonClient.prototype, `__${method}_data`, {
		value: function(url: string, data: any): Promise<any> {
			return this[`__${method}_options`](
				url,
				data,
				this.defaults[METHOD].options
			) as Promise<any>;
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
		value: function(url: string, data: any, options: object): Promise<any> {
			delete options["body"];
			delete options["method"];

			const payload = {
				method: METHOD,
				body: JSON.stringify(mergeDeep(
					{},
					this.defaults.globals.data,
					this.defaults[METHOD].data,
					data
				)),
				headers: this.defaults[METHOD].headers,
			};

			const finalPayload = mergeDeep({}, payload, options);

			const promise = new Promise((resolve, reject) => {
				const f = fetch(url, finalPayload);
				f.then(response => {
					return response.json()
					.then(resolve)
					.catch(_ => {
						const error =
							"Something went wrong during data inspection (data is not JSON)";
						reject(error);
						return Promise.reject(error);
					});
				});
				return f;
			});

			return promise as Promise<any>;
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
