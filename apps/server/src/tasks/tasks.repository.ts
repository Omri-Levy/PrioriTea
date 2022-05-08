import {CreateTaskDto, UpdateTaskDto} from "@prioritea/types";
import { db } from "../core/db/db";

export class TasksRepository {
	public async createTask(
		userId: string,
		{
			priority,
			description,
			status
		}: CreateTaskDto
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
		{
			id,
			priority,
			description,
			status
		}: UpdateTaskDto
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

	public async deleteTasksByIds(ids: Array<string>) {
		return db.task.deleteMany({
			where: { id: {in: ids} },
		});
	}

	public async deleteTaskById(id: string) { 
		return db.task.delete({
			where: { id },
		});

	}
}
