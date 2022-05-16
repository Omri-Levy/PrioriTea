import {useMutation, useQueryClient} from "react-query";
import {Tasks as TasksType} from "@prioritea/types";
import {TasksApi} from "../../../../../../api/tasks-api/tasks-api";
import {
	useErrorToast
} from "../../../../../../hooks/useErrorToast/useErrorToast";

export const useDeleteTasksMutation = () => {
	const queryClient = useQueryClient();
	const errorToast = useErrorToast();

	return useMutation(
		async ({ids}: { ids: Array<string> }) => {
			const {data} = await TasksApi.deleteByIds(ids);

			return data.data.tasks;
		},
		{
			async onMutate({ids}) {
				await queryClient.cancelQueries(["tasks"]);

				const prevTasks = queryClient.getQueryData([
					"tasks",
				]) as TasksType;

				queryClient.setQueryData(["tasks"], (prev) =>
					// @ts-ignore
					prev.filter((id) => !ids.includes(id))
				);

				return {prevTasks};
			},
			onError(err, _ids, context: { prevTasks: TasksType } | undefined) {
				queryClient.setQueryData(["tasks"], context?.prevTasks);

				// @ts-ignore
				if (err.response?.status === 404) {
					// @ts-ignore
					errorToast(err.response?.data.errors?.[0].message);

					return;
				}

				errorToast("Failed to delete tasks");
			},
			onSettled() {
				queryClient.invalidateQueries(["tasks"]);
			},
		}
	);
};
