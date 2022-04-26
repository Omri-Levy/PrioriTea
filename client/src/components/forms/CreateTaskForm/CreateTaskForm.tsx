import { Form, Formik } from "formik";
import { TasksApi } from "../../../api/tasks-api";
import { useLoadingContext } from "../../../context/LoadingContext/useLoadingContext";
import { useModalsContext } from "../../../context/ModalsContext/useModalsContext";
import { useTasksContext } from "../../../context/TasksContext/useTasksContext";
import { persistFilter } from "../../../static/js/filter/filter";
import { sortFn } from "../../../static/js/sort-fn/sort-fn";
// import { createTaskSchema } from "../../../static/js/validation/create-task-schema/create-task-schema";
import { FormikInput } from "../../FormikInput/FormikInput";

export const CreateTaskForm = () => {
  const { setTasks } = useTasksContext();
  const { closeCreateTaskModal } = useModalsContext();
  const { startLoading, stopLoading, isLoading } = useLoadingContext();

  return (
    <Formik
      initialValues={{
        priority: "",
        description: "",
        status: "",
      }}
      // validationSchema={createTaskSchema}
      onSubmit={async ({ priority, description, status }) => {
        startLoading();

        const { data } = await TasksApi.create(priority, description, status);

        stopLoading();

        closeCreateTaskModal();

        const filteredData = persistFilter(data?.tasks);
        const sortedData = sortFn(filteredData);

        setTasks(sortedData);
      }}
    >
      {() => (
        <Form className="create-task-form">
          <p className="required-fields-msg">Indicates required fields</p>
          <FormikInput
            maxLength={80}
            autoFocus={true}
            label="Priority"
            name="priority"
            type="text"
            required
            isRequired={true}
            autoComplete="on"
            placeholder="Priority"
          />
          <FormikInput
            maxLength={80}
            label="Description"
            name="description"
            type="text"
            required
            isRequired={true}
            autoComplete="on"
            placeholder="Description"
          />
          <button
            disabled={isLoading}
            type="submit"
            className="primary-btn excluded-link"
          >
            {isLoading ? (
              <i className="fas fa-spinner fa-spin" />
            ) : (
              <p className="custom-span link-underline">Create</p>
            )}
          </button>
          <button
            onClick={closeCreateTaskModal}
            type="button"
            className="primary-btn"
          >
            <p className="custom-span link-underline">Cancel</p>
          </button>
        </Form>
      )}
    </Formik>
  );
};
