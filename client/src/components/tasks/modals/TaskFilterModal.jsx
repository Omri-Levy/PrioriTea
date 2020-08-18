import {cloneDeep} from 'lodash';
import React, {useContext} from 'react';
import {TasksContext} from '../../../context/TasksContext.jsx';
import {filterByBtn} from '../../../static/js/filter.js';
import {
    displayTaskFilterTooltip,
    hideTaskFilterTooltip
} from '../../../static/js/handlers.js';

const TaskFilterModal = ({target}) => {
    const {tasks, setTasksCopy} = useContext(TasksContext);
    const filterSet = () => {
        const tempArr = [];
        const tasksClone = cloneDeep(tasks);
        tasksClone.forEach(item => {
            switch (target) {
                case 'priority':
                    tempArr.push(item.priority);
                    break;
                case 'task':
                    tempArr.push(item.task);
                    break;
                case 'status':
                    tempArr.push(item.status);
                    break;
            }
        });
        return new Set(tempArr)
    }

    const mySet = filterSet();
    const filterByBtnWrapper = (Event) => {
        filterByBtn(Event, tasks, setTasksCopy);
    }
    const filterObj = localStorage.getItem('filter');
    const resetFilter = () => {
        localStorage.removeItem('filter');
        setTasksCopy(tasks);
    }
    return (
        <>
            {filterObj && <em title='Clear Filter' className='clear-filter'
                              onClick={resetFilter}/>}
            <em title='Filter' className='task-filter-tooltip-container'
                onMouseEnter={displayTaskFilterTooltip}
                onMouseLeave={hideTaskFilterTooltip}
            >
                <div className='relative-parent'>
                    <div className='task-filter-tooltip hidden'>
                        <ul>
                            {[...mySet].map(item => {
                                return (
                                    <li onClick={(Event) =>
                                        filterByBtnWrapper(Event)}
                                        key={item}>
                                        {item}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </em>
        </>
    );
}

export default TaskFilterModal;
