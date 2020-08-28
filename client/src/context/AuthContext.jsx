import React, {createContext, useReducer, useState} from 'react';
import authReducer from './reducers/authReducer.js';

const AuthContext = createContext(undefined);

const AuthProvider = props => {
    const [isSignedIn, dispatch] = useReducer(authReducer, false);
    const [displayEmailExistsMsg, setDisplayEmailExistsMsg] = useState(
        false);

    const signin = () => dispatch({type: 'SIGNIN'});
    const signout = () => dispatch({type: 'SIGNOUT'});

    return (
        <AuthContext.Provider value={{
            isSignedIn, signin, signout,
            displayEmailExistsMsg, setDisplayEmailExistsMsg
        }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export {AuthContext, AuthProvider};
