import * as Yup from 'yup';

const emailValidMsg = 'Email must be valid.';
const emailRequiredMsg = 'Email is a required field.';

const passwordRequiredMsg = 'Password is a required field.';

const signinSchema = Yup.object({
    email: Yup.string().email(emailValidMsg).required(emailRequiredMsg),
    password: Yup.string().required(passwordRequiredMsg)
});

export default signinSchema;
