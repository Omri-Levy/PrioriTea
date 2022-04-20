import { RequestHandler } from 'express';
import { JwtUtils } from '../..';

export const isAuth: RequestHandler = async function (req, res, next) {
	try {
		const token = JwtUtils.getToken(req);
		const user = await JwtUtils.verify(token);

		res.locals.user = user;

		return next();
	} catch (err) {
		throw err;
	}
};
