import {useState} from "react";
import {Group} from "@mantine/core";
import {DnDReactTable} from "../../DnDReactTable/DnDReactTable";
import {CreateTaskModal} from "./CreateTaskModal/CreateTaskModal";
import {useTasksQuery} from "./hooks/useTasksQuery/useTasksQuery";
import {UpdateTaskModal} from "./UpdateTaskModal/UpdateTaskModal";
import {useTasksColumns} from "./hooks/useTasksColumns/useTasksColumns";
import {DeleteTasks} from "./DeleteTasks/DeleteTasks";
import {SomethingWentWrong} from "../../SomethingWentWrong/SomethingWentWrong";
import "./Tasks.css";

export const Tasks = () => {
	const {data: tasks = [], isLoading, isError} = useTasksQuery();
	// For react-table
	const columns = useTasksColumns();
	const [selectedTasksIds, setSelectedTasksIds] = useState<Array<string>>([]);

	// Update selected task
	const [firstSelectedTaskId = ""] = selectedTasksIds;

	// Conditions to disable the actions
	// Same as length === 0, also covers falsy values. (should not happen in this case)
	const noSelectedTasks = !selectedTasksIds.length;
	// Ids can't be empty, and currently it is only possible to update a single task at a time.
	const invalidIdToUpdate = selectedTasksIds.length !== 1;

	if (isError) {
		return <SomethingWentWrong/>;
	}

	return (
		<>
			<Group position="right" className={`tasks__modal-wrapper`}>
				<CreateTaskModal/>
				<DeleteTasks
					disabled={noSelectedTasks}
					selectedTasksIds={selectedTasksIds}
				/>
				<UpdateTaskModal
					id={firstSelectedTaskId}
					disabled={invalidIdToUpdate}
				/>
			</Group>
			<DnDReactTable
				isLoading={isLoading}
				data={tasks}
				columns={columns}
				options={{
					initialState: {
						hiddenColumns: ["id"],
					},
				}}
				setSelectedRowsIds={setSelectedTasksIds}
			/>
		</>
	);
};
