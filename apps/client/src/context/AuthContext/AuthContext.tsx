import { createContext } from "react";
import { useToggle } from "../../hooks/useToggle/useToggle";
import { IAuthContext, IChildren } from "../../interfaces";

export const AuthContext = createContext<IAuthContext>({
  isSignedIn: false,
  signIn: () => {},
  signOut: () => {},
  displayEmailExistsMsg: false,
  toggleOnDisplayEmailExistsMsg: () => {},
  toggleOffDisplayEmailExistsMsg: () => {},
});

export const AuthProvider = ({ children }: IChildren) => {
  const {isToggled: isSignedIn, toggleOn: signIn, toggleOff: signOut} = useToggle();
  const {isToggled: displayEmailExistsMsg, toggleOff: toggleOffDisplayEmailExistsMsg, toggleOn: toggleOnDisplayEmailExistsMsg} = useToggle();

  return (
    <AuthContext.Provider
      value={{
        isSignedIn,
        signIn,
        signOut,
        displayEmailExistsMsg,
        toggleOffDisplayEmailExistsMsg,
        toggleOnDisplayEmailExistsMsg,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
