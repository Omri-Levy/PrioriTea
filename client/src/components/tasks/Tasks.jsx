import React, {useState} from 'react';
import CreateTaskModal from './modals/CreateTaskModal.jsx';
import Loading from '../loading/Loading.jsx';
import EditTaskModal from './modals/EditTaskModal.jsx';
import TaskOptionsModal from './modals/TaskOptionsModal.jsx';
import TaskFilterModal from './modals/TaskFilterModal.jsx';

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
                                <TaskFilterModal/>
                                Priority
                            </th>
                            <th
                                title='Sort'
                                className='relative-parent'
                            >
                                <TaskFilterModal/>
                                Task
                            </th>
                            <th
                                title='Sort'
                                className='relative-parent'>
                                <TaskOptionsModal
                                    task={task}
                                    setTasks={setTasks}
                                    setTasksCopy={setTasksCopy}
                                    setEditTaskId={setEditTaskId}
                                />
                                <TaskFilterModal/>
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