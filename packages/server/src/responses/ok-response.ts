import { Response } from "express";
import { ExpressResponse } from "./express-response";

export class OkResponse extends ExpressResponse {
	protected statusCode = 200;

	constructor(res: Response, payload?: any) {
		super(res, payload);

		this.send();
	}
}
