import {Link} from 'react-router-dom';
import React, {useContext} from 'react';
import {AuthContext} from '../context/AuthContext.jsx';

const EmailExists = () => {
    const {setDisplayEmailExistsMsg} = useContext(AuthContext);

    return (
        <div className='email-exists'>
            <div className='email-exists-content'>
                Email already exists - navigate to
                <Link
                    to='/signin'
                    className='signin-link'
                    onClick={() => setDisplayEmailExistsMsg(false)}
                >
                    <em>Signin</em>
                </Link>
            </div>
        </div>
    );
};

export default EmailExists;
