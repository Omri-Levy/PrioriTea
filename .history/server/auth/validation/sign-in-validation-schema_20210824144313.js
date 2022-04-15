import Joi from 'joi';

const signInValidation = (data) => {
    const signInSchema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
    });

    return signInSchema.validate(data);
};

export default signInValidation;
