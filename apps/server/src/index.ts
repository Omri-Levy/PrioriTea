// For making env vars work
import "dotenv/config";
// Required for the error-handler middleware
import "express-async-errors";
import {App} from "./core/app";
import {VITE_PORT} from "./env/env";

const app = new App(Number(VITE_PORT));

if (import.meta.env.PROD) {
	app.listen();
}

export const viteNodeApp = app.init().app;
