import createTaskSchema from '../../static/js/validation/createTaskSchema';
import {Form, Formik} from 'formik';
import React from 'react';
import {Input} from '../Input';
import createTaskPost from '../../static/js/requests/createTaskPost.js';
import {hideCreateTaskModal} from '../../static/js/handlers.js';

export const CreateTaskForm = ({getTasks}) => {
    return (
        <Formik
            initialValues={{
                title: '',
                owner: '',
            }}
            validationSchema={createTaskSchema}
            onSubmit={(data) => createTaskPost(data, getTasks)}
        >
            {() => (
                <Form className='create-task-form'>
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
                        onClick={hideCreateTaskModal}
                        className='primary-btn'>
                        Cancel
                    </button>
                </Form>
            )}
        </Formik>
    );
}
