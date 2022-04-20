import { RequestHandler, Router } from 'express';
import { Method } from './middleware/restful';

export interface Route {
	path: string;
	method: Method;
	handler: RequestHandler;
	middleware?: Array<RequestHandler>;
}

export abstract class Controller {
	protected abstract readonly _path: string;
	private _router = Router();
	protected abstract readonly routes: Array<Route>;

	get router() {
		return this._router;
	}

	get path() {
		return this._path;
	}

	public registerRoutes() {
		this.routes.forEach(({ path, method, handler, middleware }) => {
			// From SCREAMING_SNAKE
			const mtd = method.toLowerCase() as Lowercase<Method>;

			this.router[mtd](path, ...(middleware ?? []), handler);
		});

		return this.router;
	}
}
