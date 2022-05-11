import {useEffect, useMemo} from "react";
import {useListState} from "@mantine/hooks";
import {Rows} from "../../types";

export const useHandleDnD = (selectedFlatRows: Rows, getSelectedRowIds: ((ids: Array<string>) => void) | undefined, rows: Rows): [Rows, ({
																																			 from,
																																			 to
																																		 }: { from: number; to: number; }) => Rows] => {

	// Used to send an array of ids to the delete enddpoint
	const selectedRowIds = useMemo(() =>
		selectedFlatRows?.map(
			// @ts-ignore
			(row) => row.original.id), [selectedFlatRows.length]);

	// React table handles sort, filter, search, and pagination,
	// while react-beautiful-dnd handles drag and drop.
	// Passing the page to react-beautiful-dnd and not the data ensures
	// the table updates when the data changes and the drag and drop works. (when combined with the useEffect below)
	const [state, handlers] = useListState(rows);


	// Second half of updating data on change.
	useEffect(() => {
		handlers.setState(rows);
	}, [rows, handlers.setState]);

	// Passes the ids to the parent component
	useEffect(() => {
		if (!getSelectedRowIds) return;

		getSelectedRowIds(selectedRowIds);
	}, [selectedRowIds.length]);

	return [state, handlers.reorder];
}
