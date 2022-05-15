import {CreateTaskDto, UpdateTaskDto} from "@prioritea/types";
import {Service} from "../core/service";
import {TasksRepository} from "./tasks.repository";
import {ITasksService} from "./interfaces";
import {updatedNonExistentTask} from "./validation/updated-non-existent-task";


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
