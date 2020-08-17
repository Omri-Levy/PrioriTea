import React from 'react';
import {CreateTaskForm} from '../../forms/CreateTaskForm.jsx';

const CreateTaskModal = ({setTasksOriginal, setTasksCopy}) => {
    return (
        <div className='create-task-modal-container hidden'>
            <div className='create-task-modal-content'>
                <CreateTaskForm
                    setTasksOriginal={setTasksOriginal}
                    setTaskCopy={setTasksCopy}
                />
            </div>
        </div>
    );
}

export default CreateTaskModal;
