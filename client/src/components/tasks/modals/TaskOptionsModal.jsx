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
            className='task-options-tooltip-container'
        >
            <div className='task-options-tooltip hidden'>
                <em
                    title='Create'
                    onClick={toggleCreateTaskModal}
                    className='create-task'
                />
                <em
                    title={!noTasks ? 'Edit' :
                        'Edit Is Unavailable On Draft'}
                    onClick={!noTasks ? editTask : null}
                    className={!noTasks ? 'edit-task' :
                        'edit-task excluded-link'}/>
                <em
                    title={!noTasks ? 'Delete' :
                        'Delete Is Unavailable On Draft'}
                    onClick={!noTasks ? () => {
                        deleteTaskDelete(taskId, tasks, setTasks, setTasksCopy)
                            .catch(err => console.error(err));
                    } : null}
                    className={!noTasks ? 'delete-task' :
                        'delete-task excluded-link'}
                />
            </div>
        </em>
    );
}

export default TaskOptionsModal;
