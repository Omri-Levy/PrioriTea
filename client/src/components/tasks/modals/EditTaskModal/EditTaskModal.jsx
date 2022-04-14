import React from 'react';
import EditTaskForm from '../../forms/EditTaskForm.jsx';

export const EditTaskModal = () => {
	return (
		<div className="edit-task-modal-container">
			<div className="edit-task-modal-content">
				<EditTaskForm />
			</div>
		</div>
	);
};
