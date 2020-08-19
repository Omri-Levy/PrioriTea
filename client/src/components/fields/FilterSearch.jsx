import React from 'react';

export const FilterSearch = ({label, ...props}) => {
    return (
        <section>
            <label className='form-label' htmlFor={props.id || props.name}
            >
                {label}
            </label>
            <input className='primary-input' {...props}/>
        </section>
    )
}
