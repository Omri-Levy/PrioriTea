import { User } from "@prisma/client";
import { autoInjectable } from "tsyringe";
import { BadRequestError } from "../errors/bad-request-error";
import { UserRepository } from "../users/users-repository";
import { PassUtils } from "../utils/pass-utils";

interface IAuthService {
	signUp(
		email: string,
		fullName: string,
		password: string
	): Promise<User | null>;
	signIn(email: string, fullName: string): Promise<User | null>;
}

@autoInjectable()
export class AuthService implements IAuthService {
	constructor(public repository: UserRepository){}

	async signUp(email: string, fullName: string, password: string) {
		return this.repository.createUser(email, fullName, password);
	}

	async signIn(email: string, password: string) {
		const invalidCredentialsMsg = `Email or password are wrong - please try again.`;

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
