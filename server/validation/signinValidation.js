import Joi from 'joi';

const signinValidation = (data) => {
    const signinSchema = Joi.object({
        email: Joi.string()
            .required(),
        password: Joi.string()
            .required(),
    });
    return signinSchema.validate(data);
};

export default signinValidation;
