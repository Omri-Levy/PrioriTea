import { userSchema } from "./users-schema";

export const sharedSchema = userSchema.pick({
	email: true,
	password: true,
});
