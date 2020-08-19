import {cloneDeep} from 'lodash';
import React, {useContext, useState} from 'react';
import {LoadingContext} from '../../context/LoadingContext.jsx';
import {PaginationContext} from '../../context/PaginationContext.jsx';
import {TasksContext} from '../../context/TasksContext.jsx';
import {toggleSort} from '../../static/js/handlers.js';
import Loading from '../loading/Loading.jsx';
import EditTaskModal from './modals/EditTaskModal.jsx';
import TaskOptionsModal from './modals/TaskOptionsModal.jsx';
import TaskFilterModal from './modals/TaskFilterModal.jsx';

const Tasks = () => {
    const {tasksCopy} = useContext(TasksContext);
    const {loading} = useContext(LoadingContext);
    const {currentPage, tasksPerPage} = useContext(PaginationContext);
    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const tasksClone = cloneDeep(tasksCopy);
    let slicedTasksCopy = tasksClone.slice(indexOfFirstTask, indexOfLastTask);

    if (loading) {
        return <Loading/>
    }

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
                                    <i onClick={toggleSort}
                                        className='sorted-desc'/>
                                    </span>
                            </th>
                            <th
                                title='Sort'
                                className='relative-parent'
                            >
                                <TaskFilterModal target={'task'}/>
                                <span>
                                Task
                                    <i onClick={toggleSort}
                                       className='sorted-desc'/>
                                    </span>
                            </th>
                            <th
                                title='Sort'
                                className='relative-parent'>
                                <TaskFilterModal target={'status'}/>
                                <TaskOptionsModal taskId={task._id}/>
                                <span>
                                Status
                                    <i onClick={toggleSort}
                                        className='sorted-desc'/>
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
