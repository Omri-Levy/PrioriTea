import { Request, Response } from "express";
import { Controller, IRoute } from "../core/controller";
import { Method } from "../enums";
import { auth } from "../middleware/auth";
import { restful } from "../middleware/restful";
import { OkResponse } from "../responses/ok-response";
import { Middleware } from "../types";
import { UsersService } from "./users-service";

export interface IUsersController {
	getUsers(req: Request, res: Response): void;
	getUser(req: Request, res: Response): void;
	updateUser(req: Request, res: Response): void;
	deleteUser(req: Request, res: Response): void;
}

export class UsersController
	extends Controller<UsersService>
	implements IUsersController
{
	_service = new UsersService();
	prefix = "/users";
	routes: Array<IRoute> = [
		{
			method: Method.GET,
			path: "/",
			handler: this.getUsers.bind(this),
		},
		{
			method: Method.GET,
			path: "/:id",
			handler: this.getUser.bind(this),
		},
		{
			method: Method.PATCH,
			path: "/:id",
			handler: this.updateUser.bind(this),
		},
		{
			method: Method.DELETE,
			path: "/:id",
			handler: this.deleteUser.bind(this),
		},
	];
	middleware?: Array<Middleware> = [
		auth,
		restful([Method.GET, Method.PATCH, Method.DELETE]),
	];

	constructor() {
		super();

		this.registerRoutes();
	}

	/**
	 * @path /api/users/
	 * @request get
	 * @desc get all users from db
	 */
	public async getUsers(_req: Request, res: Response) {
		const users = await this.service.getUsers();

		return new OkResponse(res, { data: { users } });
	}

	/**
	 *	@path /api/users/:id
	 *	@request get
	 *	@desc get a user by id from db
	 */
	public async getUser(req: Request, res: Response) {
		try {
			const user = await this.service.getUser(req.params.id!);

			return new OkResponse(res, { data: { user } });
		} catch (err) {
			return null;
		}
	}

	/**
	 * @path /api/users/:id
	 * @request Patch
	 * @desc update an existing user from db
	 */
	public async updateUser(req: Request, res: Response) {
		try {
			const user = await this.service.updateUser(
				req.params.id!,
				req.body.email,
				req.body.fullName,
				req.body.password
			);

			return new OkResponse(res, { data: { user } });
		} catch (err) {
			return null;
		}
	}

	/**
	 * @path /api/users/:id
	 * @request delete
	 * @desc delete an existing user from db
	 */
	public async deleteUser(req: Request, res: Response) {
		const user = await this.service.deleteUser(req.params.id!);

		return new OkResponse(res, { data: { user } });
	}
}
