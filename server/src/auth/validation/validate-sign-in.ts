import Joi from 'joi';

interface SignIn {
	email: string;
	password: string;
}

export const validateSignIn = (signIn: SignIn) => {
	const signInSchema = Joi.object({
		email: Joi.string().required(),
		password: Joi.string().required(),
	});

	return signInSchema.validate(signIn);
};
