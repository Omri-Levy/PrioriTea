import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { hash, verify } from 'argon2';
import { RequestHandler } from 'express';
import { z } from 'zod';
import { prisma } from '../db/prisma';
import { BadRequestError } from '../errors/bad-request-error';
import { RequestValidationError } from '../errors/request-validation-error';
import { createAccessToken, sendAccessToken } from './utils';
import { signUpSchema } from './validation/sign-up-schema';

/**
 @path /api/user/sign_up
 @request post
 @desc add a new user to db
 */
export const signUp: RequestHandler = async (req, res) => {
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
			(err.meta as { target: Array<string> })?.target.includes('email')
		) {
			throw new BadRequestError('Email already in use');
		}

		throw err;
	}
};

/**
 @path /api/user/sign-in
 @request post
 @desc sign in an existing user from db
 */
export const signIn: RequestHandler = async (req, res) => {
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
};

/**
 @path /api/user/sign_out
 @request post
 @desc sign out an existing user from db
 */
export const signOut: RequestHandler = async (_req, res) => {
	sendAccessToken(res, '');

	return res.status(200).send({});
};
