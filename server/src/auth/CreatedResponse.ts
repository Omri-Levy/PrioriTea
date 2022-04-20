import { ExpressResponse } from './ExpressResponse';
import { Response } from 'express';

export class CreatedResponse extends ExpressResponse {
	protected statusCode = 201;

	constructor(res: Response, payload?: any) {
		super(res, payload);

		this.send();
	}
}
