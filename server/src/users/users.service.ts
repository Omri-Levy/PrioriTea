import { Service, InjectRepository, DeleteResult, Repository } from "..";
import { User } from "./users.entity";

export interface IUsersService {
	getUsers(): Promise<Array<User>>;
	getUser(id: string): Promise<User | null>;
	updateUser(
		id: string,
		email?: string,
		fullName?: string,
		password?: string
	): Promise<User | null>;
	deleteUser(id: string): Promise<DeleteResult>;
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

		return this.repository.findOneBy({ id });
	}

	public async deleteUser(id: string) {
		return this.repository.delete(id);
	}
}
