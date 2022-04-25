import { Response } from "express";

export abstract class ExpressResponse {
	protected abstract readonly statusCode: number;

	constructor(
		private readonly res: Response,
		private readonly payload?: any
	) {}

	send() {
		return this.res.status(this.statusCode).json({
			errors: null,
			data: null,
			...(this.payload ?? {})
		});
	}
}
