import Joi from 'joi';
import passwordComplexity from 'joi-password-complexity';
interface SignUp {
	email: string;
	fullName: string;
	password: string;
	passwordConfirmation: string;
}
export const validateSignUp = (signUp: SignUp) => {
	const complexityOptions = {
		min: 8,
		max: 256,
		lowerCase: 1,
		upperCase: 1,
		numeric: 1,
		symbol: 1,
		requirementCount: 4,
	};

	const signUpSchema = Joi.object({
		email: Joi.string().min(6).max(320).email().required(),
		fullName: Joi.string().min(4).max(70).required(),
		password: passwordComplexity(complexityOptions).required(),
		passwordConfirmation: Joi.any().valid(Joi.ref('password')).required(),
	});

	return signUpSchema.validate(signUp);
};
