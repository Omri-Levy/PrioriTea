import React from 'react';
import CreateTaskForm from '../../forms/CreateTaskForm.jsx';

export const CreateTaskModal = () => {
	return (
		<div className="create-task-modal-container">
			<div className="create-task-modal-content">
				<CreateTaskForm />
			</div>
		</div>
	);
};
