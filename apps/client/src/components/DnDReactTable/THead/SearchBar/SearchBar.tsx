import {FunctionComponent} from "react";
import {Search} from "../../../pages/Tasks/Tasks";
import {SearchBarProps} from "./interfaces";

export const SearchBar: FunctionComponent<SearchBarProps> = (props) => {
	const {
		visibleColumnsLength,
		preGlobalFilteredRows,
		globalFilter,
		setGlobalFilter
	} = props;

	return (
		<tr>
			<th
				colSpan={visibleColumnsLength}
			>
				<Search
					preGlobalFilteredRows={preGlobalFilteredRows}
					globalFilter={globalFilter}
					setGlobalFilter={setGlobalFilter}
				/>
			</th>
		</tr>
	);
}
