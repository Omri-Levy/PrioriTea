import { ZodError } from 'zod';
import { CustomError } from './custom-error';

class RequestValidationError extends CustomError {
	statusCode = 400;

	constructor(public error: ZodError) {
		super(`Invalid request parameters.`);

		Object.setPrototypeOf(this, RequestValidationError.prototype);
	}

	serializeErrors() {
		return this.error.issues.map(function (err) {
			return {
				message: err.message,
				field: err.path[0]?.toString(),
			};
		});
	}
}

export { RequestValidationError };
