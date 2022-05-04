import { CustomError } from "./custom-error";

export class NotFoundError extends CustomError {
	statusCode = 404;

	constructor(public item: string) {
		super(`${item} not found.`);

		Object.setPrototypeOf(this, NotFoundError.prototype);
	}

	serializeErrors() {
		return [{ message: `${this.item} not found.` }];
	}
}
