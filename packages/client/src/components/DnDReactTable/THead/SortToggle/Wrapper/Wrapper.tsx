import {FunctionComponent} from "react";
import {Center} from "@mantine/core";
import {IChildren} from "../../../../../interfaces";

export const Wrapper: FunctionComponent<Partial<IChildren>> = ({
																   children,
															   }) => <Center
	className={"sort-toggle__center"}>{children}</Center>;
