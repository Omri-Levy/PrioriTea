import React from 'react';
import ReactDOM from 'react-dom';
import '../scss/index.scss';
import '../../../public/logo.png';
import '../../../public/favicon.ico';
import * as serviceWorker from './serviceWorker.js';
import App from '../../components/App.js';

ReactDOM.render(
        <App/>,
    document.getElementById('app')
);

serviceWorker.register();
