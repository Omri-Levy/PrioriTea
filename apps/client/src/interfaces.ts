import { ReactNode } from "react";
import { Tasks, VoidFunction } from "./types";

export interface IAuthContext {
  isSignedIn: boolean;
  signIn: VoidFunction;
  signOut: VoidFunction;
  displayEmailExistsMsg: boolean;
  toggleOnDisplayEmailExistsMsg: VoidFunction;
  toggleOffDisplayEmailExistsMsg: VoidFunction;
}

export interface IChildren {
  children: ReactNode;
}

export interface ITasksContext {
  tasks: Tasks;
  setTasks: (data: Tasks) => void;
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
  isLoading: boolean;
  startLoading: VoidFunction;
  stopLoading: VoidFunction;
}

export interface ITask {
  id: string;
  priority: string;
  description: string;
  status: string;
}
