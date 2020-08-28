import {AuthContext} from '../../context/AuthContext.jsx';
import setLoginPost from '../../static/js/requests/setLoginPost.js';
import signinSchema from '../../static/js/validation/signinSchema.js';
import {Form, Formik} from 'formik';
import React, {useContext, useState} from 'react';
import signinPost from '../../static/js/requests/signinPost.js';
import EmailExists from '../EmailExists.jsx';
import FormikInput from '../fields/FormikInput.jsx';

const SigninForm = ({history}) => {
    const [displayEmailExistsMsg, setEmailExistsMsg] = useState(
        false);
    const {signin, signout} = useContext(AuthContext);

    const signinFn = async (data) => {
        await signinPost(data);
        const res = await setLoginPost();
        res && res.data ? signin() : signout();
        history.push('/');
    }

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
                    validationSchema={signinSchema}
                    onSubmit={(data) => signinFn(data)}
                >
                    {() => (
                        <Form className='signin-form'>
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
                                type='submit'
                                className='primary-btn'>
                                Signin
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </main>
    );
};

export default SigninForm;
