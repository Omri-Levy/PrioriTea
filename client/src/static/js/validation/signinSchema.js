import * as Yup from 'yup';

const signinSchema = Yup.object({
    email: Yup.string()
        .email('Email must be valid.')
        .required('Email is  a required field.'),
    password: Yup.string()
        .required('Password is a required field.')
});

export default signinSchema;
