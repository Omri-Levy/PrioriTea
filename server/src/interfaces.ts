import { Method } from '.';

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
