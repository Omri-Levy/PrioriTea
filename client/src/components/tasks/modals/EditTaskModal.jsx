import React from 'react';
import {EditTaskForm} from '../../forms/EditTaskForm.jsx';

const EditTaskModal = ({editTaskId, setTasksOriginal,
                       setTasksCopy}) => {
    return (
        <div className='edit-task-modal-container hidden'>
            <div className='edit-task-modal-content'>
                <EditTaskForm
                    setTasksOriginal={setTasksOriginal}
                    setTasksCopy={setTasksCopy}
                    editTaskId={editTaskId}
                />
            </div>
        </div>
    );
}

export default EditTaskModal;
