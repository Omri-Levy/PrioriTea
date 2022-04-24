import { createContext, useReducer } from "react";
import { IChildren } from "../../interfaces";
import { loadingReducer } from "./loading-reducer";

export const LoadingContext = createContext({
  loading: false,
  startLoading: () => {},
  stopLoading: () => {},
});

export const LoadingProvider = ({ children }: IChildren) => {
  const [loading, dispatch] = useReducer(loadingReducer, false);

  const startLoading = () => dispatch({ type: "START_LOADING" });
  const stopLoading = () => dispatch({ type: "STOP_LOADING" });

  return (
    <LoadingContext.Provider value={{ loading, startLoading, stopLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
