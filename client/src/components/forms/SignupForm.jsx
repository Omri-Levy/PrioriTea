import {AuthContext} from '../../context/AuthContext.jsx';
import {LoadingContext} from '../../context/LoadingContext.jsx';
import signupSchema from '../../static/js/validation/signupSchema.js';
import {Form, Formik} from 'formik';
import React, {useContext} from 'react';
import signupPost from '../../static/js/requests/signupPost.js';
import EmailExists from '../EmailExists.jsx';
import FormikInput from '../fields/FormikInput.jsx';

const SignupForm = ({history}) => {
    const {displayEmailExistsMsg, setDisplayEmailExistsMsg} = useContext(
        AuthContext);
    const {startLoading, stopLoading, loading} = useContext(LoadingContext);

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
                        try {
                            await signupPost(data, history,
                                setDisplayEmailExistsMsg);
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
                                    : <p>Signup</p>}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </main>
    );
};

export default SignupForm;

