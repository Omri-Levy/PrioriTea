import {
	ClassMiddleware,
	Controller,
	Delete,
	Get,
	Patch,
} from "@overnightjs/core";
import { Request, Response } from "express";
import { autoInjectable } from "tsyringe";
import { Method } from "../enums";
import { BASE_URL } from "../env";
import { restful } from "../middleware/restful";
import { OkResponse } from "../responses/ok-response";
import { UsersService } from "./users-service";

export interface IUsersController {
	getUsers(req: Request, res: Response): void;
	getUser(req: Request, res: Response): void;
	updateUser(req: Request, res: Response): void;
	deleteUser(req: Request, res: Response): void;
}

@ClassMiddleware(restful([Method.GET, Method.PATCH, Method.DELETE]))
@Controller(`${BASE_URL}/users`)
@autoInjectable()
export class UsersController implements IUsersController {
	constructor(public service: UsersService) {}

	/**
	 * @path /api/users/
	 * @request get
	 * @desc get all users from db
	 */
	@Get(`/`)
	public async getUsers(_req: Request, res: Response) {
		const users = await this.service.getUsers();

		return new OkResponse(res, { data: { users } });
	}

	/**
	 *	@path /api/users/:id
	 *	@request get
	 *	@desc get a user by id from db
	 */
	@Get(`:id`)
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
	@Patch(`:id`)
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
	@Delete(`:id`)
	public async deleteUser(req: Request, res: Response) {
		const user = await this.service.deleteUser(req.params.id!);

		return new OkResponse(res, { data: { user } });
	}
}
