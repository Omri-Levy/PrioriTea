// Required for react-table
import "regenerator-runtime";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./components/App/App";
// @ts-ignore
import * as serviceWorker from "./serviceWorker";

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);

// @ts-ignore
serviceWorker.register();
