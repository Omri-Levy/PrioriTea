import {
	ActionIcon,
	Group,
	TextInput,
	Tooltip,
	useMantineTheme
} from "@mantine/core";
import {ArrowLeft, ArrowRight, Pencil, Plus, Search as SearchIcon, Trash} from "tabler-icons-react";
import {DnDReactTable} from "../../DnDReactTable/DnDReactTable";
import {useToggle} from "../../../hooks/useToggle/useToggle";
import {useTasksColumns} from "./hooks/useTasksColumns/useTasksColumns";
import {CreateTaskModal} from "./CreateTaskModal/CreateTaskModal";
import {useTasksQuery} from "./hooks/useTasksQuery/useTasksQuery";
import {FunctionComponent, useCallback, useState} from "react";
import {useMutation, useQueryClient} from "react-query";
import {Tasks as TasksType, TasksApi} from "../../../api/tasks-api";
import { UpdateTaskModal } from "./UpdateTaskModal/UpdateTaskModal";
import {useAsyncDebounce} from "react-table";

export interface SearchProps {
	preGlobalFilteredRows: TasksType;
	setGlobalFilter: (value: string) => void;
	globalFilter: string | undefined;
}

export const Search: FunctionComponent<SearchProps> = function({
						  preGlobalFilteredRows,
						  globalFilter,
						  setGlobalFilter,
					  }) {
	const count = preGlobalFilteredRows.length
	const [value, setValue] = useState(globalFilter)
	const onChange = useAsyncDebounce(value => {
		setGlobalFilter(value || undefined)
	}, 1000)
	const theme = useMantineTheme();

	return (
		<TextInput
			icon={<SearchIcon size={18} />}
			radius="xl"
			size="md"
			rightSection={
				<ActionIcon size={32} radius="xl" color={theme.primaryColor} variant="filled">
					{theme.dir === 'ltr' ? <ArrowRight size={18} /> : <ArrowLeft size={18} />}
				</ActionIcon>
			}
			styles={{wrapper: {width: "25rem"}}}
			rightSectionWidth={42}
			value={value || ""}
			onChange={e => {
				setValue(e.target.value);
				onChange(e.target.value);
			}}
			placeholder={`Searching in ${count} records...`}
		/>
	)
}

export const useDeleteTasksMutation = () => {
	const queryClient = useQueryClient();

	return useMutation(['tasks'], async ({ids}: {ids: Array<string>}) => {
		const {data} = await TasksApi.deleteByIds(ids);

		return data.data.tasks;
	}, {
		async onMutate({ids}) {
			await queryClient.cancelQueries(['tasks']);

			const prevTasks = queryClient.getQueryData(['tasks']) as TasksType;

			queryClient.setQueryData(['tasks'], (prev) =>
				// @ts-ignore
				prev.filter((id) => !ids.includes(id))
			);

			return {prevTasks};
		},
		onError(_err, _ids, context: {prevTasks: TasksType} | undefined) {
			queryClient.setQueryData(['tasks'], context?.prevTasks);
		},
		onSettled() {
			queryClient.invalidateQueries(['tasks']);
		}
	})
}

export const Tasks = () => {
	const {isToggled: deleteModalIsOpen, toggleOn: deleteModalOnOpen, toggleOff: deleteModalOnClose} = useToggle(false);
	const {isToggled: updateModalIsOpen, toggleOn: updateModalOnOpen, toggleOff: updateModalOnClose} = useToggle(false);

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
				isOpen={deleteModalIsOpen}
				onClose={deleteModalOnClose}
			/>
			<UpdateTaskModal
				id={selectedRowIds?.[0] ?? ''}
				isOpen={updateModalIsOpen}
				onClose={updateModalOnClose}
			/>
			<Group position="right" pr={"3rem"}>
				<Tooltip label={'Create task'} withArrow>
					<ActionIcon mb="1rem" size={24} color="primary" radius="xl" variant="filled"
								onClick={deleteModalOnOpen}>
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
				<Tooltip label={'Update selected task'} withArrow>
					<ActionIcon mb="1rem" size={24} color="primary" radius="xl" variant="filled"
								disabled={selectedRowIds?.length !== 1}
								onClick={updateModalOnOpen}
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
