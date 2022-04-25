import { useLoadingContext } from "../../../context/LoadingContext/useLoadingContext";
import { usePaginationContext } from "../../../context/PaginationContext/usePaginationContext";
import { useTasksContext } from "../../../context/TasksContext/useTasksContext";
import { toggleSort } from "../../../static/js/handlers";
import { sortFn } from "../../../static/js/sort-fn/sort-fn";
import { Loading } from "../../Loading/Loading";
import { TaskFilterModal } from "../modals/TaskFilterModal/TaskFilterModal";
import { TaskOptionsModal } from "../modals/TaskOptionsModal/TaskOptionsModal";

export const MobileTasks = () => {
  const { tasksCopy, setTasksCopy } = useTasksContext();
  const { loading } = useLoadingContext();
  const { currentPage, tasksPerPage } = usePaginationContext();
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;

  let slicedTasksCopy = tasksCopy.slice(indexOfFirstTask, indexOfLastTask);

  if (loading) return <Loading />;

  const updateSorting = (event: any) => {
    toggleSort(event);

    const sortedData = sortFn(tasksCopy);

    setTasksCopy(sortedData);
  };

  const sortExists = (header: string) => {
    const cached = localStorage.getItem("sort");
    const { sortBy, orderBy } = cached
      ? JSON.parse(cached)
      : {
          sortBy: "priority",
          orderBy: "desc",
        };
    return sortBy === header && orderBy === "asc"
      ? "sorted-asc"
      : "sorted-desc";
  };

  return (
    <>
      {slicedTasksCopy.map((task) => (
        <table key={task.id}>
          <thead>
            <tr>
              <th>
                <TaskFilterModal target={"priority"} />
                <span>
                  Priority
                  <i
                    title="Sort"
                    onClick={updateSorting}
                    className={sortExists("priority")}
                  />
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="priority">{task.priority}</td>
            </tr>
          </tbody>
          <thead>
            <tr>
              <th>
                <TaskFilterModal target={"task"} />
                <span>
                  Task
                  <i
                    title="Sort"
                    onClick={updateSorting}
                    className={sortExists("task")}
                  />
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="task">{task.description}</td>
            </tr>
          </tbody>
          <thead>
            <tr>
              <th>
                <TaskFilterModal target={"status"} />
                <TaskOptionsModal taskId={task.id} />
                <span>
                  Status
                  <i
                    title="Sort"
                    onClick={updateSorting}
                    className={sortExists("status")}
                  />
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="status">{task.status}</td>
            </tr>
          </tbody>
        </table>
      ))}
    </>
  );
};
