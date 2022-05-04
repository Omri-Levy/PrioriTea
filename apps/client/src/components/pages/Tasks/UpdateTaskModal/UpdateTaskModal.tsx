import {FunctionComponent, useEffect, useMemo} from "react";
import {
	useUpdateTaskMutation
} from "./hooks/useUpdateTaskMutation/useUpdateTaskMutation";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button, Group, Modal, TextInput} from "@mantine/core";
import {FieldError} from "../../../FieldError/FieldError";
import {UpdateTaskDto, UpdateTaskModalProps} from "./interfaces";
import {updateTaskSchema} from "@prioritea/validation";
import {useTasksQuery} from "../hooks/useTasksQuery/useTasksQuery";

export const UpdateTaskModal: FunctionComponent<UpdateTaskModalProps> = ({
							id,												 isOpen,
																			 onClose
																		 }) => {
	const {mutateAsync} = useUpdateTaskMutation();
	const {data: tasks} = useTasksQuery();
	const task = useMemo(() => tasks?.find((task) => task.id === id), [tasks?.length, id]);
	const {
		reset,
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
					<TextInput
						label="Priority"
						placeholder={task?.priority}
						{...register("priority")}
					/>
					<FieldError field={errors.priority}/>
					<TextInput
						label="Description"
						placeholder={task?.description}
						{...register("description")}
					/>
					<FieldError field={errors.description}/>
					<TextInput
						label="Status"
						placeholder={task?.status}
						{...register("status")}
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