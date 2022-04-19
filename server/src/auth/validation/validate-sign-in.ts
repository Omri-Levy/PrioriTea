import { z } from 'zod';

interface SignIn {
	email: string;
	password: string;
}

export const validateSignIn = (signIn: SignIn) => {
	const signInSchema = z.object({
		email: z.string().required(),
		password: z.string().required(),
	});

	return signInSchema.parse(signIn);
};
