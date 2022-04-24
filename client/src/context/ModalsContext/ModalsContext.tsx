import { createContext, useReducer } from 'react';
import { IChildren } from '../../interfaces';
import { modalsReducer } from './modals-reducer';

export const ModalsContext = createContext({
  createTaskModalOpen: false,
  editTaskModalOpen: false,
  openCreateTaskModal: () => {},
  closeCreateTaskModal: () => {},
  openEditTaskModal: () => {},
  closeEditTaskModal: () => {},
});

export const ModalsProvider = ({children}: IChildren) => {
	const [modalsObj, dispatch] = useReducer(modalsReducer, {
		createTaskModalOpen: false,
		editTaskModalOpen: false,
	});

	const openCreateTaskModal = () =>
		dispatch({
			type: 'OPEN_CREATE_TASK_MODAL',
		});
	const closeCreateTaskModal = () =>
		dispatch({
			type: 'CLOSE_CREATE_TASK_MODAL',
		});
	const openEditTaskModal = () =>
		dispatch({
			type: 'OPEN_EDIT_TASK_MODAL',
		});
	const closeEditTaskModal = () =>
		dispatch({
			type: 'CLOSE_EDIT_TASK_MODAL',
		});

	return (
		<ModalsContext.Provider
			value={{
				...modalsObj,
				openCreateTaskModal,
				closeCreateTaskModal,
				openEditTaskModal,
				closeEditTaskModal,
			}}
		>
			{children}
		</ModalsContext.Provider>
	);
};
