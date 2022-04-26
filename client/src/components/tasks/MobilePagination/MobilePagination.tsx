import { useEffect } from "react";
import { usePaginationContext } from "../../../context/PaginationContext/usePaginationContext";
import { useTasksContext } from "../../../context/TasksContext/useTasksContext";
import { movePage } from "../../../static/js/move-page/move-page";

export const MobilePagination = () => {
  const {
    totalPages,
    setTotalPages,
    tasksPerPage,
    currentPage,
    setCurrentPage,
  } = usePaginationContext();
  const { tasks } = useTasksContext();
  const pageNumbers = [];
  const maxPages = 3;

  let maxLeft = currentPage - Math.floor(maxPages / 2);
  let maxRight = currentPage + Math.floor(maxPages / 2);

  useEffect(() => {
    setTotalPages(Math.round(tasks.length / tasksPerPage));
  }, [tasksPerPage, tasks.length, setTotalPages]);

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
    return `pagination__btn${
      currentPage === number ? "--active" : " link-underline"
    }`;
  };
  const paginate = movePage(setCurrentPage);

  return (
    <nav>
      <ul>
        {currentPage >= 4 && totalPages > 5 && (
          <li>
            <button id="first-page" onClick={() => paginate(1)}>
              <i className="first-page" />
            </button>
          </li>
        )}
        {pageNumbers.map(function(number) {

          return (
            <li key={number}>
              <button
                id={"page-" + number}
                className={isCurrentPage(number)}
                onClick={() => paginate(number)}
              >
                {number}
              </button>
            </li>
          );
        })}
        {maxRight !== tasks.length && (
          <li>
            <button id="last-page" onClick={() => paginate(totalPages)}>
              <i className="last-page" />
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};
