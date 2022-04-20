import { Request, Response } from 'express';
import { InjectService } from '../';
import { SuccessResponse } from '../auth/SuccessResponse';
import { UserModel } from './';
export interface IUserService {
	getUsers(req: Request, res: Response): void;
	getUser(req: Request, res: Response): void;
	updateUser(req: Request, res: Response): void;
	deleteUser(req: Request, res: Response): void;
}

@InjectService()
export class UserService implements IUserService {
	constructor(private model: UserModel) {}

	/**
	 * @path /api/user/
	 * @request get
	 * @desc get all users from db
	 */
	public async getUsers(_req: Request, res: Response) {
		try {
			const users = await this.model.getAllUsers();

			return new SuccessResponse(res, { data: users });
		} catch (err) {
			throw err;
		}
	}

	/**
	 *	@path /api/user/:id
	 *	@request get
	 *	@desc get a user by id from db
	 */
	public async getUser(req: Request, res: Response) {
		try {
			const user = await this.model.getUserById(req.params.id!);

			return new SuccessResponse(res, { data: user });
		} catch (err) {
			throw err;
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

			return new SuccessResponse(res, { data: user });
		} catch (err) {
			throw err;
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

			return new SuccessResponse(res, { data: user });
		} catch (err) {
			throw err;
		}
	}
}
