export interface IJwtPayload {
	data: {
		id: string;
		email: string;
		name: string;
	};
	exp: number;
}

