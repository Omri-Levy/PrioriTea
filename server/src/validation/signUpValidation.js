import Joi from 'joi';
import passwordComplexity from 'joi-password-complexity';

const signUpValidation = (data) => {
    const complexityOptions = {
        min: 8, max: 256, lowerCase: 1, upperCase: 1, numeric: 1, symbol: 1,
        requirementCount: 4
    }

    const signUpSchema = Joi.object({
        email: Joi.string().min(6).max(320).email().required(),
        fullName: Joi.string().min(4).max(70).required(),
        password: passwordComplexity(complexityOptions).required(),
        passwordConfirmation: Joi.any().valid(Joi.ref('password'))
            .required()
    });

    return signUpSchema.validate(data);
};

export default signUpValidation;
