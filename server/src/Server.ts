import express, { ErrorRequestHandler, RequestHandler } from 'express';
import { Controller } from './Controller';
import { NotFoundError } from './errors/not-found-error';

export class Server {
	private app = express();
	private BASE_URL = '/api';

	constructor(private readonly port: string) {}

	private onListen() {
		console.log(`Server is listening on port ${this.port}`);
	}

	listen() {
		this.app.listen(this.port, this.onListen.bind(this));

		return this;
	}

	registerMiddleware(
		...middleware: Array<RequestHandler | ErrorRequestHandler>
	) {
		middleware.forEach((mdw) => {
			this.app.use(mdw);
		});

		return this;
	}

	registerControllers(...controllers: Array<Controller>) {
		controllers.forEach((ctl) => {
			this.app.use(`${this.BASE_URL}${ctl.path}`, ctl.registerRoutes());
		});

		// catches 404 response error/non-existent route
		this.app.all(`*`, () => {
			throw new NotFoundError(`Route`);
		});

		return this;
	}

	config(config: { setting: string; val: any }) {
		this.app.set(config.setting, config.val);

		return this;
	}
}
