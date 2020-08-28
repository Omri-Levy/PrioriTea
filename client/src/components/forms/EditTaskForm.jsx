import {ModalsContext} from '../../context/ModalsContext.jsx';
import {TasksContext} from '../../context/TasksContext.jsx';
import editTaskSchema from '../../static/js/validation/editTaskSchema.js';
import {Form, Formik} from 'formik';
import React, {useContext} from 'react';
import editTaskPatch from '../../static/js/requests/editTaskPatch.js';
import FormikInput from '../fields/FormikInput.jsx';

const EditTaskForm = () => {
    const {tasks, setTasks, setTasksCopy, editTaskId} = useContext(
        TasksContext);
    const {closeEditTaskModal} = useContext(ModalsContext);

    return (
        <Formik
            initialValues={{priority: '', task: '', status: ''}}
            validationSchema={editTaskSchema}
            onSubmit={(data) => {
                editTaskPatch(data, editTaskId, tasks,
                    setTasks, setTasksCopy, closeEditTaskModal)
                    .catch(err => console.error(err));
            }}>
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
                    <button type='submit' className='primary-btn'>
                        Edit
                    </button>
                    <button type='button'
                            onClick={closeEditTaskModal}
                            className='primary-btn'>
                        Cancel
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default EditTaskForm;

