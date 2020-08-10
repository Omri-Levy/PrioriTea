import {Link} from 'react-router-dom';
import React from 'react';

const EmailExists = () => {
    return (
        <div className='email-exists'>
            <div className='email-exists-content'>
                Email already exists - navigate to
                <Link
                    to='/signin'
                    className='signin-link'
                    onClick={() => console.log('dispatchHideEmailExistsMsg')}
                >
                    <em>Signin</em>
                </Link>
            </div>
        </div>
    );
}

export default EmailExists;
