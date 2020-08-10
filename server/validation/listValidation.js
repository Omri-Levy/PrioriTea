import Joi from 'joi';

const listValidation = (data) => {
    const listSchema = Joi.object({
        title: Joi.string()
            .min(1)
            .max(70)
            .required(),
        owner: Joi.string()
            .min(2)
            .max(70)
            .required(),
    });
    return listSchema.validate(data);
};

export default listValidation;
