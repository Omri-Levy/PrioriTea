import React from 'react';
import ReactDOM from 'react-dom';
import '../static/scss/index.scss';
import '../../public/logo.png';
import '../../public/favicon.ico';
import * as serviceWorker from '../static/js/serviceWorker.js';
import App from './App.jsx';
import {AppProvider} from './AppContext.jsx';

ReactDOM.render(
    <AppProvider>
        <App/>
    </AppProvider>,
    document.getElementById('root')
);

serviceWorker.register();
