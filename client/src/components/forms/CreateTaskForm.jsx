import {TasksContext} from '../../context/TasksContext.jsx';
import createTaskSchema from '../../static/js/validation/createTaskSchema';
import {Form, Formik} from 'formik';
import React, {useContext} from 'react';
import createTaskPost from '../../static/js/requests/createTaskPost.js';
import {
    toggleCreateTaskModal
} from '../../static/js/handlers.js';
import {FormikInput} from '../fields/FormikInput.jsx';

export const CreateTaskForm = () => {
    const {setTasks, setTasksCopy} = useContext(TasksContext);
    return (
        <Formik
            initialValues={{
                priority: '',
                task: '',
                status: ''
            }}
            validationSchema={createTaskSchema}
            onSubmit={(data) => createTaskPost(data, setTasks, setTasksCopy)}
        >
            {() => (
                <Form className='create-task-form'>
                    <p className='required-fields-msg'>
                        Indicates required fields
                    </p>
                    <FormikInput
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
                    <FormikInput
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
                        onClick={toggleCreateTaskModal}
                        className='primary-btn'>
                        Cancel
                    </button>
                </Form>
            )}
        </Formik>
    );
}
