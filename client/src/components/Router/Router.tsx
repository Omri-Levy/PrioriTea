import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext/useAuthContext";
import { Header } from "../Header/Header";
import { Home } from "../pages/Home/Home";
import { Profile } from "../pages/Profile/Profile";
import { SignIn } from "../pages/SignIn/SignIn";
import { SignUp } from "../pages/SignUp/SignUp";

export const Router = () => {
  const { isSignedIn } = useAuthContext();
  const routes = [
    {
      path: "/",
      element: <Home />,
      auth: true,
    },
    {
      path: "/profile",
      element: <Profile />,
      auth: true,
    },
    {
      path: "/sign-in",
      element: <SignIn />,
      auth: false,
    },
    {
      path: "/sign-up",
      element: <SignUp />,
      auth: false,
    },
  ];

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {routes.map(function ({ path, element, auth }) {
          if ((isSignedIn && !auth) || (!isSignedIn && auth)) return null;

          return <Route path={path} element={element} />;
        })}
      </Routes>
    </BrowserRouter>
  );
};
