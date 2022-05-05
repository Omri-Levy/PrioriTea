import {HeaderGroup} from "react-table";

export interface THeadProps {
	headerGroups: HeaderGroup<{ [p: string]: any }>[];
	setGlobalFilter: (value: string) => void;
	globalFilter: string;
	preGlobalFilteredRows: Array<any>;
	visibleColumnsLength: number;
	filters?: Array<{
		// An array of filters
		value: Array<string>;
		label: string;
		onChange: (value: Array<string>) => void;
		values: Array<string>;
	}>;
}
