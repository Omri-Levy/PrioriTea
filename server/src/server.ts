// For making env vars work
import "dotenv/config";
// For decorators, typedi, @overnightjs
import "reflect-metadata";
// Required for the error-handler middleware
import "express-async-errors";
import cookieParser from "cookie-parser";
import cors from "cors";
import { json, urlencoded } from "express";
import helmet from "helmet";
import { AuthController } from "./auth/auth-controller";
import { Database } from "./database";
import { CORS_ORIGIN, PORT } from "./env";
import { morgan } from "./middleware/morgan";
import { TasksController } from "./tasks/tasks-controller";
import { TypeormAdapter } from "./typeorm-adapater";
import { UsersController } from "./users/users-controller";
import { Container } from "typeorm-typedi-extensions";
import { useContainer } from "typeorm";
import { App } from "./app";
import { errorHandler } from "./middleware/error-handler";

(async () => {
	const typeorm = new TypeormAdapter();
	const db = new Database(typeorm);
	const app = new App(Number(PORT));

	useContainer(Container);

	db.connect();

	app.setupConfig()
		.setupMiddleware(
			cookieParser(),
			cors({ origin: CORS_ORIGIN, credentials: true }),
			urlencoded({ extended: true }),
			json(),
			morgan,
			helmet()
		)
		.setupControllers(
			Container.get(UsersController),
			Container.get(AuthController),
			Container.get(TasksController)
		)
		.setupMiddleware(errorHandler)
		.listen();
})();
