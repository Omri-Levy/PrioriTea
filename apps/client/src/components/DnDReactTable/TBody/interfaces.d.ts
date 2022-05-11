import {Row, TableBodyPropGetter, TableBodyProps} from "react-table";

export interface TBodyProps {
	getTableBodyProps: (propGetter?: (TableBodyPropGetter<{ [p: string]: any }> | undefined)) => TableBodyProps;
	page: Row<object>[];
	prepareRow: (row: Row<{ [p: string]: any }>) => void;
}
