import { z } from "zod";
import { specialUpperLowerNum } from "./users-schema";

export const signInSchema = z.object({
  email: z
    .string()
    .email(
      'Email must contain a "@", preceded and followed by English characters, numbers, and special characters, and may not contain two consecutive "."s'
    )
    .max(320),
  password: z.string().min(8).max(255).regex(specialUpperLowerNum, {
    message:
      "Password must contain at least one upper case letter, one lower case letter, one number, and one special character.",
  }),
});
