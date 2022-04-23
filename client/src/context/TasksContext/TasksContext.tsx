import { createContext, useReducer } from 'react';
import { tasksReducer } from './tasks-reducer.js';

export const TasksContext = createContext(undefined);

export const TasksProvider = (props) => {
	const [tasksObj, dispatch] = useReducer(tasksReducer, {
		tasks: [],
		tasksCopy: [],
		editTaskId: '',
		filter: localStorage.getItem('filter'),
	});

	const setTasks = (data) => dispatch({ type: 'GET_TASKS', payload: data });

	const setTasksCopy = (data) =>
		dispatch({
			type: 'SET_TASKS_COPY',
			payload: data,
		});

	const setEditTaskId = (data) =>
		dispatch({
			type: 'SET_EDIT_TASK_ID',
			payload: data,
		});

	return (
		<TasksContext.Provider
			value={{
				...tasksObj,
				setTasks,
				setTasksCopy,
				setEditTaskId,
			}}
		>
			{props.children}
		</TasksContext.Provider>
	);
};
