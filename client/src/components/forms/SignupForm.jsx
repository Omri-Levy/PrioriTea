import signupSchema from '../../static/js/validation/signupSchema.js';
import {Form, Formik} from 'formik';
import React, {useState} from 'react';
import signupPost from '../../static/js/requests/signupPost.js';
import EmailExists from '../EmailExists.jsx';
import {FormikInput} from '../fields/FormikInput.jsx';

export const SignupForm = ({history}) => {
    const [displayEmailExistsMsg, setEmailExistsMsg] = (
        useState(false)
    );
    const signup = (data) => {
        signupPost(data).catch(err => console.error(err));
        history.push('/signin')
    }
    return (
        <div className='body-container'>
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
                    onSubmit={(data) => signup(data)}
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
                                type='submit'
                                className='primary-btn'>
                                Signup
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}
