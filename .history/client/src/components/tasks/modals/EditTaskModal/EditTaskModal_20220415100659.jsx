import React from 'react';
import { EditTaskForm } from '../../forms';

export const EditTaskModal = () => {
	return (
		<div className="edit-task-modal-container">
			<div className="edit-task-modal-content">
				<EditTaskForm />
			</div>
		</div>
	);
};
