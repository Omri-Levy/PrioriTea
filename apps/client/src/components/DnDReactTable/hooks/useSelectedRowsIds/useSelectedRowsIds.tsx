import {Rows} from "../../types";
import {useEffect, useMemo} from "react";

export const useSelectedRowsIds = (selectedFlatRows: Rows, setSelectedRowsIds: ((ids: string[]) => void) | undefined) => {
	// Used to send an array of ids to the delete enddpoint
	const selectedRowsIds = useMemo(() =>
		selectedFlatRows?.map(
			// @ts-ignore
			(row) => row.original.id), [selectedFlatRows.length]);

	// Passes the ids to the parent component
	useEffect(() => {
		if (!setSelectedRowsIds) return;

		setSelectedRowsIds(selectedRowsIds);
	}, [selectedRowsIds.length]);
}
