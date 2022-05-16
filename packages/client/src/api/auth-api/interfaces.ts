export interface IAuthResponse {
	data: {
		data: {
			user: {
				id: string;
				email: string;
				name: string;
				password: string;
				createdAt: string;
				updatedAt: string;
			};
		};
		errors: Array<{ message: string; field?: string }> | null;
	};
}
