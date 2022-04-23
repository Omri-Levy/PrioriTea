import React, { createContext, useReducer, useState } from 'react';
import authReducer from './auth-reducer.js';

export const AuthContext = createContext(undefined);

export const AuthProvider = (props) => {
	const [isSignedIn, dispatch] = useReducer(authReducer, false);
	const [displayEmailExistsMsg, setDisplayEmailExistsMsg] = useState(false);

	const signIn = () => dispatch({ type: 'SIGN_IN' });
	const signOut = () => dispatch({ type: 'SIGN_OUT' });

	return (
		<AuthContext.Provider
			value={{
				isSignedIn,
				signIn,
				signOut,
				displayEmailExistsMsg,
				setDisplayEmailExistsMsg,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};
