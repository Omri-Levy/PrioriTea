import * as Yup from 'yup';

export const emailValidMsg = 'Email must be valid.';
export const emailRequiredMsg = 'Email is a required field.';

export const passwordRequiredMsg = 'Password is a required field.';

export const signInSchema = Yup.object({
	email: Yup.string().email(emailValidMsg).required(emailRequiredMsg),
	password: Yup.string().required(passwordRequiredMsg),
});
