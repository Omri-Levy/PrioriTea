import {LoadingContext} from '../../context/LoadingContext.jsx';
import {ModalsContext} from '../../context/ModalsContext.jsx';
import {TasksContext} from '../../context/TasksContext.jsx';
import createTaskSchema from '../../static/js/validation/createTaskSchema';
import {Form, Formik} from 'formik';
import React, {useContext} from 'react';
import createTaskPost from '../../static/js/requests/createTaskPost.js';
import FormikInput from '../fields/FormikInput.jsx';

const CreateTaskForm = () => {
    const {setTasks, setTasksCopy} = useContext(TasksContext);
    const {closeCreateTaskModal} = useContext(ModalsContext);
    const {startLoading, stopLoading, loading} = useContext(LoadingContext);

    return (
        <Formik
            initialValues={{
                priority: '',
                task: '',
                status: ''
            }}
            validationSchema={createTaskSchema}
            onSubmit={async (data) => {
                startLoading();
                await createTaskPost(data, setTasks, setTasksCopy,
                    closeCreateTaskModal);
                stopLoading();
            }}
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
                        disabled={loading}
                        type='submit'
                        className='primary-btn'>
                        {loading
                            ? <i className='fas fa-spinner fa-spin'/>
                            : <p>Create</p>}
                    </button>
                    <button
                        onClick={closeCreateTaskModal}
                        type='button'
                        className='primary-btn'>
                        Cancel
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default CreateTaskForm;
