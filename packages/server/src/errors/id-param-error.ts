import {CustomError} from "./custom-error";

export class IdParamError extends CustomError {
	statusCode = 400;

	constructor() {
		super(`Invalid request parameters.`);

		Object.setPrototypeOf(this, IdParamError.prototype);
	}

	serializeErrors() {
		return [{
			message: 'id must be a valid CUID',
			param: 'id',
		}];
	}
}
