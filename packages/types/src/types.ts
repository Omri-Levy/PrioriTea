import { ITask } from "./interfaces";

export type MethodUnion = "post" | "get" | "put" | "patch" | "delete";
export type VoidFunction = () => void;
export type Tasks = Array<ITask>;
