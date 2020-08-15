import React from 'react';
import {
    displayTaskFilterTooltip,
    hideTaskFilterTooltip
} from '../../../static/js/handlers.js';

const TaskFilterModal = () => {
    return (
        <em
            title='Filter'
            className='task-filter-tooltip-container'
            onMouseEnter={displayTaskFilterTooltip}
            onMouseLeave={hideTaskFilterTooltip}
        >
            <div className='relative-parent'>
                <div className='task-filter-tooltip hidden'>

                </div>
            </div>
        </em>
    );
}

export default TaskFilterModal;
