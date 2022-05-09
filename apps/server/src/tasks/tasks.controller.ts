import {Request, Response} from "express";
import {getUserId} from "../auth/utils/get-user-id";
import {Controller, IRoute} from "../core/controller";
import {Method} from "@prioritea/types";
import {auth} from "../middleware/auth";
import {restful} from "../middleware/restful";
import {CreatedResponse} from "../responses/created-response";
import {OkResponse} from "../responses/ok-response";
import {Middleware, RequestHandler} from "../types";
import {TasksService} from "./tasks.service";
import {NotFoundError} from "../errors/not-found-error";
import {zParse} from "../utils/z-parse";
import {z} from "zod";

interface ITasksController {
	createTask: RequestHandler;
	getTasks: RequestHandler;
	getTask: RequestHandler;
	updateTask: RequestHandler;
	deleteTask: RequestHandler;
}

export class TasksController
	extends Controller<TasksService>
	implements ITasksController
{
	_service = new TasksService();
	prefix = "/tasks";
	routes: Array<IRoute> = [
		{
			method: Method.POST,
			path: "/",
			handler: this.createTask.bind(this),
		},
		{
			method: Method.GET,
			path: "/",
			handler: this.getTasks.bind(this),
		},
		{
			method: Method.GET,
			path: "/:id",
			handler: this.getTask.bind(this),
		},
		{
			method: Method.PATCH,
			path: "/:id",
			handler: this.updateTask.bind(this),
		},
		{
			method: Method.DELETE,
			path: "/:id",
			handler: this.deleteTask.bind(this),
		},
		{
			method: Method.DELETE,
			path: "/",
			handler: this.deleteTasks.bind(this),
		},
	];
	middleware?: Array<Middleware> = [
		auth,
		restful([Method.GET, Method.POST, Method.PATCH, Method.DELETE]),
	];

	constructor() {
		super();

		this.registerRoutes();
	}

	/**
	 * @path /api/tasks
	 * @request post
	 * @desc adds a new task to db using the body sent from the user input
	 */
	public async createTask(req: Request, res: Response) {
		const tasks = await this.service.createTask(
			getUserId(res)!,
			{
				priority: req.body.priority,
				description: req.body.description,
				status: req.body.status,
			}
		);

		return new CreatedResponse(res, { data: { tasks } });
	}

	/**
	 * @path /api/tasks
	 * @request get
	 * @desc sends back all the authenticated user's tasks from db
	 */
	public async getTasks(_req: Request, res: Response) {
		const tasks = await this.service.getTasks(getUserId(res)!);

		return new OkResponse(res, { data: { tasks } });
	}

	/**
	 * @path /api/tasks/:id
	 * @request get
	 * @desc sends back the authenticated user's task by id from db
	 */
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
	public async updateTask(req: Request, res: Response) {
		const tasks = await this.service.updateTask(
			getUserId(res)!,
			{
				id: req.params.id!,
				priority: req.body.priority,
				description: req.body.description,
				status: req.body.status,
			}
		);

		return new OkResponse(res, { data: { tasks } });
	}

	/**
	 * @path /api/task/:id
	 * @request delete
	 * @desc deletes an existing authenticated user's task from db using an id param
	 * sent from the user
	 */
	public async deleteTask(req: Request, res: Response) {
		const tasks = await this.service.deleteTask(
			getUserId(res)!,
			req.params.id!
		);

		return new OkResponse(res, { data: { tasks } });
	}

	public async deleteTasks(req: Request, res: Response) {
		const arrayOfUuidsSchema = z.object({
			ids: z.string().uuid(`Ids must be valid UUIDs.`).array(),
		})
		const {ids} = await zParse(arrayOfUuidsSchema, req.body);

		const {count, tasks} = await this.service.deleteTasks(
			getUserId(res)!,
			ids,
		);

		if (count === 0) {
			throw new NotFoundError('No tasks match the provided ids.');
		}

		return new OkResponse(res, { data: { tasks } });
	}
}
