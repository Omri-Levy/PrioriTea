import { Response } from 'express';
import { ExpressResponse } from '../auth/ExpressResponse';

export class SomethingWentWrongResponse extends ExpressResponse {
	protected statusCode = 500;

	constructor(res: Response, payload?: any) {
		super(res, payload);

		this.send();
	}
}
