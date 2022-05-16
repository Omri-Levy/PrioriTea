import { HeaderGroup } from "react-table";
import { BaseArray } from "@prioritea/types";

export interface THeadProps {
	headerGroups: HeaderGroup<{ [p: string]: any }>[];
	setGlobalFilter: (value: string) => void;
	globalFilter: string | undefined;
	preGlobalFilteredRows: BaseArray;
	visibleColumnsLength: number;
	filters?: Array<{
		// An array of filters
		value: Array<string>;
		label: string;
		onChange: (value: Array<string>) => void;
		values: Array<string>;
	}>;
}
