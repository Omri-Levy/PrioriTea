import { FunctionComponent, useEffect } from "react";
import { usePaginationContext } from "../../../context/PaginationContext/usePaginationContext";
import { useTasksContext } from "../../../context/TasksContext/useTasksContext";
import { movePage } from "../../../static/js/move-page/move-page";

export const Pagination: FunctionComponent = () => {
  const {
    totalPages,
    setTotalPages,
    tasksPerPage,
    currentPage,
    setCurrentPage,
  } = usePaginationContext();
  const { tasksCopy } = useTasksContext();
  const pageNumbers = [];
  const maxPages = 5;

  let maxLeft = currentPage - Math.floor(maxPages / 2);
  let maxRight = currentPage + Math.floor(maxPages / 2);

  useEffect(() => {
    setTotalPages(Math.round(tasksCopy.length / tasksPerPage));
  }, [setTotalPages, tasksPerPage, tasksCopy]);

  if (maxLeft < 1) {
    maxLeft = 1;
    maxRight = maxPages;
  }

  if (maxRight > totalPages) {
    maxLeft = totalPages - (maxPages - 1);

    if (maxLeft < 1) maxLeft = 1;

    maxRight = totalPages;
  }

  for (let page = maxLeft; page <= maxRight; page++) pageNumbers.push(page);

  const isCurrentPage = (number: number) => {
    return currentPage === number
      ? "current-page pagination-btn"
      : "pagination-btn link-underline";
  };
  const paginate = movePage(setCurrentPage);

  return (
    <nav>
      <ul>
        {currentPage >= 4 && totalPages > 5 && (
          <li>
            <button
              id="first-page"
              className="pagination-btn link-underline"
              onClick={() => paginate(1)}
            >
              <i className="first-page" />
              First
            </button>
          </li>
        )}
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              id={"page-" + number}
              className={isCurrentPage(number)}
              onClick={() => paginate(number)}
            >
              {number}
            </button>
          </li>
        ))}
        {maxRight !== tasksCopy.length && (
          <li>
            <button
              className="pagination-btn link-underline"
              id="last-page"
              onClick={() => paginate(totalPages)}
            >
              Last
              <i className="last-page" />
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};
