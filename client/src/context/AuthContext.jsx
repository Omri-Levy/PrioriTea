import React, {createContext, useEffect, useReducer} from 'react';
import authReducer from './reducers/authReducer.js';

const AuthContext = createContext(undefined);


const AuthProvider = props => {
    const [isLoggedIn, dispatch] = useReducer(authReducer,
        JSON.parse(localStorage.getItem('isLoggedIn')) || false);

    const signin = () => dispatch({type: 'SIGNIN'});
    const signout = () => dispatch({type: 'SIGNOUT'});

    useEffect(() => {
        localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
    }, [isLoggedIn]);

    return (
        <AuthContext.Provider value={{
            isLoggedIn, signin, signout
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export {AuthContext, AuthProvider};
