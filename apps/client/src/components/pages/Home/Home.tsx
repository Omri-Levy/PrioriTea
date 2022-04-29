import React from "react";
import { ModalsProvider } from "../../../context/ModalsContext/ModalsContext";
import { PaginationProvider } from "../../../context/PaginationContext/PaginationContext";
import { TasksProvider } from "../../../context/TasksContext/TasksContext";
import { TasksContainer } from "../../tasks/TasksContainer/TasksContainer";

export const Home = () => {
  return (
      <TasksProvider>
        <PaginationProvider>
          <ModalsProvider>
            <TasksContainer />
          </ModalsProvider>
        </PaginationProvider>
      </TasksProvider>
  );
};
