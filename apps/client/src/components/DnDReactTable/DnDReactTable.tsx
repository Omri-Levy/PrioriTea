import {DragDropContext, Droppable} from "react-beautiful-dnd";
import {useSortBy, useTable} from "react-table";
import {useEffect} from "react";
import {ScrollArea, Table} from "@mantine/core";
import {useListState} from "@mantine/hooks";
import {THead} from "./THead/THead";
import {TBody} from "./TBody/TBody";
import {BaseColumns, BaseData} from "./types";
import {DnDReactTableProps} from "./interfaces";

export const DnDReactTable = <TData extends BaseData, TColumns extends BaseColumns>({
																						data,
																						columns
																					}: DnDReactTableProps<TData, TColumns>) => {
	const {
		getTableProps,
		headerGroups,
		getTableBodyProps,
		rows,
		prepareRow
	} = useTable({data, columns}, useSortBy);
	// React table handles sort, filter, search, and pagination,
	// while react-beautiful-dnd handles drag and drop.
	// Passing the rows to react-beautiful-dnd and not the data ensures
	// the table updates when the data changes and the drag and drop works.
	const [state, handlers] = useListState(rows);

	// Otherwise useListState does not update once the data is no longer empty.
	useEffect(() => {
		handlers.setState(rows);
	}, [rows]);

	return (
		<ScrollArea>
			<DragDropContext
				onDragEnd={({destination, source}) => {
					return handlers.reorder({
						from: source.index,
						to: destination!.index
					})
				}}
			>
				<Table
					highlightOnHover
					sx={{
					minWidth: 420,
					'& tbody tr td': {borderBottom: 0}
				}} {...getTableProps()}>
					<DnDReactTable.THead
						headerGroups={headerGroups}
					/>
					<Droppable droppableId="dnd-list" direction="vertical">
						{(provided) => (
							<DnDReactTable.TBody
								provided={provided}
								getTableBodyProps={getTableBodyProps}
								rows={state}
								prepareRow={prepareRow}
							/>
						)}
					</Droppable>
				</Table>
			</DragDropContext>
		</ScrollArea>
	);
}



DnDReactTable.THead = THead;

DnDReactTable.TBody = TBody;
