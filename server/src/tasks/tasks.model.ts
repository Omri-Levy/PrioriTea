import { Task } from '@prisma/client';
import { InjectService, prisma } from '..';

export interface ITaskModel {
	createTask(
		userId: string,
		priority: string,
		description: string,
		status: string,
	): Promise<Task | null>;
	getAllTasksByUserId(userId: string): Promise<Array<Task> | null>;
	getTaskById(id: string): Promise<Task | null>;
	updateTaskById(id: string): Promise<Task | null>;
	deleteTaskById(id: string): Promise<Task | null>;
}

@InjectService()
export class TaskModel implements ITaskModel {
	public async createTask(
		userId: string,
		priority: string,
		description: string,
		status: string,
	) {
		return prisma.task.create({
			data: {
				priority,
				description,
				status,
				User: {
					connect: { id: userId },
				},
			},
		});
	}

	public async getAllTasksByUserId(userId: string) {
		return prisma.task.findMany({
			where: {
				userId,
			},
		});
	}

	public async getTaskById(id: string) {
		return prisma.task.findUnique({
			where: {
				id,
			},
		});
	}

	public async updateTaskById(
		id: string,
		priority?: string,
		description?: string,
		status?: string,
	) {
		return prisma.task.update({
			where: { id },
			data: {
				priority,
				description,
				status,
			},
		});
	}

	public async deleteTaskById(id: string) {
		return prisma.task.delete({
			where: { id },
		});
	}
}
