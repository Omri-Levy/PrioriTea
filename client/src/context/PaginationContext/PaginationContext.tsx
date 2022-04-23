import { createContext, useEffect, useReducer } from 'react';
import { paginationReducer } from './pagination-reducer.js';

export const PaginationContext = createContext(undefined);

export const PaginationProvider = (props) => {
	const [paginationObj, dispatch] = useReducer(paginationReducer, {
		totalPages: JSON.parse(localStorage.getItem('totalPages')) || 0,
		tasksPerPage: 1,
		currentPage: JSON.parse(localStorage.getItem('currentPage')) || 1,
	});

	const setTotalPages = (pagesNum) =>
		dispatch({
			type: 'SET_TOTAL_PAGES',
			payload: pagesNum,
		});

	const setTasksPerPage = (tasksNum) =>
		dispatch({
			type: 'SET_TASKS_PER_PAGE',
			payload: tasksNum,
		});

	const setCurrentPage = (pageNum) =>
		dispatch({
			type: 'SET_CURRENT_PAGE',
			payload: pageNum,
		});

	useEffect(() => {
		localStorage.setItem(
			'totalPages',
			JSON.stringify(paginationObj.totalPages),
		);
	}, [paginationObj.totalPages]);

	useEffect(() => {
		if (
			paginationObj.totalPages < paginationObj.currentPage &&
			paginationObj.totalPages !== 0
		) {
			setCurrentPage(paginationObj.totalPages);
		}

		localStorage.setItem(
			'currentPage',
			JSON.stringify(paginationObj.currentPage),
		);
	}, [paginationObj.currentPage, paginationObj.totalPages]);

	return (
		<PaginationContext.Provider
			value={{
				...paginationObj,
				setTotalPages,
				setCurrentPage,
				setTasksPerPage,
			}}
		>
			{props.children}
		</PaginationContext.Provider>
	);
};
