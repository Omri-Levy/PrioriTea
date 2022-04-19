import Joi from 'joi';

interface Task {
	priority: string;
	task: string;
	status: string;
}

export const validateTask = (task: Task) => {
	const taskSchema = Joi.object({
		priority: Joi.string().min(1).max(80).required(),
		task: Joi.string().min(1).max(80).required(),
		status: Joi.string().min(1).max(80),
	});
	return taskSchema.validate(task);
};
