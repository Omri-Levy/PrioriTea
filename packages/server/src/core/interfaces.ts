import {Application} from "express";
import {BaseArray} from "@prioritea/types";
import {Server} from "./server";

export interface IServer {
	app: Application;
	readonly port: number;
	readonly BASE_URL: string;

	setupControllers(...controllers: BaseArray): Server;

	setupMiddleware(...middleware: BaseArray): Server;

	setupConfig(...config: BaseArray): Server;

	onListen(): Server;

	init(): Server;

	listen(): void;
}

export interface IConfig {
	setting: string;
	val: any;
}

export interface IService<TRepository> {
	_repository: TRepository;

	repository: TRepository;
}
