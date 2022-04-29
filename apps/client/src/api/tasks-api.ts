import { fetchFn, Method } from "../static/js/requests/fetch-fn/fetch-fn";
import { Tasks } from "../types";

interface ITasksResponse {
  data: {
    tasks: Tasks;
  };
  errors: Array<{ message: string; field?: string }> | null;
}

export class TasksApi {
  private static _instance: TasksApi;
  private static readonly API_URL = `${process.env.REACT_APP_API_URL}/tasks`;

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

    return fetchFn(Method.POST, this.API_URL, {
      priority,
      description,
      status,
    });
  }

  public static async getAll(): Promise<ITasksResponse> {
    return fetchFn(Method.GET, this.API_URL);
  }

  public static async getById(id: string): Promise<ITasksResponse> {
    return fetchFn(Method.GET, `${this.API_URL}/${id}`);
  }

  public static async updateById(
    id: string,
    priority?: string,
    description?: string,
    status?: string
  ): Promise<ITasksResponse> {
    return fetchFn(Method.PATCH, `${this.API_URL}/${id}`, {
      priority,
      description,
      status,
    });
  }

  public static async deleteById(id: string): Promise<ITasksResponse> {
    return fetchFn(Method.DELETE, `${this.API_URL}/${id}`);
  }
}
