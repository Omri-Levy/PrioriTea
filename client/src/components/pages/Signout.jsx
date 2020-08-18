import React, {useContext} from 'react';
import {AuthContext} from '../../context/AuthContext.jsx';

const Signout = () => {
    const {signout} = useContext(AuthContext);
    signout();
    return (
        <div>
            <h1>Signout</h1>
        </div>
    );
}

export default Signout;
