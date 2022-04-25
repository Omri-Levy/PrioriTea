import { FunctionComponent } from "react";
import { useTasksContext } from "../../../../context/TasksContext/useTasksContext";
import { ITask } from "../../../../interfaces";
import { filterByBtn } from "../../../../static/js/filter/filter";
import {
  displayTaskFilterTooltip,
  hideTaskFilterTooltip,
} from "../../../../static/js/handlers";

interface TaskFilterModalProps {
  target: any;
  noTasks?: boolean;
}

export const TaskFilterModal: FunctionComponent<TaskFilterModalProps> = ({
  target,
  noTasks,
}) => {
  const { tasks, setTasksCopy } = useTasksContext();

  const filterSet = () => {
    const tempArr: Array<string> = [];

    tasks.forEach((item: ITask) => {
      switch (target) {
        case "priority":
          tempArr.push(item.priority);
          break;
        case "task":
          tempArr.push(item.description);
          break;
        case "status":
          tempArr.push(item.status);
          break;
        default:
          return false;
      }
    });

    return new Set(tempArr);
  };
  const mySet = filterSet();
  const filterByBtnWrapper = (event: any) => {
    filterByBtn(event, tasks, setTasksCopy);
  };
  const filterObj = localStorage.getItem("filter");
  const resetFilter = () => {
    localStorage.removeItem("filter");
    setTasksCopy(tasks);
  };

  return (
    <em
      title={noTasks ? "Filter Is Unavailable On Draft" : "Filter"}
      className={
        noTasks ? "task-filter-tooltip-btn draft" : "task-filter-tooltip-btn"
      }
      onMouseEnter={noTasks ? undefined : displayTaskFilterTooltip}
      onMouseLeave={hideTaskFilterTooltip}
    >
      {filterObj && (
        <em
          title="Clear Filter"
          className="clear-filter"
          onClick={resetFilter}
        />
      )}
      <div>
        <div
          onMouseLeave={hideTaskFilterTooltip}
          id="hidden-filter-modal"
          className="task-filter-modal hidden"
        >
          <ul>
            {Array.from(mySet).map((item) => {
              return (
                <li onClick={filterByBtnWrapper} key={item}>
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </em>
  );
};
