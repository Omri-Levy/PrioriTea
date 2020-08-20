import {cloneDeep, isNull} from 'lodash';
import React, {useContext, useEffect} from 'react';
import {LoadingContext} from '../../context/LoadingContext.jsx';
import {PaginationContext} from '../../context/PaginationContext.jsx';
import {TasksContext} from '../../context/TasksContext.jsx';
import {toggleSort} from '../../static/js/handlers.js';
import sortFn from '../../static/js/sortFn.js';
import Loading from '../loading/Loading.jsx';
import TaskFilterModal from './modals/TaskFilterModal.jsx';
import TaskOptionsModal from './modals/TaskOptionsModal.jsx';

const Tasks = () => {
    const {tasks, setTasks, tasksCopy, setTasksCopy} =
        useContext(TasksContext);
    const {loading} = useContext(LoadingContext);
    const {currentPage, tasksPerPage} = useContext(PaginationContext);
    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const tasksClone = cloneDeep(tasksCopy);
    let slicedTasksCopy = tasksClone.slice(indexOfFirstTask, indexOfLastTask);

    useEffect(() => {
        const sortObj = JSON.parse(localStorage.getItem('sort'));
        const fallbackObj = {
            sortBy: 'priority',
            orderBy: 'desc'
        }
        if (isNull(sortObj)) {
            localStorage.setItem('sort', JSON.stringify(fallbackObj));
        }
    }, []);

    if (loading) {
        return <Loading/>
    }

    const updateSorting = (Event) => {
        toggleSort(Event);
        sortFn(tasks, setTasks, setTasksCopy);
    }

    const sortExists = (header) => {
        const {sortBy, orderBy} = JSON.parse(localStorage.getItem(
            'sort'));
        return sortBy === header && orderBy === 'asc'
            ? 'relative-parent sorted-asc' : 'relative-parent sorted-desc'
    }

    return (
        <>
            {slicedTasksCopy.map(task => (
                    <table key={task._id}>
                        <thead>
                        <tr>
                            <th
                                title='Sort'
                                className={sortExists('priority')}
                                onClick={(Event) => updateSorting(Event)}>
                                <TaskFilterModal target={'priority'}/>
                                Priority
                            </th>
                            <th
                                title='Sort'
                                className={sortExists('task')}
                                onClick={(Event) => updateSorting(Event)}>
                                <TaskFilterModal target={'task'}/>
                                Task
                            </th>
                            <th
                                title='Sort'
                                className={sortExists('status')}
                                onClick={(Event) => updateSorting(
                                    Event)}>
                                <TaskFilterModal target={'status'}/>
                                <TaskOptionsModal taskId={task._id}/>
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
