import { LoadingContext, ModalsContext, TasksContext } from '../../../context';
import {
	persistFilter,
	fetchFn,
	sortFn,
	editTasksSchema,
} from '../../../static/js';
import { Form, Formik } from 'formik';
import React, { useContext } from 'react';
import { FormikInput } from '../../../components';

export const EditTaskForm = () => {
	const { setTasks, setTasksCopy, editTaskId } = useContext(TasksContext);
	const { closeEditTaskModal } = useContext(ModalsContext);
	const { startLoading, stopLoading, loading } = useContext(LoadingContext);
	const getTasksUrl = `${process.env.REACT_APP_API_TASK}/get_tasks`;
	const editTaskUrl = `${process.env.REACT_APP_API_TASK}/edit_task`;

	return (
		<Formik
			initialValues={{ priority: '', task: '', status: '' }}
			validationSchema={editTaskSchema}
			onSubmit={async (data) => {
				startLoading();

				const getTasksOptions = {
					method: 'GET',
					credentials: 'include',
				};

				const editTaskOptions = {
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						_id: editTaskId,
						priority: data.priority,
						task: data.task,
						status: data.status,
					}),
					credentials: 'include',
				};

				try {
					await fetchFn(editTaskUrl, editTaskOptions);

					closeEditTaskModal();

					const { data: resData } = await fetchFn(
						getTasksUrl,
						getTasksOptions,
					);

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
						maxLength="80"
						autoFocus={true}
						label="Priority"
						name="priority"
						type="text"
						autoComplete="on"
						placeholder="Priority"
					/>
					<FormikInput
						maxLength="80"
						label="Task"
						name="task"
						type="text"
						autoComplete="on"
						placeholder="Task"
					/>
					<FormikInput
						maxLength="80"
						label="Status"
						name="status"
						type="text"
						autoComplete="on"
						placeholder="Status"
					/>
					<button
						disabled={loading}
						type="submit"
						className="primary-btn"
					>
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
