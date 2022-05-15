import {Router} from "express";
import {z} from "zod";
import {Method} from "@prioritea/types";
import {Middleware, RequestHandler} from "../types";
import {iterableArray} from "@prioritea/utils";
import {logger} from "../utils/logger";

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

	get service() {
		return this._service;
	}

	get router() {
		return this._router;
	}

	public registerRoutes() {
		z.array(
			z.object({
				method: z.nativeEnum(Method),
				path: z.string().min(1),
				handler: z.function(),
				middleware: z.array(z.any()).optional(),
			})
		)
			.nonempty()
			.parse(this.routes);
		z.string().min(1).parse(this.prefix);

		this.routes.forEach(({method, path, handler, middleware}) => {
			iterableArray(middleware)
				? this.router[method](path, ...middleware!, handler)
				: this.router[method](path, handler);

			logger.info(`Registered route: ${method.toUpperCase()} ${this.prefix}${path}`);
		});
	}
}
