import { Method } from "./enums";

export interface Route {
	path: string;
	method: Method;
	methodName: string;
}

export interface User {
	id: string;
	email: string;
	fullName: string;
}

export interface JwtPayload {
	data: {
		id: string;
		email: string;
		fullName: string;
	};
	exp: number;
}
