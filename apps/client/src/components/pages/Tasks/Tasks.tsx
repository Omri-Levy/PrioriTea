import {
	ActionIcon,
	Button,
	Checkbox,
	CheckboxGroup,
	Container,
	createStyles,
	Group,
	SimpleGrid,
	Text,
	TextInput,
	Title,
	Tooltip,
	useMantineTheme
} from "@mantine/core";
import {
	AlertCircle,
	ArrowLeft,
	ArrowRight,
	Pencil,
	Plus,
	Search as SearchIcon,
	Trash
} from "tabler-icons-react";
import {DnDReactTable} from "../../DnDReactTable/DnDReactTable";
import {useToggle} from "../../../hooks/useToggle/useToggle";
import {CreateTaskModal} from "./CreateTaskModal/CreateTaskModal";
import {useTasksQuery} from "./hooks/useTasksQuery/useTasksQuery";
import {FunctionComponent, useCallback, useMemo, useState} from "react";
import {useMutation, useQueryClient} from "react-query";
import {TasksApi} from "../../../api/tasks-api/tasks-api";
import {UpdateTaskModal} from "./UpdateTaskModal/UpdateTaskModal";
import {Column, useAsyncDebounce} from "react-table";
import {Tasks as TasksType} from "@prioritea/types";
import {showNotification} from "@mantine/notifications";
import {noNullish} from "@prioritea/utils";

export interface SearchProps {
	preGlobalFilteredRows: TasksType;
	setGlobalFilter: (value: string) => void;
	globalFilter: string | undefined;
}

export const errorToast = (message: string) =>
	showNotification({
		icon: <AlertCircle size={24}/>,
		title: "Error",
		// @ts-ignore
		message,
	});

export const SomethingWentWrong = () => {
	const useStyles = createStyles((theme) => ({

		title: {
			fontWeight: 900,
			fontSize: 34,
			fontFamily: `Greycliff CF, ${theme.fontFamily}`,

			[theme.fn.smallerThan('sm')]: {
				fontSize: 32,
			},
		},
	}));
	const {classes} = useStyles();
	const theme = useMantineTheme();

	return (
		<Container>
			<SimpleGrid
				spacing={80}
				cols={2}
				breakpoints={[{maxWidth: 'sm', cols: 1, spacing: 40}]}
			>
				<div>
					<Title className={classes.title}>Something went
						wrong...</Title>
					<Text color="dimmed" size="lg" mb={"1rem"}>
						Please refresh this page, or try again later. If the
						problem persists, please contact us.
					</Text>
					<Button
						size="md"
						onClick={() => {
							document.location.reload();
						}}
					>
						Refresh the page
					</Button>
				</div>
				<Text
					component={"h1"}
					sx={{
						marginBlock: 0,
						fontSize: "15rem",
					}}
					variant={"gradient"}
					// @ts-ignore
					gradient={{
						from: theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 7 : 5],
						to: theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 5 : 7]
					}}
				>
					500
				</Text>
			</SimpleGrid>
		</Container>
	);
}

const toCapitalized = (str: string) =>
	str?.charAt(0)?.toUpperCase() + str?.slice(1);

export const Search: FunctionComponent<SearchProps> = function ({
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
		<div>
			<TextInput
				icon={<SearchIcon size={18}/>}
				radius="xl"
				size="md"
				rightSection={
					<ActionIcon size={32} radius="xl" color={theme.primaryColor}
								variant="filled">
						{theme.dir === 'ltr' ? <ArrowRight size={18}/> :
							<ArrowLeft size={18}/>}
					</ActionIcon>
				}
				styles={{root: {maxWidth: '35%', minWidth: "280px"}}}
				rightSectionWidth={42}
				value={value || ""}
				onChange={e => {
					setValue(e.target.value);
					onChange(e.target.value);
				}}
				placeholder={`Searching in ${count} records...`}
			/>
		</div>
	)
}


export const useDeleteTasksMutation = () => {
	const queryClient = useQueryClient();

	return useMutation(async ({ids}: { ids: Array<string> }) => {
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
		onError(err, _ids, context: { prevTasks: TasksType } | undefined) {
			queryClient.setQueryData(['tasks'], context?.prevTasks);

			// @ts-ignore
			if (err.response?.status === 404) {
				// @ts-ignore
				errorToast(err.response?.data.errors?.[0].message);

				return;
			}

			errorToast("Failed to delete tasks");
		},
		onSettled() {
			queryClient.invalidateQueries(['tasks']);
		}
	})
}

// FIXME: one checkbox group changes length, one does not. They should either both change length or both not.

export const FilterCheckboxGroup = (
	// @ts-ignore
	{
		column:
			// @ts-ignore
			{filterValue, setFilter, preFilteredRows, id},
		...rest
	}) => {
	const values = useMemo(() => {
		// @ts-ignore
		return preFilteredRows.map((row) => {
			// Ensures that the filter value is a string
			return noNullish`${row.values[id]}`;
		});
	}, [id, preFilteredRows]);
	const options = useMemo(() => [...new Set(values)], [values]);

	return (
		<CheckboxGroup
			styles={{label: {textTransform: "capitalize"}}}
			label={id}
			value={filterValue}
			onChange={setFilter}
			size={"xs"}
		>
			{options?.map(
				(option: any) => (
					<Checkbox
						key={`${id}-${option}`}
						value={option?.toString()}
						// @ts-ignore
						label={rest?.transformer ? rest?.transformer(option) : option}
						styles={{
							label: {
								textTransform: "capitalize",
							},
						}}
					/>
				))}
		</CheckboxGroup>
	);
}

export const toKebabCase = (str: string) =>
	str
		// camel to kebab
		?.replace(/([a-z])([A-Z])/g, '$1-$2')
		// snake to kebab
		?.replace(/_/g, '-')
		// spaces to kebab
		?.replace(/\s/g, '-')

export const formatTaskStatus = (status: string) => toCapitalized(toKebabCase(status)?.toLowerCase())


export const Tasks = () => {
	const [
		deleteModalIsOpen,
		,
		deleteModalOnOpen,
		deleteModalOnClose
	] = useToggle(false);
	const [
		updateModalIsOpen,
		,
		updateModalOnOpen,
		updateModalOnClose
	] = useToggle(false);

	const columns: Array<Column> = [
		{
			Header: 'Priority',
			accessor: 'priority',
			filter: 'multiSelect',
			Filter: FilterCheckboxGroup,
		},
		{
			Header: 'Description',
			accessor: 'description',
			disableFilters: true,
		},
		{
			Header: 'Status',
			accessor: 'status',
			filter: 'multiSelect',
			Filter: (props) => (
				<FilterCheckboxGroup
					{...props}
					transformer={formatTaskStatus}
				/>
			),
			// @ts-ignore
			Cell({value}) {
				return formatTaskStatus(value);
			}
		},
	];
	const {data: tasks = [], isLoading, isError} = useTasksQuery();
	const [selectedRowIds, setSelectedRowIds] = useState<Array<string>>([]);
	const getSelectedRowIds = useCallback((ids: Array<string>) => {
		setSelectedRowIds(ids);
	}, [setSelectedRowIds]);
	const {mutateAsync} = useDeleteTasksMutation();
	const deleteSelectedTasks = useCallback(async () => {
		await mutateAsync({ids: selectedRowIds});
	}, [selectedRowIds]);

	if (isError) {
		return (
			<SomethingWentWrong/>
		);
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
					<ActionIcon mb="1rem" size={24} color="primary" radius="xl"
								variant="filled"
								onClick={deleteModalOnOpen}>
						<Plus size={18}/>
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
						<Trash size={18}/>
					</ActionIcon>
				</Tooltip>
				<Tooltip label={'Update selected task'} withArrow>
					<ActionIcon mb="1rem" size={24} color="primary" radius="xl"
								variant="filled"
								disabled={selectedRowIds?.length !== 1}
								onClick={updateModalOnOpen}
					>
						<Pencil size={18}/>
					</ActionIcon>
				</Tooltip>
			</Group>
			<DnDReactTable
				isLoading={isLoading}
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
