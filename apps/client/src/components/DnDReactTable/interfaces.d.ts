import {BaseColumns, BaseData} from "./types";
import {UseTableOptions} from "react-table";

export interface DnDReactTableProps<TData extends BaseData, TColumns extends BaseColumns> {
	data: TData;
	columns: TColumns;
	options?: UseTableOptions;
	getSelectedRowIds?: (ids: Array<string>) => void;
	isLoading?: boolean;
}
