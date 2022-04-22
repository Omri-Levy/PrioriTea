import { Method } from "./enums";

export interface IRoute {
	path: string;
	method: Method;
	methodName: string;
}

export interface IUser {
	id: string;
	email: string;
	fullName: string;
}

export interface IJwtPayload {
	data: {
		id: string;
		email: string;
		fullName: string;
	};
	exp: number;
}
