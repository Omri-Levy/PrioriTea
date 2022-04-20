import { RequestHandler } from 'express';
import { verify } from 'jsonwebtoken';
import { logger, SECRET_ACCESS_TOKEN } from '../..';

export const isAuth: RequestHandler = async function (req, res, next) {
	const authorization = req.headers['cookie'];

	if (!authorization) {
		logger.error('unauthorized');
		return res.status(401).send({ message: 'unauthorized' });
	}

	const token = authorization.split('mid=')[1];

	if (!token) {
		logger.error('unauthorized');
		return res.status(401).send({ message: 'unauthorized' });
	}

	try {
		res.locals.user = await verify(token, SECRET_ACCESS_TOKEN);

		return next();
	} catch (err) {
		logger.error(err);
		return res.status(401).send({ message: 'unauthorized' });
	}
};
