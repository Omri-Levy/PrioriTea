import { HttpMethod, Method } from '../';

export const Get = function (path: string) {
	return HttpMethod(path, Method.GET);
};
