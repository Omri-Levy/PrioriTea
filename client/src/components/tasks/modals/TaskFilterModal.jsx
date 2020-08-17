import {cloneDeep} from 'lodash';
import React from 'react';
import {filterByBtn} from '../../../static/js/filter.js';
import {
    displayTaskFilterTooltip,
    hideTaskFilterTooltip
} from '../../../static/js/handlers.js';

const TaskFilterModal = ({
                             target,
                             tasks,
                             setTasks
                         }) => {

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

    return (
        <em
            title='Filter'
            className='task-filter-tooltip-container'
            onMouseEnter={displayTaskFilterTooltip}
            onMouseLeave={hideTaskFilterTooltip}
        >
            <div className='relative-parent'>
                <div className='task-filter-tooltip hidden'>
                    <ul>
                        {[...mySet].map(item => {
                            return (
                                <li
                                    onClick={(Event) => {
                                        filterByBtn(
                                            Event,
                                            tasks,
                                            setTasks
                                        )
                                    }
                                    }
                                    key={item}
                                >
                                    {item}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </em>
    );
}

export default TaskFilterModal;
