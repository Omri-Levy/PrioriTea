import createListSchema from '../../static/js/validation/createListSchema';
import {Form, Formik} from 'formik';
import React from 'react';
import {Input} from '../Input';
import createListPost from '../../static/js/requests/createListPost.js';
import {hideCreateListModal} from '../../static/js/handlers.js';

export const CreateListForm = ({getLists}) => {
    return (
        <Formik
            initialValues={{
                title: '',
                owner: '',
            }}
            validationSchema={createListSchema}
            onSubmit={(data) => createListPost(data, getLists)}
        >
            {() => (
                <Form className='create-list-form'>
                    <p className='required-fields-msg'>
                        Indicates required fields
                    </p>
                    <Input
                        autoFocus={true}
                        label='Title'
                        name='title'
                        type='text'
                        required
                        isRequired={true}
                        autoComplete='on'
                        placeholder='Title'
                    />
                    <Input
                        label='Owner'
                        name='owner'
                        type='text'
                        required
                        isRequired={true}
                        autoComplete='on'
                        placeholder='Owner'
                    />
                    <button
                        type='submit'
                        className='primary-btn'>
                        Create
                    </button>
                    <button
                        type='button'
                        onClick={hideCreateListModal}
                        className='primary-btn'>
                        Cancel
                    </button>
                </Form>
            )}
        </Formik>
    );
}
