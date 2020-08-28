import React from 'react';

const FilterSearch = ({label, ...props}) => {
    return (
        <section>
            <label className='form-label' htmlFor={props.id || props.name}>
                {label}
            </label>
            <input {...props}/>
        </section>
    );
};

export default FilterSearch;

