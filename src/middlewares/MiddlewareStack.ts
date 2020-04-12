import { factory } from "../utils"
import { Middleware } from "./types"

@factory("empty")
export class MiddlewareStack<T>{
	protected stack: Middleware<T>[];

	public constructor(){
		this.stack = [];
	}

	public get length(): number{
		return this.stack.length;
	}

	private validIndex(index: number): boolean{
		return !(index < 0 || index >= this.length);
	}

	public pipe(middleware: Middleware<T>): ThisType<this>{
		this.stack.push(middleware);
		return this;
	}

	public removeAt(index: number): ThisType<this>{
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

	private async __execute(obj: any, index: number): Promise<any> {
		const current = this.at(index);
		return current === null
		? obj
		: await current.process(obj, obj => this.__execute(obj, index + 1));
	}
};