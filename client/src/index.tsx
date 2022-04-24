import { createRoot } from "react-dom/client";
import { App } from "./components/App/App";
import { AuthProvider } from "./context/AuthContext/AuthContext";
import { LoadingProvider } from "./context/LoadingContext/LoadingContext";
// @ts-ignore
import * as serviceWorker from "./serviceWorker";
import "./static/scss/index.scss";

const container = document.getElementById("app");
const root = createRoot(container!);

root.render(
  <AuthProvider>
    <LoadingProvider>
      <App />
    </LoadingProvider>
  </AuthProvider>
);

// @ts-ignore
serviceWorker.register();
