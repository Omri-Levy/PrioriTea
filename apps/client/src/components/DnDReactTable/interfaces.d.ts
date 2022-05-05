import {BaseData} from "./types";
import {Column, UseTableOptions} from "react-table";

export interface DnDReactTableProps<TData extends BaseData, TColumns extends Array<Column>> {
	data: TData;
	columns: TColumns;
	options?: UseTableOptions;
	getSelectedRowIds?: (ids: Array<string>) => void;
	isLoading?: boolean;
}
