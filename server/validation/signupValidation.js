import Joi from 'joi';
import passwordComplexity from 'joi-password-complexity';

const signupValidation = (data) => {
    const complexityOptions = {
        min: 8,
        max: 256,
        lowerCase: 1,
        upperCase: 1,
        numeric: 1,
        symbol: 1,
        requirementCount: 4,
    }

    const signupSchema = Joi.object({
        email: Joi.string().min(7).max(320).email().required(),
        fullName: Joi.string().min(4).max(70).required(),
        password: passwordComplexity(complexityOptions).required(),
        passwordConfirmation: Joi.any().valid(Joi.ref('password'))
            .required()
    });
    return signupSchema.validate(data);
};

export default signupValidation;
