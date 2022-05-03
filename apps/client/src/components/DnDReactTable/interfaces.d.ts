import {BaseColumns, BaseData} from "./types";

export interface DnDReactTableProps<TData extends BaseData, TColumns extends BaseColumns> {
	data: TData;
	columns: TColumns;
}
