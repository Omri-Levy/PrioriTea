import React from 'react';
import {Redirect} from 'react-router-dom';

const Signin = () => {
    const redirectLink = {redirect: '/'};

    return <Redirect to={redirectLink}/>;
}

export default Signin;
