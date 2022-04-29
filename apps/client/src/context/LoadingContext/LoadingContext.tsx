import { createContext } from "react";
import { useToggle } from "../../hooks/useToggle/useToggle";
import { IChildren } from "../../interfaces";

export const LoadingContext = createContext({
  isLoading: false,
  startLoading: () => {},
  stopLoading: () => {},
});

export const LoadingProvider = ({ children }: IChildren) => {
  const {
    isToggled: isLoading,
    toggleOff: stopLoading,
    toggleOn: startLoading,
  } = useToggle();

  return (
    <LoadingContext.Provider value={{ isLoading, startLoading, stopLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
