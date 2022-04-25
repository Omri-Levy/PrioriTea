import { AuthApi } from "../../api/auth-api";
import { useAuthContext } from "../../context/AuthContext/useAuthContext";
import { Home } from "../pages/Home/Home";
import { Profile } from "../pages/Profile/Profile";
import { SignIn } from "../pages/SignIn/SignIn";
import { SignUp } from "../pages/SignUp/SignUp";

export const useRoutes = function () {
  const { isSignedIn, signOut } = useAuthContext();
  const routes = [
    {
      path: "/",
      element: <Home />,
      auth: true,
      end: true,
      text: "home",
    },
    {
      path: "/profile",
      element: <Profile />,
      auth: true,
      end: false,
      text: "profile",
    },
    {
      path: `/sign-in`,
      element: <SignIn />,
      auth: false,
      end: true,
      // Navigates to sign in on sign out.
      text: `sign ${isSignedIn ? "out" : "in"}`,
      async onClick() {
        // Signs out at the server
        await AuthApi.signOut();

        // Updates the UI
        signOut();
      },
    },
    {
      path: "/sign-up",
      element: <SignUp />,
      auth: false,
      end: true,
      text: "sign up",
    },
  ];

  return routes.filter(
    ({ auth, path }) =>
      (auth && isSignedIn) || (!auth && !isSignedIn) || path === "/sign-in"
  );
};
