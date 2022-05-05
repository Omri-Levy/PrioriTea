import {FunctionComponent} from "react";
import {
	useCreateTaskMutation
} from "./hooks/useCreateTaskMutation/useCreateTaskMutation";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button, Group, Modal, NumberInput, TextInput} from "@mantine/core";
import {FieldError} from "../../../FieldError/FieldError";
import {CreateTaskModalProps} from "./interfaces";
import {createTaskSchema} from "@prioritea/validation";
import {CreateTaskDto} from "@prioritea/types";

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
			priority: 1,
			description: '',
			status: Status.IDLE
		},
		resolver: zodResolver(createTaskSchema)
	});
	const onSubmit: SubmitHandler<CreateTaskDto> = async ({
															  priority,
															  description
														  }) => {
		await mutateAsync({priority, description});

		onClose();
	};

	return (
		<Modal
			opened={isOpen}
			onClose={onClose}
			title="Create a task"
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
