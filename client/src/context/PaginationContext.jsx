import React, {createContext, useEffect, useReducer} from 'react';
import paginationReducer from './reducers/paginationReducer.js';

const PaginationContext = createContext(undefined);


const PaginationProvider = props => {
    const [paginationObj, dispatch] = useReducer(paginationReducer,
        {
            totalPages: JSON.parse(localStorage.getItem('totalPages')),
            tasksPerPage: 1,
            currentPage: JSON.parse(localStorage.getItem('currentPage'))
        });

    const setTotalPages = (pagesNum) => dispatch({
        type: 'SET_TOTAL_PAGES',
        payload: pagesNum
    });

    const setTasksPerPage = (tasksNum) => dispatch({
        type: 'SET_TASKS_PER_PAGE',
        payload: tasksNum
    });

    const setCurrentPage = (pageNum) => dispatch({
        type: 'SET_CURRENT_PAGE',
        payload: pageNum
    });

    useEffect(() => {
        localStorage.setItem('totalPages',
            JSON.stringify(paginationObj.totalPages));
    }, [paginationObj.totalPages]);

    useEffect(() => {
        if (paginationObj.totalPages < paginationObj.currentPage) {
            setCurrentPage(paginationObj.totalPages)
        }
        localStorage.setItem('currentPage',
            JSON.stringify(paginationObj.currentPage));
    }, [paginationObj.currentPage]);

    return (
        <PaginationContext.Provider value={{
            ...paginationObj, setTotalPages, setCurrentPage, setTasksPerPage
        }}>
            {props.children}
        </PaginationContext.Provider>
    );
}

export {PaginationContext, PaginationProvider};
