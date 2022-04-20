import { InjectService, PassUtils, prisma } from '..';

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

@InjectService()
export class UserModel implements IUserModel {
	public async createUser(email: string, fullName: string, password: string) {
		return prisma.user.create({
			data: {
				email,
				fullName,
				password: await PassUtils.hash(password),
			},
		});
	}

	public async getUserById(id: string) {
		return prisma.user.findUnique({
			where: {
				id,
			},
		});
	}

	public async getUserByEmail(email: string) {
		return prisma.user.findUnique({
			where: {
				email,
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
