import {ActionIcon, Tooltip} from "@mantine/core";
import {Trash} from "tabler-icons-react";
import {
	useDeleteTasksMutation
} from "./hooks/useDeleteTasksMutation/useDeleteTasksMutation";
import {FunctionComponent, useCallback} from "react";
import {DeleteTasksProps} from "./interfaces";

export const DeleteTasks: FunctionComponent<DeleteTasksProps> = ({
																	 disabled,
																	 selectedTasksIds
																 }) => {
	const {mutateAsync} = useDeleteTasksMutation();
	const deleteSelectedTasks = useCallback(async () =>
			mutateAsync({ids: selectedTasksIds})
		, [selectedTasksIds]);

	return (
		<Tooltip label={'Delete selected tasks'} withArrow>
			<ActionIcon
				mb="1rem"
				size={24}
				color="primary"
				radius="xl"
				variant="filled"
				disabled={disabled}
				onClick={deleteSelectedTasks}
			>
				<Trash size={18}/>
			</ActionIcon>
		</Tooltip>
	);
}
