import React, {useContext, useEffect} from 'react';
import {ModalsContext} from '../../context/ModalsContext.jsx';
import TaskFilterModal from './modals/TaskFilterModal.jsx';
import TaskOptionsModal from './modals/TaskOptionsModal.jsx';

const NoTasks = () => {
    const {openCreateTaskModal} = useContext(ModalsContext);
    useEffect(() => {
        openCreateTaskModal();
    }, []);

    return (
        <table>
            <thead>
            <tr>
                <th>
                    <TaskFilterModal noTasks={true} target={'priority'}
                    />
                    <span>
                                Priority
                                    <i title='Sorting Is Unavailable On Draft'
                                       className='sorted-desc draft'/>
                                    </span>
                </th>
                <th>
                    <TaskFilterModal noTasks={true} target={'task'}/>
                    <span>
                                Task
                                    <i title='Sorting Is Unavailable On Draft'
                                       className='sorted-desc draft'/>
                                    </span>
                </th>
                <th>
                    <TaskFilterModal noTasks={true} target={'status'}/>
                    <TaskOptionsModal noTasks={true} taskId='draft'/>
                    <span>
                                Status
                                    <i title='Sorting Is Unavailable On Draft'
                                       className={'sorted-desc draft'}/>
                                    </span>
                </th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td className='priority'>
                    No Available Tasks
                </td>
                <td className='task'>
                    No Available Tasks
                </td>
                <td className='status'>
                    No Available Tasks
                </td>
            </tr>
            </tbody>
        </table>
    );
}

export default NoTasks;

