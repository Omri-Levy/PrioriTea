import { Server } from "@overnightjs/core";
import { NotFoundError } from "./errors/not-found-error";
import { ErrorHandler, Middleware } from "./types";
import { isDev } from "./utils/isDev";
import { logger } from "./utils/logger";

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

	public async listen() {
		try {
			this.app.listen(this.port, this.onListen.bind(this));

			return this;
		} catch (err) {
			throw err;
		}
	}
}
