import React from 'react';
import {EditTaskForm} from '../../forms/EditTaskForm.jsx';

const EditTaskModal = ({editTaskId}) => {
    return (
        <div className='edit-task-modal-container hidden'>
            <div className='edit-task-modal-content'>
                <EditTaskForm editTaskId={editTaskId}/>
            </div>
        </div>
    );
}

export default EditTaskModal;
