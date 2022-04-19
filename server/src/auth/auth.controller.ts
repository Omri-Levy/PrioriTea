import { hash, verify } from 'argon2';
import { RequestHandler } from 'express';
import { getErrorMessage } from '../error-utils';
import { prisma } from '../prisma';
import { createAccessToken, sendAccessToken } from './utils';

/**
 @path /api/user/sign_up
 @request post
 @desc add a new user to db
 */
export const signUp: RequestHandler = async (req, res) => {
	try {
		// const errors = await validate({
		// 	email: req.body.email,
		// 	fullName: req.body.fullName,
		// 	password: req.body.password,
		// });
		const errors = '';

		if (
			errors.length > 0 ||
			req.body.password !== req.body.passwordConfirmation
		) {
			throw new Error('Validation failed');
		}

		const user = await prisma.user.create({
			data: {
				email: req.body.email,
				fullName: req.body.fullName,
				password: await hash(req.body.password),
			},
		});
		console.log(user);

		return res.status(200).send({ success: true });
	} catch (err) {
		const message = getErrorMessage(err);

		console.error(err);

		return res.status(400).send({ success: false, message });
	}
};

/**
 @path /api/user/sign-in
 @request post
 @desc sign in an existing user from db
 */
export const signIn: RequestHandler = async (req, res) => {
	const invalidCredentialsMsg =
		'Email or password are wrong - please try again.';

	const user = await prisma.user.findUnique({
		where: { email: req.body.email },
	});

	if (!user)
		return res.status(400).send({
			success: false,
			message: invalidCredentialsMsg,
		});

	try {
		const validPass = await verify(user.password, req.body.password);

		if (!validPass)
			return res.status(400).send({
				success: false,
				message: invalidCredentialsMsg,
			});

		sendAccessToken(res, createAccessToken(user));

		return res.status(200).send({ success: true });
	} catch (err) {
		const message = getErrorMessage(err);

		console.error(err);

		return res.status(400).send({ success: false, message });
	}
};

/**
 @path /api/user/sign_out
 @request post
 @desc sign out an existing user from db
 */
export const signOut: RequestHandler = async (_req, res) => {
	try {
		sendAccessToken(res, '');

		return res.status(200).send({ success: true });
	} catch (err) {
		const message = getErrorMessage(err);

		console.error(err);

		return res.status(400).send({ success: false, message });
	}
};
