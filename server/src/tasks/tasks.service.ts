import { Request, Response } from 'express';
import { InjectService } from '..';
import { getUserId } from './getUserId';
import { TaskModel } from './';
import { CreatedResponse } from '../auth/CreatedResponse';
import { SuccessResponse } from '../auth/SuccessResponse';

export interface ITaskService {
	createTask(req: Request, res: Response): void;
	getTasks(req: Request, res: Response): void;
	getTask(req: Request, res: Response): void;
	updateTask(req: Request, res: Response): void;
	deleteTask(req: Request, res: Response): void;
}

@InjectService()
export class TaskService implements ITaskService {
	constructor(private model: TaskModel) {}

	async createTask(req: Request, res: Response) {
		this.model.createTask(
			getUserId(res)!,
			req.body.priority,
			req.body.description,
			req.body.status,
		);

		const tasks = await this.model.getAllTasksByUserId(getUserId(res)!);

		return new CreatedResponse(res, { data: { tasks } });
	}

	async getTasks(_req: Request, res: Response) {
		this.model.getAllTasksByUserId(getUserId(res)!);

		const tasks = await this.model.getAllTasksByUserId(getUserId(res)!);

		return new SuccessResponse(res, { data: { tasks } });
	}

	async getTask(req: Request, res: Response) {
		this.model.getTaskById(req.params.id!);

		const tasks = await this.model.getAllTasksByUserId(getUserId(res)!);

		return new SuccessResponse(res, { data: { tasks } });
	}

	async updateTask(req: Request, res: Response) {
		this.model.updateTaskById(
			req.params.id!,
			req.body.priority,
			req.body.description,
			req.body.status,
		);

		const tasks = await this.model.getAllTasksByUserId(getUserId(res)!);

		return new SuccessResponse(res, { data: { tasks } });
	}

	async deleteTask(req: Request, _res: Response) {
		return this.model.deleteTaskById(req.params.id!);
	}
}
