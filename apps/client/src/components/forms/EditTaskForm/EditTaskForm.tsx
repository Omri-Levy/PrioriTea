import { Form, Formik } from "formik";
import { TasksApi } from "../../../api/tasks-api";
import { useLoadingContext } from "../../../context/LoadingContext/useLoadingContext";
import { useModalsContext } from "../../../context/ModalsContext/useModalsContext";
import { useTasksContext } from "../../../context/TasksContext/useTasksContext";
import { persistFilter } from "../../../static/js/filter/filter";
import { sortFn } from "../../../static/js/sort-fn/sort-fn";
// import { editTaskSchema } from "../../../static/js/validation/edit-task-schema/edit-task-schema";
import { FormikInput } from "../../FormikInput/FormikInput";

export const EditTaskForm = () => {
  const { setTasks, editTaskId } = useTasksContext();
  const { closeEditTaskModal } = useModalsContext();
  const { startLoading, stopLoading, isLoading } = useLoadingContext();

  return (
    <Formik
      initialValues={{ priority: "", description: "", status: "" }}
      // validationSchema={editTaskSchema}
      onSubmit={async ({ priority, description, status }) => {
        startLoading();

        const { data: resData } = await TasksApi.updateById(
          editTaskId,
          priority,
          description,
          status
        );

        closeEditTaskModal();

        const filteredData = persistFilter(resData?.tasks);
        const sortedData = sortFn(filteredData);

        setTasks(sortedData);
        stopLoading();
      }}
    >
      {() => (
        <Form className="edit-task-form">
          <FormikInput
            maxLength={80}
            autoFocus={true}
            label="Priority"
            name="priority"
            type="text"
            autoComplete="on"
            placeholder="Priority"
          />
          <FormikInput
            maxLength={80}
            label="Description"
            name="description"
            type="text"
            autoComplete="on"
            placeholder="description"
          />
          <FormikInput
            maxLength={80}
            label="Status"
            name="status"
            type="text"
            autoComplete="on"
            placeholder="Status"
          />
          <button disabled={isLoading} type="submit" className="primary-btn">
            {isLoading ? (
              <i className="fas fa-spinner fa-spin" />
            ) : (
              <p className="custom-span link-underline">Edit</p>
            )}
          </button>
          <button
            type="button"
            onClick={closeEditTaskModal}
            className="primary-btn"
          >
            <p className="custom-span link-underline">Cancel</p>
          </button>
        </Form>
      )}
    </Formik>
  );
};
