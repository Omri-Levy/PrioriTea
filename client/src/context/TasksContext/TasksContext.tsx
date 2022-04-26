import { createContext } from "react";
import { useLocalStorageReducer } from "../../components/tasks/MobileNoTasks/useLocalStorageReducer";
import { IChildren, ITasksContext } from "../../interfaces";
import { Tasks } from "../../types";
import { tasksReducer } from "./tasks-reducer";

export const TasksContext = createContext<ITasksContext>({
  setTasks: () => {},
  setEditTaskId: () => {},
  tasks: [],
  editTaskId: "",
});

export const TasksProvider = ({ children }: IChildren) => {
  const [tasksObj, dispatch] = useLocalStorageReducer(
    tasksReducer,
    {
      tasks: [],
      editTaskId: "",
      filter: "",
    },
    "tasks"
  );

  const setTasks = (tasks: Tasks) =>
    dispatch({ type: "SET_TASKS", payload: tasks });


  const setEditTaskId = (id: string) =>
    dispatch({
      type: "SET_EDIT_TASK_ID",
      payload: id,
    });

  return (
    <TasksContext.Provider
      value={{
        ...tasksObj,
        setTasks,
        setEditTaskId,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};
