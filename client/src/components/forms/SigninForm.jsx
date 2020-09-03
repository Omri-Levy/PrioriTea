import {AuthContext} from '../../context/AuthContext.jsx';
import {LoadingContext} from '../../context/LoadingContext.jsx';
import signinSchema from '../../static/js/validation/signinSchema.js';
import {Form, Formik} from 'formik';
import React, {useContext, useState} from 'react';
import signinPost from '../../static/js/requests/signinPost.js';
import FormikInput from '../fields/FormikInput.jsx';

const SigninForm = ({history}) => {
    const {signin, signout} = useContext(AuthContext);
    const {startLoading, stopLoading, loading} = useContext(LoadingContext);
    const [error, setError] = useState(null);

    return (
        <main className='body-container'>
            <div className='form-container'>
                <Formik
                    initialValues={{
                        email: '',
                        fullName: '',
                        password: '',
                        passwordConfirmation: '',
                    }}
                    validationSchema={signinSchema}
                    onSubmit={async (data) => {
                        startLoading();
                        await signinPost(data, history, signin, signout,
                            setError);
                        stopLoading();
                    }}
                >
                    {() => (
                        <Form className='signin-form'>
                            <p className='required-fields-msg'>
                                Indicates required fields
                            </p>
                            {error &&
                            <div className='error'>
                                {error}
                            </div>
                            }
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
                                maxLength='256'
                                label='Password'
                                name='password'
                                type='password'
                                required
                                isRequired={true}
                                autoComplete='new-password'
                                placeholder='Password'
                            />
                            <button
                                disabled={loading}
                                type='submit'
                                className='primary-btn'>
                                {loading
                                    ? <i className='fas fa-spinner fa-spin'/>
                                    : <p className='custom-span link-underline'
                                    >Signin</p>}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </main>
    );
};

export default SigninForm;
