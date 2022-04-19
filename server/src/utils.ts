import { Response } from 'express';

export interface User {
	id: string;
	email: string;
	fullName: string;
}

export const getUser = function (res: Response): User | undefined {
	return res.locals.user;
};
