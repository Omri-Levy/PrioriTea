import { NextFunction, Request, Response } from 'express';
import { Controller, Route } from '../Controller';
import { Method, restful } from '../middleware/restful';
import { UserService } from './';

export interface IUserController {
	getUser(req: Request, res: Response): void;
	getUsers(req: Request, res: Response): void;
	updateUser(req: Request, res: Response): void;
	deleteUser(req: Request, res: Response): void;
	methodNotAllowed(req: Request, res: Response, next: NextFunction): void;
}
export class UserController extends Controller implements IUserController {
	protected _path = '/users';
	protected routes: Array<Route> = [
		{ method: Method.GET, path: '/', handler: this.getUsers.bind(this) },
		{ method: Method.GET, path: '/:id', handler: this.getUser.bind(this) },
		{
			method: Method.PATCH,
			path: '/:id',
			handler: this.updateUser.bind(this),
		},
		{
			method: Method.DELETE,
			path: '/:id',
			handler: this.deleteUser.bind(this),
		},
		{
			method: Method.ALL,
			path: '*',
			handler: this.methodNotAllowed,
		},
	];
	protected service = new UserService();

	/**
	 *	@path /api/users/:id
	 *	@request get
	 *	@desc get a user by id from db
	 */
	public async getUser(req: Request, res: Response) {
		return this.service.getUser(req, res);
	}

	/**
	 * @path /api/users/
	 * @request get
	 * @desc get all users from db
	 */
	public async getUsers(req: Request, res: Response) {
		return this.service.getUsers(req, res);
	}

	/**
	 * @path /api/users/:id
	 * @request patch
	 * @desc update an existing user from db
	 */
	public async updateUser(req: Request, res: Response) {
		this.service.updateUser(req, res);
	}

	/**
	 * @path /api/users/:id
	 * @request delete
	 * @desc delete an existing user from db
	 */
	public async deleteUser(req: Request, res: Response) {
		this.service.deleteUser(req, res);
	}

	public methodNotAllowed(req: Request, res: Response, next: NextFunction) {
		return restful([Method.GET, Method.PATCH, Method.DELETE])(
			req,
			res,
			next,
		);
	}
}
