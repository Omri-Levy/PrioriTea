import { z } from 'zod';
import { userSchema } from '../../users/users.validation';
import { sharedSchema } from './shared-schema';

export const signUpSchema = sharedSchema
	.merge(
		userSchema.pick({
			fullName: true,
		}),
	)
	.extend({
		passwordConfirmation: z.string(),
	})
	.refine(
		function (data: any) {
			return data.password === data.passwordConfirmation;
		},
		{
			message: 'Password confirmation must match password',
			path: ['passwordConfirmation'],
		},
	);
