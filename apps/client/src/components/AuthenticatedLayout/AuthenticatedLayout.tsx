import {AppShell} from "@mantine/core";
import {FunctionComponent} from "react";
import {Outlet} from "react-router-dom";
import "./AuthenticatedLayout.css";
import {useToggle} from "../../hooks/useToggle/useToggle";
import {AuthenticatedNavbar} from "./AuthenticatedNavbar/AuthenticatedNavbar";
import {AuthenticatedHeader} from "./AuthenticatedHeader/AuthenticatedHeader";

export const AuthenticatedLayout: FunctionComponent = () => {
	const [isOpen, toggleIsOpen, toggleOffIsOpen] = useToggle(false);

	return (
		<AppShell
			className={"app-shell--authenticated"}
			navbarOffsetBreakpoint="sm"
			asideOffsetBreakpoint="sm"
			fixed
			header={<AuthenticatedHeader isOpen={isOpen}
										 toggleIsOpen={toggleIsOpen}/>}
			navbar={<AuthenticatedNavbar isOpen={isOpen}
										 toggleOffIsOpen={toggleOffIsOpen}/>}
		>
			<Outlet/>
		</AppShell>
	);
};
