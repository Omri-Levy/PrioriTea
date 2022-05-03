import { db } from "../core/db/db";

export class TasksRepository {
	public async createTask(
		userId: string,
		priority: string,
		description: string,
		status?: string
	) {
		return  db.task.create({
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
		return db.task.findMany({
			where: {
				userId,
			},
		});
	}

	public async getTaskById(id: string) {
		return db.task.findUnique({
			where: {
				id,
			},
		});
	}

	public async updateTaskById(
		id: string,
		priority?: string,
		description?: string,
		status?: string
	) {
		return db.task.update({
			where: { id },
			data: {
				priority,
				description,
				status,
			},
		});
	}

	public async deleteTaskById(id: string) { 
		return db.task.delete({
			where: { id },
		});

	}
}
