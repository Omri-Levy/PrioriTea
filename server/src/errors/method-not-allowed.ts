import { CustomError } from './custom-error';

export class MethodNotAllowed extends CustomError {
	statusCode = 405;

	constructor() {
		super(`Method not allowed.`);

		Object.setPrototypeOf(this, MethodNotAllowed.prototype);
	}

	// eslint-disable-next-line class-methods-use-this
	serializeErrors() {
		return [{ message: `Method not allowed.` }];
	}
}
