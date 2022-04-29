import { Dispatch, SetStateAction } from "react";
import { ITask } from "./interfaces";

export type SetState<TState> = Dispatch<SetStateAction<TState>>;

export type VoidFunction = () => void;

export type Tasks = Array<ITask>;