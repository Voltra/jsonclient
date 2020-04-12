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
		return 0 <= index && index < this.length;
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
		return this.validIndex(index) ? this.stack[index] : null;
	}

	public execute(obj: T): Promise<any> {
		return this.__execute(obj, 0);
	}

	private __execute(obj: any, index: number): Promise<any> {
		const current = this.at(index);

		if(current === null)
			return obj;

		try{
			const res = current(obj);
			const promise = res instanceof Promise ? res : Promise.resolve(res);
			return promise.then(obj => this.__execute(obj, index + 1));
		}catch(e){
			return Promise.reject(e);
		}
	}
};