import { taskSchema } from "./tasks-schema";

export const editTaskSchema = taskSchema
  .pick({
    priority: true,
    description: true,
    status: true,
  })
  .optional();
