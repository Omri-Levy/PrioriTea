import Joi from 'joi';

const taskValidation = (data) => {
    const taskSchema = Joi.object({
        title: Joi.string()
            .min(1)
            .max(70)
            .required(),
        owner: Joi.string()
            .min(2)
            .max(70)
            .required(),
    });
    return taskSchema.validate(data);
};

export default taskValidation;
