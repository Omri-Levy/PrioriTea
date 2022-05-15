import {SortingRule} from "react-table";
import {useSearchParams} from "react-router-dom";
import {useEffect, useMemo} from "react";
import qs from "qs";

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
	const [searchParams, setSearchParams] = useSearchParams();

	const params = useMemo(() =>
			// Converts an object of id and value to an object of the id as a key and the value as the key's value.
			// { id, value } -> { id: value }
			filters.reduce(
				// @ts-ignore
				(acc, curr) => {
					acc[curr.id] = curr.value;

					return acc;
				}, {} as { [key: string]: string })
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
