import { FunctionComponent } from "react";
import { useTasksContext } from "../../../context/TasksContext/useTasksContext";
import { usePagination } from "./usePagination";

export const Pagination: FunctionComponent = () => {
  const { tasks } = useTasksContext();
  const { totalPages, first, last, page, paginate } = usePagination(tasks, 5);
  const maxPages = 5;
  const genPageBtns = function () {
    let pageNumbers: number[] = [];
    let maxLeft = page - Math.floor(maxPages / 2);
    let maxRight = page + Math.floor(maxPages / 2);

    if (maxLeft < 1) {
      maxLeft = 1;
      maxRight = maxPages;
    }

    if (maxRight > totalPages) {
      maxLeft = totalPages - (maxPages - 1);

      if (maxLeft < 1) maxLeft = 1;

      maxRight = totalPages;
    }

    for (let pg = maxLeft; pg <= maxRight; pg++) {
      pageNumbers = [...pageNumbers, pg];
    }

    return pageNumbers;
  };

  const isCurrentPage = (number: number) => {
    return `pagination__btn${page === number ? "--active" : " link-underline"}`;
  };
  const pages = Array.from({ length: tasks.length }, (_, i) => i + 1);

  return (
    <nav className="pagination__container">
      <ul className="pagination__list">
        <li className="pagination__item--first-page">
          <button
            id="first-page"
            className="pagination__btn link-underline"
            onClick={first}
          >
            <i className="first-page" />
            First
          </button>
        </li>
        {pages.map((number) => (
          <li key={number} className="pagination__item--page">
            <button
              id={"page-" + number}
              className={isCurrentPage(number)}
              onClick={() => paginate(number)}
            >
              {number}
            </button>
          </li>
        ))}
        <li className="pagination__item--last-page">
          <button
            id="last-page"
            onClick={last}
            className="pagination__btn link-underline"
          >
            Last
            <i className="last-page" />
          </button>
        </li>
      </ul>
    </nav>
  );
};
