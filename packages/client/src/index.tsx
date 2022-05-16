import {StrictMode} from 'react';
import {createRoot} from "react-dom/client";
import {App} from "./components/App/App";
// @ts-ignore
import * as serviceWorker from "./serviceWorker";
import './index.css';

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
	<StrictMode>
		<App/>
	</StrictMode>
);

// @ts-ignore
serviceWorker.register();

