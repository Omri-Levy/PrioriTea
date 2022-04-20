import { HttpMethod, Method } from '../';

export const Patch = function (path: string) {
	return HttpMethod(path, Method.PATCH);
};
