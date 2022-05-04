import { Task } from "@prisma/client";
import { Service } from "../core/service";
import { TasksRepository } from "./tasks.repository";

export interface ITasksService {
	createTask(
		userId: string,
		priority: string,
		description: string,
		status?: string
	): Promise<Array<Task> | null>;
	getTasks(userId: string): Promise<Array<Task> | null>;
	getTask(id: string): Promise<Task | null>;
	updateTask(
		userId: string,
		id: string,
		priority?: string,
		description?: string,
		status?: string
	): Promise<Array<Task> | null>;
	deleteTask(userId: string, id: string): Promise<Array<Task> | null>;
}

export class TasksService extends Service<TasksRepository> implements ITasksService {
	_repository = new TasksRepository();

	async createTask(
		userId: string,
		priority: string,
		description: string,
		status?: string
	) {
		await this.repository.createTask(userId, priority, description, status);

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
		id: string,
		priority?: string,
		description?: string,
		status?: string
	) {
		await this.repository.updateTaskById(id, priority, description, status);

		return this.repository.getAllTasksByUserId(userId);
	}

	async deleteTask(userId: string, id: string) {
		await this.repository.deleteTaskById(id);

		return this.repository.getAllTasksByUserId(userId);
	}

	async deleteTasks(userId: string, ids: Array<string>) {
		await this.repository.deleteTasksByIds(ids);

		return this.repository.getAllTasksByUserId(userId);
	}
}
