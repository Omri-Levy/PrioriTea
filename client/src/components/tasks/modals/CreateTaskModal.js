import React from 'react';
import {CreateTaskForm} from '../../forms/CreateTaskForm.js';

const CreateTaskModal = ({getTasks}) => {
    return (
        <div className='create-task-modal-container hidden'>
            <div className='create-task-modal-content'>
                <CreateTaskForm getTasks={getTasks}/>
            </div>
        </div>
    );
}

export default CreateTaskModal;
