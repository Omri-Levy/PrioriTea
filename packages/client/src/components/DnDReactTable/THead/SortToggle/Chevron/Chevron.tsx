import { FunctionComponent } from "react";
import { ChevronDown, ChevronUp } from "tabler-icons-react";
import { ChevronProps } from "./interfaces";

export const Chevron: FunctionComponent<ChevronProps> = ({
	isSortedDesc,
	size,
}) => (isSortedDesc ? <ChevronUp size={size} /> : <ChevronDown size={size} />);
