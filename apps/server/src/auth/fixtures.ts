export enum Method {
	GET = 'get',
	POST = 'post',
	PATCH = 'patch',
	DELETE = 'delete',
	ALL = 'all',
}

export const badMethods: Array<Method> = [Method.PATCH, Method.PATCH, Method.DELETE];

export const routes = [
	{
		method: Method.POST,
		route: "/auth/sign-up",
		auth: false,
	},
	{
		method: Method.POST,
		route: "/auth/sign-in",
		auth: false,
	},
	{
		method: Method.POST,
		route: "/auth/sign-out",
		auth: true,
	},
	{
		method: Method.GET,
		route: "/auth/user-info",
		auth: true,
	},
];
