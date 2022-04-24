import { createContext, useEffect, useReducer } from 'react';
import { IChildren } from '../../interfaces';
import { paginationReducer } from './pagination-reducer';

interface IPaginationContext {
  totalPages: 0;
  tasksPerPage: 1;
  currentPage: 1;
  setTotalPages: (pagesNum: number) => void;
  setTasksPerPage: (tasksNum: number) => void;
  setCurrentPage: (pageNum: number) => void;
}

export const PaginationContext = createContext<IPaginationContext>({
	totalPages: 0,
	tasksPerPage: 1,
	currentPage: 1,
	setTotalPages: () => {},
	setCurrentPage: () => {},
	setTasksPerPage: () => {},
});

export const PaginationProvider = ({children}: IChildren) => {
	const [paginationObj, dispatch] = useReducer(paginationReducer, {
		totalPages: 0,
		tasksPerPage: 1,
		currentPage: 1,
	});

	const setTotalPages = (pagesNum: number) =>
		dispatch({
			type: 'SET_TOTAL_PAGES',
			payload: pagesNum,
		});

	const setTasksPerPage = (tasksNum: number) =>
    dispatch({
      type: "SET_TASKS_PER_PAGE",
      payload: tasksNum,
    });

	const setCurrentPage = (pageNum: number) =>
    dispatch({
      type: "SET_CURRENT_PAGE",
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
			{children}
		</PaginationContext.Provider>
	);
};
