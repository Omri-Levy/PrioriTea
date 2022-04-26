import { FunctionComponent, useState } from "react";
import { TasksApi } from "../../../../api/tasks-api";
import { useLoadingContext } from "../../../../context/LoadingContext/useLoadingContext";
import { useModalsContext } from "../../../../context/ModalsContext/useModalsContext";
import { useTasksContext } from "../../../../context/TasksContext/useTasksContext";
import { useToggle } from "../../../../hooks/useToggle/useToggle";
import { persistFilter } from "../../../../static/js/filter/filter";
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
  const { setTasks, setEditTaskId } = useTasksContext();
  const { openEditTaskModal, openCreateTaskModal } = useModalsContext();
  const { startLoading, stopLoading } = useLoadingContext();
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
  const {
    isToggled: isHidden,
    toggleOn: toggleOnIsHidden,
    toggleOff: toggleOffIsHidden,
  } = useToggle(true);

  return (
    <em
      title="Options"
      onMouseEnter={toggleOffIsHidden}
      onMouseLeave={toggleOnIsHidden}
      className={"task-options-tooltip-btn highlight-me"}
    >
      <div className={`task-options-modal ${isHidden ? `hidden` : ``}`}>
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

                  try {
                    const {
                      data: { tasks },
                    } = await TasksApi.deleteById(taskId);

                    const filteredData = persistFilter(tasks);
                    const sortedData = sortFn(filteredData);

                    setTasks(sortedData);
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
