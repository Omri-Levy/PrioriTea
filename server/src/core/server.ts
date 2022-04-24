import express from "express";
import { z } from "zod";
import { NotFoundError } from "../errors/not-found-error";
import { Middleware, ErrorHandler } from "../types";
import { iterableArray } from "../utils/iterable-array";
import { logger } from "../utils/logger";
import { IConfig, IServer } from "./app";

export abstract class Server implements IServer {
	app = express();
	abstract readonly BASE_URL: string;

	constructor(public readonly port: number) {}

	setupControllers(...controllers: any[]) {
		z.array(
			z.object({
				prefix: z.string().min(1),
				router: z.any(),
				middleware: z.array(z.any()).optional(),
			})
		)
			.nonempty()
			.parse(controllers);

		controllers.forEach(({ prefix, router, middleware }) => {
			const path = `/${this.BASE_URL}${prefix}`;

			iterableArray(middleware)
				? this.app.use(path, ...middleware, router)
				: this.app.use(path, router);

			logger.info(`Registered controller: ${path}`);
		});

		// catches 404 response error/non-existent route
		this.app.all(`*`, function () {
			throw new NotFoundError(`Route`);
		});

		return this;
	}

	setupMiddleware(...middleware: Array<Middleware | ErrorHandler>) {
		z.array(z.any()).nonempty().parse(middleware);

		middleware.forEach((mdw) => {
			this.app.use(mdw);
		});

		return this;
	}

	setupConfig(...config: Array<IConfig>) {
		z.array(
			z.object({
				setting: z.string().min(1),
				val: z.any(),
			})
		)
			.nonempty()
			.parse(config);

		config.forEach(({ setting, val }) => {
			this.app.set(setting, val);
		});

		return this;
	}

	onListen() {
		logger.info(`Server is listening on port ${this.port}`);

		return this;
	}

	public abstract init(): Server;

	listen() {
		try {
			this.init();

			return this.app.listen(this.port, this.onListen.bind(this));
		} catch (err) {
			return;
		}
	}
}
