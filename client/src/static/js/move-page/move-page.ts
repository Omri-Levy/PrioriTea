export const movePage =
  (setCurrentPage: (pageNum: number) => void) => (pageNumber: number) =>
    setCurrentPage(pageNumber);
