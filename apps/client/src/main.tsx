// Required for react-table
import "regenerator-runtime";
import {createRoot} from "react-dom/client";
import {App} from "./components/App/App";
// @ts-ignore
import * as serviceWorker from "./serviceWorker";

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
	<App/>
);

// @ts-ignore
serviceWorker.register();
