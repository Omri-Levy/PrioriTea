import { Row, TableBodyPropGetter, TableBodyProps } from "react-table";

export interface TBodyProps<TData extends Array<Row<{ [p: string]: any }>>> {
	getTableBodyProps: (
		propGetter?: TableBodyPropGetter<{ [p: string]: any }> | undefined
	) => TableBodyProps;
	rows: TData;
	prepareRow: (row: Row<{ [p: string]: any }>) => void;
}
