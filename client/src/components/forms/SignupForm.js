import signupSchema from '../../static/js/validation/signupSchema.js';
import {Form, Formik} from 'formik';
import React, {useState} from 'react';
import {Input} from '../Input';
import signupPost from '../../static/js/requests/signupPost.js';
import EmailExists from '../EmailExists';

export const SignupForm = () => {
    const [displayEmailExistsMsg, setEmailExistsMsg] = (
        useState(false)
    );
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
                    onSubmit={(data) => signupPost(data)}
                >
                    {() => (
                        <Form className='signup-form'>
                            <p className='required-fields-msg'>
                                Indicates required fields
                            </p>
                            <Input
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
                            <Input
                                maxLength='70'
                                label='Full name'
                                name='fullName'
                                type='text'
                                required
                                isRequired={true}
                                autoComplete='on'
                                placeholder='Full Name'
                            />
                            <Input
                                maxLength='256'
                                label='Password'
                                name='password'
                                type='password'
                                required
                                isRequired={true}
                                autoComplete='new-password'
                                placeholder='Password'
                            />
                            <Input
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
