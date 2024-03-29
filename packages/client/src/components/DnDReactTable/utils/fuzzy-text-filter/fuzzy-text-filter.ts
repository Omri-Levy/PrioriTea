import {matchSorter} from "match-sorter";

export const fuzzyTextFilter = function (
	rows: Array<{ values: { [key: string]: any } }>,
	id: string,
	filterValue: string
) {
	return matchSorter(rows, filterValue, {keys: [(row) => row.values[id]]});
};

// eslint-disable-next-line
fuzzyTextFilter.autoRemove = (val: string | undefined) => !val;
