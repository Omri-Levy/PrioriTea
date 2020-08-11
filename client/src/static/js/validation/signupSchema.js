import * as Yup from 'yup';

const passComplexityRegex = (
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,256}$/
);
const passComplexityMsg = (
    'Password must include a minimum of 8 characters, a maximum of 256' +
    ' characters, at least one uppercase, one lowercase, one number and one' +
    ' special case character'
);

const signupSchema = Yup.object({
    email: Yup.string()
        .min(7,
            'Email must include a minimum of 7 characters.')
        .max(
            320,
            'Email must include of a maximum of 320 characters.')
        .email('Email must be valid.')
        .required('Email is  a required field.'),
    fullName: Yup.string()
        .min(4,
            'Full name must include a minimum of 4 characters.')
        .max(70,
            'Full name must include a maximum of 70 characters.')
        .required('Full name is a required field.'),
    password: Yup.string()
        .matches(passComplexityRegex, passComplexityMsg)
        .required('Password is a required field.'),
    passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
});

export default signupSchema;
