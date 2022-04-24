import { Tasks } from "../../../types";

export const sortFn = (data: Tasks) => {
  return data.sort((a, b) => {
    const cached = localStorage.getItem("sort");

    const sortObj: {
      sortBy: string | number;
      orderBy: "asc" | "desc";
    } = cached
      ? JSON.parse(cached)
      : {
          sortBy: "priority",
          orderBy: "asc",
        };

    const { sortBy, orderBy } = sortObj;

    // @ts-ignore
    if (isNaN(a[sortBy] - b[sortBy])) {
      if (orderBy === "desc") {
        // @ts-ignore
        return a[sortBy] > b[sortBy] ? 1 : -1;
      } else {
        // @ts-ignore
        return a[sortBy] > b[sortBy] ? -1 : 1;
      }
    } else {
      if (orderBy === "desc") {
        // @ts-ignore
        return a[sortBy] - b[sortBy];
      } else {
        // @ts-ignore
        return b[sortBy] - a[sortBy];
      }
    }
  });
};
