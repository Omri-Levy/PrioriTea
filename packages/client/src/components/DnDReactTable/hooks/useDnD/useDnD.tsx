import {useCallback, useEffect} from "react";
import {useListState} from "@mantine/hooks";
import {Rows} from "../../types";
import {OnDragEndResponder} from "react-beautiful-dnd";

export const useDnD = (rows: Rows): [Rows, OnDragEndResponder] => {

	// React table handles sort, filter, search, and pagination,
	// while react-beautiful-dnd handles drag and drop.
	// Passing the page to react-beautiful-dnd and not the data ensures
	// the table updates when the data changes and the drag and drop works. (when combined with the useEffect below)
	const [state, handlers] = useListState(rows);
	const onDragEnd: OnDragEndResponder = useCallback(({
														   destination,
														   source
													   }) => {
		return handlers.reorder({
			from: source.index,
			to: destination!.index
		})
	}, [handlers.reorder]);

	// Second half of updating data on change.
	useEffect(() => {
		handlers.setState(rows);
	}, [rows, handlers.setState]);


	return [state, onDragEnd];
}
