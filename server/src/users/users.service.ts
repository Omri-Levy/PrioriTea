import { Service } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { User } from "./users.entity";

export interface IUsersService {
	getUsers(): Promise<Array<User>>;
	getUser(id: string): Promise<User | null>;
	updateUser(
		id: string,
		email?: string,
		fullName?: string,
		password?: string
	): Promise<Array<User> | null>;
	deleteUser(id: string): Promise<Array<User> | null>;
}

@Service()
export class UsersService implements IUsersService {
	@InjectRepository(User)
	private repository: Repository<User>;

	public async getUsers() {
		return this.repository.find();
	}

	public async getUser(id: string) {
		return this.repository.findOneBy({ id });
	}

	public async updateUser(
		id: string,
		email?: string,
		fullName?: string,
		password?: string
	) {
		await this.repository.update(id, {
			email,
			fullName,
			password,
		});

		return this.repository.find();
	}

	public async deleteUser(id: string) {
		this.repository.delete(id);

		return this.repository.find();
	}
}
