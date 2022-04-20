import { ExpressResponse } from './ExpressResponse';
import { Response } from 'express';

export class SuccessResponse extends ExpressResponse {
	protected statusCode = 200;

	constructor(res: Response, payload?: any) {
		super(res, payload);

		this.send();
	}
}
