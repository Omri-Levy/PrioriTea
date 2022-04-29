import { z } from "zod";
import { userSchema } from "./users-schema";

export const signUpSchema = userSchema
  .pick({
    email: true,
    name: true,
    password: true,
  })
  .extend({
    passwordConfirmation: z.string(),
  })
  .refine(
    function (data: any) {
      return data.password === data.passwordConfirmation;
    },
    {
      message: "Password confirmation must match password",
      path: ["passwordConfirmation"],
    }
  );
