import * as Yup from 'yup';

const passComplexityRegex = (
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,256}$/
);
const passComplexityMsg = (
    'Password must include a minimum of 8 characters, a maximum of 256' +
    ' characters, at least one uppercase, one lowercase, one number and one' +
    ' special case character'
);

const emailMinCharsMsg = 'Email must include a minimum of 7 characters.';
const emailMaxCharsMsg = 'Email must include a maximum of 320 characters.';
const emailRequiredMsg = 'Email is a required field.';
const emailValidMsg = 'Email must be valid.';

const fullNameMinCharsMsg = 'Full name must include a minimum of 4 characters.'
;
const fullNameMaxCharsMsg = (
    'Full name must include a maximum of 70 characters.');
const fullNameRequiredMsg = 'Full name is a required field.';

const passwordRequiredMsg = 'Password is a required field.';
const passwordMustMatchMsg = 'Passwords must match';

const signupSchema = Yup.object({
    email: Yup.string()
        .min(7, emailMinCharsMsg).max(320, emailMaxCharsMsg).email(
            emailValidMsg).required(emailRequiredMsg),

    fullName: Yup.string().min(4, fullNameMinCharsMsg).max(70,
        fullNameMaxCharsMsg).required(fullNameRequiredMsg),

    password: Yup.string()
        .matches(passComplexityRegex, passComplexityMsg)
        .required(passwordRequiredMsg),

    passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null],
        passwordMustMatchMsg)
});

export default signupSchema;
