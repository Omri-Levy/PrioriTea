import { CustomError } from "./custom-error";

export class MethodNotAllowedError extends CustomError {
	statusCode = 405;

	constructor() {
		super(`Method not allowed.`);

		Object.setPrototypeOf(this, MethodNotAllowedError.prototype);
	}

	// eslint-disable-next-line class-methods-use-this
	serializeErrors() {
		return [{ message: `Method not allowed.` }];
	}
}
