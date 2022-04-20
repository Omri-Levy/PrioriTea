import { HttpMethod, Method } from '../';

export const All = function (path: string) {
	return HttpMethod(path, Method.ALL);
};
