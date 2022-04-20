import { Method, Route } from '../';

export const Delete = function (path: string) {
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
					method: Method.DELETE,
					path,
					methodName,
				},
			],
			target.constructor,
		);
	};
};
