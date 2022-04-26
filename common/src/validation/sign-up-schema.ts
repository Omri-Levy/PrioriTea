import { z } from 'zod';
import { sharedSchema } from './shared-schema';
import {userSchema } from './users-schema';

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
