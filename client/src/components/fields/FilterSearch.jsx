import React from 'react';
import NoTasks from '../tasks/NoTasks.jsx';

export const FilterSearch = ({label, ...props}) => {
    return (
        <section>
            <label className='form-label' htmlFor={props.id || props.name}
            >
                {label}
            </label>
            <input
                placeholder={NoTasks ? 'Filter Is Unavailable On Draft' :
                    'Filter'}
                className='primary-input' {...props}/>
        </section>
    )
}
