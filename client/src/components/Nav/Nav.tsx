import { useCallback, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { AuthApi } from "../../api/auth-api";
import { useAuthContext } from "../../context/AuthContext/useAuthContext";
import { slideNav } from "../../static/js/slide-nav/slide-nav";

export const Nav = () => {
  const { isSignedIn, signOut, signIn } = useAuthContext();

  const fetchCurrentUser = useCallback(async () => {
    const { data } = await AuthApi.getUserInfo();
    const currentPageIsSignin = window.location.pathname === "/sign-in";
    const currentPageIsRoot = window.location.pathname === "/";

    if (data?.user) return signIn();

    if (!currentPageIsSignin && currentPageIsRoot) {
      window.location.href = "/sign-in";
    }
  }, [signIn]);

  useEffect(() => {
    fetchCurrentUser()
      .then()
      .catch((err) => console.error(err));
  }, [fetchCurrentUser]);

  return (
    <nav>
      <ul>
        {isSignedIn && (
          <li className="nav-link">
            <NavLink
              className={({ isActive }) => (isActive ? "current-link" : "")}
              end
              to="/"
            >
              HOME
            </NavLink>
          </li>
        )}
        {isSignedIn && (
          <li className="nav-link">
            <NavLink
              className={({ isActive }) => (isActive ? "current-link" : "")}
              to="/profile"
            >
              PROFILE
            </NavLink>
          </li>
        )}
        {!isSignedIn && (
          <li className="nav-link">
            <NavLink
              className={({ isActive }) => (isActive ? "current-link" : "")}
              to="/sign-in"
            >
              SIGN IN
            </NavLink>
          </li>
        )}
        {isSignedIn && (
          <li className="nav-link">
            <NavLink
              className={({ isActive }) => (isActive ? "current-link" : "")}
              onClick={async () => {
                await AuthApi.signOut();

                signOut();
              }}
              to="/sign-in"
            >
              SIGN OUT
            </NavLink>
          </li>
        )}
        {!isSignedIn && (
          <li className="nav-link">
            <NavLink
              className={({ isActive }) => (isActive ? "current-link" : "")}
              to="/sign-up"
            >
              SIGN UP
            </NavLink>
          </li>
        )}
      </ul>
      <div onClick={slideNav} className="burger">
        <div className="line1" />
        <div className="line2" />
        <div className="line3" />
      </div>
    </nav>
  );
};
