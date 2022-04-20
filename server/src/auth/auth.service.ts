import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Request, RequestHandler, Response } from 'express';
import { z } from 'zod';
import {
	BadRequestError,
	getUser,
	InjectService,
	JwtUtils,
	PassUtils,
	RequestValidationError,
	signInSchema,
	signUpSchema,
	UserModel,
} from '../';
import { CreatedResponse } from './CreatedResponse';
import { SuccessResponse } from './SuccessResponse';

interface IAuthService {
	signUp: RequestHandler;
	signIn: RequestHandler;
	signOut: RequestHandler;
	getUserInfo: RequestHandler;
}

@InjectService()
export class AuthService implements IAuthService {
	constructor(private model: UserModel) {}

	async signUp(req: Request, res: Response) {
		try {
			signUpSchema.parse({
				email: req.body.email,
				fullName: req.body.fullName,
				password: req.body.password,
				passwordConfirmation: req.body.passwordConfirmation,
			});

			await this.model.createUser(
				req.body.email,
				req.body.fullName,
				req.body.password,
			);

			return new CreatedResponse(res, { test: 'testing' });
		} catch (err) {
			if (err instanceof z.ZodError) {
				throw new RequestValidationError(err);
			}

			if (
				err instanceof PrismaClientKnownRequestError &&
				err.code === 'P2002' &&
				(err.meta as { target: Array<string> })?.target.includes(
					'email',
				)
			) {
				throw new BadRequestError('Email already in use');
			}

			throw err;
		}
	}

	async signIn(req: Request, res: Response) {
		try {
			const invalidCredentialsMsg =
				'Email or password are wrong - please try again.';

			signInSchema.parse({
				email: req.body.email,
				password: req.body.password,
			});

			const user = await this.model.getUserByEmail(req.body.email);

			if (!user) {
				throw new BadRequestError(invalidCredentialsMsg);
			}

			const validPass = await PassUtils.compare(
				user.password,
				req.body.password,
			);

			if (!validPass) {
				throw new BadRequestError(invalidCredentialsMsg);
			}

			JwtUtils.createAccessTokenCookie(res, user);

			return new SuccessResponse(res);
		} catch (err) {
			if (err instanceof z.ZodError) {
				throw new RequestValidationError(err);
			}

			throw err;
		}
	}

	signOut(_req: Request, res: Response) {
		JwtUtils.deleteAccessTokenCookie(res);

		return new SuccessResponse(res);
	}

	getUserInfo(_req: Request, res: Response) {
		try {
			const user = getUser(res);

			return new SuccessResponse(res, {
				user: user
					? {
							email: user.email,
							fullName: user.fullName,
					  }
					: null,
			});
		} catch (err) {
			throw err;
		}
	}
}
