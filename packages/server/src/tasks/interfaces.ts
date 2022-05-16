import {RequestHandler} from "../types";
import {CreateTaskDto, UpdateTaskDto} from "@prioritea/types";
import {Task} from "@prisma/client";

export interface ITasksController {
    createTask: RequestHandler;
    getTasks: RequestHandler;
    getTask: RequestHandler;
    updateTask: RequestHandler;
    deleteTasks: RequestHandler;
}

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
        tasks: Array<Task> | null;
    }>;
}
