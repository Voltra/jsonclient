export type Middleware<T> = (obj: T) => Promise<any>|any;

export interface JsonClientRequest{
	path: string;
	data: object;
	options: object;
}

export type Json = null | number | string | JsonArray | JsonObject;
export interface JsonArray extends Array<Json> {}
export interface JsonObject extends Record<string, Json> {}

export type FetchError = Json | Error;

export type JsonClient = any; //TODO: Find how to forward declare classes

export type Plugin<T> = ($json: JsonClient, ...args) => any;