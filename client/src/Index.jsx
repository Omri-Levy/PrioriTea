import React from 'react';
import ReactDOM from 'react-dom';
import './static/scss/index.scss';
import '../public/logo.png';
import '../public/favicon.ico';
import * as serviceWorker from './serviceWorker.js';
import App from './components/App.jsx';
import {LoadingProvider} from './context/LoadingContext.jsx';

ReactDOM.render(
    <LoadingProvider>
        <App/>
    </LoadingProvider>,
    document.getElementById('root')
);

serviceWorker.register();
