import React, {useContext} from 'react';
import {TasksContext} from '../../../context/TasksContext.jsx';
import {CreateTaskForm} from '../../forms/CreateTaskForm.jsx';

const CreateTaskModal = () => {
    const {tasks, tasksCopy} = useContext(TasksContext);
    const ifNoTasks = () => {
        return (
            tasks.length === 0 || tasksCopy.length === 0
                ? 'create-task-modal-container'
                : 'create-task-modal-container hidden'
        );
    }
    return (
        <div className={ifNoTasks()}>
            <div className='create-task-modal-content'>
                <CreateTaskForm/>
            </div>
        </div>
    );
}

export default CreateTaskModal;
