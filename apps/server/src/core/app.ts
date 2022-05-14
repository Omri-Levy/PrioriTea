import cookieParser from "cookie-parser";
import cors from "cors";
import {json, urlencoded} from "express";
import {AuthController} from "../auth/auth.controller";
import {VITE_BASE_URL, VITE_CORS_ORIGIN} from "../env/env";
import {errorHandler} from "../middleware/error-handler";
import {morgan} from "../middleware/morgan";
import {TasksController} from "../tasks/tasks.controller";
import {Server} from "./server";
import helmet from "helmet";

export class App extends Server {
	readonly BASE_URL = VITE_BASE_URL!;

	public init() {
		this.setupConfig({setting: "trust proxy", val: 1})
			.setupMiddleware(
				cookieParser(),
				cors({origin: VITE_CORS_ORIGIN, credentials: true}),
				urlencoded({extended: true}),
				json(),
				morgan,
				helmet()
			)
			.setupControllers(
				// new UsersController(),
				new AuthController(),
				new TasksController()
			)
			.setupMiddleware(errorHandler);

		return this;
	}
}
