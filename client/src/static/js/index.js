import React from 'react';
import ReactDOM from 'react-dom';
import '../scss/index.scss';
import '../../../public/logo.png';
import '../../../public/favicon.ico';
import * as serviceWorker from './serviceWorker.js';
import './listeners/media259.js';
import './listeners/media258.js';
import './listeners/media228.js';
import './listeners/media198.js';
import App from '../../components/App.js';

ReactDOM.render(
        <App/>,
    document.getElementById('app')
);

serviceWorker.register();
