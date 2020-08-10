import React from 'react';

const Pagination = ({
                        listsPerPage,
                        totalLists,
                        paginate,
                        currentPage
                    }) => {

    const pageNumbers = [];
    const maxPages = 5;

    let maxLeft = (currentPage - Math.floor(maxPages / 2));
    let maxRight = (currentPage + Math.floor(maxPages / 2));
    let pages = Math.round(totalLists / listsPerPage);

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
                {currentPage >= 4 &&
                <li key={1}>
                    <a
                        onClick={() => paginate(1)}
                    >
                        &#171; First
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
                            onClick={() => paginate(number)}
                        >
                            {number}
                        </a>
                    </li>
                ))}
                {maxRight !== totalLists &&
                <li key={pages}>
                    <a
                        onClick={() => paginate(pages)}
                    >
                        Last &#187;
                    </a>
                </li>}
            </ul>
        </nav>
    );
}

export default Pagination;
