import {DroppableProvided} from "react-beautiful-dnd";
import {Row, TableBodyPropGetter, TableBodyProps} from "react-table";

export interface TBodyProps {
	provided: DroppableProvided;
	getTableBodyProps: (propGetter?: (TableBodyPropGetter<{ [p: string]: any }> | undefined)) => TableBodyProps;
	page:  Row<object>[];
	prepareRow: (row: Row<{ [p: string]: any }>) => void;
}
