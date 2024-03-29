import {Request, Response} from "express";
import {Controller, IRoute} from "../core/controller";
import {Method} from "@prioritea/types";
import {auth} from "../middleware/auth";
import {restful} from "../middleware/restful/restful";
import {OkResponse} from "../responses/ok-response";
import {Middleware} from "../types";
import {UsersService} from "./users.service";
import {IUsersController} from "./interfaces";

export class UsersController
	extends Controller<UsersService>
	implements IUsersController {
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
		{
			method: Method.DELETE,
			path: "/",
			handler: this.deleteUsers.bind(this),
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

		return new OkResponse(res, {data: {users}});
	}

	/**
	 *	@path /api/users/:id
	 *	@request get
	 *	@desc get a user by id from db
	 */
	public async getUser(req: Request, res: Response) {
		try {
			const user = await this.service.getUser(req.params.id!);

			return new OkResponse(res, {data: {user}});
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
			const users = await this.service.updateUser(
				req.params.id!,
				req.body.email,
				req.body.name,
				req.body.password
			);

			return new OkResponse(res, {data: {users}});
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
		const users = await this.service.deleteUser(req.params.id!);

		return new OkResponse(res, {data: {users}});
	}

	/**
	 * @path /api/users/:id
	 * @request delete
	 * @desc delete an existing user from db
	 */
	public async deleteUsers(_req: Request, res: Response) {
		const users = await this.service.deleteUsers();

		return new OkResponse(res, {data: {users}});
	}
}
