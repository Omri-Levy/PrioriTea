import {useMutation, useQueryClient} from "react-query";
import {Tasks, UpdateTaskDto} from "@prioritea/types";
import {TasksApi} from "../../../../../../api/tasks-api/tasks-api";
import {
	useErrorToast
} from "../../../../../../hooks/useErrorToast/useErrorToast";

export const useUpdateTaskMutation = (onClose: () => void) => {
	const queryClient = useQueryClient();
	const errorToast = useErrorToast();

	return useMutation(
		async ({id, priority, description, status}: UpdateTaskDto) => {
			const {data} = await TasksApi.updateById({
				id,
				priority,
				description,
				status,
			});

			return data.data.tasks;
		},
		{
			// Optimistic updates
			async onMutate(editedTask) {
				// Make sure that meanwhile tasks don't get overridden
				await queryClient.cancelQueries(["tasks"]);

				const prevTasks = queryClient.getQueryData(["tasks"]) as Tasks;

				queryClient.setQueryData(["tasks"], (prev) =>
					// @ts-ignore
					prev.map((task) => {
						// Override the task with the edited one
						if (task.id === editedTask.id) {
							return editedTask;
						}

						return task;
					})
				);

				// Pass the previous tasks to the error handler
				return {prevTasks};
			},
			// Revert optimistic updates on error
			onError(
				err,
				_editedTask,
				context: { prevTasks: Tasks } | undefined
			) {
				queryClient.setQueryData(["tasks"], context?.prevTasks);

				// 404 is the most likely error when using the UI
				// @ts-ignore
				if (err.response?.status === 404) {
					onClose();
					// @ts-ignore
					errorToast(err.response?.data.errors?.[0].message);

					return;
				}

				// Fallback error message
				errorToast("Failed to update task");
			},
			// Regardless of the outcome, make sure the data is correct.
			onSettled() {
				queryClient.invalidateQueries(["tasks"]);
			},
		}
	);
};
