import {Status} from "./enums";

export interface TaskDto {
  id: string;
  priority: number;
  description: string;
  status: Status;
}

export interface CreateTaskDto {
  priority: number;
  description: string;
  status?: Status;
}

export interface UpdateTaskDto {
	id: string;
  priority?: number;
  description?: string;
  status?: Status;
}

export interface UserDto {
	id: string;
	email: string;
	name: string;
}
