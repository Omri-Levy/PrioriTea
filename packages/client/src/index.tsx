import './index.css';
// Required for react-table
import "regenerator-runtime";
import {createRoot} from "react-dom/client";
import {App} from "./components/App/App";
// @ts-ignore
import * as serviceWorker from "./serviceWorker";
import {StrictMode} from 'react';

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
	<StrictMode>
		<App/>
	</StrictMode>
);

// @ts-ignore
serviceWorker.register();

