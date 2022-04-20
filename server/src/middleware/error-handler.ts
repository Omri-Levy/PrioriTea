import { ErrorRequestHandler } from 'express';
import { logger } from '..';
import { CustomError } from '../errors/custom-error';

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
	if (err instanceof CustomError) {
		const errors = err.serializeErrors();

		logger.error(errors);

		return res.status(err.statusCode).send({ errors });
	}

	logger.error(err);

	return res.status(500).send({
		message: `Something went wrong..`,
	});
};

export { errorHandler };
