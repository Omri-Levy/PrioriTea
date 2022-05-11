import {
	PluginHook,
	TableInstance,
	useFilters,
	useGlobalFilter,
	usePagination,
	useRowSelect,
	useSortBy,
	useTable,
	UseTableOptions
} from "react-table";
import {useMemo} from "react";
import {fuzzyTextFilter} from "../utils/fuzzy-text-filter/fuzzy-text-filter";
import {
	IndeterminateCheckbox
} from "../IndeterminateCheckbox/IndeterminateCheckbox";

/**
 * @param options
 * @param plugins
 * @description Creates a react-table instance with defaults, including pagination, global filter, filters, and sort, additional options and plugins can be passed in.
 */
export const useTableWithPlugins = <D extends object = {}>(options: UseTableOptions<D>, ...plugins: Array<PluginHook<D>>): TableInstance<D> => {
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

	return useTable({
			// @ts-ignore
			filterTypes,
			...options,
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
					Header({getToggleAllRowsSelectedProps}) {
						return (
							// @ts-ignore
							<IndeterminateCheckbox
								{...getToggleAllRowsSelectedProps()}
							/>
						);
					},
					// @ts-ignore
					Cell({row}) {
						return (
							<IndeterminateCheckbox
								// @ts-ignore
								{...row.getToggleRowSelectedProps()}
							/>
						);
					},
				},
				...cols,
			]),
		...plugins,
	);
}
