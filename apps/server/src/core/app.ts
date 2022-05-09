import cookieParser from "cookie-parser";
import cors from "cors";
import {Application, json, urlencoded} from "express";
import {AuthController} from "../auth/auth.controller";
import {BASE_URL, CORS_ORIGIN} from "../env/env";
import {errorHandler} from "../middleware/error-handler";
import {morgan} from "../middleware/morgan";
import {TasksController} from "../tasks/tasks.controller";
import {Server} from "./server";
import helmet from "helmet";

export interface IServer {
	app: Application;
	readonly port: number;
	readonly BASE_URL: string;

	setupControllers(...controllers: any[]): Server;
	setupMiddleware(...middleware: any[]): Server;
	setupConfig(...config: any[]): Server;
	onListen(): Server;
	init(): Server;
	listen(): void;
}

export interface IConfig {
	setting: string;
	val: any;
}

export class App extends Server {
	readonly BASE_URL = BASE_URL!;

	public init() {
		this.setupConfig({ setting: "trust proxy", val: 1 })
			.setupMiddleware(
				cookieParser(),
				cors({ origin: CORS_ORIGIN, credentials: true }),
				urlencoded({ extended: true }),
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
