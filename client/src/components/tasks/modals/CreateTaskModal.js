import React from 'react';
import {CreateTaskForm} from '../../forms/CreateTaskForm.js';

const CreateTaskModal = ({setTasks, setTasksCopy}) => {
    return (
        <div className='create-task-modal-container hidden'>
            <div className='create-task-modal-content'>
                <CreateTaskForm
                    setTasks={setTasks}
                    setTasksCopy={setTasksCopy}
                />
            </div>
        </div>
    );
}

export default CreateTaskModal;
