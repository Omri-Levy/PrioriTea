import {FunctionComponent, useEffect, useMemo} from "react";
import {
	useUpdateTaskMutation
} from "./hooks/useUpdateTaskMutation/useUpdateTaskMutation";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
	ActionIcon,
	Button,
	Group,
	Modal,
	NumberInput,
	Select,
	TextInput,
	Tooltip
} from "@mantine/core";
import {FieldError} from "../../../FieldError/FieldError";
import {UpdateTaskModalProps} from "./interfaces";
import {Priority, Status, UpdateTaskDto} from "@prioritea/types";
import {updateTaskSchema} from "@prioritea/validation";
import {useTasksQuery} from "../hooks/useTasksQuery/useTasksQuery";
import {formatTaskStatus} from "../utils/format-task-status/format-task-status";
import {Pencil} from "tabler-icons-react";
import {useToggle} from "../../../../hooks/useToggle/useToggle";

export const UpdateTaskModal: FunctionComponent<UpdateTaskModalProps> = ({
																			 id,
																			 disabled

																		 }) => {
	const [
		modalIsOpen,
		,
		openModal,
		closeModal
	] = useToggle();
	const {mutateAsync} = useUpdateTaskMutation(closeModal);
	const {data: tasks} = useTasksQuery();
	const task = useMemo(() => tasks?.find((task) => task.id === id), [tasks?.length, id]);
	const {
		reset,
		control,
		register,
		handleSubmit,
		formState: {errors}
	} = useForm<UpdateTaskDto>({
		defaultValues: {
			priority: task?.priority,
			description: task?.description,
			status: task?.status,
		},
		resolver: zodResolver(updateTaskSchema)
	});
	const onSubmit: SubmitHandler<Omit<UpdateTaskDto, 'id'>> = async ({
																		  priority,
																		  description,
																		  status
																	  }) => {
		if (!id) return;

		await mutateAsync({id, priority, description, status});

		closeModal();
	};

	useEffect(() => {
		reset(task);
	}, [task?.id]);


	return (
		<>
			<Modal
				opened={modalIsOpen}
				onClose={closeModal}
				title="Update a task"
			>
				<form noValidate onSubmit={handleSubmit(onSubmit)}>
					<Group direction="column" grow>
						<Controller
							control={control}
							name={"priority"}
							render={({field}) => (
								<NumberInput
									label="Priority"
									placeholder="Type here.."
									min={Priority.MIN}
									max={Priority.MAX}
									{...field}
								/>
							)}
						/>
						<FieldError field={errors.priority}/>
						<TextInput
							label="Description"
							placeholder={task?.description}
							{...register("description")}
						/>
						<FieldError field={errors.description}/>
						<Controller
							control={control}
							name={"status"}
							render={({field}) => (
								<Select
									label="Status"
									placeholder="Pick one.."
									data={Object.values(Status).map((status) => ({
										value: status,
										label: formatTaskStatus(status)
									}))}
									{...field}
								/>
							)}
						/>
						<FieldError field={errors.status}/>
					</Group>
					<Group position="apart" mt="xl">
						<Button type="submit"
								style={{textTransform: "capitalize"}}
								variant="filled">
							Update
						</Button>
					</Group>
				</form>
			</Modal>
			<Tooltip label={'Update selected task'} withArrow>
				<ActionIcon mb="1rem" size={24} color="primary" radius="xl"
							variant="filled"
							disabled={disabled}
							onClick={openModal}
				>
					<Pencil size={18}/>
				</ActionIcon>
			</Tooltip>
		</>
	);
}
