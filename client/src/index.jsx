import React from 'react';
import ReactDOM from 'react-dom';
import './static/scss/index.scss';
import {AuthProvider} from './context/AuthContext.jsx';
import {LoadingProvider} from './context/LoadingContext.jsx';
import * as serviceWorker from './serviceWorker.js';
import App from './components/App.jsx';

ReactDOM.render(
    <AuthProvider>
        <LoadingProvider>
            <App/>
        </LoadingProvider>
    </AuthProvider>,
    document.getElementById('root'));

serviceWorker.register();
