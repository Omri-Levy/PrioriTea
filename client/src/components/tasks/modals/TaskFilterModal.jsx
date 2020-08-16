import React from 'react';
import {
    displayTaskFilterTooltip,
    hideTaskFilterTooltip
} from '../../../static/js/handlers.js';

const TaskFilterModal = ({tasksCopy, target}) => {
    let itemsArr = [];

    tasksCopy.forEach(item => {
        switch (target) {
            case 'priority':
                itemsArr.push(item.priority);
                break;
            case 'task':
                itemsArr.push(item.task);
                break;
            case 'status':
                itemsArr.push(item.status);
                break;
        }
    });

    itemsArr = new Set(itemsArr);

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
                        {[...itemsArr].map(item => {
                            return (
                                <li key={item}>
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
