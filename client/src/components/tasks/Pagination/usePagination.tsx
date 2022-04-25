import { useCallback, useEffect, useMemo, useState } from "react";

export const usePagination = function <TItem>(
  toPaginate: Array<TItem>,
  itemsPerPage: number
) {
  const [page, setPage] = useState(0);

  // Derived state
  const totalPages = useMemo(
    () => Math.ceil(toPaginate.length / itemsPerPage),
    [toPaginate.length, itemsPerPage]
  );
  const sliceStart = useMemo(
    () => (page - 1) * itemsPerPage,
    [page, itemsPerPage]
  );
  const sliceEnd = useMemo(
    () => page * itemsPerPage,
    [page, itemsPerPage, totalPages]
  );

  const paginated = useMemo(
    () => toPaginate.slice(sliceStart, sliceEnd),
    [sliceStart, sliceEnd]
  );

  const canPrev = useMemo(() => page !== 1, [page, itemsPerPage]);
  const canNext = useMemo(() => page !== totalPages, [page, itemsPerPage]);

  // Functions
  const paginate = useCallback((pageNum: number) => setPage(pageNum), []);
  const prev = useCallback(() => paginate(page - 1), [page, paginate]);
  const next = useCallback(() => paginate(page + 1), [page, paginate]);

  // Handle invalid page (below 1 or above the array's length)
  useEffect(() => {
    if (page < 1) {
      paginate(1);
    }

    if (page > totalPages) {
      paginate(totalPages);
    }
  }, [page, totalPages, paginate]);

  return {
    paginated,
    page,
    prev,
    next,
    canPrev,
    canNext,
  };
};
