import { Response } from 'express';

export const getUserId = function (res: Response): string | undefined {
	return res.locals.user?.id;
};
