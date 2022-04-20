import { RequestHandler } from 'express';
import { logger } from '..';

export const Middleware = function (
	...middleware: Array<RequestHandler>
): MethodDecorator {
	return function (
		target: any,
		methodName: string,
		descriptor: MethodDecorator,
	) {
		logger.debug(target, methodName, descriptor, middleware);
	} as MethodDecorator;
};
