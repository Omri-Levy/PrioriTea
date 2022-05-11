import {FunctionComponent} from "react";
import {Center} from "@mantine/core";
import {ChevronDown, ChevronUp, Selector} from "tabler-icons-react";
import {SortToggleProps} from "./interfaces";

export const SortToggle: FunctionComponent<SortToggleProps> = (props) => {
	const {canSort, isSorted, isSortedDesc} = props;

	return (
		<Center style={{
			borderRadius: 21,
			width: 21,
			height: 21,
		}}>
			{

				canSort ?

					isSorted
						?

						isSortedDesc
							? <ChevronDown size={16}/>
							: <ChevronUp size={16}/>
						: <Selector size={16}/> : null}
		</Center>
	);
}
