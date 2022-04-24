export const modalsReducer = (state: any, action: {type: string}) => {
	switch (action.type) {
		case 'OPEN_CREATE_TASK_MODAL':
			return {
				...state,
				createTaskModalOpen: true,
			};
		case 'CLOSE_CREATE_TASK_MODAL':
			return {
				...state,
				createTaskModalOpen: false,
			};
		case 'OPEN_EDIT_TASK_MODAL':
			return {
				...state,
				editTaskModalOpen: true,
			};
		case 'CLOSE_EDIT_TASK_MODAL':
			return {
				...state,
				editTaskModalOpen: false,
			};
		default:
			return {
				createTaskModalOpen: false,
				editTaskModalOpen: false,
			};
	}
};
