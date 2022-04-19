import { getErrorMessage } from '../error-utils';
import { RequestHandler } from 'express';
import { UserModel } from './user.model';

/**
 * @path /api/user/:id
 * @request patch
 * @desc update an existing user from mongodb
 */
export const updateUser: RequestHandler = async (req, res) => {
	try {
		const oldUser = await UserModel.findById(req.params.id).exec();
		const updatedUser = await UserModel.updateOne(
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
		).exec();
		return res.status(200).send({
			success: true,
			updatedUser,
		});
	} catch (err) {
		const message = getErrorMessage(err);

		console.error(err);
		return res.status(400).send({ success: false, message });
	}
};

/**
 * @path /api/user/:id
 * @request delete
 * @desc delete an existing user from mongodb
 */
export const deleteUser: RequestHandler = async (req, res) => {
	try {
		const deletedUser = await UserModel.findByIdAndDelete(
			req.params.id,
		).exec();
		return res.status(200).send({
			success: true,
			deletedUser,
		});
	} catch (err) {
		const message = getErrorMessage(err);

		console.error(err);

		return res.status(400).send({ success: false, message });
	}
};

/**
 @path /api/user/
 @request get
 @desc get all users from mongodb
 */
export const findAllUsers: RequestHandler = async (_req, res) => {
	try {
		const users = await UserModel.find().exec();
		return res.status(200).json(users);
	} catch (err) {
		const message = getErrorMessage(err);

		console.error(err);

		return res.status(400).send({ success: false, message });
	}
};

/**
 @path /api/user/:id
 @request get
 @desc get a user by id from mongodb
 */
export const findUserById: RequestHandler = async (req, res) => {
	try {
		const getUser = await UserModel.findById(req.params.id).exec();
		return res.status(200).json(getUser);
	} catch (err) {
		const message = getErrorMessage(err);

		console.error(err);

		return res.status(400).send({
			success: false,
			message,
		});
	}
};
