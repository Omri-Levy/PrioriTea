import { ITask } from "../../../interfaces";
import { Tasks } from "../../../types";

export const filterBySearch = (value: string, tasks: Tasks, setTasksCopy: (tasks: Tasks) => void) => {
	localStorage.getItem('filter') && localStorage.removeItem('filter');

	const valueIncluded = (task: ITask) => {
		return (
			task.priority.toLowerCase().includes(value) ||
			task.description.toLowerCase().includes(value) ||
			task.status.toLowerCase().includes(value)
		);
	};

	const filteredTasks = tasks.filter((task) => valueIncluded(task));
	setTasksCopy(filteredTasks);
};

export const filterByBtn = (event: any, tasks: Tasks, setTasksCopy: (tasks: Tasks) => void) => {
	const key = event.target
		.closest('th')
		.getElementsByTagName('span')[0]
		.innerText.toLowerCase();
	const value = event.target.innerText;

	setFilter(key, value);
	// @ts-ignore
	const filteredTasks = tasks.filter((task) => task[key] === value);

	setTasksCopy(filteredTasks);
};

export const setFilter = (key: string, value: string) => {
	const filterObj = { key: key, value: value };

	localStorage.setItem('filter', JSON.stringify(filterObj));
};

export const persistFilter = (data: Tasks) => {
	const cached = localStorage.getItem("filter");
	const filterObj =  cached ? JSON.parse(cached)  : cached;

	if (filterObj) {
		const { key, value } = filterObj;

		// @ts-ignore
		return data.filter((task) => task[key] === value);
	} else {
		return data;
	}
};
