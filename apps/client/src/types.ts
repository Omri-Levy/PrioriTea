import { Dispatch, SetStateAction } from "react";

export type SetState<TState> = Dispatch<SetStateAction<TState>>;

