import {FunctionComponent} from "react";
import {
	useCreateTaskMutation
} from "./hooks/useCreateTaskMutation/useCreateTaskMutation";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button, Group, Modal, TextInput} from "@mantine/core";
import {FieldError} from "../../../FieldError/FieldError";
import {CreateTaskDto, CreateTaskModalProps} from "./interfaces";
import {createTaskSchema} from "@prioritea/validation";

export const CreateTaskModal: FunctionComponent<CreateTaskModalProps> = ({
																			 isOpen,
																			 onClose
																		 }) => {
	const {mutateAsync} = useCreateTaskMutation();
	const {
		register,
		handleSubmit,
		formState: {errors}
	} = useForm<{ priority: string, description: string }>({
		defaultValues: {
			priority: '',
			description: '',
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
					<TextInput
						required
						label="Priority"
						placeholder="Type here.."
						{...register("priority")}
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
