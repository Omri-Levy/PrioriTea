import { FunctionComponent } from "react";
import { useLoadingContext } from "../../../../context/LoadingContext/useLoadingContext";
import { useModalsContext } from "../../../../context/ModalsContext/useModalsContext";
import { useTasksContext } from "../../../../context/TasksContext/useTasksContext";
import { persistFilter } from "../../../../static/js/filter/filter";
import {
  displayTaskOptionsTooltip,
  hideTaskOptionsTooltip,
} from "../../../../static/js/handlers";
import { fetchFn } from "../../../../static/js/requests/fetch-fn/fetch-fn";
import { sortFn } from "../../../../static/js/sort-fn/sort-fn";

export interface TaskOptionsModalProps {
  taskId: string;
  noTasks?: boolean;
  invalidFilter?: boolean;
}

export const TaskOptionsModal: FunctionComponent<TaskOptionsModalProps> = ({
  taskId,
  noTasks,
  invalidFilter,
}) => {
  const { setTasks, setTasksCopy, setEditTaskId } = useTasksContext();
  const { openEditTaskModal, openCreateTaskModal } = useModalsContext();
  const { startLoading, stopLoading } = useLoadingContext();
  const deleteTaskUrl = `${process.env.REACT_APP_API_TASK}/delete-task`;
  const getTasksUrl = `${process.env.REACT_APP_API_TASK}/get-tasks`;

  const editTask = () => {
    openEditTaskModal();
    setEditTaskId(taskId);
  };

  const invalidFilterOrNoTasks = (action: any) => {
    if (noTasks) {
      return action === "edit"
        ? "Edit Is Unavailable On Draft"
        : "Delete Is Unavailable On Draft";
    } else if (invalidFilter) {
      const editMessage = "Edit Is Unavailable With Invalid Filter";
      const deleteMessage = "Delete Is Unavailable With Invalid Filter";
      return action === "edit" ? editMessage : deleteMessage;
    } else {
      return action === "edit" ? "Edit" : "Delete";
    }
  };

  return (
    <em
      title="Options"
      onMouseEnter={displayTaskOptionsTooltip}
      onMouseLeave={hideTaskOptionsTooltip}
      className={"task-options-tooltip-btn highlight-me"}
    >
      <div className="task-options-modal hidden">
        <em
          title="Create"
          onClick={openCreateTaskModal}
          className="create-task-btn"
        />
        <em
          title={invalidFilterOrNoTasks("edit")}
          onClick={noTasks || invalidFilter ? undefined : editTask}
          className={
            noTasks || invalidFilter
              ? "edit-task-btn excluded-link draft"
              : "edit-task-btn"
          }
        />
        <em
          title={invalidFilterOrNoTasks("delete")}
          onClick={
            noTasks || invalidFilter
              ? undefined
              : async () => {
                  startLoading();

                  const deleteTaskOptions = {
                    method: "DELETE",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      _id: taskId,
                    }),
                    credentials: "include",
                  };

                  const getTasksOptions = {
                    method: "GET",
                    credentials: "include",
                  };

                  try {
                    await fetchFn(deleteTaskUrl, deleteTaskOptions);

                    const { data: resData } = await fetchFn(
                      getTasksUrl,
                      getTasksOptions
                    );

                    const filteredData = persistFilter(resData);
                    const sortedData = sortFn(filteredData);

                    setTasks(sortedData);
                    setTasksCopy(sortedData);
                  } catch (err) {
                    console.error(err);
                  }

                  stopLoading();
                }
          }
          className={
            noTasks || invalidFilter
              ? "delete-task-btn excluded-link draft"
              : "delete-task-btn"
          }
        />
      </div>
    </em>
  );
};
