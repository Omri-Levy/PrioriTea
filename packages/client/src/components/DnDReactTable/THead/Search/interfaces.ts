import { BaseArray } from "@prioritea/types";

export interface SearchProps {
	visibleColumnsLength: number;
	preGlobalFilteredRows: BaseArray;
	globalFilter: string | undefined;
	setGlobalFilter: (value: string) => void;
}
