import React from 'react';
import {EditTaskForm} from '../../forms/EditTaskForm.js';

const EditTaskModal = ({editTaskId, getTasks}) => {
    return (
        <div className='edit-task-modal-container hidden'>
            <div className='edit-task-modal-content'>
                <EditTaskForm editTaskId={editTaskId} getTasks={getTasks}/>
            </div>
        </div>
    );
}

export default EditTaskModal;
