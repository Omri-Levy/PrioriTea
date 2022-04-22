import { autoInjectable } from "tsyringe";
import { IUser } from "../interfaces";
import { UserRepository } from "./users-repository";

export interface IUsersService {
	getUsers(): Promise<Array<IUser>>;
	getUser(id: string): Promise<IUser | null>;
	updateUser(
		id: string,
		email?: string,
		fullName?: string,
		password?: string
	): Promise<Array<IUser> | null>;
	deleteUser(id: string): Promise<Array<IUser> | null>;
}

@autoInjectable()
export class UsersService implements IUsersService {
	constructor(public repository: UserRepository) {}

	public async getUsers() {
		return this.repository.getAllUsers();
	}

	public async getUser(id: string) {
		return this.repository.getUserById(id);
	}

	public async updateUser(
		id: string,
		email?: string,
		fullName?: string,
		password?: string
	) {
		await this.repository.updateUserById(id, email, fullName, password);

		return this.repository.getAllUsers();
	}

	public async deleteUser(id: string) {
		this.repository.deleteUserById(id);

		return this.repository.getAllUsers();
	}
}
