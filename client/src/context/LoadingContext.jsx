import React, {createContext, useReducer} from 'react';
import loadingReducer from './reducers/loadingReducer.js';

const LoadingContext = createContext(undefined);


const LoadingProvider = props => {
    const [loading, dispatch] = useReducer(loadingReducer, false);

    const startLoading = () => dispatch({type: 'START_LOADING'});
    const stopLoading = () => dispatch({type: 'STOP_LOADING'});

    return (
        <LoadingContext.Provider value={{loading, startLoading, stopLoading}}>
            {props.children}
        </LoadingContext.Provider>
    );
};

export {LoadingContext, LoadingProvider};
