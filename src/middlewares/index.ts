import { mergeDeep, check, objToQueryString } from "../utils"
import { Middleware, JsonClientRequest, Plugin, JsonClient } from "./types"

const allMethods: string[] = ["GET", "POST", "PUT", "DELETE", "PATCH"];
const postLikeMethods: string[] = ["POST", "PUT", "DELETE", "PATCH"];

const __typeCheckPath: Middleware<JsonClientRequest> = ({ path, data, options }) => {
	if(typeof path !== "string")
		return Promise.reject("The 1st argument must be a string");

	return {
		path,
		data,
		options,
	};
};

export const typeCheckPath: Plugin<JsonClientRequest> = ($json: JsonClient, methods = allMethods) => {
	allMethods.forEach(method => {
		$json.middlewares[method]
		.pipeBeforeRequest(__typeCheckPath);
	});
};

const __typeCheckData: Middleware<JsonClientRequest> = ({ path, data, options }) => {
	if(typeof data !== "object" || data === null)
		throw new TypeError("'data' must be an Object");

	return {
		path,
		data,
		options,
	};
};

export const typeCheckData: Plugin<JsonClientRequest> = ($json: JsonClient, methods = allMethods) => {	
	allMethods.forEach(method => {
		$json.middlewares[method]
		.pipeBeforeRequest(__typeCheckData);
	});
};

export const mergePayload: Plugin<JsonClientRequest> = ($json: JsonClient) => {
	$json.middlewares.GET
	.pipeBeforeRequest(({ path, data, options }) => {
		const newData = mergeDeep(
			{},
			$json.defaults.globals.qs || {},
			$json.defaults.GET.qs || {},
			data,
		);


		const fetchOptions = mergeDeep(
			{},
			$json.defaults.globals.options,
			$json.defaults.GET.options || {},
			options,
			{method: "GET"}
		);

		fetchOptions.headers = mergeDeep(
			{},
			$json.defaults.globals.headers,
			$json.defaults.GET.options || {},
			fetchOptions.headers || {}
		);

		return {
			path,
			data: newData,
			options: fetchOptions,
		};
	});
};

export const mergePostPayload: Plugin<JsonClientRequest> = ($json: JsonClient, methods = postLikeMethods) => {
	methods.forEach(method => {
		$json.middlewares[method]
			.pipeBeforeRequest(({ path, data, options }) => {
					/*delete options["body"];
					delete options["method"];*/

					const payload = {
						method,
						body: JSON.stringify(mergeDeep(
							{},
							$json.defaults.globals.data,
							$json.defaults[method].data,
							data
						)),
						headers: mergeDeep(
							{},
							$json.defaults.globals.headers,
							$json.defaults[method].headers,
						),
					};

					const finalPayload = mergeDeep(
						{},
						$json.defaults.globals.options,
						$json.defaults[method].options,
						payload,
						options
					);

					return {
						path,
						data,
						options: finalPayload,
					};
				});
	});
};

const __processQueryString: Middleware<JsonClientRequest> = ({ path, data, options }) => {
	Object.values(data).forEach(check);
	const newPath = path + objToQueryString(path, data);
	return {
		path: newPath,
		data,
		options,
	};
};

export const processQueryString: Plugin<JsonClientRequest> = ($json: JsonClient) => {
	$json.middlewares.GET
		.pipeBeforeRequest(__processQueryString);
};

const __responseHandler: Middleware<Response> = async response => {
    try{
        if(response.ok)
            return response.json();

	
		const json = await response.json();
		return Promise.reject(json);
	}catch(error){
		return Promise.reject({
			response,
			error,
		});
	}
};

export const responseHandler: Plugin<Response> = ($json: JsonClient, methods = allMethods) => {
	allMethods.forEach(method => {
		$json.middlewares[method]
		.pipeBeforeResponse(__responseHandler);
	});
};


//// META PLUGINS

export const installGlobals: Plugin<any> = ($json: JsonClient, methods = allMethods) => {
	typeCheckPath($json, methods);
	typeCheckData($json, methods);
	responseHandler($json, methods);
};

export const installGet: Plugin<any> = ($json: JsonClient) => {
	mergePayload($json);
	processQueryString($json);
};

export const installPostLike: Plugin<any> = ($json: JsonClient, methods = postLikeMethods) => {
	mergePostPayload($json, methods);
};


export const installAllDefaults: Plugin<any> = ($json: JsonClient) => {
	installGlobals($json);
	installGet($json);
	installPostLike($json);
};