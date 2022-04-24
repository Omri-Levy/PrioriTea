import { FunctionComponent, useEffect } from "react";
import { useModalsContext } from "../../../context/ModalsContext/useModalsContext";
import { TaskFilterModal } from "../modals/TaskFilterModal/TaskFilterModal";
import { TaskOptionsModal } from "../modals/TaskOptionsModal/TaskOptionsModal";
import { useLocalStorage } from "./useLocalStorage";

export const MobileNoTasks: FunctionComponent = () => {
  const { openCreateTaskModal } = useModalsContext();
  const [counter] = useLocalStorage(0, "counter");

  useEffect(() => {
    counter === 0 && openCreateTaskModal();
  }, [counter, openCreateTaskModal]);

  return (
    <table>
      <thead>
        <tr>
          <th>
            <TaskFilterModal noTasks={true} target={"priority"} />
            <span>
              Priority
              <i
                title="Sorting Is Unavailable On Draft"
                className="sorted-desc draft"
              />
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="priority">No Available Tasks</td>
        </tr>
      </tbody>
      <thead>
        <tr>
          <th>
            <TaskFilterModal noTasks={true} target={"task"} />
            <span>
              Task
              <i
                title="Sorting Is Unavailable On Draft"
                className="sorted-desc draft"
              />
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="task">No Available Tasks</td>
        </tr>
      </tbody>
      <thead>
        <tr>
          <th>
            <TaskFilterModal noTasks={true} target={"status"} />
            <TaskOptionsModal noTasks={true} taskId="draft" />
            <span>
              Status
              <i
                title="Sorting Is Unavailable On Draft"
                className={"sorted-desc draft"}
              />
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="status">No Available Tasks</td>
        </tr>
      </tbody>
    </table>
  );
};
