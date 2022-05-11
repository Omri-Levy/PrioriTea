import {DragDropContext, Droppable} from "react-beautiful-dnd";
import {
	Column,
	SortingRule,
	useFilters,
	useGlobalFilter,
	usePagination,
	useRowSelect,
	useSortBy,
	useTable
} from "react-table";
import {forwardRef, FunctionComponent, useEffect, useMemo, useRef} from "react";
import {Checkbox, Pagination, ScrollArea, Skeleton, Table} from "@mantine/core";
import {useListState, useMediaQuery} from "@mantine/hooks";
import {THead} from "./THead/THead";
import {TBody} from "./TBody/TBody";
import {BaseData} from "./types";
import {DnDReactTableProps} from "./interfaces";
import {matchSorter} from "match-sorter";
import {useSearchParams} from "react-router-dom";
import qs from "qs";

/**
 * @description console.log useEffect with the passed values passed to the dependency array. Accepts any number of arguments, or alternatively an array of values.
 * @param values
 */
export const useConsole = (...values: any[]) => {
	useEffect(() => {
		console.log(...values);
	}, [values]);
};

/**
 * @description Returns an array of n numbers.
 * @param n
 */
export const arrayOfN = (n: number) =>
	Array.from({length: n }, (_, i) => i + 1);

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
 * @description Returns a boolean for if the value is null or undefined, with the addition of TypeScript support (is keyword).
 * @param value
 */
export const isNullish = (value: any): value is null | undefined =>
	value === null || value === undefined;

export const noNullish = <TData extends Array<unknown>,>(
	parts: TemplateStringsArray,
	...exps: TData
	// TypeScript can't infer the return value.
): string =>
	// TemplateStringsArray can not be reduced.
	Array.from(parts)
		// slice(1) since the reduce's initial value is parts[0].
		.slice(1)
		// Concatenate the parts and the expressions, while dropping null and undefined expressions.
		.reduce((str, char, i) => {

			// drops ${null} and ${undefined}
			if (!isNullish(exps[i])) {
				// @ts-ignore
				str += exps[i];
			}

			// Add non-expressions regardless of value.
			str += char;

			return str;

			// parts[1] is unneeded for this purpose.
			// ?? `` since TypeScript insists the return value is any
			// for the function and string | undefined for str.
		}, parts[0] ?? ``);

export const uniqueArray = <
	TItem,
	>
(arr: IterableIterator<TItem> | Array<TItem>): Array<TItem> =>
	[...new Set(arr)];

export const ifAny = (...conditions: Array<boolean>) =>
	conditions.some(Boolean);

export const ifEvery = (...conditions: Array<boolean>) =>
	conditions.every(Boolean);

export const useGetSearchParams = (
): [Array<{id: string,  value: Array<string>}>, string | undefined, {id: string, desc: boolean}, {offset: number; limit: number;}] => {
	const [searchParams] = useSearchParams();
	const GLOBAL_FILTER = 'search';

	// Converts the search params to the shape react-table expects
	return useMemo(() => {
		const params = uniqueArray(searchParams.keys())
			.map((id) => ({id, value: searchParams.getAll(id)}));
		const filters = params.filter((f) =>
			ifEvery(
			f.id !== GLOBAL_FILTER,
			f.id !== 'sort_by',
			f.id !== 'order_by',
			f.id !== 'offset',
			f.id !== 'limit',
		));
		const globalFilter = params.find((f) => f.id === GLOBAL_FILTER)?.value.join('');
		const sortBy = params.reduce((acc, curr) => {
			const [value] = curr.value;

			if (!value) return acc;

			if (curr.id === 'sort_by') {
				acc.id = value;
			}

			if (curr.id === 'order_by'){
				acc.desc = value === 'desc';
			}


			return acc;
		}, {} as {id: string, desc: boolean});
		const pagination = params.reduce((acc, curr) => {
			const [value] = curr.value;

			if (!value) return acc;

			if (curr.id === 'offset') {
				acc.offset = parseInt(value);
			}

			if (curr.id === 'limit'){
				acc.limit = parseInt(value);
			}


			return acc;
		}, {} as {offset: number, limit: number});

		return [filters, globalFilter, sortBy, pagination];
	}, [searchParams]);
}

export const useSetSearchParams = (
	filters: Array<{
	id: string, value: string
}>,
	globalFilter: string | undefined,
								   sortBy: Array<SortingRule<{
	id: string;
	desc: boolean;
}>>,
	{
		offset,
		limit,
	}: {
		offset: number;
		limit: number;
	}
) => {
	const [searchParams,setSearchParams] = useSearchParams();

	const params = useMemo(() =>
			// Converts an object of id and value to an object of the id as a key and the value as the key's value.
			// { id, value } -> { id: value }
			filters.reduce(
				// @ts-ignore
				(acc, curr) => {
					acc[curr.id] = curr.value;

					return acc;
				}, {} as {[key: string]: string})
		, [filters]);
	const GLOBAL_FILTER = 'search';
	// Syncs the search params with the checked filters,
	// avoids clearing the search params on refresh.
	useEffect(() => {
		const [sort] = sortBy;

		setSearchParams(qs.stringify(
			{
				...searchParams,
				...params,
				[GLOBAL_FILTER]: globalFilter,
				sort_by: sort?.id ?? 'priority',
				order_by: sort ? (sort?.desc ? 'desc' : 'asc') : 'desc',
				offset,
				limit,
			},
			{arrayFormat: 'repeat'}
		));
	}, [params, globalFilter, sortBy?.[0]?.id, sortBy?.[0]?.desc, offset, limit]);
}

/**
 * @description Combines react-table and react-beautiful-dnd into a drag and drop table with sort, filter, search, and pagination.
 */
export const DnDReactTable = <TData extends BaseData, TColumns extends Array<Column>>({
																						  data,
																						  columns,
																						  options,
																						  getSelectedRowIds,
																						  // Let the consumer decide how many skeleton rows and pages to show.
																						  // default to 10.
																						  skeletonPages = 10,
																						  skeletonRows = 10,
																						  isLoading,}: DnDReactTableProps<TData, TColumns>) => {
	// Display skeleton rows when data is loading
	const tableData = useMemo(() => isLoading ? arrayOfN(skeletonRows) : data, [isLoading, data])
	const tableCols = useMemo(() => isLoading ? columns.map((col) => ({
		...col,
		Cell: <Skeleton height={21.7}/>,
	})) : columns, [isLoading, data])
	// For the global search and filter checkboxes
	const filterTypes = useMemo(() => ({
		text: fuzzyTextFilter,
		// @ts-ignore
		multiSelect: (rows, id, filterValues) => {
			if (filterValues.length === 0) return rows;

			// @ts-ignore
			return rows.filter((row) =>
				// Handles numbers
				filterValues.includes(row.values[id]?.toString()));
		},
	}), []);
	const [cachedFilters, cachedGlobalFilter, {id, desc}, {offset = 0, limit = 10 }] = useGetSearchParams();
	const {
		getTableProps,
		headerGroups,
		getTableBodyProps,
		prepareRow,
		selectedFlatRows,
		preGlobalFilteredRows,
		setGlobalFilter,
		visibleColumns,
		state: {globalFilter, filters, sortBy,pageIndex, pageSize},
		page,
		pageCount,
		gotoPage,
	} = useTable({
			data: tableData,
			columns: tableCols,
			filterTypes,
			...options,
			initialState: {
				pageIndex: Math.ceil(offset / limit),
				pageSize: limit,
				filters: cachedFilters,
				globalFilter: cachedGlobalFilter,
				sortBy: [{id, desc}],
				...options.initialState,
			},
		},
		useFilters,
		useGlobalFilter,
		useSortBy,
		usePagination,
		useRowSelect,
		(hooks) =>
			// Adds the selection checkboxes to the table, and removes sort and filter functionality.
			hooks.visibleColumns.push((cols) => [
				{
					id: 'selection',
					disableSortBy: true,
					disableFilters: true,
					disableGlobalFilter: true,
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
	const pagination = useMemo(() => ({
		offset: pageIndex * pageSize,
		limit: pageSize,
	}), [pageIndex, pageSize]);

	useSetSearchParams(
		filters,
		globalFilter,
		sortBy,
		pagination
	);

	// Used to send an array of ids to the delete enddpoint
	const selectedRowIds = useMemo(() =>
		selectedFlatRows?.map(
			// @ts-ignore
			(row) => row.original.id), [selectedFlatRows.length]);

	// React table handles sort, filter, search, and pagination,
	// while react-beautiful-dnd handles drag and drop.
	// Passing the page to react-beautiful-dnd and not the data ensures
	// the table updates when the data changes and the drag and drop works. (when combined with the useEffect below)
	const [state, handlers] = useListState(page);
	const isLargerThanSm = useMediaQuery('(min-width: 500px)');


	// Second half of updating data on change.
	useEffect(() => {
		handlers.setState(page);
	}, [page, handlers.setState]);

	// Passes the ids to the parent component
	useEffect(() => {
		if (!getSelectedRowIds) return;

		getSelectedRowIds(selectedRowIds);
	}, [selectedRowIds.length]);


	// Avoids empty pages with no pagination when filters are enabled.
	useEffect(() => {
		if (pageIndex === 0) return;

		gotoPage(0);
	}, [pageCount])

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
				<div style={{display: "grid", alignItems: "flex-start", gridTemplateColumns: "1fr", minHeight: "55vh"}}>
					<Table
						highlightOnHover
						sx={{
							minWidth: 420,
							marginBottom: "1rem",
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
						style={{alignSelf: "flex-end"}}
						withEdges={isLargerThanSm}
						boundaries={isLargerThanSm ? 0 : 1}
						siblings={isLargerThanSm ? 2 : undefined}
						// human-readable, not zero-based.
						page={pageIndex + 1}
						onChange={(page) => gotoPage(page - 1)}
						total={isLoading ? skeletonPages : pageCount || 1}
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
				</div>
			</DragDropContext>
		</ScrollArea>
	);
}



DnDReactTable.THead = THead;

DnDReactTable.TBody = TBody;

