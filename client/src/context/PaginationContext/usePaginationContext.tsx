import { useContext } from "react";
import { PaginationContext } from "./PaginationContext";

export const usePaginationContext = () => useContext(PaginationContext);