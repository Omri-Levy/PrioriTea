import {AuthContext} from '../../context/AuthContext.jsx';
import {LoadingContext} from '../../context/LoadingContext.jsx';
import fetchFn from '../../static/js/requests/fetchFn.js';
import signupSchema from '../../static/js/validation/signupSchema.js';
import {Form, Formik} from 'formik';
import React, {useContext} from 'react';
import EmailExists from '../EmailExists.jsx';
import FormikInput from '../fields/FormikInput.jsx';

const SignupForm = ({history}) => {
    const {displayEmailExistsMsg, setDisplayEmailExistsMsg} = useContext(
        AuthContext);
    const {startLoading, stopLoading, loading} = useContext(LoadingContext);
    const signupUrl = `${process.env.REACT_APP_API_USER}/signup`;

    return (
        <main className='body-container'>
            <div className='form-container'>
                {displayEmailExistsMsg && <EmailExists/>}
                <Formik
                    initialValues={{
                        email: '',
                        fullName: '',
                        password: '',
                        passwordConfirmation: '',
                    }}
                    validationSchema={signupSchema}
                    onSubmit={async (data) => {

                        startLoading();

                        const signupOptions = {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                email: data.email,
                                fullName: data.fullName,
                                password: data.password,
                                passwordConfirmation: data.passwordConfirmation
                            })
                        };

                        try {

                            const {res, data: resData} = await fetchFn(
                                signupUrl, signupOptions);

                            if (resData.message === 'Email already exists.') {
                                setDisplayEmailExistsMsg(true);
                            }

                            if (res.status === 200) {
                                setDisplayEmailExistsMsg(false);
                                history.push('/signin');
                            }

                        } catch (err) {
                            console.error(err);
                        }

                        stopLoading();

                    }}
                >
                    {() => (
                        <Form className='signup-form'>
                            <p className='required-fields-msg'>
                                Indicates required fields
                            </p>
                            <FormikInput
                                maxLength='320'
                                autoFocus={true}
                                label='Email'
                                name='email'
                                type='text'
                                required
                                isRequired={true}
                                autoComplete='on'
                                placeholder='Email'
                            />
                            <FormikInput
                                maxLength='70'
                                label='Full name'
                                name='fullName'
                                type='text'
                                required
                                isRequired={true}
                                autoComplete='on'
                                placeholder='Full Name'
                            />
                            <FormikInput
                                maxLength='256'
                                label='Password'
                                name='password'
                                type='password'
                                required
                                isRequired={true}
                                autoComplete='new-password'
                                placeholder='Password'
                            />
                            <FormikInput
                                maxLength='256'
                                id='password-confirmation'
                                label='Password Confirmation'
                                name='passwordConfirmation'
                                type='password'
                                required
                                isRequired={true}
                                autoComplete='new-password'
                                placeholder='Confirm Password'
                            />
                            <button
                                disabled={loading}
                                type='submit'
                                className='primary-btn'>
                                {loading
                                    ? <i className='fas fa-spinner fa-spin'/>
                                    : <p className='custom-span link-underline'
                                    >Signup</p>}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </main>
    );
};

export default SignupForm;

