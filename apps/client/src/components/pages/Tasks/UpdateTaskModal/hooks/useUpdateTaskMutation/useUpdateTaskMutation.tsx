import {useMutation, useQueryClient} from "react-query";
import {TasksApi} from "../../../../../../api/tasks-api/tasks-api";
import {Tasks, UpdateTaskDto} from "@prioritea/types";
import {errorToast} from "../../../Tasks";

export const useUpdateTaskMutation = (onClose: () => void) => {
	const queryClient = useQueryClient();

	return useMutation(async ({
								  id,
								  priority,
								  description,
								  status,
							  }: UpdateTaskDto) => {
		const {data} = await TasksApi.updateById({
			id,
			priority,
			description,
			status
		});

		return data.data.tasks;
	}, {
		async onMutate(editedTask) {
			await queryClient.cancelQueries(['tasks']);

			const prevTasks = queryClient.getQueryData(['tasks']) as Tasks;

			queryClient.setQueryData(['tasks'], (prev) =>
				// @ts-ignore
				prev.map((task) => {
					if (task.id === editedTask.id) {
						return editedTask;
					}

					return task;
				}));

			return {prevTasks};
		},
		onError(err, _editedTask, context: { prevTasks: Tasks } | undefined) {
			queryClient.setQueryData(['tasks'], context?.prevTasks);

			// @ts-ignore
			if (err.response?.status === 404) {
				onClose();
				// @ts-ignore
				errorToast(err.response?.data.errors?.[0].message);

				return;
			}

			errorToast("Failed to update task");
		},
		onSettled() {
			queryClient.invalidateQueries(['tasks']);
		}
	});
}
