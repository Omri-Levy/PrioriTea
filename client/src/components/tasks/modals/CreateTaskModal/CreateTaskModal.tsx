import { CreateTaskForm } from '../../../forms/CreateTaskForm/CreateTaskForm';

export const CreateTaskModal = () => {
	return (
		<div className="create-task-modal-container">
			<div className="create-task-modal-content">
				<CreateTaskForm />
			</div>
		</div>
	);
};
