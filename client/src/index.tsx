import ReactDOM from 'react-dom';
import { App } from './components/App/App';
import { AuthProvider } from './context/AuthContext/AuthContext';
import { LoadingProvider } from './context/LoadingContext/LoadingContext';
import * as serviceWorker from './serviceWorker';
import './static/scss/index.scss';

ReactDOM.render(
	<AuthProvider>
		<LoadingProvider>
			<App />
		</LoadingProvider>
	</AuthProvider>,
	document.getElementById('root'),
);

serviceWorker.register();
