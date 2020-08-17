import {cloneDeep} from 'lodash';
import React, {useState} from 'react';
import CreateTaskModal from './modals/CreateTaskModal.jsx';
import Loading from '../loading/Loading.jsx';
import EditTaskModal from './modals/EditTaskModal.jsx';
import TaskOptionsModal from './modals/TaskOptionsModal.jsx';
import TaskFilterModal from './modals/TaskFilterModal.jsx';

const Tasks = ({
                   currentPage,
                   setCurrentPage,
                   tasksPerPage,
                   tasksCopy,
                   setTasksCopy,
                   tasksOriginal,
                   setTasksOriginal
               }) => {

    const [loading] = useState(false);

    const [editTaskId, setEditTaskId] = useState('');

    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    let tasksCopyClone = cloneDeep(tasksCopy);
    let tasks = tasksCopyClone.slice(indexOfFirstTask, indexOfLastTask);

    if (loading) {
        return <Loading/>
    }

    return (
        <>
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
                                    task={task}
                                    setCurrentPage={setCurrentPage}
                                    tasksOriginal={tasksOriginal}
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
            <CreateTaskModal
                setTasksOriginal={setTasksOriginal}
                setTasksCopy={setTasksCopy}
            />
            <EditTaskModal
                setTasksOriginal={setTasksOriginal}
                setTasksCopy={setTasksCopy}
                editTaskId={editTaskId}
            />
        </>
    );
}

export default Tasks;
