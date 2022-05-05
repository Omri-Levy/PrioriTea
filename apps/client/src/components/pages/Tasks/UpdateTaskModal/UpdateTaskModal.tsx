import {FunctionComponent, useEffect, useMemo} from "react";
import {
	useUpdateTaskMutation
} from "./hooks/useUpdateTaskMutation/useUpdateTaskMutation";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
	Button,
	Group,
	Modal,
	NumberInput,
	Select,
	TextInput
} from "@mantine/core";
import {FieldError} from "../../../FieldError/FieldError";
import {UpdateTaskModalProps} from "./interfaces";
import {UpdateTaskDto} from "@prioritea/types";
import {updateTaskSchema} from "@prioritea/validation";
import {useTasksQuery} from "../hooks/useTasksQuery/useTasksQuery";
import {formatTaskStatus} from "../Tasks";

export enum Status {
	IDLE = "IDLE",
	IN_PROGRESS = "IN_PROGRESS",
	COMPLETED = "COMPLETED",
}

export enum Priority {
	ONE = 1,
	TWO = 2,
	THREE = 3,
	FOUR = 4,
	FIVE = 5,
	MIN = Priority.ONE,
	MAX = Priority.FIVE,
}


export const UpdateTaskModal: FunctionComponent<UpdateTaskModalProps> = ({
							id,												 isOpen,
																			 onClose
																		 }) => {
	const {mutateAsync} = useUpdateTaskMutation();
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

		onClose();
	};

	useEffect(() => {
		reset(task);
	}, [task?.id]);


	return (
		<Modal
			opened={isOpen}
			onClose={onClose}
			title="Update a task"
		>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Group direction="column" grow>
					<Controller
						control={control}
						name={"priority"}
						render={({field}) => (
							<NumberInput
								required
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
								data={Object.values(Status).filter((status) => status !== Status.COMPLETED).map((status) => ({
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
					<Button type="submit" style={{textTransform: "capitalize"}}
							variant="filled">
						Update
					</Button>
				</Group>
			</form>
		</Modal>
	);
}
