// For making env vars work
import "dotenv/config";
// Required for the error-handler middleware
import "express-async-errors";
import {App} from "./core/app";
import {PORT} from "./env/env";

const app = new App(Number(PORT));

if (process.env.NODE_ENV !== 'test') {
	app.listen();
}

