import {useSearchParams} from "react-router-dom";
import {useMemo} from "react";
import {ifEvery, uniqueArray} from "@prioritea/utils";

export const useGetSearchParams = (): [
	Array<{ id: string; value: Array<string> }>,
		string | undefined,
	{ id: string; desc: boolean },
	{ offset: number; limit: number }
] => {
	const [searchParams] = useSearchParams();
	const GLOBAL_FILTER = "search";

	// Converts the search params to the shape react-table expects
	return useMemo(() => {
		const params = uniqueArray(searchParams.keys()).map((id) => ({
			id,
			value: searchParams.getAll(id),
		}));
		const filters = params.filter((f) =>
			ifEvery(
				f.id !== GLOBAL_FILTER,
				f.id !== "sort_by",
				f.id !== "order_by",
				f.id !== "offset",
				f.id !== "limit"
			)
		);
		const globalFilter = params
			.find((f) => f.id === GLOBAL_FILTER)
			?.value.join("");
		const sortBy = params.reduce((acc, curr) => {
			const [value] = curr.value;

			if (!value) return acc;

			if (curr.id === "sort_by") {
				acc.id = value;
			}

			if (curr.id === "order_by") {
				acc.desc = value === "desc";
			}

			return acc;
		}, {} as { id: string; desc: boolean });
		const pagination = params.reduce((acc, curr) => {
			const [value] = curr.value;

			if (!value) return acc;

			if (curr.id === "offset") {
				acc.offset = parseInt(value, 10);
			}

			if (curr.id === "limit") {
				acc.limit = parseInt(value, 10);
			}

			return acc;
		}, {} as { offset: number; limit: number });

		return [filters, globalFilter, sortBy, pagination];
	}, [searchParams]);
};
