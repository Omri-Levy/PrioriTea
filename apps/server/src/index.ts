// For making env vars work
import "dotenv/config";
// Required for the error-handler middleware
import "express-async-errors";
// For decorators and tsyringe
import "reflect-metadata";
import { App } from "./core/app";
import { NODE_ENV, PORT } from "./env/env";

(async () => {
	const app = new App(Number(PORT));

	if (NODE_ENV !== "test") {
		app.listen();
	}
})();
