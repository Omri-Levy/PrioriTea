import React from 'react';
import {
    toggleCreateTaskModal,
    editTask,
    displayTaskOptionsTooltip,
    hideTaskOptionsTooltip
} from '../../../static/js/handlers';
import {deleteTaskDelete} from '../../../static/js/requests/deleteTaskDelete';

const TaskOptionsModal = ({setEditTaskId, task, setTasks, setTasksCopy}) => {
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
                    onClick={
                        () => editTask(task._id,
                            setEditTaskId)}
                    className='edit-task'/>
                <em
                    title='Delete'
                    onClick={() =>
                        deleteTaskDelete(task._id,
                            setTasks,
                            setTasksCopy
                        )
                    }
                    className='delete-task'
                />
            </div>
        </em>
    );
}

export default TaskOptionsModal;
