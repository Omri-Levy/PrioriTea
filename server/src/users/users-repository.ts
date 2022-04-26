import { PassUtils } from "../auth/utils/pass-utils";
import { db } from "../core/db/db";

export class UsersRepository {
	public async createUser(email: string, fullName: string, password: string) {
		return db.user.create({
			data: {
				email,
				fullName,
				password: await PassUtils.hash(password),
			},
		});
	}

	public async getUserById(id: string) {
		return db.user.findUnique({
			where: {
				id,
			},
		});
	}

	public async getUserByEmail(email: string) {
		return db.user.findUnique({
			where: {
				email,
			},
		});
	}

	public async getAllUsers() {
		return db.user.findMany();
	}

	public async updateUserById(
		id: string,
		email?: string,
		fullName?: string,
		password?: string
	) {
		return db.user.update({
			where: { id },
			data: {
				email,
				fullName,
				password,
			},
		});
	}

	public async deleteUserById(id: string) {
		return db.user.delete({
			where: {
				id,
			},
		});
	}

	public async deleteAllUsers() {
		return db.user.deleteMany();
	}
}
