import { axiosClient } from "../lib/axios-client";

export interface ITask {
  id: string;
  priority: string;
  description: string;
  status: string;
}

export type Tasks = Array<ITask>;

interface ITasksResponse {
  data: {
  data: {
    tasks: Tasks;
  };
  errors: Array<{ message: string; field?: string }> | null;
}
}

export class TasksApi {
  private static _instance: TasksApi;
  private static readonly API_URL = `/tasks`;

  private constructor() {}

  static get instance() {
    if (!TasksApi.instance) {
      this._instance = new TasksApi();
    }

    return this._instance;
  }

  public static async create(
    priority: string,
    description: string,
    status?: string
  ): Promise<ITasksResponse> {

    return axiosClient.post(this.API_URL, {
      priority,
      description,
      status,
    });
  }

  public static async getAll(): Promise<ITasksResponse> {
    return axiosClient.get(this.API_URL);
  }

  public static async getById(id: string): Promise<ITasksResponse> {
    return axiosClient.get(`${this.API_URL}/${id}`);
  }

  public static async updateById(
    id: string,
    priority?: string,
    description?: string,
    status?: string
  ): Promise<ITasksResponse> {
    return axiosClient.patch(`${this.API_URL}/${id}`, {
      priority,
      description,
      status,
    });
  }

  public static async deleteByIds(ids: Array<string>): Promise<ITasksResponse> {
    return  axiosClient.delete(`${this.API_URL}`, {
		data: {
			ids,
		},
	});
  }
}
