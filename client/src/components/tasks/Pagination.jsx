import React, {useContext, useEffect} from 'react';
import {PaginationContext} from '../../context/PaginationContext.jsx';
import {TasksContext} from '../../context/TasksContext.jsx';
import movePage from '../../static/js/movePage.js';

const Pagination = ({tasksCopyLength}) => {

    const pageNumbers = [];
    const maxPages = 5;
    const {currentPage, setCurrentPage} = useContext(PaginationContext);
    const {tasks, tasksCopy} = useContext(TasksContext);

    let maxLeft = (currentPage - Math.floor(maxPages / 2));
    let maxRight = (currentPage + Math.floor(maxPages / 2));
    const {totalPages, setTotalPages, tasksPerPage} = useContext(
        PaginationContext);

    useEffect(() => {
        setTotalPages(Math.round(tasksCopyLength / tasksPerPage));
    }, [tasks, tasksCopy]);


    if (maxLeft < 1) {
        maxLeft = 1
        maxRight = maxPages
    }

    if (maxRight > totalPages) {
        maxLeft = totalPages - (maxPages - 1)

        if (maxLeft < 1) {
            maxLeft = 1
        }
        maxRight = totalPages
    }

    for (let page = maxLeft; page <= maxRight; page++) {
        pageNumbers.push(page)
    }

    const isCurrentPage = (number) => {
        return currentPage === number ? 'current-page' : 'page-btn'
    }

    return (
        <nav>
            <ul>
                {currentPage >= 4 && totalPages > 5 &&
                <li>
                    <a
                        id='first-page'
                        onClick={() => movePage(1, setCurrentPage)}
                    >
                        <i className='first-page'/>First
                    </a>
                </li>}
                {pageNumbers.map(number => (
                    <li key={number}>
                        <a
                            id={'page-' + number}
                            className={isCurrentPage(number)}
                            onClick={() => movePage(number, setCurrentPage)}
                        >
                            {number}
                        </a>
                    </li>
                ))}
                {maxRight !== tasksCopyLength &&
                <li>
                    <a
                        id='last-page'
                        onClick={() => movePage(totalPages, setCurrentPage)}
                    >
                        Last<i className='last-page'/>
                    </a>
                </li>}
            </ul>
        </nav>
    );
}

export default Pagination;
