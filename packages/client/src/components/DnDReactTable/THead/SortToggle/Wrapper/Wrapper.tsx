import {FunctionComponent} from "react";
import {IChildren} from "../../../../../interfaces";
import {Center} from "@mantine/core";

export const Wrapper: FunctionComponent<Partial<IChildren>> = ({children}) => (
	<Center className={'sort-toggle__center'}>
		{children}
	</Center>
)
