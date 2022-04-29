import { ReactNode } from "react";
import {
  Home as HomeIcon, Icon, Login as SignInIcon, User, UserPlus as SignUpIcon
} from "tabler-icons-react";
import { useIsAuth } from "../../api/useIsAuth";
import { Account } from "../pages/Account/Account";
import { Home } from "../pages/Home/Home";
import { SignIn } from "../pages/SignIn/SignIn";
import { SignUp } from "../pages/SignUp/SignUp";

interface IRoute {
  path: string;
  element: ReactNode;
  end: boolean;
  text: string;
  Icon: Icon;
  onClick?: (args?: any[]) => any;
}

export  const protectedRoutes = [
    "/",
    "/account"
  ];

export const useRoutes = function () {
  const isAuth = useIsAuth();
  const routes: Array<IRoute> = [
    {
      path: "/",
      element: <Home />,
      end: true,
      text: "home",
      Icon: HomeIcon,
    },
    {
      path: "/account",
      element: <Account />,
      end: false,
      text: "account",
      Icon: User,
    },
    {
      path: `/sign-in`,
      element: <SignIn />,
      end: true,
      text: `sign in`,
      Icon: SignInIcon,
    },
    {
      path: "/sign-up",
      element: <SignUp />,
      end: true,
      text: "sign up",
      Icon: SignUpIcon,
    },
  ];

  return routes.filter(({path}) => (isAuth && protectedRoutes.includes(path)) || (!isAuth && !protectedRoutes.includes(path)));
};
