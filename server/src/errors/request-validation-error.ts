// import { ZodError } from 'zod';
import { CustomError } from "./custom-error";

export class RequestValidationError extends CustomError {
	statusCode = 400;

	// constructor(public error: ZodError) {
	constructor(public error: unknown) {
		super(`Invalid request parameters.`);

		Object.setPrototypeOf(this, RequestValidationError.prototype);
	}

	serializeErrors() {
		// return this.error.issues.map(function (err) {
		return [this.error].map((_err: any) =>
			// const [firstErr] = err.path;

			({
				// message: err.message,
				message: ``,
				// field: firstErr?.toString(),
				field: ``,
			})
		);
	}
}
