import React from 'react';
import ReactDOM from 'react-dom';
import './static/scss/index.scss';
import { LoadingProvider, AuthProvider } from './context';
import * as serviceWorker from './serviceWorker.js';
import { App } from './components';

ReactDOM.render(
	<AuthProvider>
		<LoadingProvider>
			<App />
		</LoadingProvider>
	</AuthProvider>,
	document.getElementById('root'),
);

serviceWorker.register();
