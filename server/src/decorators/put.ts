import { HttpMethod, Method } from '../';

export const Put = function (path: string) {
	return HttpMethod(path, Method.PUT);
};
