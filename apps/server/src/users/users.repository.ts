import { PassUtils } from "../auth/utils/pass-utils";
import { db } from "../core/db/db";

export class UsersRepository {
	public async createUser(email: string, name: string, password: string) {
		return db.user.create({
			data: {
				email,
				name,
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
		name?: string,
		password?: string
	) {
		return db.user.update({
			where: { id },
			data: {
				email,
				name,
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
