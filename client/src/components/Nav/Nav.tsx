import { useCallback, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext/useAuthContext";
import { fetchFn } from "../../static/js/requests/fetch-fn/fetch-fn";
import { slideNav } from "../../static/js/slide-nav/slide-nav";

export const Nav = () => {
  const { isSignedIn, signOut, signIn } = useAuthContext();
  const getCurrentUserUrl = `${process.env.REACT_APP_API}/get-current-user`;
  const signOutUrl = `${process.env.REACT_APP_API_AUTH}/sign-out`;

  const fetchCurrentUser = useCallback(async () => {
	    const getCurrentUserOptions = {
        method: "POST",
        credentials: "include",
      };
    const { data } = await fetchFn(getCurrentUserUrl, getCurrentUserOptions);
    const currentPageIsSignin = window.location.pathname === "/sign-in";
    const currentPageIsRoot = window.location.pathname === "/";

    if (data && data.email) return signIn();

    if (!currentPageIsSignin && currentPageIsRoot) {
      window.location.href = "/sign-in";
    }
  }, [signIn, getCurrentUserUrl]);

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
                const signOutOptions = {
                  method: "POST",
                  credentials: "include",
                };
                try {
                  await fetchFn(signOutUrl, signOutOptions);
                } catch (err) {
                  console.error(err);
                }

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
