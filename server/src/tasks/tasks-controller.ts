import {
	ClassMiddleware,
	Controller,
	Delete,
	Get,
	Patch,
	Post,
} from "@overnightjs/core";
import { Request, Response } from "express";
import { autoInjectable } from "tsyringe";
import { Method } from "../enums";
import { BASE_URL } from "../env";
import { auth } from "../middleware/auth";
import { restful } from "../middleware/restful";
import { CreatedResponse } from "../responses/created-response";
import { OkResponse } from "../responses/ok-response";
import { RequestHandler } from "../types";
import { getUserId } from "./get-user-id";
import { TasksService } from "./tasks-service";

interface ITasksController {
	createTask: RequestHandler;
	getTasks: RequestHandler;
	getTask: RequestHandler;
	updateTask: RequestHandler;
	deleteTask: RequestHandler;
}

@ClassMiddleware([
	restful([Method.GET, Method.POST, Method.PATCH, Method.DELETE]),
	auth,
])
@Controller(`${BASE_URL}/tasks`)
@autoInjectable()
export class TasksController implements ITasksController {
	constructor(public service: TasksService) {}

	/**
	 * @path /api/tasks
	 * @request post
	 * @desc adds a new task to db using the body sent from the user input
	 */
	@Post(`/`)
	public async createTask(req: Request, res: Response) {
		const tasks = await this.service.createTask(
			getUserId(res)!,
			req.body.priority,
			req.body.description,
			req.body.status
		);

		return new CreatedResponse(res, { data: { tasks } });
	}

	/**
	 * @path /api/tasks
	 * @request get
	 * @desc sends back all the authenticated user's tasks from db
	 */
	@Get(`/`)
	public async getTasks(_req: Request, res: Response) {
		const tasks = await this.service.getTasks(getUserId(res)!);

		return new OkResponse(res, { data: { tasks } });
	}

	/**
	 * @path /api/tasks/:id
	 * @request get
	 * @desc sends back the authenticated user's task by id from db
	 */
	@Get(`:id`)
	public async getTask(req: Request, res: Response) {
		const task = await this.service.getTask(req.params.id!);

		return new OkResponse(res, { data: { task } });
	}

	/**
	 * @path /api/task/:id
	 * @request put
	 * @desc updates an existing authenticated user's task from db using an id param
	 * sent from the user
	 */
	@Patch(`:id`)
	public async updateTask(req: Request, res: Response) {
		const tasks = await this.service.updateTask(
			getUserId(res)!,
			req.params.id!,
			req.body.priority,
			req.body.description,
			req.body.status
		);

		return new OkResponse(res, { data: { tasks } });
	}

	/**
	 * @path /api/task/:id
	 * @request delete
	 * @desc deletes an existing authenticated user's task from db using an id param
	 * sent from the user
	 */
	@Delete(`:id`)
	public async deleteTask(req: Request, res: Response) {
		const tasks = await this.service.deleteTask(
			getUserId(res)!,
			req.params.id!
		);

		return new OkResponse(res, { data: { tasks } });
	}
}
