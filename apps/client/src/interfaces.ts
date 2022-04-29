import { ReactNode } from "react";

export interface IChildren {
  children: ReactNode;
}

export interface ITask {
  id: string;
  priority: string;
  description: string;
  status: string;
}
