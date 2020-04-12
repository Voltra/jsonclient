export interface Middleware<T>{
	process(obj: T, next: (obj: T) => any): Promise<any>;
};

export interface JsonClientRequest{
	path: string;
	data: object;
	options: object;
}

export type Json = null | number | string | JsonArray | JsonObject;
export interface JsonArray extends Array<Json> {}
export interface JsonObject extends Record<string, Json> {}

export type FetchError = Json | Error;