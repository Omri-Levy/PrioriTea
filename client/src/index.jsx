import React from 'react';
import ReactDOM from 'react-dom';
import './static/scss/index.scss';
import * as serviceWorker from './serviceWorker.js';
import App from './components/App.jsx';

ReactDOM.render(<App/>, document.getElementById('root'));

serviceWorker.register();
