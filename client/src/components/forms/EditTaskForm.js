import editTaskSchema from '../../static/js/validation/editTaskSchema.js';
import {Form, Formik} from 'formik';
import React from 'react';
import {Input} from '../Input';
import editTaskPatch from '../../static/js/requests/editTaskPatch.js';
import {hideEditTaskModal} from '../../static/js/handlers.js';

export const EditTaskForm = ({editTaskId, getTasks}) => {
    return (
        <Formik
            initialValues={{
                title: '',
                owner: '',
            }}
            validationSchema={editTaskSchema}
            onSubmit={
                (data) => editTaskPatch(data, getTasks,
                    editTaskId)
            }
        >
            {() => (
                <Form className='edit-task-form'>
                    <Input
                        autoFocus={true}
                        label='Title'
                        name='title'
                        type='text'
                        autoComplete='on'
                        placeholder='Title'
                    />
                    <Input
                        label='Owner'
                        name='owner'
                        type='text'
                        autoComplete='on'
                        placeholder='Owner'
                    />
                    <button
                        type='submit'
                        className='primary-btn'>
                        Edit
                    </button>
                    <button
                        type='button'
                        onClick={hideEditTaskModal}
                        className='primary-btn'>
                        Cancel
                    </button>
                </Form>
            )}
        </Formik>
    );
}
