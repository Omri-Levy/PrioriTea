import {ActionIcon, Group} from "@mantine/core";
import {Pencil, Plus, Trash} from "tabler-icons-react";
import {DnDReactTable} from "../../DnDReactTable/DnDReactTable";
import {useToggle} from "../../../hooks/useToggle/useToggle";
import {useTasksColumns} from "./hooks/useTasksColumns/useTasksColumns";
import {CreateTaskModal} from "./CreateTaskModal/CreateTaskModal";
import {useTasksQuery} from "./hooks/useTasksQuery/useTasksQuery";


export const Home = () => {
	const {isToggled: isOpen, toggleOn: onOpen, toggleOff: onClose} = useToggle(false);

	const columns = useTasksColumns();
	const {data: tasks, isLoading, isError} = useTasksQuery();

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return <div>Error</div>;
	}

	if (!tasks) {
		return <div>No tasks</div>;
	}

	return (
		<>
		<CreateTaskModal
			isOpen={isOpen}
			onClose={onClose}
		/>
			<Group position="right">
				<ActionIcon mb="1rem" size={24} color="primary" radius="xl" variant="filled"
							onClick={onOpen}>
					<Plus size={18} />
				</ActionIcon>
				<ActionIcon mb="1rem" size={24} color="primary" radius="xl" variant="filled"
				>
					<Trash size={18} />
				</ActionIcon>
				<ActionIcon mb="1rem" size={24} color="primary" radius="xl" variant="filled"
				>
					<Pencil size={18} />
				</ActionIcon>
			</Group>
			<DnDReactTable data={tasks} columns={columns}/>
		</>
	);
};
