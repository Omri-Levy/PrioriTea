import {AppShell, Container} from "@mantine/core";
import {FunctionComponent} from "react";
import {Outlet} from "react-router-dom";
import "./Unauthenticated.css"
import {
	UnauthenticatedHeader
} from "./UnauthenticatedHeader/UnauthenticatedHeader";
import {
	UnauthenticatedFooter
} from "./UnauthenticatedFooter/UnauthenticatedFooter";


export const UnauthenticatedLayout: FunctionComponent =
	() => {

		return (
			<AppShell
				className={"app-shell--unauthenticated"}
				navbarOffsetBreakpoint="sm"
				asideOffsetBreakpoint="sm"
				fixed
				footer={
					<UnauthenticatedFooter/>
				}
				header={
					<UnauthenticatedHeader/>
				}
			>
				<Container size={"sm"}>
					<Outlet/>
				</Container>
			</AppShell>
		);
	};
