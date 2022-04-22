// import { z } from 'zod';

/**
 * Checks for at least one upper case letter,
 * one lower case letter, one number, and one special character.
 */
export const specialUpperLowerNum =
	/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[ !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])/;

// export const userSchema = z.object({
// 	id: z.string().cuid(),
// 	email: z
// 		.string()
// 		.email(
// 			'Email must contain a "@", preceded and followed by English characters, numbers, and special characters, and may not contain two consecutive "."s',
// 		)
// 		.max(320),
// 	password: z.string().min(8).max(255).regex(specialUpperLowerNum, {
// 		message:
// 			'Password must contain at least one upper case letter, one lower case letter, one number, and one special character.',
// 	}),
// 	fullName: z.string().min(1).max(70),
// 	createdAt: z.date(),
// 	updatedAt: z.date(),
// });
