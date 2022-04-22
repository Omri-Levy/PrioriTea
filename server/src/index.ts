// For making env vars work
import "dotenv/config";
// Required for the error-handler middleware
import "express-async-errors";
// For decorators, typedi, @overnightjs
import "reflect-metadata";
import { App } from "./app";
import { NODE_ENV, PORT } from "./env";

(async () => {
	const app = new App(Number(PORT));

	if (NODE_ENV !== "test") {
		app.listen();
	}
})();
