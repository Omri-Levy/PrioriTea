import {Link} from 'react-router-dom';
import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../context/AuthContext.jsx';

const EmailExists = () => {
    const {setDisplayEmailExistsMsg} = useContext(AuthContext);
    const [msgFits, setMsgFits] = useState(true);

    const ifMsgFits = () => {
        if (window.innerWidth < 399) {
            setMsgFits(false);
        }
    }

    useEffect(() => {
        window.addEventListener('resize', ifMsgFits);
    }, []);


    return (
        <div className='email-exists'>
            <div className='email-exists-content'>
                {msgFits
                    ? <>Email already exists - navigate to</>
                    : <>Email already exists</>}
                {msgFits &&
                <Link
                    to='/sign_in'
                    className='sign-in-link'
                    onClick={() => setDisplayEmailExistsMsg(false)}
                >
                    <em>Signin</em>
                </Link>}
            </div>
        </div>
    );
};

export default EmailExists;
