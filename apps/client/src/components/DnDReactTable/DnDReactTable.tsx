import {DragDropContext, Droppable} from "react-beautiful-dnd";
import {useGlobalFilter, useRowSelect, useSortBy, usePagination, useTable} from "react-table";
import {forwardRef, FunctionComponent, useEffect, useMemo, useRef} from "react";
import {Checkbox, ScrollArea, Table} from "@mantine/core";
import {useListState} from "@mantine/hooks";
import {THead} from "./THead/THead";
import {TBody} from "./TBody/TBody";
import {BaseColumns, BaseData} from "./types";
import {DnDReactTableProps} from "./interfaces";
import {matchSorter} from "match-sorter";

export const useConsole = (value: any) => {
	useEffect(() => {
		console.log(value);
	}, [value]);
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
																					}: DnDReactTableProps<TData, TColumns>) => {
	const filterTypes = useMemo(() => ({
		fuzzyText: fuzzyTextFilter,
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
		state: {globalFilter, pageIndex, pageSize},
		page,
		canPreviousPage,
		canNextPage,
		pageOptions,
		pageCount,
		gotoPage,
		nextPage,
		previousPage,
		setPageSize,
	} = useTable({
			data,
			columns,
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
						minWidth: 420,
						'& tbody tr td': {borderBottom: 0}
					}} {...getTableProps()}>
					<DnDReactTable.THead
						visibleColumnsLength={visibleColumns.length}
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
				<div className="pagination">
					<button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
						{'<<'}
					</button>{' '}
					<button onClick={() => previousPage()} disabled={!canPreviousPage}>
						{'<'}
					</button>{' '}
					<button onClick={() => nextPage()} disabled={!canNextPage}>
						{'>'}
					</button>{' '}
					<button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
						{'>>'}
					</button>{' '}
					<span>
          Page{' '}
						<strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
					<span>
          | Go to page:{' '}
						<input
							type="number"
							defaultValue={pageIndex + 1}
							onChange={e => {
								const page = e.target.value ? Number(e.target.value) - 1 : 0
								gotoPage(page)
							}}
							style={{ width: '100px' }}
						/>
        </span>{' '}
					<select
						value={pageSize}
						onChange={e => {
							setPageSize(Number(e.target.value))
						}}
					>
						{[10, 20, 30, 40, 50].map(pageSize => (
							<option key={pageSize} value={pageSize}>
								Show {pageSize}
							</option>
						))}
					</select>
				</div>
			</DragDropContext>
		</ScrollArea>
	);
}



DnDReactTable.THead = THead;

DnDReactTable.TBody = TBody;

