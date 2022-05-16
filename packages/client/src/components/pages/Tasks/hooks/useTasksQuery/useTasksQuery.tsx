import {useQuery} from "react-query";
import {TasksApi} from "../../../../../api/tasks-api/tasks-api";

export const useTasksQuery = () =>
	useQuery(["tasks"], async () => {
		const {data} = await TasksApi.getAll();

		return data.data.tasks;
	});
