export const OnePager = () => {
  return (
    <nav className="pagination__container">
      <ul className="pagination__list">
        <li className="pagination__item--page">
          <button id={"page-1"} className="pagination__btn--active">
            1
          </button>
        </li>
      </ul>
    </nav>
  );
};
