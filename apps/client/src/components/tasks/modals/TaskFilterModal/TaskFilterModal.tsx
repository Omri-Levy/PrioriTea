import { FunctionComponent, useState } from "react";
import { useTasksContext } from "../../../../context/TasksContext/useTasksContext";
import { useToggle } from "../../../../hooks/useToggle/useToggle";
import { ITask } from "../../../../interfaces";
import { filterByBtn } from "../../../../static/js/filter/filter";

interface TaskFilterModalProps {
  target: any;
  noTasks?: boolean;
}

export const TaskFilterModal: FunctionComponent<TaskFilterModalProps> = ({
  target,
  noTasks,
}) => {
  const { tasks, setTasks } = useTasksContext();

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
    filterByBtn(event, tasks, setTasks);
  };
  const {
    isToggled: isHidden,
    toggleOn: toggleOnIsHidden,
    toggleOff: toggleOffIsHidden,
  } = useToggle(true);
  const filterObj = localStorage.getItem("filter");
  const resetFilter = () => {
    localStorage.removeItem("filter");
    setTasks(tasks);
  };

  return (
    <em
      title={noTasks ? "Filter Is Unavailable On Draft" : "Filter"}
      className={
        noTasks ? "task-filter-tooltip-btn draft" : "task-filter-tooltip-btn"
      }
      onMouseEnter={noTasks ? undefined : toggleOffIsHidden}
      onMouseLeave={toggleOnIsHidden}
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
          onMouseLeave={toggleOnIsHidden}
          id="hidden-filter-modal"
          className={`task-filter-modal ${isHidden ? "hidden" : ""}`}
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
