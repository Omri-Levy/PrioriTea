import React, {useContext} from 'react';
import {TasksContext} from '../../../context/TasksContext.jsx';
import {
    toggleCreateTaskModal, displayTaskOptionsTooltip,
    hideTaskOptionsTooltip, toggleEditTaskModal
} from '../../../static/js/handlers';
import deleteTaskDelete from '../../../static/js/requests/deleteTaskDelete';

const TaskOptionsModal = ({taskId}) => {
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
                    title='Edit'
                    onClick={editTask}
                    className='edit-task'/>
                <em
                    title='Delete'
                    onClick={() => {
                        deleteTaskDelete(taskId, tasks, setTasks, setTasksCopy)
                            .catch(err => console.error(err));
                    }}
                    className='delete-task'
                />
            </div>
        </em>
    );
}

export default TaskOptionsModal;
