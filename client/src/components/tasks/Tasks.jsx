import {cloneDeep} from 'lodash';
import React, {useContext} from 'react';
import {LoadingContext} from '../../context/LoadingContext.jsx';
import {PaginationContext} from '../../context/PaginationContext.jsx';
import {TasksContext} from '../../context/TasksContext.jsx';
import {toggleSort} from '../../static/js/handlers.js';
import sortFn from '../../static/js/sortFn.js';
import Loading from '../loading/Loading.jsx';
import TaskOptionsModal from './modals/TaskOptionsModal.jsx';
import TaskFilterModal from './modals/TaskFilterModal.jsx';

const Tasks = () => {
    const {tasks, setTasks, tasksCopy, setTasksCopy} =
        useContext(TasksContext);
    const {loading} = useContext(LoadingContext);
    const {currentPage, tasksPerPage} = useContext(PaginationContext);
    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const tasksClone = cloneDeep(tasksCopy);
    let slicedTasksCopy = tasksClone.slice(indexOfFirstTask, indexOfLastTask);

    if (loading) {
        return <Loading/>
    }

    const updateSorting = (Event) => {
        toggleSort(Event);
        sortFn(tasks, setTasks, setTasksCopy);
    }

    const {sortBy, orderBy} = JSON.parse(localStorage.getItem('sort'));

    return (
        <>
            {slicedTasksCopy.map(task => (
                    <table key={task._id}>
                        <thead>
                        <tr>
                            <th
                                title='Sort'
                                className='relative-parent'
                            >
                                <TaskFilterModal target={'priority'}
                                />
                                <span>
                                Priority
                                    <i onClick={(Event) => updateSorting(
                                        Event)}
                                       className={
                                           sortBy === 'priority'
                                           && orderBy === 'asc'
                                               ? 'sorted-asc' : 'sorted-desc'
                                       }/>
                                    </span>
                            </th>
                            <th
                                title='Sort'
                                className='relative-parent'
                            >
                                <TaskFilterModal target={'task'}/>
                                <span>
                                Task
                                    <i onClick={(Event) => updateSorting(
                                        Event)}
                                       className={
                                           sortBy === 'task'
                                           && orderBy === 'asc'
                                               ? 'sorted-asc' : 'sorted-desc'
                                       }/>
                                    </span>
                            </th>
                            <th
                                title='Sort'
                                className='relative-parent'>
                                <TaskFilterModal target={'status'}/>
                                <TaskOptionsModal taskId={task._id}/>
                                <span>
                                Status
                                    <i onClick={(Event) => updateSorting(
                                        Event)}
                                       className={
                                           sortBy === 'status'
                                           && orderBy === 'asc'
                                               ? 'sorted-asc' : 'sorted-desc'
                                       }/>
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
