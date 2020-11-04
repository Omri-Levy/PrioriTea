import React, {useContext, useEffect, useState} from 'react';
import {ModalsContext} from '../../context/ModalsContext.jsx';
import TaskFilterModal from './modals/TaskFilterModal.jsx';
import TaskOptionsModal from './modals/TaskOptionsModal.jsx';

const MobileNoTasks = () => {
    const {openCreateTaskModal} = useContext(ModalsContext);
    const [counter, setCounter] = useState(JSON.parse(localStorage
        .getItem('counter') || 0));

    useEffect(() => {
        setCounter(JSON.parse(localStorage.getItem('counter')));
    }, []);

    useEffect(() => {
        localStorage.setItem('counter', JSON.stringify(1));
    }, [counter]);

    useEffect(() => {
        counter === 0 && openCreateTaskModal();
    }, [counter, openCreateTaskModal]);

    return (
        <table>
            <thead>
            <tr>
                <th>
                    <TaskFilterModal noTasks={true} target={'priority'}/>
                    <span>Priority
                                    <i title='Sorting Is Unavailable On Draft'
                                       className='sorted-desc draft'/>
                                    </span>
                </th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td className='priority'>No Available Tasks</td>
            </tr>
            </tbody>
            <thead>
            <tr>
                <th>
                    <TaskFilterModal noTasks={true} target={'task'}/>
                    <span>Task
                                    <i title='Sorting Is Unavailable On Draft'
                                       className='sorted-desc draft'/>
                                    </span>
                </th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td className='task'>No Available Tasks</td>
            </tr>
            </tbody>
            <thead>
            <tr>
                <th>
                    <TaskFilterModal noTasks={true} target={'status'}/>
                    <TaskOptionsModal noTasks={true} taskId='draft'/>
                    <span>Status
                                    <i title='Sorting Is Unavailable On Draft'
                                       className={'sorted-desc draft'}/>
                                    </span>
                </th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td className='status'>No Available Tasks</td>
            </tr>
            </tbody>
        </table>
    );
};

export default MobileNoTasks;

