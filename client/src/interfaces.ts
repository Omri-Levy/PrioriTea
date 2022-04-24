import { ReactNode } from "react";
import { Tasks } from "./types";

export interface IAuthContext {
  isSignedIn: boolean;
  signIn: VoidFunction;
  signOut: VoidFunction;
  displayEmailExistsMsg: boolean;
  toggleEmailExistsMsg: (next: boolean) => void;
}

export interface IChildren {
  children: ReactNode;
}

export interface ITasksContext {
  tasks: Tasks;
  tasksCopy: Tasks;
  setTasks: (data: Tasks) => void;
  setTasksCopy: (data: Tasks) => void;
  setEditTaskId: (id: string) => void;
  editTaskId: string;
}

export interface IModalsContext {
  createTaskModalOpen: boolean;
  editTaskModalOpen: boolean;
  openCreateTaskModal: VoidFunction;
  closeCreateTaskModal: VoidFunction;
  openEditTaskModal: VoidFunction;
  closeEditTaskModal: VoidFunction;
}

export interface ILoadingContext {
  loading: boolean;
  startLoading: VoidFunction;
  stopLoading: VoidFunction;
}

export interface ITask {
  _id: string;
  priority: string;
  task: string;
  status: string;
}
