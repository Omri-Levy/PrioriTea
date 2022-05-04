export interface ITask {
  id: string;
  priority: string;
  description: string;
  status: string;
}

export interface CreateTaskDto {
  priority: string;
  description: string;
}

export interface UpdateTaskDto {
	id: string;
  priority?: string;
  description?: string;
  status?: string;
}

export interface UserDto {
	email: string;
	name: string;
}
