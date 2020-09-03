import {LoadingContext} from '../../context/LoadingContext.jsx';
import {ModalsContext} from '../../context/ModalsContext.jsx';
import {TasksContext} from '../../context/TasksContext.jsx';
import editTaskSchema from '../../static/js/validation/editTaskSchema.js';
import {Form, Formik} from 'formik';
import React, {useContext} from 'react';
import editTaskPatch from '../../static/js/requests/editTaskPatch.js';
import FormikInput from '../fields/FormikInput.jsx';

const EditTaskForm = () => {
    const {tasks, setTasks, setTasksCopy, editTaskId, sort} = useContext(
        TasksContext);
    const {closeEditTaskModal} = useContext(ModalsContext);
    const {startLoading, stopLoading, loading} = useContext(LoadingContext);


    return (
        <Formik
            initialValues={{priority: '', task: '', status: ''}}
            validationSchema={editTaskSchema}
            onSubmit={async (data) => {
                startLoading();
                try {
                    await editTaskPatch(data, editTaskId, tasks,
                        setTasks, setTasksCopy, closeEditTaskModal, sort);
                } catch (err) {
                    console.error(err);
                }
                stopLoading();
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
                    <button
                        disabled={loading}
                        type='submit'
                        className='primary-btn'>
                        {loading
                            ? <i className='fas fa-spinner fa-spin'/>
                            : <p className='custom-span link-underline'>
                                Edit
                            </p>}
                    </button>
                    <button type='button'
                            onClick={closeEditTaskModal}
                            className='primary-btn'>
                        <p className='custom-span link-underline'>Cancel</p>
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default EditTaskForm;

