import React from 'react';
import Routes from './Routes';
import {AppProvider} from './AppContext';

const App = () => {
    return (
        <AppProvider>
            <Routes/>
        </AppProvider>
    );
}

export default App;
