import React, {useContext, useState} from 'react';
import {LoadingContext} from '../../context/LoadingContext.jsx';
import {PaginationContext} from '../../context/PaginationContext.jsx';
import CreateTaskModal from './modals/CreateTaskModal.jsx';
import Loading from '../loading/Loading.jsx';
import EditTaskModal from './modals/EditTaskModal.jsx';
import TaskOptionsModal from './modals/TaskOptionsModal.jsx';
import TaskFilterModal from './modals/TaskFilterModal.jsx';

const Tasks = ({
                   tasksOriginal,
                   setTasksOriginal,
                   tasksCopy,
                   setTasksCopy
               }) => {

    const {loading} = useContext(LoadingContext);
    const [editTaskId, setEditTaskId] = useState('');
    const {currentPage, tasksPerPage} = useContext(PaginationContext);
    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    let tasks = tasksCopy.slice(indexOfFirstTask, indexOfLastTask);

    if (loading) {
        return <Loading/>
    }

    return (
        <>
            <CreateTaskModal
                setTasksOriginal={setTasksOriginal}
                setTasksCopy={setTasksCopy}
            />
            <EditTaskModal
                editTaskId={editTaskId}
                setTasksOriginal={setTasksOriginal}
                setTasksCopy={setTasksCopy}
            />
            {tasks.map(task => (
                    <table key={task._id}>
                        <thead>
                        <tr>
                            <th
                                title='Sort'
                                className='relative-parent'
                            >
                                <TaskFilterModal
                                    tasksOriginal={tasksOriginal}
                                    setTasksCopy={setTasksCopy}
                                    target={'priority'}
                                />
                                <span>
                                Priority
                                    </span>
                            </th>
                            <th
                                title='Sort'
                                className='relative-parent'
                            >
                                <TaskFilterModal
                                    tasksOriginal={tasksOriginal}
                                    setTasksCopy={setTasksCopy}
                                    target={'task'}
                                />
                                <span>
                                Task
                                    </span>
                            </th>
                            <th
                                title='Sort'
                                className='relative-parent'>
                                <TaskFilterModal
                                    tasksOriginal={tasksOriginal}
                                    setTasksCopy={setTasksCopy}
                                    target={'status'}
                                />
                                <TaskOptionsModal
                                    tasksOriginal={tasksOriginal}
                                    taskId={task._id}
                                    setTasksCopy={setTasksCopy}
                                    setEditTaskId={setEditTaskId}
                                />
                                <span>
                                Status
                                    </span>
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
