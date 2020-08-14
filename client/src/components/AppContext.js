import React, {createContext, useState} from 'react';

const AppContext = createContext(undefined);

const AppProvider = props => {
    const [loading, setLoading] = useState(false);
    return (
        <AppContext.Provider value={[loading, setLoading]}>
            {props.children}
        </AppContext.Provider>
    );
}

export {AppContext, AppProvider};
