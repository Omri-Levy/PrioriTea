import {isNull} from 'lodash';
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
    const {tasksCopy, setTasksCopy} =
        useContext(TasksContext);
    const {loading} = useContext(LoadingContext);
    const {currentPage, tasksPerPage} = useContext(PaginationContext);
    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    let slicedTasksCopy = tasksCopy.slice(indexOfFirstTask, indexOfLastTask);

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
        sortFn(tasksCopy, _, setTasksCopy, false);
    }

    const sortExists = (header) => {
        const {sortBy, orderBy} = JSON.parse(localStorage.getItem(
            'sort'));
        return sortBy === header && orderBy === 'asc'
            ? 'sorted-asc' : 'sorted-desc'
    }

    return (
        <>
            {slicedTasksCopy.map(task => (
                    <table key={task._id}>
                        <thead>
                        <tr>
                            <th
                                className='relative-parent'
                            >
                                <TaskFilterModal target={'priority'}
                                />
                                <span>
                                Priority
                                    <i title='Sort'
                                       onClick={(Event) => updateSorting(
                                           Event)}
                                       className={sortExists(
                                           'priority')}/>
                                    </span>
                            </th>
                            <th
                                className='relative-parent'
                            >
                                <TaskFilterModal target={'task'}/>
                                <span>
                                Task
                                    <i title='Sort'
                                       onClick={(Event) => updateSorting(
                                           Event)}
                                       className={sortExists(
                                           'task')}/>
                                    </span>
                            </th>
                            <th
                                className='relative-parent'>
                                <TaskFilterModal target={'status'}/>
                                <TaskOptionsModal taskId={task._id}/>
                                <span>
                                Status
                                    <i title='Sort'
                                       onClick={(Event) => updateSorting(
                                           Event)}
                                       className={sortExists(
                                           'status')}/>
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
