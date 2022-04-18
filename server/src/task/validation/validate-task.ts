import Joi from 'joi';

export const validateTask = (data) => {
	const taskSchema = Joi.object({
		priority: Joi.string().min(1).max(80).required(),
		task: Joi.string().min(1).max(80).required(),
		status: Joi.string().min(1).max(80),
	});
	return taskSchema.validate(data);
};
