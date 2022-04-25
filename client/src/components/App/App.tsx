import { AuthProvider } from "../../context/AuthContext/AuthContext";
import { LoadingProvider } from "../../context/LoadingContext/LoadingContext";
import { Router } from "../Router/Router";
import "../../static/scss/index.scss";

export const App = () => {
  return (
    <AuthProvider>
      <LoadingProvider>
        <Router />
      </LoadingProvider>
    </AuthProvider>
  );
};
