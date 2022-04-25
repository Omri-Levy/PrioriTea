import { CustomError } from "../errors/custom-error";
import { SomethingWentWrongResponse } from "../responses/internal-server-error";
import { ErrorHandler } from "../types";
import { logger } from "../utils/logger";

const errorHandler: ErrorHandler = (err, _req, res, _next) => {
	if (err instanceof CustomError) {
		const errors = err.serializeErrors();

		logger.error(errors);

		return res.status(err.statusCode).send({ errors, data: null });
	}

	logger.error(err);

	return new SomethingWentWrongResponse(res, {
		message: `Something went wrong..`,
	});
};

export { errorHandler };
