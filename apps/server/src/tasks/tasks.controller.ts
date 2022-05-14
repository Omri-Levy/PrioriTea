import {Request, Response} from "express";
import {getUserId} from "../auth/utils/get-user-id";
import {Controller, IRoute} from "../core/controller";
import {Method} from "@prioritea/types";
import {auth} from "../middleware/auth";
import {restful} from "../middleware/restful/restful";
import {CreatedResponse} from "../responses/created-response";
import {OkResponse} from "../responses/ok-response";
import {Middleware} from "../types";
import {TasksService} from "./tasks.service";
import {NotFoundError} from "../errors/not-found-error";
import {zParse} from "../utils/z-parse";
import {createTaskSchema, updateTaskSchema} from "@prioritea/validation";
import {stringUtils} from "@prioritea/utils";
import {idSchema} from "./validation/id-schema";
import {arrayOfUuidsSchema} from "./validation/array-of-uuids-schema";
import {idParamFallback} from "./utils/id-param-fallback";
import {ITasksController} from "./interfaces";

export class TasksController
	extends Controller<TasksService>
	implements ITasksController {
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
			method: Method.PATCH,
			path: "/",
			handler: idParamFallback,
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
		const createTaskDto = await zParse(createTaskSchema, {
			...req.body,
			// FIXME: Zod doesn't transform the status like its supposed to, temproarily done here.
			// FIXME: .optional() of the schema does not work either.
			status: stringUtils(req.body.status).toScreamingSnakeCase().string,
		});

		const tasks = await this.service.createTask(
			getUserId(res)!,
			createTaskDto,
		);

		return new CreatedResponse(res, {data: {tasks}});
	}

	/**
	 * @path /api/tasks
	 * @request get
	 * @desc sends back all the authenticated user's tasks from db
	 */
	public async getTasks(_req: Request, res: Response) {
		const tasks = await this.service.getTasks(getUserId(res)!);

		return new OkResponse(res, {data: {tasks}});
	}

	/**
	 * @path /api/tasks/:id
	 * @request get
	 * @desc sends back the authenticated user's task by id from db
	 */
	public async getTask(req: Request, res: Response) {
		const {id} = await zParse(idSchema,
			// @ts-ignore
			req.params);
		const task = await this.service.getTask(id);

		if (!task) {
			throw new NotFoundError(`No task matches the provided id.`);
		}

		return new OkResponse(res, {data: {task}});
	}

	/**
	 * @path /api/tasks/:id
	 * @request patch
	 * @desc updates an existing authenticated user's task from db using an id param
	 * sent from the user
	 */
	public async updateTask(req: Request, res: Response) {
		const updateTaskDto = await zParse(updateTaskSchema, {
			...req.body,
			// See createTask FIXME above (line 99).
			status: req.body.status ? stringUtils(req.body.status).toScreamingSnakeCase().string : undefined,
		});
		const {id} = await zParse(idSchema,
			// @ts-ignore
			req.params);
		const tasks = await this.service.updateTask(
			getUserId(res)!,
			{
				id,
				...updateTaskDto,
			}
		);

		return new OkResponse(res, {data: {tasks}});
	}

	public async deleteTasks(req: Request, res: Response) {
		const {ids} = await zParse(arrayOfUuidsSchema, req.body);

		const {count, tasks} = await this.service.deleteTasks(
			getUserId(res)!,
			ids,
		);

		if (count === 0) {
			throw new NotFoundError('No tasks match the provided ids.');
		}

		return new OkResponse(res, {data: {tasks}});
	}
}
