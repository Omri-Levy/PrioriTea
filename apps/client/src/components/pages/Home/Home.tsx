import {ActionIcon, Group, Tooltip} from "@mantine/core";
import {Pencil, Plus, Trash} from "tabler-icons-react";
import {DnDReactTable} from "../../DnDReactTable/DnDReactTable";
import {useToggle} from "../../../hooks/useToggle/useToggle";
import {useTasksColumns} from "./hooks/useTasksColumns/useTasksColumns";
import {CreateTaskModal} from "./CreateTaskModal/CreateTaskModal";
import {useTasksQuery} from "./hooks/useTasksQuery/useTasksQuery";
import {useCallback, useState} from "react";
import {useMutation, useQueryClient} from "react-query";
import {Tasks, TasksApi} from "../../../api/tasks-api";


export const useDeleteTasksMutation = () => {
	const queryClient = useQueryClient();

	return useMutation(['tasks'], async ({ids}: {ids: Array<string>}) => {
		const {data} = await TasksApi.deleteByIds(ids);

		return data.data.tasks;
	}, {
		async onMutate({ids}) {
			await queryClient.cancelQueries(['tasks']);

			const prevTasks = queryClient.getQueryData(['tasks']) as Tasks;

			queryClient.setQueryData(['tasks'], (prev) =>
			// @ts-ignore
				prev.filter((id) => !ids.includes(id))
			);

			return {prevTasks};
		},
		onError(_err, _ids, context: {prevTasks: Tasks} | undefined) {
			queryClient.setQueryData(['tasks'], context?.prevTasks);
		},
		onSuccess(tasks) {
			queryClient.setQueryData(['tasks'], tasks);
		}
	})
}

export const Home = () => {
	const {isToggled: isOpen, toggleOn: onOpen, toggleOff: onClose} = useToggle(false);

	const columns = useTasksColumns();
	const {data: tasks, isLoading, isError} = useTasksQuery();
	const [selectedRowIds, setSelectedRowIds] = useState<Array<string>>([]);
	const getSelectedRowIds = useCallback((ids: Array<string>) => {
		setSelectedRowIds(ids);
	}, [setSelectedRowIds]);
	const {mutateAsync} = useDeleteTasksMutation();
	const deleteSelectedTasks = useCallback(async () => {
		await mutateAsync({ids: selectedRowIds});
	}, [selectedRowIds]);

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
			<Group position="right" pr={"1rem"}>
				<Tooltip label={'Create task'} withArrow>
				<ActionIcon mb="1rem" size={24} color="primary" radius="xl" variant="filled"
							onClick={onOpen}>
					<Plus size={18} />
				</ActionIcon>
				</Tooltip>
				<Tooltip label={'Delete selected tasks'} withArrow>
				<ActionIcon
					mb="1rem"
					size={24}
					color="primary"
					radius="xl"
					variant="filled"
					disabled={!selectedRowIds?.length}
					onClick={deleteSelectedTasks}
				>
					<Trash size={18} />
				</ActionIcon>
				</Tooltip>
				<Tooltip label={'Edit task'} withArrow>
				<ActionIcon mb="1rem" size={24} color="primary" radius="xl" variant="filled"
				>
					<Pencil size={18} />
				</ActionIcon>
				</Tooltip>
			</Group>
			<DnDReactTable
				data={tasks}
				columns={columns}
				options={{
				initialState: {
					hiddenColumns: ['id']
				}
			}}
				getSelectedRowIds={getSelectedRowIds}
			/>
		</>
	);
};
