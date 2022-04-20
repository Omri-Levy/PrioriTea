import { Request, Response } from 'express';
import { UserModel } from '.';
import { InjectService, logger } from '..';
import { getErrorMessage } from '../error-utils';
export interface IUserService {
	getUser(req: Request, res: Response): void;
	getUsers(req: Request, res: Response): void;
	updateUser(req: Request, res: Response): void;
	deleteUser(req: Request, res: Response): void;
}

@InjectService()
export class UserService implements IUserService {
	constructor(private readonly model: UserModel) {}

	/**
	 *	@path /api/user/:id
	 *	@request get
	 *	@desc get a user by id from db
	 */
	public async getUser(req: Request, res: Response) {
		try {
			const user = await this.model.getUserById(req.params.id!);

			return res.status(200).send({ user });
		} catch (err) {
			const message = getErrorMessage(err);

			logger.error(err);

			return res.status(400).send({
				message,
			});
		}
	}

	/**
	 * @path /api/user/
	 * @request get
	 * @desc get all users from db
	 */
	public async getUsers(_req: Request, res: Response) {
		try {
			const users = await this.model.getAllUsers();

			return res.status(200).json(users);
		} catch (err) {
			const message = getErrorMessage(err);

			logger.error(err);

			return res.status(400).send({ message });
		}
	}

	/**
	 * @path /api/user/:id
	 * @request patch
	 * @desc update an existing user from db
	 */
	public async updateUser(req: Request, res: Response) {
		try {
			const user = await this.model.updateUserById(
				req.params.id!,
				req.body.email,
				req.body.fullName,
				req.body.password,
			);

			return res.status(200).send({
				user,
			});
		} catch (err) {
			const message = getErrorMessage(err);

			logger.error(err);

			return res.status(400).send({ message });
		}
	}

	/**
	 * @path /api/user/:id
	 * @request delete
	 * @desc delete an existing user from db
	 */
	public async deleteUser(req: Request, res: Response) {
		try {
			const user = await this.model.deleteUserById(req.params.id!);

			return res.status(200).send({
				user,
			});
		} catch (err) {
			const message = getErrorMessage(err);

			logger.error(err);

			return res.status(400).send({ message });
		}
	}
}
