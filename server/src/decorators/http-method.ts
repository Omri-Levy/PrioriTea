import { Method, Route } from '../';

export const HttpMethod = function (path: string, method: Method) {
	return function (target: any, methodName: string) {
		if (!Reflect.hasMetadata('routes', target.constructor)) {
			Reflect.defineMetadata('routes', [], target.constructor);
		}

		const routes = Reflect.getMetadata(
			'routes',
			target.constructor,
		) as Array<Route>;

		Reflect.defineMetadata(
			'routes',
			[
				...routes,
				{
					method,
					path,
					methodName,
				},
			],
			target.constructor,
		);
	};
};
