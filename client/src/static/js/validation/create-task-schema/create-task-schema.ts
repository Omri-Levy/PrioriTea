import * as Yup from 'yup';

export const priorityMinCharsMsg =
	'Priority must include a minimum of 1 characters.';
export const priorityMaxCharsMsg =
	'Priority must include of a maximum of 80 characters.';
export const priorityRequiredMsg = 'Priority is  a required field.';

export const taskMinCharsMsg = 'Task must include a minimum of 1 characters.';
export const taskMaxCharsMsg = 'Task must include a maximum of 80 characters.';
export const taskRequiredMsg = 'Task is a required field.';

export const createTaskSchema = Yup.object({
	priority: Yup.string()
		.min(1, priorityMinCharsMsg)
		.max(80, priorityMaxCharsMsg)
		.required(priorityRequiredMsg),

	description: Yup.string()
		.min(1, taskMinCharsMsg)
		.max(80, taskMaxCharsMsg)
		.required(taskRequiredMsg),
});
