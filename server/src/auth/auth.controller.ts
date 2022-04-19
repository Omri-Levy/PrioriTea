import { RequestHandler } from 'express';
import { createAccessToken, sendAccessToken } from './utils';
import { UserModel } from '../user';
import { validateSignIn, validateSignUp } from './validation';
import { hash, verify } from 'argon2';
import { getErrorMessage } from '../error-utils';

/**
 @path /api/user/sign_up
 @request post
 @desc add a new user to mongodb
 */
export const signUp: RequestHandler = async (req, res) => {
	const { error } = validateSignUp(req.body);
	if (error)
		return res
			.status(400)
			.send({ success: false, message: error.details[0]?.message });

	const emailExists = await UserModel.findOne({
		email: req.body.email,
	}).exec();

	if (emailExists)
		return res.status(400).send({
			success: false,
			message: 'Email already exists.',
		});

	const hashedPassword = await hash(req.body.password);

	const newUser = new UserModel({
		email: req.body.email,
		fullName: req.body.fullName,
		password: hashedPassword,
	});

	try {
		const savedUser = await newUser.save();
		return res.status(200).send({ success: true, user: savedUser._id });
	} catch (err) {
		const message = getErrorMessage(err);

		console.error(err);
		return res.status(400).send({ success: false, message });
	}
};

/**
 @path /api/user/sign-in
 @request post
 @desc sign in an existing user from mongodb
 */
export const signIn: RequestHandler = async (req, res) => {
	const invalidCredentialsMsg =
		'Email or password are wrong - please try again.';
	const { error } = validateSignIn(req.body);

	if (error)
		return res
			.status(400)
			.send({ success: false, message: error.details[0]?.message });

	const user = await UserModel.findOne({ email: req.body.email }).exec();

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
 @desc sign out an existing user from mongodb
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
