import { CreateTaskDto, UpdateTaskDto } from "@prioritea/types";
import { axiosClient } from "../../lib/axios-client";
import { ITasksResponse } from "./interfaces";

export class TasksApi {
	private static readonly API_URL = `/tasks`;

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	private constructor() {}

	public static async create({
		priority,
		description,
		status,
	}: CreateTaskDto): Promise<ITasksResponse> {
		return axiosClient.post(this.API_URL, {
			priority,
			description,
			status,
		});
	}

	public static async getAll(): Promise<ITasksResponse> {
		return axiosClient.get(this.API_URL);
	}

	public static async updateById({
		id,
		priority,
		description,
		status,
	}: UpdateTaskDto): Promise<ITasksResponse> {
		return axiosClient.patch(`${this.API_URL}/${id}`, {
			priority,
			description,
			status,
		});
	}

	public static async deleteByIds(
		ids: Array<string>
	): Promise<ITasksResponse> {
		return axiosClient.delete(`${this.API_URL}`, {
			data: {
				ids,
			},
		});
	}
}
