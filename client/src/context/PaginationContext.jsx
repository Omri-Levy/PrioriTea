import React, {createContext, useReducer} from 'react';
import paginationReducer from './reducers/paginationReducer.js';

const PaginationContext = createContext(undefined);


const PaginationProvider = props => {
    const [paginationObj, dispatch] = useReducer(paginationReducer, {
        currentPage: 1,
        tasksPerPage: 1
    });

    const setCurrentPage = (pageNum) => dispatch({
        type: 'SET_CURRENT_PAGE',
        payload: pageNum
    });

    const setTasksPerPage = (num) => dispatch({
        type: 'SET_TASKS_PER_PAGE',
        payload: num
    });

    return (
        <PaginationContext.Provider value={{
            paginationObj,
            setCurrentPage, setTasksPerPage
        }}>
            {props.children}
        </PaginationContext.Provider>
    );
}

export {PaginationContext, PaginationProvider};
