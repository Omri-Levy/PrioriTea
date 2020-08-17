import React from 'react';
import {CreateTaskForm} from '../../forms/CreateTaskForm.jsx';

const CreateTaskModal = () => {
    return (
        <div className='create-task-modal-container hidden'>
            <div className='create-task-modal-content'>
                <CreateTaskForm/>
            </div>
        </div>
    );
}

export default CreateTaskModal;
