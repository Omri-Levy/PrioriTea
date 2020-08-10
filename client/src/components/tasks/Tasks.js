import React, {useState} from 'react';
import {
    displayCreateTaskModal,
    displayTasksTooltip,
    editTask,
    hideTasksTooltip
} from '../../static/js/handlers.js';
import CreateTaskModal from './modals/CreateTaskModal.js';
import Loading from '../loading/Loading.js';
import {deleteTaskDelete} from '../../static/js/requests/deleteTaskDelete.js';
import EditTaskModal from './modals/EditTaskModal.js';

const Tasks = ({tasks, loading, getTasks}) => {
    if (loading) {
        return <Loading/>
    }

    const [editTaskId, setEditTaskId] = useState('');

    return (
        <>
            <CreateTaskModal
                getTasks={getTasks}
            />
            <EditTaskModal
                editTaskId={editTaskId}
                getTasks={getTasks}
            />
            {tasks.map(task => (
                    <table key={task._id}>
                        <thead>
                        <tr>
                            <th className='relative-parent'>
                                <em className='filter-task excluded-link'>
                                </em>
                                Title
                            </th>
                            <th
                                className='tasks-tooltip-th'
                            >
                                <em
                                    title='Options'
                                    onMouseEnter={displayTasksTooltip}
                                    onMouseLeave={hideTasksTooltip}
                                    className='tasks-tooltip-container'
                                >
                                    <div className='tasks-tooltip hidden'>
                                        <em
                                            title='Create Task'
                                            onClick={displayCreateTaskModal}
                                            className='create-task'
                                        />
                                        <em
                                            title='Edit Task'
                                            onClick={
                                                () => editTask(task._id,
                                                    setEditTaskId)}
                                            className='edit-task'/>
                                        <em
                                            title='Delete Task'
                                            onClick={() =>
                                                deleteTaskDelete(task._id,
                                                    getTasks)
                                            }
                                            className='delete-task'
                                        />
                                    </div>
                                </em>
                                Owner
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{task.title}</td>
                            <td>{task.owner}</td>
                        </tr>
                        </tbody>
                    </table>
                )
            )}
        </>
    );
}

export default Tasks;
