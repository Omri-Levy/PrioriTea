import {Column} from "react-table";
import {useEffect, useMemo} from "react";
import {Pagination, ScrollArea, Skeleton, Table} from "@mantine/core";
import {useMediaQuery} from "@mantine/hooks";
import {THead} from "./THead/THead";
import {TBody} from "./TBody/TBody";
import {DnDReactTableProps} from "./interfaces";
import {arrayOfN} from "@prioritea/utils";
import {
	useTableWithPlugins
} from "./hooks/useTableWithPlugins/useTableWithPlugins";
import {
	useGetSearchParams
} from "./hooks/useGetSearchParams/useGetSearchParams";
import {
	useSetSearchParams
} from "./hooks/useSetSearchParams/useSetSearchParams";
import {
	useSelectedRowsIds
} from "./hooks/useSelectedRowsIds/useSelectedRowsIds";
import './DnDReactTable.css';

/**
 * @description Combines react-table and react-beautiful-dnd into a drag and drop table with sort, filter, search, and pagination.
 */
export const DnDReactTable = <TData extends Array<Column<{}>>, TColumns extends Array<Column>>(props: DnDReactTableProps<TData, TColumns>) => {
	const {
		data,
		columns,
		options,
		setSelectedRowsIds,
		// Let the consumer decide how many skeleton rows and pages to show.
		// default to 10.
		skeletonPages = 10,
		skeletonRows = 10,
		isLoading,
	} = props;

	const isLargerThanSm = useMediaQuery('(min-width: 500px)');

	// Display skeleton rows when data is loading
	const tableData = useMemo(() => isLoading ? arrayOfN(skeletonRows) : data, [isLoading, data])
	const tableCols = useMemo(() => isLoading ? columns.map((col) => ({
		...col,
		Cell: <Skeleton height={21.7}/>,
	})) : columns, [isLoading, data])

	// Get initial state from search params
	const [cachedFilters, cachedGlobalFilter, {id, desc}, {
		offset = 0,
		limit = 10
	}] = useGetSearchParams();

	const {
		getTableProps,
		headerGroups,
		getTableBodyProps,
		prepareRow,
		selectedFlatRows,
		preGlobalFilteredRows,
		setGlobalFilter,
		visibleColumns,
		state: {globalFilter, filters, sortBy, pageIndex, pageSize},
		page: rows,
		pageCount,
		gotoPage,
	} = useTableWithPlugins({
		data: tableData,
		columns: tableCols,
		...options,
		initialState: {
			pageIndex: Math.ceil(offset / limit),
			pageSize: limit,
			filters: cachedFilters,
			globalFilter: cachedGlobalFilter,
			sortBy: [{id, desc}],
			...options.initialState,
		},
	});
	useSelectedRowsIds(selectedFlatRows, setSelectedRowsIds);

	const pagination = useMemo(() => ({
		offset: pageIndex * pageSize,
		limit: pageSize,
	}), [pageIndex, pageSize]);

	// Set search params on change
	useSetSearchParams(
		filters,
		globalFilter,
		sortBy,
		pagination
	);

	// Avoids empty pages with no pagination when filters are enabled.
	useEffect(() => {
		if (pageIndex === 0) return;

		gotoPage(0);
	}, [pageCount])

	return (
		<ScrollArea>
			<div className={`dnd-react-table__container`}>
				<Table
					highlightOnHover
					className={'dnd-react-table'}
					{...getTableProps()}
				>
					<DnDReactTable.THead
						// visibleColumns.length without + 1 leaves an empty column.
						visibleColumnsLength={visibleColumns.length + 1}
						preGlobalFilteredRows={preGlobalFilteredRows}
						setGlobalFilter={setGlobalFilter}
						globalFilter={globalFilter}
						headerGroups={headerGroups}
					/>
					<DnDReactTable.TBody
						getTableBodyProps={getTableBodyProps}
						rows={rows}
						prepareRow={prepareRow}
					/>
				</Table>
				<Pagination
					className={`dnd-react-table__pagination`}
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
		</ScrollArea>
	);
}

DnDReactTable.THead = THead;
DnDReactTable.TBody = TBody;

