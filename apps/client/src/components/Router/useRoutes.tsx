import { ReactNode } from "react";
import {
  ListDetails, Icon, Login as SignInIcon, User, UserPlus as SignUpIcon
} from "tabler-icons-react";
import { useIsAuth } from "../pages/SignIn/hooks/useIsAuth/useIsAuth";
import { Account } from "../pages/Account/Account";
import { Tasks } from "../pages/Tasks/Tasks";
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

export const useRoutes = () => {
  const isAuth = useIsAuth();
  const routes: Array<IRoute> = [
    {
      path: "/",
      element: <Tasks />,
      end: true,
      text: "tasks",
      Icon: ListDetails,
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
