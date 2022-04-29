import { Response } from "express";
import { ExpressResponse } from "./express-response";

export class CreatedResponse extends ExpressResponse {
	protected statusCode = 201;

	constructor(res: Response, payload?: any) {
		super(res, payload);

		this.send();
	}
}
