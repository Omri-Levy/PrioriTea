import React, {useContext} from 'react';
import {Redirect} from 'react-router-dom';
import {AuthContext} from '../../context/AuthContext.jsx';

const Signin = () => {
    const {signin} = useContext(AuthContext);
    signin();
    return <Redirect to={{redirect: '/'}}/>;
}

export default Signin;
