import { userSchema } from "./users-schema";

export const signInSchema = userSchema.pick({
  email: true,
  password: true,
});
