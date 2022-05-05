import {useMutation, useQueryClient} from "react-query";
import {TasksApi} from "../../../../../../api/tasks-api";
import {Tasks, CreateTaskDto} from "@prioritea/types";

export const useCreateTaskMutation = () => {
	const queryClient = useQueryClient();

	return useMutation(['tasks'], async ({
											 priority,
											 description,
		status
										 }: CreateTaskDto) => {
		const {data} = await TasksApi.create({
			priority,
			description,
			status
		});

		return data.data.tasks;
	}, {
		async onMutate(newTask) {
			await queryClient.cancelQueries(['tasks']);

			const prevTasks = queryClient.getQueryData(['tasks']) as Tasks;

			queryClient.setQueryData(['tasks'], (prev) => [
				...prev as Tasks,
				{
					...newTask,
					status: 'Standby',
				}]);

			return {prevTasks};
		},
		onError(_err, _newTask, context: {prevTasks: Tasks} | undefined) {
			queryClient.setQueryData(['tasks'], context?.prevTasks);
		},
		onSettled() {
			queryClient.invalidateQueries(['tasks']);
		}
	});
}
