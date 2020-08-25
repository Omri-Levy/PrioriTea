import React from 'react';

const OnePager = () => {
    return (
        <nav>
            <ul>
                <li>
                    <a
                        id={'page-1'}
                        className='current-page'
                    >
                        1
                    </a>
                </li>
            </ul>
        </nav>
    );
}

export default OnePager;
