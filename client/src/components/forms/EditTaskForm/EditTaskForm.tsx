import { Form, Formik } from "formik";
import { useLoadingContext } from "../../../context/LoadingContext/useLoadingContext";
import { useModalsContext } from "../../../context/ModalsContext/useModalsContext";
import { useTasksContext } from "../../../context/TasksContext/useTasksContext";
import { persistFilter } from "../../../static/js/filter/filter";
import { fetchFn } from "../../../static/js/requests/fetch-fn/fetch-fn";
import { sortFn } from "../../../static/js/sort-fn/sort-fn";
import { editTaskSchema } from "../../../static/js/validation/edit-task-schema/edit-task-schema";
import { FormikInput } from "../../FormikInput/FormikInput";

export const EditTaskForm = () => {
  const { setTasks, setTasksCopy, editTaskId } = useTasksContext();
  const { closeEditTaskModal } = useModalsContext();
  const { startLoading, stopLoading, loading } = useLoadingContext();
  const getTasksUrl = `${process.env.REACT_APP_API_TASK}/get-tasks`;
  const editTaskUrl = `${process.env.REACT_APP_API_TASK}/edit-task`;

  return (
    <Formik
      initialValues={{ priority: "", task: "", status: "" }}
      validationSchema={editTaskSchema}
      onSubmit={async (data) => {
        startLoading();

        const getTasksOptions = {
          method: "GET",
          credentials: "include",
        };

        const editTaskOptions = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _id: editTaskId,
            priority: data.priority,
            task: data.task,
            status: data.status,
          }),
          credentials: "include",
        };

        try {
          await fetchFn(editTaskUrl, editTaskOptions);

          closeEditTaskModal();

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
            label="Task"
            name="task"
            type="text"
            autoComplete="on"
            placeholder="Task"
          />
          <FormikInput
            maxLength={80}
            label="Status"
            name="status"
            type="text"
            autoComplete="on"
            placeholder="Status"
          />
          <button disabled={loading} type="submit" className="primary-btn">
            {loading ? (
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
