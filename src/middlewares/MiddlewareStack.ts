// import { factory } from "../utils"
import { Middleware } from "./types"

// @factory("empty")
export class MiddlewareStack<T>{
	protected stack: Middleware<T>[];

	public constructor(){
		this.stack = [];
	}

	public static empty(){
		return new this();
	}

	public get length(): number{
		return this.stack.length;
	}

	private validIndex(index: number): boolean{
		return !(index < 0 || index >= this.length);
	}

	public pipe(middleware: Middleware<T>): this{
		this.stack.push(middleware);
		return this;
	}

	public removeAt(index: number): this{
		if(!this.validIndex(index))
			return this;

		this.stack = [
			...this.stack.slice(0, index),
			...this.stack.slice(index+1, this.length)
		];

		return this;
	}

	public at(index: number): Middleware<T> | null{
		return this.stack[index] || null;
	}

	public execute(obj: T): Promise<any> {
		return this.__execute(obj, 0);
	}

	private __execute(obj: any, index: number): Promise<any> {
		const current = this.at(index);

		if(current === null)
			return obj;

		try{
			const res = current(obj, obj => this.__execute(obj, index + 1));
			return res instanceof Promise ? res : Promise.resolve(res);
		}catch(e){
			return Promise.reject(e);
		}
	}
};