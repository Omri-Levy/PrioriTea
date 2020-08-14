import React, {useState} from 'react';
import CreateTaskModal from './modals/CreateTaskModal.jsx';
import Loading from '../loading/Loading.jsx';
import EditTaskModal from './modals/EditTaskModal.jsx';
import {
    displayCreateTaskModal,
    displayTasksTooltip,
    editTask,
    hideTasksTooltip
} from '../../static/js/handlers.js';
import {deleteTaskDelete} from '../../static/js/requests/deleteTaskDelete.js';

const Tasks = ({
                   currentPage,
                   tasksPerPage,
                   tasksCopy,
                   setTasksCopy,
                   setTasks
               }) => {

    const [loading] = useState(false);

    const [editTaskId, setEditTaskId] = useState('');

    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;

    let tasks = tasksCopy.slice(indexOfFirstTask, indexOfLastTask);

    if (loading) {
        return <Loading/>
    }

    return (
        <>
            <CreateTaskModal
                setTasks={setTasks}
                setTasksCopy={setTasksCopy}
            />
            <EditTaskModal
                setTasks={setTasks}
                setTasksCopy={setTasksCopy}
                editTaskId={editTaskId}
            />
            {tasks.map(task => (
                    <table key={task._id}>
                        <thead>
                        <tr>
                            <th
                                title='Sort'
                                className='relative-parent'
                            >
                                <em
                                    title='Filter'
                                    className='filter-task excluded-link'>
                                </em>
                                Priority
                            </th>
                            <th
                                title='Sort'
                                className='relative-parent'
                            >
                                <em
                                    title='Filter'
                                    className='filter-task excluded-link'>
                                </em>
                                Task
                            </th>
                            <th
                                title='Sort'
                                className='relative-parent'>
                                <em
                                    title='Filter'
                                    className='filter-task excluded-link'>
                                </em>
                                <em
                                    title='Options'
                                    onMouseEnter={displayTasksTooltip}
                                    onMouseLeave={hideTasksTooltip}
                                    className='tasks-tooltip-container'
                                >
                                    <div className='tasks-tooltip hidden'>
                                        <em
                                            title='Create'
                                            onClick={displayCreateTaskModal}
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
                                Status
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className='priority'>
                                {task.priority}
                            </td>
                            <td className='task'>
                                {task.task}
                            </td>
                            <td className='status'>
                                {task.status}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                )
            )}
        </>
    );
}

export default Tasks;
