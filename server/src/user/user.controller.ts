import { prisma } from '../prisma';
import { RequestHandler } from 'express';
import { getErrorMessage } from '../error-utils';

/**
 * @path /api/user/:id
 * @request patch
 * @desc update an existing user from db
 */
export const updateUser: RequestHandler = async (req, res) => {
	try {
		const user = await prisma.user.update({
			where: { id: req.params.id },
			data: {
				email: req.body.email,
				fullName: req.body.fullName,
				password: req.body.password,
			},
		});
		return res.status(200).send({
			success: true,
			user,
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
 * @desc delete an existing user from db
 */
export const deleteUser: RequestHandler = async (req, res) => {
	try {
		const user = await prisma.user.delete({
			where: {
				id: req.params.id,
			},
		});
		return res.status(200).send({
			success: true,
			user,
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
 @desc get all users from db
 */
export const findAllUsers: RequestHandler = async (_req, res) => {
	try {
		const users = await prisma.user.findMany();

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
 @desc get a user by id from db
 */
export const findUserById: RequestHandler = async (req, res) => {
	try {
		const user = await prisma.user.findUnique({
			where: {
				id: req.params.id,
			},
		});

		return res.status(200).send({ user });
	} catch (err) {
		const message = getErrorMessage(err);

		console.error(err);

		return res.status(400).send({
			success: false,
			message,
		});
	}
};
