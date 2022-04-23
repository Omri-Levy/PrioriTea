import { Router } from "express";
import { z } from "zod";
import { Method } from "../enums";
import { Middleware, RequestHandler } from "../types";
import { iterableArray } from "../utils/iterable-array";
import { logger } from "../utils/logger";

export interface IRoute {
	method: Method;
	path: string;
	handler: RequestHandler;
	middleware?: Array<Middleware>;
}

export interface IController<TService> {
	_service: TService;
	_router: Router;
	prefix: string;

	routes: Array<IRoute>;
	middleware?: Array<Middleware>;

	router: Router;
	service: TService;
	registerRoutes(): void;
}

export abstract class Controller<TService> implements IController<TService> {
	public readonly _router = Router();
	public abstract readonly prefix: string;
	public abstract readonly routes: Array<IRoute>;
	public abstract readonly middleware?: Array<Middleware>;
	public abstract _service: TService;

	get router() {
		return this._router;
	}

	get service() {
		return this._service;
	}

	public registerRoutes() {
		z.array(z.object({
			method: z.nativeEnum(Method),
			path: z.string().min(1),
			handler: z.function(),
			middleware: z.array(z.any()).optional()
		})).nonempty().parse(this.routes);
		z.string().min(1).parse(this.prefix);

		this.routes.forEach(({ method, path, handler, middleware }) => {
			const mtd = method.toLowerCase() as Lowercase<Method>;

			iterableArray(middleware)
				? this.router[mtd](path, ...middleware!, handler)
				: this.router[mtd](path, handler);

			logger.info(`Registered route: ${method} ${this.prefix}${path}`);
		});
	}
}
