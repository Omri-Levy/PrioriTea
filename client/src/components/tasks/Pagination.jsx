import React, {useContext, useEffect} from 'react';
import {PaginationContext} from '../../context/PaginationContext.jsx';
import movePage from '../../static/js/movePage.js';

const Pagination = ({tasks}) => {

    const pageNumbers = [];
    const maxPages = 5;
    const {currentPage, setCurrentPage} = useContext(PaginationContext);

    let maxLeft = (currentPage - Math.floor(maxPages / 2));
    let maxRight = (currentPage + Math.floor(maxPages / 2));
    const {
        totalPages, setTotalPages,
        tasksPerPage
    } = useContext(PaginationContext);

    useEffect(() => {
        setTotalPages(Math.round(tasks / tasksPerPage));
    }, []);


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
                        <i className='fas fa-angle-double-left padded'/>First
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
                {maxRight !== tasks &&
                <li>
                    <a
                        id='last-page'
                        onClick={() => movePage(totalPages, setCurrentPage)}
                    >
                        Last<i className='fas fa-angle-double-right padded'/>
                    </a>
                </li>}
            </ul>
        </nav>
    );
}

export default Pagination;
