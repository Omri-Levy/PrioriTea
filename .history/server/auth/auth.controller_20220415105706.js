import createAccessToken from '../src/js/createAccessToken.js';
import sendAccessToken from '../src/js/sendAccessToken.js';
import User from '../src/models/User.js';
import signUpValidation from '../src/validation/signUpValidation.js';
import signInValidation from '../src/validation/signInValidation.js';
import { hash, verify } from 'argon2';

/**
 @path /api/user/
 @request get
 @desc get all users from mongodb
 */
const findAllUsers = async (req, res) => {
	try {
		const users = await User.find();
		return res.status(200).json(users);
	} catch (err) {
		console.error(err);
		return res.status(400).json({ message: err });
	}
};

/**
 @path /api/user/:id
 @request get
 @desc get a user by id from mongodb
 */
const findUserById = async (req, res) => {
	try {
		const getUser = await User.findById(req.params.id);
		return res.status(200).json(getUser);
	} catch (err) {
		console.error(err);
		return res.status(400).json({ message: err });
	}
};

/**
 @path /api/user/sign_up
 @request post
 @desc add a new user to mongodb
 */
const signUpUser = async (req, res) => {
	const { error } = signUpValidation(req.body);
	if (error)
		return res.status(400).json({ message: error.details[0].message });

	const emailExists = await User.findOne({ email: req.body.email });

	if (emailExists)
		return res.status(400).json({
			message: 'Email already exists.',
		});

	const hashedPassword = await hash(req.body.password);

	const newUser = new User({
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
const signInUser = async (req, res) => {
	const invalidCredentialsMsg =
		'Email or password are wrong - please try again.';
	const { error } = signInValidation(req.body);

	if (error)
		return res.status(400).json({ message: error.details[0].message });

	const user = await User.findOne({ email: req.body.email });
	if (!user) return res.status(400).json({ message: invalidCredentialsMsg });

	const validPass = await verify(user.password, req.body.password);
	if (!validPass)
		return res.status(400).json({
			message: invalidCredentialsMsg,
		});

	try {
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
const signOutUser = async (req, res) => {
	try {
		sendAccessToken(res, '');
		return res.status(200).json({ success: true });
	} catch (err) {
		console.error(err);
		return res.status(400).json({ success: false });
	}
};

/**
 * @path /api/user/:id
 * @request patch
 * @desc update an existing user from mongodb
 */
const updateUser = async (req, res) => {
	try {
		const oldUser = await User.findById(req.params.id);
		const updatedUser = await User.updateOne(
			{ _id: req.params.id },
			{
				$set: {
					email: req.body.email ? req.body.email : oldUser.email,
					fullName: req.body.fullName
						? req.body.fullName
						: oldUser.fullName,
					password: req.body.password
						? req.body.password
						: oldUser.password,
				},
			},
		);
		return res.status(200).json({ updatedUser });
	} catch (err) {
		console.error(err);
		return res.status(400).json({ message: err });
	}
};

/**
 * @path /api/user/:id
 * @request delete
 * @desc delete an existing user from mongodb
 */
const deleteUser = async (req, res) => {
	try {
		const deletedUser = await User.findByIdAndDelete(req.params.id);
		return res.status(200).json({ deletedUser });
	} catch (err) {
		console.error(err);
		return res.status(400).json({ message: err });
	}
};

export {
	findAllUsers,
	findUserById,
	signUpUser,
	signInUser,
	signOutUser,
	updateUser,
	deleteUser,
};
