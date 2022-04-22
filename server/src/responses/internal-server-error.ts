import { Response } from "express";
import { ExpressResponse } from "./express-response";

export class SomethingWentWrongResponse extends ExpressResponse {
	protected statusCode = 500;

	constructor(res: Response, payload?: any) {
		super(res, payload);

		this.send();
	}
}
