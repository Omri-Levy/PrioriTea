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
                priority: '',
                task: '',
                status: ''
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
                        maxLength='80'
                        autoFocus={true}
                        label='Priority'
                        name='priority'
                        type='text'
                        required
                        isRequired={true}
                        autoComplete='on'
                        placeholder='Priority'
                    />
                    <Input
                        maxLength='80'
                        label='Task'
                        name='task'
                        type='text'
                        required
                        isRequired={true}
                        autoComplete='on'
                        placeholder='Task'
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
