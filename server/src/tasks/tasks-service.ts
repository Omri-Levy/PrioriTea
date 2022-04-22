import { plainToClass } from "class-transformer";
import { Service } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { User } from "../users/users-entity";
import { Task } from "./tasks.entity";

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

@Service()
export class TasksService implements ITasksService {
	@InjectRepository(Task)
	private tasksRepository: Repository<Task>;

	@InjectRepository(User)
	private usersRepository: Repository<User>;

	async createTask(
		userId: string,
		priority: string,
		description: string,
		status?: string
	) {
		const task = plainToClass(Task, {
			priority,
			description,
			status,
		});

		this.tasksRepository.create(task);

		const user = await this.usersRepository.findOneBy({
			id: userId,
		});

		task.user = user!;

		await this.tasksRepository.save(task);

		return this.tasksRepository.findBy({
			user: { id: userId },
		});
	}

	async getTasks(userId: string) {
		return this.tasksRepository.findBy({
			user: { id: userId },
		});
	}

	async getTask(id: string) {
		return this.tasksRepository.findOneBy({ id });
	}

	async updateTask(
		userId: string,
		id: string,
		priority?: string,
		description?: string,
		status?: string
	) {
		await this.tasksRepository.update(id, {
			priority,
			description,
			status,
		});

		return this.tasksRepository.findBy({
			user: { id: userId },
		});
	}

	async deleteTask(id: string, userId: string) {
		await this.tasksRepository.delete(id);

		return this.tasksRepository.findBy({
			user: { id: userId },
		});
	}
}
