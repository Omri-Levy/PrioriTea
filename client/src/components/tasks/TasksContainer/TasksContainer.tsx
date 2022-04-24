import { useEffect, useState } from "react";
import { useLoadingContext } from "../../../context/LoadingContext/useLoadingContext";
import { useModalsContext } from "../../../context/ModalsContext/useModalsContext";
import { useTasksContext } from "../../../context/TasksContext/useTasksContext";
import {
  filterBySearch,
  persistFilter,
} from "../../../static/js/filter/filter";
import { fetchFn } from "../../../static/js/requests/fetch-fn/fetch-fn";
import { sortFn } from "../../../static/js/sort-fn/sort-fn";
import { FilterSearch } from "../../FilterSearch/FilterSearch";
import { Loading } from "../../Loading/Loading";
import { InvalidFilter } from "../InvalidFilter/InvalidFilter";
import { MobileNoTasks } from "../MobileNoTasks/MobileNoTasks";
import { MobilePagination } from "../MobilePagination/MobilePagination";
import { MobileTasks } from "../MobileTasks/MobileTasks";
import { CreateTaskModal } from "../modals/CreateTaskModal/CreateTaskModal";
import { EditTaskModal } from "../modals/EditTaskModal/EditTaskModal";
import { NoTasks } from "../NoTasks/NoTasks";
import { OnePager } from "../OnePager/OnePager";
import { Pagination } from "../Pagination/Pagination";
import { Tasks } from "../Tasks/Tasks";

export const TasksContainer = () => {
  const { tasks, setTasks, tasksCopy, setTasksCopy } = useTasksContext();
  const { loading, startLoading, stopLoading } = useLoadingContext();
  const { createTaskModalOpen, editTaskModalOpen } = useModalsContext();
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  const responsivePagination = () => {
    if (screenSize <= 768) {
      return <MobilePagination />;
    } else {
      return <Pagination />;
    }
  };

  const responsiveTasks = () => {
    if (screenSize <= 768) {
      return <MobileTasks />;
    } else {
      return <Tasks />;
    }
  };

  const responsiveNoTasks = () => {
    if (screenSize <= 768) {
      return <MobileNoTasks />;
    } else {
      return <NoTasks />;
    }
  };

  useEffect(() => {
    startLoading();

    (async () => {
      const getTasksUrl = `${process.env.REACT_APP_API_TASK}/get-tasks`;
      const getTasksOptions = {
        method: "GET",
        credentials: "include",
      };

      const { data } = await fetchFn(getTasksUrl, getTasksOptions);

      const filteredData = persistFilter(data);
      const sortedData = sortFn(filteredData);

      setTasks(sortedData);
      setTasksCopy(sortedData);
    })();

    stopLoading();
  }, [setTasks, setTasksCopy, startLoading, stopLoading]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setScreenSize(window.innerWidth);
    });
  }, []);

  if (loading) return <Loading />;

  const filterBySearchWrapper = (event: any) => {
    filterBySearch(event.target.value.toLowerCase(), tasks, setTasksCopy);
  };

  const noTasks = () => {
    return tasks.length === 0 && tasksCopy.length === 0;
  };

  const noTasksCopy = () => {
    return tasksCopy.length === 0 && tasks.length !== 0;
  };

  return (
    <div className="tasks-container">
      {createTaskModalOpen && <CreateTaskModal />}
      {editTaskModalOpen && <EditTaskModal />}
      <FilterSearch
        maxLength={80}
        autoFocus={true}
        label="Filter"
        name="Filter"
        type="text"
        autoComplete="on"
        placeholder={"Filter"}
        disabled={noTasks()}
        title={noTasks() ? "Filter Is Unavailable On Draft" : undefined}
        className={noTasks() ? "primary-input draft" : "primary-input"}
        onChange={filterBySearchWrapper}
      />
      {noTasksCopy() && <InvalidFilter />}
      {noTasks() && !noTasksCopy() ? responsiveNoTasks() : responsiveTasks()}
      {noTasks() || noTasksCopy() ? <OnePager /> : responsivePagination()}
    </div>
  );
};
