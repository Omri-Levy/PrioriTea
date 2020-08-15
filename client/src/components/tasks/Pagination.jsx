import React from 'react';
import movePage from '../../static/js/movePage.js';

const Pagination = ({
                        tasksPerPage,
                        totalTasks,
                        currentPage,
                        setCurrentPage
                    }) => {

    const pageNumbers = [];
    const maxPages = 5;

    let maxLeft = (currentPage - Math.floor(maxPages / 2));
    let maxRight = (currentPage + Math.floor(maxPages / 2));
    let pages = Math.round(totalTasks / tasksPerPage);

    if (maxLeft < 1) {
        maxLeft = 1
        maxRight = maxPages
    }

    if (maxRight > pages) {
        maxLeft = pages - (maxPages - 1)

        if (maxLeft < 1) {
            maxLeft = 1
        }
        maxRight = pages
    }
    for (let page = maxLeft; page <= maxRight; page++) {
        pageNumbers.push(page)
    }

    return (
        <nav>
            <ul>
                {currentPage >= 4 && pages > 5 &&
                <li key={1}>
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
                            className={
                                currentPage === number
                                    ? 'current-page' : 'page-btn'
                            }
                            onClick={() => movePage(number, setCurrentPage)}
                        >
                            {number}
                        </a>
                    </li>
                ))}
                {maxRight !== totalTasks &&
                <li key={pages}>
                    <a
                        id='last-page'
                        onClick={() => movePage(pages, setCurrentPage)}
                    >
                        Last<i className='fas fa-angle-double-right padded'/>
                    </a>
                </li>}
            </ul>
        </nav>
    );
}

export default Pagination;
