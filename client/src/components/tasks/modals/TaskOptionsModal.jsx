import React, {useContext} from 'react';
import {TasksContext} from '../../../context/TasksContext.jsx';
import {
    toggleCreateTaskModal, displayTaskOptionsTooltip,
    hideTaskOptionsTooltip, toggleEditTaskModal
} from '../../../static/js/handlers';
import deleteTaskDelete from '../../../static/js/requests/deleteTaskDelete';

const TaskOptionsModal = ({taskId, noTasks}) => {
    const {tasks, setTasks, setTasksCopy, setEditTaskId} = useContext(
        TasksContext);
    const editTask = () => {
        toggleEditTaskModal();
        setEditTaskId(taskId);
    }
    return (
        <em
            title='Options'
            onMouseEnter={displayTaskOptionsTooltip}
            onMouseLeave={hideTaskOptionsTooltip}
            className='task-options-tooltip-btn'
        >
            <div className='task-options-modal hidden'>
                <em
                    title='Create'
                    onClick={toggleCreateTaskModal}
                    className='create-task-btn'
                />
                <em
                    title={noTasks ? 'Edit Is Unavailable On Draft' : 'Edit'}
                    onClick={noTasks ? null : editTask}
                    className={noTasks ? 'edit-task-btn excluded-link draft' :
                        'edit-task-btn'}/>
                <em
                    title={noTasks ? 'Delete Is Unavailable On Draft' :
                        'Delete'}
                    onClick={noTasks ? null : () => {
                        deleteTaskDelete(taskId, tasks, setTasks, setTasksCopy)
                            .catch(err => console.error(err));
                    }}
                    className={noTasks ? 'delete-task excluded-link draft' :
                        'delete-task-btn'}
                />
            </div>
        </em>
    );
}

export default TaskOptionsModal;
