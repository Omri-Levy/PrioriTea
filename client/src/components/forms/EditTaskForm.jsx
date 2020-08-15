import editTaskSchema from '../../static/js/validation/editTaskSchema.js';
import {Form, Formik} from 'formik';
import React from 'react';
import editTaskPatch from '../../static/js/requests/editTaskPatch.js';
import {
    toggleEditTaskModal
} from '../../static/js/handlers.js';
import {FormikInput} from '../fields/FormikInput.jsx';

export const EditTaskForm = ({editTaskId, setTasks, setTasksCopy}) => {
    return (
        <Formik
            initialValues={{
                priority: '',
                task: '',
                status: ''
            }}
            validationSchema={editTaskSchema}
            onSubmit={(data) => {
                editTaskPatch(data, setTasks, setTasksCopy, editTaskId)
                    .catch(err => console.log(err));
            }
            }
        >
            {() => (
                <Form className='edit-task-form'>
                    <FormikInput
                        maxLength='80'
                        autoFocus={true}
                        label='Priority'
                        name='priority'
                        type='text'
                        autoComplete='on'
                        placeholder='Priority'
                    />
                    <FormikInput
                        maxLength='80'
                        label='Task'
                        name='task'
                        type='text'
                        autoComplete='on'
                        placeholder='Task'
                    />
                    <FormikInput
                        maxLength='80'
                        label='Status'
                        name='status'
                        type='text'
                        autoComplete='on'
                        placeholder='Status'
                    />
                    <button
                        type='submit'
                        className='primary-btn'>
                        Edit
                    </button>
                    <button
                        type='button'
                        onClick={toggleEditTaskModal}
                        className='primary-btn'>
                        Cancel
                    </button>
                </Form>
            )}
        </Formik>
    );
}
