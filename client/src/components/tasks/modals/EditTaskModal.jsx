import React from 'react';
import {EditTaskForm} from '../../forms/EditTaskForm.jsx';

const EditTaskModal = () => {
    return (
        <div className='edit-task-modal-container'>
            <div className='edit-task-modal-content'>
                <EditTaskForm/>
            </div>
        </div>
    );
}

export default EditTaskModal;
