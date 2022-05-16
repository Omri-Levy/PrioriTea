import {TaskDto} from "./interfaces";

export type MethodUnion = "post" | "get" | "put" | "patch" | "delete";

export type FunctionVoidReturn = () => void;

export type Tasks = Array<TaskDto>;

export type BaseArray = Array<any>;

export type GenericFn<TArgs extends BaseArray, TReturns> = (...args: TArgs) => TReturns;
