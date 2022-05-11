import { User } from "@prisma/client";
import { Service } from "../core/service";
import { UsersRepository } from "./users.repository";

export interface IUsersService {
	getUsers(): Promise<Array<User>>;
	getUser(id: string): Promise<User | null>;
	updateUser(
		id: string,
		email?: string,
		name?: string,
		password?: string
	): Promise<Array<User> | null>;
	deleteUser(id: string): Promise<Array<User> | null>;
}

export class UsersService
	extends Service<UsersRepository>
	implements IUsersService
{
	_repository = new UsersRepository();

	public async getUsers() {
		return this.repository.getAllUsers();
	}

	public async getUser(id: string) {
		return this.repository.getUserById(id);
	}

	public async updateUser(
		id: string,
		email?: string,
		name?: string,
		password?: string
	) {
		await this.repository.updateUserById(id, email, name, password);

		return this.repository.getAllUsers();
	}

	public async deleteUser(id: string) {
		this.repository.deleteUserById(id);

		return this.repository.getAllUsers();
	}

	public async deleteUsers() {
		await this.repository.deleteAllUsers();

		return this.repository.getAllUsers();
	}
}
