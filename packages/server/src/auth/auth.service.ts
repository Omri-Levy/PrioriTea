import {Service} from "../core/service";
import {BadRequestError} from "../errors/bad-request-error";
import {UsersRepository} from "../users/users.repository";
import {PassUtils} from "./utils/pass-utils";
import {IAuthService} from "./interfaces";

export class AuthService
	extends Service<UsersRepository>
	implements IAuthService {
	_repository = new UsersRepository();

	async signUp(email: string, name: string, password: string) {
		return this.repository.createUser(email, name, password);
	}

	async signIn(email: string, password: string) {
		const invalidCredentialsMsg = `Invalid credentials.`;

		const user = await this.repository.getUserByEmail(email);

		if (!user) {
			throw new BadRequestError(invalidCredentialsMsg);
		}

		const validPass = await PassUtils.compare(user.password, password);

		if (!validPass) {
			throw new BadRequestError(invalidCredentialsMsg);
		}

		return user;
	}
}
