import React from 'react';
import ReactDOM from 'react-dom';
import '../scss/index.scss';
import '../../../public/logo.png';
import '../../../public/favicon.ico';
import * as serviceWorker from './serviceWorker.js';
import App from '../../components/App.jsx';
import {AppProvider} from '../../components/AppContext.jsx';

ReactDOM.render(
    <AppProvider>
        <App/>
    </AppProvider>,
    document.getElementById('root')
);

serviceWorker.register();
