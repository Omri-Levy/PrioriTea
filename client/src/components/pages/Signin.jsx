import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';

const Signin = () => {
    const [redirectLink] = useState({redirect: '/'});

    return <Redirect to={redirectLink}/>;
}

export default Signin;
