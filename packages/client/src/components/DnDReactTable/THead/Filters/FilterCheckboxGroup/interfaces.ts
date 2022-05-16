import { Rows } from "../../../types";

export interface FilterCheckboxGroupProps {
	column: {
		filterValue: Array<string>;
		setFilter: (value: Array<string>) => void;
		preFilteredRows: Rows;
		id: string;
	};
	transformer?: (value: string) => string;
}
