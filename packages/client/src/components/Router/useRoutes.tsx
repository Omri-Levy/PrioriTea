import {
	Home,
	ListDetails,
	Login as SignInIcon,
	User,
	UserPlus as SignUpIcon,
} from "tabler-icons-react";
import {Navigate} from "react-router-dom";
import {Account} from "../pages/Account/Account";
import {Tasks} from "../pages/Tasks/Tasks";
import {SignIn} from "../pages/SignIn/SignIn";
import {SignUp} from "../pages/SignUp/SignUp";
import {protectedRoutes} from "./protectedRoutes";
import {IRoute} from "./interfaces";
import {Hero} from "../pages/Hero/Hero";

/**
 * @description Returns an array of properties to be used for nav links and routes, filtered by auth state.
 * @param isAuth {boolean} - Whether the user is authenticated.
 * @returns {Array<IRoute>} - An array of path, text, and icon for nav link, end and element for the router.
 */
export const useRoutes = (isAuth: boolean) => {
	const routes: Array<IRoute> = [
		isAuth ? {
			path: "/",
			end: true,
			element: <Tasks/>,
			text: "tasks",
			Icon: ListDetails,
		} : {
			path: "/",
			end: true,
			element: <Hero/>,
			text: "home",
			Icon: Home,
		},
		{
			path: "/account",
			element: <Account/>,
			text: "account",
			Icon: User,
		},
		{
			path: `/sign-in`,
			element: <SignIn/>,
			end: true,
			text: `sign in`,
			Icon: SignInIcon,
		},
		{
			path: "/sign-up",
			element: <SignUp/>,
			end: true,
			text: "sign up",
			Icon: SignUpIcon,
		},
		{
			path: "*",
			element: <Navigate to={isAuth ? "/" : "/sign-in"}/>,
		},
	];

	// Filter routes based on auth state
	return routes.filter(({path}) => {
		const isProtected = isAuth && protectedRoutes.includes(path);
		const isUnprotected = !isAuth && !protectedRoutes.includes(path);
		const isFallback = path === "*";
		const isRoot = path === "/";

		return isProtected || isUnprotected || isFallback || isRoot;
	});
};
