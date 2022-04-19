import { userSchema } from '../../user/user.validation';

export const sharedSchema = userSchema.pick({
	email: true,
	password: true,
});
