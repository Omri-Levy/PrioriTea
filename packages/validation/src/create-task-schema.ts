import { taskSchema } from "./tasks-schema";

export const createTaskSchema = taskSchema.pick({
  priority: true,
  description: true,
});
