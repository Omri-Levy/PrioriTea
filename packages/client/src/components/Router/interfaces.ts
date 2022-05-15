import {ReactNode} from "react";
import {Icon} from "tabler-icons-react";
import {BaseArray} from "@prioritea/types";

export interface IRoute {
	path: string;
	element: ReactNode;
	end?: boolean;
	text?: string;
	Icon?: Icon;
	onClick?: (args?: BaseArray) => any;
}
