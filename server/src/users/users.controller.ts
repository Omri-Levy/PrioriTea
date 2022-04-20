import { NextFunction, Request, Response } from 'express';
import {
	All,
	Controller,
	Delete,
	Get,
	InjectService,
	Method,
	Patch,
	restful,
} from '../';
import { UserService } from './';

export interface IUserController {
	getUsers(req: Request, res: Response): void;
	getUser(req: Request, res: Response): void;
	updateUser(req: Request, res: Response): void;
	deleteUser(req: Request, res: Response): void;
	methodNotAllowed(req: Request, res: Response, next: NextFunction): void;
}

@Controller('/users')
@InjectService()
export class UserController implements IUserController {
	constructor(private service: UserService) {}

	/**
	 * @path /api/users/
	 * @request get
	 * @desc get all users from db
	 */
	@Get('/')
	public async getUsers(req: Request, res: Response) {
		return this.service.getUsers(req, res);
	}

	/**
	 *	@path /api/users/:id
	 *	@request get
	 *	@desc get a user by id from db
	 */
	@Get('/:id')
	public async getUser(req: Request, res: Response) {
		return this.service.getUser(req, res);
	}

	/**
	 * @path /api/users/:id
	 * @request patch
	 * @desc update an existing user from db
	 */
	@Patch('/:id')
	public async updateUser(req: Request, res: Response) {
		this.service.updateUser(req, res);
	}

	/**
	 * @path /api/users/:id
	 * @request delete
	 * @desc delete an existing user from db
	 */
	@Delete('/:id')
	public async deleteUser(req: Request, res: Response) {
		this.service.deleteUser(req, res);
	}

	@All('*')
	public methodNotAllowed(req: Request, res: Response, next: NextFunction) {
		return restful([Method.GET, Method.PATCH, Method.DELETE])(
			req,
			res,
			next,
		);
	}
}
