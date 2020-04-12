import { check, objToQueryString } from "../utils"
import { Middleware, JsonClientRequest } from "./types"

export const typeCheckPath: Middleware<JsonClientRequest> = ({ path, data, options }) => {
	if(typeof path !== "string")
		return Promise.reject("The 1st argument must be a string");

	return {
		path,
		data,
		options,
	};
};

export const typeCheckData: Middleware<JsonClientRequest> = ({ path, data, options }) => {
	if(typeof data !== "object" || data === null)
		throw new TypeError("'data' must be an Object");

	return {
		path,
		data,
		options,
	};
};

export const processQueryString: Middleware<JsonClientRequest> = ({ path, data, options }) => {
	Object.values(data).forEach(check);
	const newPath = objToQueryString(path, data);
	return {
		path: newPath,
		data,
		options,
	};
};

export const responseHandler: Middleware<Response> = async response => {
	if(response.ok)
		return response.json();

	try{
		const json = await response.json();
		return Promise.reject(json);
	}catch(error){
		return Promise.reject({
			response,
			error,
		});
	}
};