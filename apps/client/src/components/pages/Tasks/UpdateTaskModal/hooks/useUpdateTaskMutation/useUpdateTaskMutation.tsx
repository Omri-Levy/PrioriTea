import {useMutation, useQueryClient} from "react-query";
import {Tasks, TasksApi} from "../../../../../../api/tasks-api";
import {UpdateTaskDto} from "../../interfaces";

export const useUpdateTaskMutation = () => {
	const queryClient = useQueryClient();

	return useMutation(['tasks'], async ({
		id,
											 priority,
											 description,
		status,
										 }: UpdateTaskDto) => {
		const {data} = await TasksApi.updateById(id, priority, description, status);

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
		onError(_err, _editedTask, context: {prevTasks: Tasks} | undefined) {
			queryClient.setQueryData(['tasks'], context?.prevTasks);
		},
		onSettled() {
			queryClient.invalidateQueries(['tasks']);
		}
	});
}
