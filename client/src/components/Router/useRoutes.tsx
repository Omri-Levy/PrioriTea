import { AuthApi } from "../../api/auth-api";
import { useAuthContext } from "../../context/AuthContext/useAuthContext";
import { Home } from "../pages/Home/Home";
import { Profile } from "../pages/Profile/Profile";
import { SignIn } from "../pages/SignIn/SignIn";
import { SignUp } from "../pages/SignUp/SignUp";
import {
  Login as SignInIcon,
  Logout as SignOutIcon,
  Home as HomeIcon,
  Id,
  Icon,
  UserPlus as SignUpIcon,
} from "tabler-icons-react";
import { ReactNode } from "react";

interface IRoute {
  path: string;
  element: ReactNode;
  auth: boolean;
  end: boolean;
  text: string;
  Icon: Icon;
  onClick?: (args?: any[]) => any;
}

export const useRoutes = function () {
  const { isSignedIn } = useAuthContext();
  const routes: Array<IRoute> = [
    {
      path: "/",
      element: <Home />,
      auth: true,
      end: true,
      text: "home",
      Icon: HomeIcon,
    },
    {
      path: "/profile",
      element: <Profile />,
      auth: true,
      end: false,
      text: "profile",
      Icon: Id,
    },
    {
      path: `/sign-in`,
      element: <SignIn />,
      auth: false,
      end: true,
      text: `sign in`,
      Icon: SignInIcon,
    },
    {
      path: "/sign-up",
      element: <SignUp />,
      auth: false,
      end: true,
      text: "sign up",
      Icon: SignUpIcon,
    },
  ];

  return routes.filter(({ auth }) => !isSignedIn && !auth);
};
