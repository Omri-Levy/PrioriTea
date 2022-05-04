import {DragDropContext, Droppable} from "react-beautiful-dnd";
import {
	useGlobalFilter,
	usePagination,
	useRowSelect,
	useSortBy,
	useTable
} from "react-table";
import {forwardRef, FunctionComponent, useEffect, useMemo, useRef} from "react";
import {Checkbox, Pagination, ScrollArea, Skeleton, Table} from "@mantine/core";
import {useListState} from "@mantine/hooks";
import {THead} from "./THead/THead";
import {TBody} from "./TBody/TBody";
import {BaseColumns, BaseData} from "./types";
import {DnDReactTableProps} from "./interfaces";
import {matchSorter} from "match-sorter";

export const useConsole = (...values: any[]) => {
	useEffect(() => {
		console.log(...values);
	}, [values]);
};

interface IndeterminateCheckboxProps {

}

export const IndeterminateCheckbox: FunctionComponent<IndeterminateCheckboxProps> = forwardRef(
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

const fuzzyTextFilter = function(rows: Array<{values: {[key: string]: any}}>, id: string, filterValue: string) {
	return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}

fuzzyTextFilter.autoRemove = (val: string | undefined) => !val;

/**
 * @description Combines react-table and react-beautiful-dnd into a drag and drop table with sort, filter, search, and pagination.
 */
export const DnDReactTable = <TData extends BaseData, TColumns extends BaseColumns>({
																						data,
																						columns,
																						options,
	getSelectedRowIds,
	isLoading,
																					}: DnDReactTableProps<TData, TColumns>) => {
	const tableData = useMemo(() => isLoading ? Array(10).fill({}) : data, [isLoading, data])
	const tableCols = useMemo(() => isLoading ? columns.map((col) => ({
		...col,
		Cell: <Skeleton height={20}/>,
	})) : columns, [isLoading, data])
	const filterTypes = useMemo(() => ({
		text: fuzzyTextFilter,
	}), []);
	const {
		getTableProps,
		headerGroups,
		getTableBodyProps,
		prepareRow,
		selectedFlatRows,
		preGlobalFilteredRows,
		setGlobalFilter,
		visibleColumns,
		state: {globalFilter, pageIndex},
		page,
		pageCount,
		gotoPage,
	} = useTable({
			data: tableData,
			columns: tableCols,
			filterTypes,
			...options,
		},
		useGlobalFilter,
		useSortBy,
		usePagination,
		useRowSelect,
		(hooks) =>
			hooks.visibleColumns.push((cols) => [
				{
					id: 'selection',
					disableSortBy: true,
					// @ts-ignore
					Header({ getToggleAllRowsSelectedProps }) {
						return (
								<IndeterminateCheckbox
									{...getToggleAllRowsSelectedProps()}
								/>
						);
					},
					// @ts-ignore
					Cell({ row }) {
						return (
								<IndeterminateCheckbox
									// @ts-ignore
									{...row.getToggleRowSelectedProps()}
								/>
						);
					},
				},
				...cols,
			])
	);

	const selectedRowIds = useMemo(() =>
		selectedFlatRows?.map(
			// @ts-ignore
			(row) => row.original.id), [selectedFlatRows.length]);

	// React table handles sort, filter, search, and pagination,
	// while react-beautiful-dnd handles drag and drop.
	// Passing the page to react-beautiful-dnd and not the data ensures
	// the table updates when the data changes and the drag and drop works. (when combined with the useEffect below)
	const [state, handlers] = useListState(page);

	// Second half of updating data on change.
	useEffect(() => {
		handlers.setState(page);
	}, [page, handlers.setState]);

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
						marginBottom: "1rem",
						minWidth: 420,
						'& tbody tr td': {borderBottom: 0}
					}} {...getTableProps()}>
					<DnDReactTable.THead
						// visibleColumns.length without + 1 leaves an empty column.
						visibleColumnsLength={visibleColumns.length + 1}
						preGlobalFilteredRows={preGlobalFilteredRows}
						setGlobalFilter={setGlobalFilter}
						globalFilter={globalFilter}
						headerGroups={headerGroups}
					/>
					<Droppable droppableId="dnd-list" direction="vertical">
						{(provided) => (
							<DnDReactTable.TBody
								provided={provided}
								getTableBodyProps={getTableBodyProps}
								page={state}
								prepareRow={prepareRow}
							/>
						)}
					</Droppable>
				</Table>
				<Pagination
					siblings={2}
					page={pageIndex + 1}
					onChange={(page) => gotoPage(page - 1)}
					total={pageCount}
					getItemAriaLabel={(page) => {
						switch (page) {
							case 'dots':
								return 'dots element aria-label';
							case 'prev':
								return 'previous page button aria-label';
							case 'next':
								return 'next page button aria-label';
							case 'first':
								return 'first page button aria-label';
							case 'last':
								return 'last page button aria-label';
							default:
								return `${page} item aria-label`;
						}
					}}
				/>
			</DragDropContext>
		</ScrollArea>
	);
}



DnDReactTable.THead = THead;

DnDReactTable.TBody = TBody;

