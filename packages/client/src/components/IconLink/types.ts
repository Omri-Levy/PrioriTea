import { ActionIconProps } from "@mantine/core";
import { Icon } from "tabler-icons-react";

export interface IconLinkProps extends ActionIconProps<"a"> {
	href: string;
	Icon: Icon;
}
