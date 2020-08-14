import React from 'react';

export const CustomInput = ({label, isRequired, ...props}) => {
    return (
        <section>
            <label
                className={
                    isRequired ? 'form-label required' : 'form-label'
                }
                   htmlFor={props.id || props.name}>
                {label}
            </label>
            <input className='primary-input' {...props}/>
        </section>
    )
}
