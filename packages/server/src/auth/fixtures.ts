import {Method} from "@prioritea/types";

export const badMethods: Array<Method> = [
	Method.PUT, Method.PATCH, Method.DELETE
];

export const routes = [
	{
		method: Method.POST,
		route: "auth/sign-up",
		auth: false,
	},
	{
		method: Method.POST,
		route: "auth/sign-in",
		auth: false,
	},
	{
		method: Method.POST,
		route: "auth/sign-out",
		auth: true,
	},
	{
		method: Method.GET,
		route: "auth/user-info",
		auth: true,
	},
];
