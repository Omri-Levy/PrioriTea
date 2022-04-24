import { Form, Formik } from "formik";
import { useLoadingContext } from "../../../context/LoadingContext/useLoadingContext";
import { useModalsContext } from "../../../context/ModalsContext/useModalsContext";
import { useTasksContext } from "../../../context/TasksContext/useTasksContext";
import { persistFilter } from "../../../static/js/filter/filter";
import { fetchFn } from "../../../static/js/requests/fetch-fn/fetch-fn";
import { sortFn } from "../../../static/js/sort-fn/sort-fn";
import { createTaskSchema } from "../../../static/js/validation/create-task-schema/create-task-schema";
import { FormikInput } from "../../FormikInput/FormikInput";

export const CreateTaskForm = () => {
  const { setTasks, setTasksCopy } = useTasksContext();
  const { closeCreateTaskModal } = useModalsContext();
  const { startLoading, stopLoading, loading } = useLoadingContext();
  const createTaskUrl = `${process.env.REACT_APP_API_TASK}/create-task`;
  const getTasksUrl = `${process.env.REACT_APP_API_TASK}/get-tasks`;
  //
  return (
    <Formik
      initialValues={{
        priority: "",
        task: "",
        status: "",
      }}
      validationSchema={createTaskSchema}
      onSubmit={async (data) => {
        startLoading();

        const createTaskOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            priority: data.priority,
            task: data.task,
          }),
          credentials: "include",
        };

        const getTasksOptions = {
          method: "GET",
          credentials: "include",
        };

        try {
          await fetchFn(createTaskUrl, createTaskOptions);

          closeCreateTaskModal();

          const { data: resData } = await fetchFn(getTasksUrl, getTasksOptions);

          const filteredData = persistFilter(resData);
          const sortedData = sortFn(filteredData);

          setTasks(sortedData);
          setTasksCopy(sortedData);
        } catch (err) {
          console.error(err);
        }

        stopLoading();
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
            label="Task"
            name="task"
            type="text"
            required
            isRequired={true}
            autoComplete="on"
            placeholder="Task"
          />
          <button
            disabled={loading}
            type="submit"
            className="primary-btn excluded-link"
          >
            {loading ? (
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
