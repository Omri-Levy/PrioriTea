import {z} from "zod";

/**
 * Checks for at least one upper case letter,
 * one lower case letter, one number, and one special character.
 */
export const specialUpperLowerNum =
	/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[ !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])/;

export const userSchema = z.object({
	id: z.string().cuid(`id must be a valid CUID`),
	email: z
		.string()
		.email(
			'Email must contain a "@", preceded and followed by English characters, numbers, and special characters, and may not contain two consecutive "."s'
		)
		.max(320, "Email must contain at most 320 character(s)"),
	password: z
		.string()
		.min(8, "Password must contain at least 8 character(s)")
		.max(255, "Password must contain at most 255 character(s)")
		.regex(specialUpperLowerNum, {
			message:
				"Password must contain at least one upper case letter, one lower case letter, one number, and one special character.",
		}),
	name: z
		.string()
		.min(1, "Full name must contain at least 1 character(s)")
		.max(70, "Full name must contain at most 70 character(s)"),
	createdAt: z.date(),
	updatedAt: z.date(),
});
