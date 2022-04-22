// import { z } from 'zod';
import {
  BadRequestError,
  PassUtils,
  Service,
  Repository,
  InjectRepository,
} from "..";
import { User } from "../users/users.entity";

interface IAuthService {
  signUp(
    email: string,
    fullName: string,
    password: string
  ): Promise<User | null>;
  signIn(email: string, fullName: string): Promise<User | null>;
}

// export const emailAlreadyInUse = function (err: unknown) {
// 	if (
// 		err instanceof PrismaClientKnownRequestError &&
// 		err.code === 'P2002' &&
// 		(err.meta as { target: Array<string> })?.target.includes('email')
// 	) {
// 		throw new BadRequestError('Email already in use');
// 	}
// };

@Service()
export class AuthService implements IAuthService {
  @InjectRepository(User)
  private repository: Repository<User>;

  // @Validate(signUpSchema)
  async signUp(email: string, fullName: string, password: string) {
    const user = new User();

    user.email = email;
    user.fullName = fullName;
    user.password = password;

    this.repository.create(user);

    return this.repository.save(user);
  }

  async signIn(email: string, password: string) {
    const invalidCredentialsMsg = `Email or password are wrong - please try again.`;

    // signInSchema.parse({
    // 	email: req.body.email,
    // 	password: req.body.password,
    // });

    const user = await this.repository.findOneBy({
      email,
    });

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
