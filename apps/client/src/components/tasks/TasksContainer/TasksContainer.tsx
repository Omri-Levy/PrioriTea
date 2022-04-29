import { useEffect, useState } from "react";
import { TasksApi } from "../../../api/tasks-api";
import { useLoadingContext } from "../../../context/LoadingContext/useLoadingContext";
import { useModalsContext } from "../../../context/ModalsContext/useModalsContext";
import { useTasksContext } from "../../../context/TasksContext/useTasksContext";
import {
  filterBySearch,
  persistFilter,
} from "../../../static/js/filter/filter";
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
  const { tasks, setTasks } = useTasksContext();
  const { isLoading, startLoading, stopLoading } = useLoadingContext();
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
    (async () => {
      startLoading();
      const { data } = await TasksApi.getAll();
      stopLoading();

      const filteredData = persistFilter(data?.tasks);
      const sortedData = sortFn(filteredData);

      setTasks(sortedData);
    })();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setScreenSize(window.innerWidth);
    });
  }, []);

  if (isLoading) return <Loading />;

  const filterBySearchWrapper = (event: any) => {
    filterBySearch(event.target.value.toLowerCase(), tasks, setTasks);
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
        disabled={tasks.length === 0}
        title={
          tasks.length === 0 ? "Filter Is Unavailable On Draft" : undefined
        }
        className={tasks.length === 0 ? "primary-input draft" : "primary-input"}
        onChange={filterBySearchWrapper}
      />
      {tasks.length === 0 && <InvalidFilter />}
      {tasks.length === 0 ? responsiveNoTasks() : responsiveTasks()}
      {tasks.length === 1 ? <OnePager /> : responsivePagination()}
    </div>
  );
};
