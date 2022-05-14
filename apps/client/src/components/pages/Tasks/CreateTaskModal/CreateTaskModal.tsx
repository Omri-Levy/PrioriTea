import {FunctionComponent} from "react";
import {
	useCreateTaskMutation
} from "./hooks/useCreateTaskMutation/useCreateTaskMutation";
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
import {createTaskSchema} from "@prioritea/validation";
import {CreateTaskDto, Priority, Status} from "@prioritea/types";
import {formatTaskStatus} from "../utils/format-task-status/format-task-status";
import {useToggle} from "../../../../hooks/useToggle/useToggle";
import {Plus} from "tabler-icons-react";

export const CreateTaskModal: FunctionComponent = () => {
	const [
		modalIsOpen,
		,
		openModal,
		closeModal
	] = useToggle();
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

		closeModal();
	};

	return (
		<>
			<Modal
				opened={modalIsOpen}
				onClose={closeModal}
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
						<Button
							type="submit"
							className={`capitalize`}
							variant="filled"
						>
							Create
						</Button>
					</Group>
				</form>
			</Modal>
			<Tooltip label={'Create task'} withArrow>
				<ActionIcon
					mb="1rem"
					size={24}
					color="primary"
					radius="xl"
					variant="filled"
					onClick={openModal}
				>
					<Plus size={18}/>
				</ActionIcon>
			</Tooltip>
		</>
	);
}
