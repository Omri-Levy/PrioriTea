import Container from 'typedi';
import { logger, Route, router } from '../';

export const Controller = function (prefix: string): ClassDecorator {
	return function (target: any) {
		Reflect.defineMetadata('prefix', prefix, target);

		if (!Reflect.hasMetadata('routes', target)) {
			Reflect.defineMetadata('routes', [], target);
		}

		const routes: Array<Route> = Reflect.getMetadata('routes', target);
		const instance: any = Container.get(target);

		routes.forEach(function ({ path: routePath, method, methodName }) {
			const path = `${prefix}${routePath}`;

			logger.info(
				`Registered route: ${method.toUpperCase()} ${path} ${
					target.name
				}`,
			);

			router[method](path, instance[methodName].bind(instance));
		});
	};
};
