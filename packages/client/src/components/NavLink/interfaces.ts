import { MouseEventHandler } from "react";
import { IChildren } from "../../interfaces";

export interface LinkProps extends IChildren {
	end?: boolean;
	to: string;
	onClick?: MouseEventHandler<HTMLAnchorElement>;
}
