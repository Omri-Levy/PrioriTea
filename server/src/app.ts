import { Server } from "@overnightjs/core";
import cookieParser from "cookie-parser";
import cors from "cors";
import { json, urlencoded } from "express";
import helmet from "helmet";
import { AuthController } from "./auth/auth-controller";
import { CORS_ORIGIN } from "./env";
import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middleware/error-handler";
import { morgan } from "./middleware/morgan";
import { TasksController } from "./tasks/tasks-controller";
import { ErrorHandler, Middleware } from "./types";
import { UsersController } from "./users/users-controller";
import { isDev } from "./utils/is-dev";
import { logger } from "./utils/logger";
import {container} from 'tsyringe'

export class App extends Server {
	constructor(private readonly port: number) {
		super(isDev());

		this.port = port;
	}

	public setupControllers(...controllers: Array<any>) {
		super.addControllers([...controllers]);

		// catches 404 response error/non-existent route
		this.app.all(`*`, function () {
			throw new NotFoundError(`Route`);
		});

		return this;
	}

	public setupMiddleware(...middleware: Array<Middleware | ErrorHandler>) {
		middleware.forEach((mdw) => {
			this.app.use(mdw);
		});

		return this;
	}

	public setupConfig() {
		this.app.set("trust proxy", 1);

		return this;
	}

	private onListen() {
		logger.info(`Server is listening on port ${this.port}`);

		return this;
	}

	public init() {
		this.setupConfig()
			.setupMiddleware(
				cookieParser(),
				cors({ origin: CORS_ORIGIN, credentials: true }),
				urlencoded({ extended: true }),
				json(),
				morgan,
				helmet()
			)
			.setupControllers(
				container.resolveAll(UsersController),
				container.resolve(AuthController),
				container.resolve(TasksController)
			)
			.setupMiddleware(errorHandler);

		return this;
	}

	public listen() {
		try {
			this.init();

			return this.app.listen(this.port, this.onListen.bind(this));
		} catch (err) {
			return;
		}
	}
}
