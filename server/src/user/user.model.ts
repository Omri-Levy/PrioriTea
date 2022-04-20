import { prisma } from '../db/prisma';
export interface IUserModel {
	getUserById(id: string): void;
	getAllUsers(): void;
	updateUserById(
		id: string,
		email?: string,
		fullName?: string,
		password?: string,
	): void;
	deleteUserById(id: string): void;
}
export class UserModel implements IUserModel {
	public async getUserById(id: string) {
		return prisma.user.findUnique({
			where: {
				id,
			},
		});
	}

	public async getAllUsers() {
		return prisma.user.findMany();
	}

	public async updateUserById(
		id: string,
		email: string,
		fullName: string,
		password: string,
	) {
		return prisma.user.update({
			where: { id },
			data: {
				email,
				fullName,
				password,
			},
		});
	}

	public async deleteUserById(id: string) {
		return prisma.user.delete({
			where: {
				id,
			},
		});
	}
}
