import {FunctionComponent} from "react";
import {
	useCreateTaskMutation
} from "./hooks/useCreateTaskMutation/useCreateTaskMutation";
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
import {CreateTaskModalProps} from "./interfaces";
import {createTaskSchema} from "@prioritea/validation";
import {CreateTaskDto} from "@prioritea/types";
import {Priority} from "../UpdateTaskModal/UpdateTaskModal";
import {formatTaskStatus} from "../Tasks";

enum Status {
IDLE = "IDLE",
	IN_PROGRESS = "IN_PROGRESS",
	COMPLETED = "COMPLETED"
}

export const CreateTaskModal: FunctionComponent<CreateTaskModalProps> = ({
																			 isOpen,
																			 onClose
																		 }) => {
	const {mutateAsync} = useCreateTaskMutation();
	const {
		control,
		register,
		handleSubmit,
		formState: {errors}
	} = useForm<CreateTaskDto>({
		defaultValues: {
			priority: Priority.MIN,
			description: '',
			status: Status.IDLE
		},
		resolver: zodResolver(createTaskSchema)
	});
	const onSubmit: SubmitHandler<CreateTaskDto> = async ({
															  priority,
															  description,
			status,
														  }) => {
		await mutateAsync({priority, description, status});

		onClose();
	};

	return (
		<Modal
			opened={isOpen}
			onClose={onClose}
			title="Create a task"
		>
			<form noValidate onSubmit={handleSubmit(onSubmit)}>
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
						required
						label="Description"
						placeholder="Type here.."
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
						Create
					</Button>
				</Group>
			</form>
		</Modal>
	);
}
