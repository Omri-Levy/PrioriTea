import React from 'react';
import spinner from './loading.svg';

const Loading = () => {
    return (
        <div className='body-container'>
            <div className='spinner-container'>
                <img src={spinner} className='spinner' alt='spinner'/>
            </div>
        </div>
    );
}

export default Loading;
