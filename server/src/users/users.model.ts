import { User } from '@prisma/client';
import { InjectService, PassUtils, prisma } from '..';

export interface IUserModel {
	createUser(
		email: string,
		fullName: string,
		password: string,
	): Promise<User | null>;
	getAllUsers(): Promise<Array<User> | null>;
	getUserById(id: string): Promise<User | null>;
	getUserByEmail(email: string): Promise<User | null>;
	updateUserById(
		id: string,
		email?: string,
		fullName?: string,
		password?: string,
	): Promise<User | null>;
	deleteUserById(id: string): Promise<User | null>;
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

	public async getAllUsers() {
		return prisma.user.findMany();
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
