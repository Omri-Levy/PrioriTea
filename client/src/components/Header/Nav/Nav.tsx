import { useCallback, useEffect } from "react";
import { AuthApi } from "../../../api/auth-api";
import { useAuthContext } from "../../../context/AuthContext/useAuthContext";
import { slideNav } from "../../../static/js/slide-nav/slide-nav";
import { useRoutes } from "../../Router/useRoutes";
import {NavLink} from "./NavLink/NavLink";

export const Nav = () => {
  const { signIn } = useAuthContext();
  const routes = useRoutes();
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
    <nav className="nav">
      <ul className="nav__list">
        <>
          {routes.map(function ({ path, end, text, onClick }) {
            return (
              <NavLink to={path} end={end} onClick={onClick}>
                {text}
              </NavLink>
            );
          })}
        </>
      </ul>
      <div onClick={slideNav} className="burger">
        <div className="line1" />
        <div className="line2" />
        <div className="line3" />
      </div>
    </nav>
  );
};
