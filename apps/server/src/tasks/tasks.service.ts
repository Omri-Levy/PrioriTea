import {CreateTaskDto, UpdateTaskDto} from "@prioritea/types";
import {Task} from "@prisma/client";
import {Service} from "../core/service";
import {TasksRepository} from "./tasks.repository";
import {PrismaClientKnownRequestError} from "@prisma/client/runtime";
import {BadRequestError} from "../errors/bad-request-error";
import { NotFoundError } from "../errors/not-found-error";

export interface ITasksService {
	createTask(
		userId: string,
		task: CreateTaskDto
	): Promise<Array<Task> | null>;
	getTasks(userId: string): Promise<Array<Task> | null>;
	getTask(id: string): Promise<Task | null>;
	updateTask(
		userId: string,
		task: UpdateTaskDto
	): Promise<Array<Task> | null>;
	deleteTasks(userId: string, ids: Array<string>): Promise<{
		count: number;
		tasks:Array<Task> | null;
	}>;
}

export const updatedNonExistentTask = function (err: unknown) {
	if (
		err instanceof PrismaClientKnownRequestError &&
		err.code === "P2025" &&
		err.meta?.cause === "Record to update not found."
	) {
		throw new NotFoundError("No task matches the provided id.");
	}
};


export class TasksService extends Service<TasksRepository> implements ITasksService {
	_repository = new TasksRepository();

	async createTask(
		userId: string,
		{
			priority,
			description,
			status,
		}: CreateTaskDto
	) {
		await this.repository.createTask(userId, {
			priority,
			description,
			status,
		});

		return this.repository.getAllTasksByUserId(userId);
	}

	async getTasks(userId: string) {
		return this.repository.getAllTasksByUserId(userId);
	}

	async getTask(id: string) {
		return this.repository.getTaskById(id);
	}

	async updateTask(
		userId: string,
		{
			id,
			priority,
			description,
			status,
		}: UpdateTaskDto
	) {
		try {
			await this.repository.updateTaskById({
				id,
				priority,
				description,
				status
			});
		} catch (err) {
			updatedNonExistentTask(err);
		}

		return this.repository.getAllTasksByUserId(userId);
	}

	async deleteTasks(userId: string, ids: Array<string>) {
		const {count} = await this.repository.deleteTasksByIds(ids);
		const tasks = await this.repository.getAllTasksByUserId(userId);

		return {count, tasks};
	}
}
