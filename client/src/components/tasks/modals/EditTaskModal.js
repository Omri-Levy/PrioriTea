import React from 'react';
import {EditTaskForm} from '../../forms/EditTaskForm.js';

const EditTaskModal = ({editTaskId, setTasks, setTasksCopy}) => {
    return (
        <div className='edit-task-modal-container hidden'>
            <div className='edit-task-modal-content'>
                <EditTaskForm
                    setTasks={setTasks}
                    setTasksCopy={setTasksCopy}
                    editTaskId={editTaskId}
                />
            </div>
        </div>
    );
}

export default EditTaskModal;
