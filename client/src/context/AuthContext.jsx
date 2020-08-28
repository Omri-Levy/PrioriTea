import React, {createContext, useReducer} from 'react';
import authReducer from './reducers/authReducer.js';

const AuthContext = createContext(undefined);

const AuthProvider = props => {
    const [isLoggedIn, dispatch] = useReducer(authReducer, false);

    const signin = () => dispatch({type: 'SIGNIN'});
    const signout = () => dispatch({type: 'SIGNOUT'});

    return (
        <AuthContext.Provider value={{isLoggedIn, signin, signout}}>
            {props.children}
        </AuthContext.Provider>
    );
};

export {AuthContext, AuthProvider};
