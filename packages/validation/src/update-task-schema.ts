import {taskSchema} from "./tasks-schema";

export const updateTaskSchema = taskSchema.pick({
	priority: true,
	description: true,
	status: true,
})
	.partial();
