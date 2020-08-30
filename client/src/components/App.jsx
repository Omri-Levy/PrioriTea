import React from 'react';
import {AuthProvider} from '../context/AuthContext.jsx';
import {LoadingProvider} from '../context/LoadingContext.jsx';
import Routes from './Routes.jsx';

const App = () => {

    return (
        <AuthProvider>
            <LoadingProvider>
                <Routes/>
            </LoadingProvider>
        </AuthProvider>
    );
};

export default App;
