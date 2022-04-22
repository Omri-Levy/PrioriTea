import { ErrorRequestHandler } from "express";
import { logger } from "..";
import { CustomError } from "../errors/custom-error";
import { SomethingWentWrongResponse } from "../responses/internal-server-error";

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
	if (err instanceof CustomError) {
		const errors = err.serializeErrors();

		logger.error(errors);

		return res.status(err.statusCode).send({ errors });
	}

	logger.error(err);

	return new SomethingWentWrongResponse(res, {
		message: `Something went wrong..`,
	});
};

export { errorHandler };
