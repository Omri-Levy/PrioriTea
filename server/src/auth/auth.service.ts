import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { hash, verify } from 'argon2';
import { Request, RequestHandler, Response } from 'express';
import { z } from 'zod';
import {
	prisma,
	getUser,
	signUpSchema,
	createAccessToken,
	sendAccessToken,
	BadRequestError,
	RequestValidationError,
} from '../';

interface IAuthService {
	signUp: RequestHandler;
	signIn: RequestHandler;
	signOut: RequestHandler;
	setIsSignedIn: RequestHandler;
	getCurrentUser: RequestHandler;
}

export class AuthService implements IAuthService {
	async signUp(req: Request, res: Response) {
		try {
			signUpSchema.parse({
				email: req.body.email,
				fullName: req.body.fullName,
				password: req.body.password,
				passwordConfirmation: req.body.passwordConfirmation,
			});

			await prisma.user.create({
				data: {
					email: req.body.email,
					fullName: req.body.fullName,
					password: await hash(req.body.password),
				},
			});

			return res.status(201).send();
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

			const user = await prisma.user.findUnique({
				where: { email: req.body.email },
			});

			if (!user) {
				throw new BadRequestError(invalidCredentialsMsg);
			}

			const validPass = await verify(user.password, req.body.password);

			if (!validPass) {
				throw new BadRequestError(invalidCredentialsMsg);
			}

			sendAccessToken(res, createAccessToken(user));

			return res.status(200).send({});
		} catch (err) {
			throw err;
		}
	}

	signOut(_req: Request, res: Response) {
		sendAccessToken(res, '');

		return res.status(200).send({});
	}

	async setIsSignedIn(_req: Request, res: Response) {
		try {
			const user = getUser(res)!;

			if (!user) {
				sendAccessToken(res, '');

				return res.status(401).send({
					message: 'unauthorized',
				});
			}

			return res.status(200).send({});
		} catch (err) {
			throw err;
		}
	}

	getCurrentUser(_req: Request, res: Response) {
		try {
			const user = getUser(res);

			return res.status(200).send({
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
