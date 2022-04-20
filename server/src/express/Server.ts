import express, { ErrorRequestHandler, RequestHandler, Router } from 'express';
import { logger, NotFoundError } from '../';

export class Server {
	private app = express();
	private readonly BASE_URL = '/api';

	constructor(
		private readonly port: string,
		private readonly router: Router,
	) {}

	private onListen() {
		logger.info(`Server is listening on port ${this.port}`);
	}

	listen() {
		this.app.listen(this.port, this.onListen.bind(this));

		return this;
	}

	registerMiddleware(
		...middleware: Array<RequestHandler | ErrorRequestHandler>
	) {
		middleware.forEach((_mdw) => {
			// this.app.use(mdw);
		});

		return this;
	}

	registerRouter() {
		this.app.use(this.BASE_URL, this.router);

		// catches 404 response error/non-existent route
		this.app.all(`*`, function () {
			throw new NotFoundError(`Route`);
		});

		return this;
	}

	config(config: { setting: string; val: any }) {
		this.app.set(config.setting, config.val);

		return this;
	}
}
