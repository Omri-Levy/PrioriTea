import { createContext, useReducer, useState } from "react";
import { IAuthContext, IChildren } from "../../interfaces";
import authReducer from "./auth-reducer";

export const AuthContext = createContext<IAuthContext>({
  isSignedIn: false,
  signIn: () => {},
  signOut: () => {},
  displayEmailExistsMsg: false,
  toggleEmailExistsMsg: () => {},
});

export const AuthProvider = ({ children }: IChildren) => {
  const [isSignedIn, dispatch] = useReducer(authReducer, false);
  const [displayEmailExistsMsg, setDisplayEmailExistsMsg] = useState(false);
  const toggleEmailExistsMsg = (next: boolean) =>
    setDisplayEmailExistsMsg(next);

  const signIn = () => dispatch({ type: "SIGN_IN" });
  const signOut = () => dispatch({ type: "SIGN_OUT" });

  return (
    <AuthContext.Provider
      value={{
        isSignedIn,
        signIn,
        signOut,
        displayEmailExistsMsg,
        toggleEmailExistsMsg,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
