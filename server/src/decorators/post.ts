import { HttpMethod, Method } from '../';

export const Post = function (path: string) {
	return HttpMethod(path, Method.POST);
};
