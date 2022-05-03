import {DragDropContext, Droppable} from "react-beautiful-dnd";
import {useRowSelect, useSortBy, useTable} from "react-table";
import {forwardRef, useEffect, useMemo, useRef} from "react";
import {Checkbox, ScrollArea, Table} from "@mantine/core";
import {useListState} from "@mantine/hooks";
import {THead} from "./THead/THead";
import {TBody} from "./TBody/TBody";
import {BaseColumns, BaseData} from "./types";
import {DnDReactTableProps} from "./interfaces";

export const useConsole = (value: any) => {
	useEffect(() => {
		console.log(value);
	}, [value]);
};

export const IndeterminateCheckbox = forwardRef(
	// @ts-ignore
	({indeterminate, ...rest}, ref) => {
		const defaultRef = useRef(null);
		const resolvedRef = ref || defaultRef;

		useEffect(() => {
			// @ts-ignore
			resolvedRef.current.indeterminate = indeterminate;
		}, [resolvedRef, indeterminate]);

		return (
			<Checkbox
				transitionDuration={0}
				size={'xs'}
				ml={"0.2rem"}
				styles={{ input: { cursor: "pointer" } }}
				// @ts-ignore
				ref={resolvedRef}
				{...rest}
			/>
		);
	});

/**
 * @description Combines react-table and react-beautiful-dnd into a drag and drop table with sort, filter, search, and pagination.
 */
export const DnDReactTable = <TData extends BaseData, TColumns extends BaseColumns>({
																						data,
																						columns,
																						options,
	getSelectedRowIds,
																					}: DnDReactTableProps<TData, TColumns>) => {
	const {
		getTableProps,
		headerGroups,
		getTableBodyProps,
		rows,
		prepareRow,
		// @ts-ignore
		selectedFlatRows,
	} = useTable({data, columns, 				...options,},
		useSortBy,
		useRowSelect,
		(hooks) =>
			hooks.visibleColumns.push((cols) => [
				{
					id: 'selection',
					disableSortBy: true,
					// @ts-ignore
					Header({ getToggleAllRowsSelectedProps }) {
						return (
							<div>
								<IndeterminateCheckbox
									{...getToggleAllRowsSelectedProps()}
								/>
							</div>
						);
					},
					// @ts-ignore
					Cell({ row }) {
						return (
							<div>
								<IndeterminateCheckbox
									// @ts-ignore
									{...row.getToggleRowSelectedProps()}
								/>
							</div>
						);
					},
				},
				...cols,
			])
	);
	const selectedRowIds = useMemo(() =>
		selectedFlatRows?.map(
			(row: {original: {id: string}}) => row.original.id), [selectedFlatRows.length]);

	// React table handles sort, filter, search, and pagination,
	// while react-beautiful-dnd handles drag and drop.
	// Passing the rows to react-beautiful-dnd and not the data ensures
	// the table updates when the data changes and the drag and drop works. (when combined with the useEffect below)
	const [state, handlers] = useListState(rows);

	// Second half of updating data on change.
	useEffect(() => {
		handlers.setState(rows);
	}, [rows, handlers.setState]);

	useEffect(() => {
		if (!getSelectedRowIds) return;

		getSelectedRowIds(selectedRowIds);
	}, [selectedRowIds.length]);

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
