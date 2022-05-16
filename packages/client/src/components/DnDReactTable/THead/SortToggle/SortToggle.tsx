import { FunctionComponent } from "react";
import { Selector } from "tabler-icons-react";
import { SortToggleProps } from "./interfaces";
import "./SortToggle.css";
import { Chevron } from "./Chevron/Chevron";
import { Wrapper } from "./Wrapper/Wrapper";

export const SortToggle: FunctionComponent<SortToggleProps> = (props) => {
	const { canSort, isSorted, isSortedDesc } = props;
	const size = 16;

	if (!canSort) {
		return <Wrapper />;
	}

	return (
		<Wrapper>
			{isSorted ? (
				<Chevron isSortedDesc={isSortedDesc} size={size} />
			) : (
				<Selector size={size} />
			)}
		</Wrapper>
	);
};
