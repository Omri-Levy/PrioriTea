import {useField} from 'formik';
import React from 'react';

export const Input = ({label, isRequired, ...props}) => {
    const [field, meta] = useField(props);

    return (
        <section>
            <label
                className={
                    isRequired ? 'form-label required' : 'form-label'
                }
                   htmlFor={props.id || props.name}>
                {label}
            </label>
            <input className='primary-input'  {...field} {...props}/>
            {meta.touched && meta.error ? (
                <div className='error'>{meta.error}</div>
            ) : null}
        </section>
    )
}
