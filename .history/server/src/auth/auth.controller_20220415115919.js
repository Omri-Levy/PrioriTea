import { createAccessToken, sendAccessToken } from './utils';
import { UserModel } from '../user';
import { validateSignIn, validateSignUp } from './validation';
import { hash, verify } from 'argon2';

/**
 @path /api/user/sign_up
 @request post
 @desc add a new user to mongodb
 */
export const signUp = async (req, res) => {
	const { error } = validateSignUp(req.body);
	if (error)
		return res.status(400).json({ message: error.details[0].message });

	const emailExists = await UserModel.findOne({ email: req.body.email });

	if (emailExists)
		return res.status(400).json({
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
		return res.status(200).json({ user: savedUser._id });
	} catch (err) {
		console.error(err);
		return res.status(400).json({ message: err });
	}
};

/**
 @path /api/user/sign_in
 @request post
 @desc sign in an existing user from mongodb
 */
export const signIn = async (req, res) => {
	const invalidCredentialsMsg =
		'Email or password are wrong - please try again.';
	const { error } = validateSignIn(req.body);

	if (error)
		return res.status(400).json({ message: error.details[0].message });

	const user = await UserModel.findOne({ email: req.body.email });
	if (!user) return res.status(400).json({ message: invalidCredentialsMsg });

	try {
		const validPass = await verify(user.password, req.body.password);
		if (!validPass)
			return res.status(400).json({
				message: invalidCredentialsMsg,
			});

		sendAccessToken(res, createAccessToken(user));

		return res.status(200).json({ success: true });
	} catch (err) {
		console.error(err);
		return res.status(400).json({ message: err });
	}
};

/**
 @path /api/user/sign_out
 @request post
 @desc sign out an existing user from mongodb
 */
export const signOut = async (req, res) => {
	try {
		sendAccessToken(res, '');
		return res.status(200).json({ success: true });
	} catch (err) {
		console.error(err);
		return res.status(400).json({ success: false });
	}
};
