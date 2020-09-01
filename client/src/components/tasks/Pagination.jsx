import React, {useContext, useEffect} from 'react';
import {PaginationContext} from '../../context/PaginationContext.jsx';
import {TasksContext} from '../../context/TasksContext.jsx';
import movePage from '../../static/js/movePage.js';

const Pagination = () => {
    const {
        totalPages, setTotalPages, tasksPerPage, currentPage,
        setCurrentPage
    } = useContext(PaginationContext);
    const {tasks, tasksCopy} = useContext(TasksContext);
    const pageNumbers = [];
    const maxPages = 5;

    let maxLeft = (currentPage - Math.floor(maxPages / 2));
    let maxRight = (currentPage + Math.floor(maxPages / 2));

    useEffect(() => {
        setTotalPages(Math.round(tasksCopy.length / tasksPerPage));
    }, [tasks, tasksCopy]);

    if (maxLeft < 1) {
        maxLeft = 1
        maxRight = maxPages
    }

    if (maxRight > totalPages) {
        maxLeft = totalPages - (maxPages - 1);

        if (maxLeft < 1) maxLeft = 1;

        maxRight = totalPages;
    }

    for (let page = maxLeft; page <= maxRight; page++) pageNumbers.push(page);

    const isCurrentPage = (number) => {
        return currentPage === number
            ? 'current-page pagination-btn' : 'page-btn pagination-btn';
    };

    return (
        <nav>
            <ul>
                {currentPage >= 4 && totalPages > 5 &&
                <li>
                    <button
                        id='first-page'
                        className='pagination-btn'
                        onClick={() => movePage(1, setCurrentPage)}
                    >
                        <i className='first-page'/>First
                    </button>
                </li>}
                {pageNumbers.map(number => (
                    <li key={number}>
                        <button id={'page-' + number}
                                className={isCurrentPage(number)}
                                onClick={() => movePage(number, setCurrentPage
                                )}
                        >
                            {number}
                        </button>
                    </li>
                ))}
                {maxRight !== tasksCopy.length &&
                <li>
                    <button
                        className='pagination-btn'
                        id='last-page'
                        onClick={() => movePage(totalPages, setCurrentPage)}
                    >
                        Last<i className='last-page'/>
                    </button>
                </li>}
            </ul>
        </nav>
    );
};

export default Pagination;
