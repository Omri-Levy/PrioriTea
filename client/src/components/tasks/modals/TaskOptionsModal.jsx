import React from 'react';
import {
    toggleCreateTaskModal,
    editTask,
    displayTaskOptionsTooltip,
    hideTaskOptionsTooltip
} from '../../../static/js/handlers';
import deleteTaskDelete from '../../../static/js/requests/deleteTaskDelete';

const TaskOptionsModal = ({setEditTaskId, taskId}) => {
    return (
        <em
            title='Options'
            onMouseEnter={displayTaskOptionsTooltip}
            onMouseLeave={hideTaskOptionsTooltip}
            className='task-options-tooltip-container'
        >
            <div className='task-options-tooltip hidden'>
                <em
                    title='Create'
                    onClick={toggleCreateTaskModal}
                    className='create-task'
                />
                <em
                    title='Edit'
                    onClick={() => editTask(taskId, setEditTaskId)}
                    className='edit-task'/>
                <em
                    title='Delete'
                    onClick={() => {
                        deleteTaskDelete(taskId).catch(err => {
                            console.error(err);
                        })
                    }}
                    className='delete-task'
                />
            </div>
        </em>
    );
}

export default TaskOptionsModal;
