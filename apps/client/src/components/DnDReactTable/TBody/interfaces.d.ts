import {DroppableProvided} from "react-beautiful-dnd";
import {Row, TableBodyPropGetter, TableBodyProps} from "react-table";

export interface TBodyProps {
	provided: DroppableProvided;
	getTableBodyProps: (propGetter?: (TableBodyPropGetter<{ [p: string]: any }> | undefined)) => TableBodyProps;
	rows: Row<{ [p: string]: any }>[];
	prepareRow: (row: Row<{ [p: string]: any }>) => void;
}
