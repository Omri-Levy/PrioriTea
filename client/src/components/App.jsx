import React, {useContext, useEffect} from 'react';
import {AuthContext} from '../context/AuthContext.jsx';
import setIsSignedInPost from '../static/js/requests/setSignedInPost.js';
import Routes from './Routes.jsx';

const App = ({history}) => {
    const {signin, signout} = useContext(AuthContext);

    useEffect(() => {
        const persistSignin = async () => {
            await setIsSignedInPost(signin, signout, history);
        }

        persistSignin().catch(err => console.error(err));
    }, [signin, signout, history]);

    return <Routes/>;
};

export default App;
