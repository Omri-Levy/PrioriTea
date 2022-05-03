import { Method } from "@prioritea/types";

export interface IUser {
	id: string;
	email: string;
	name: string;
}

export interface IJwtPayload {
	data: {
		id: string;
		email: string;
		name: string;
	};
	exp: number;
}
