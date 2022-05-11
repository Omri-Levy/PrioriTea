import {BaseArray} from "@prioritea/types";

export interface SearchBarProps {
	visibleColumnsLength: number;
	preGlobalFilteredRows: BaseArray;
	globalFilter: string | undefined;
	setGlobalFilter: (value: string) => void;
}
