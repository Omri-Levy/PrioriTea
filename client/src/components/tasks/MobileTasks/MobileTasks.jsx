import React, { useContext } from 'react';
import {
	LoadingContext,
	PaginationContext,
	TasksContext,
} from '../../../context';
import { toggleSort, sortFn } from '../../../static/js';
import {
	TaskOptionsModal,
	TaskFilterModal,
	Loading,
} from '../../../components';

export const MobileTasks = () => {
	const { tasksCopy, setTasksCopy } = useContext(TasksContext);
	const { loading } = useContext(LoadingContext);
	const { currentPage, tasksPerPage } = useContext(PaginationContext);
	const indexOfLastTask = currentPage * tasksPerPage;
	const indexOfFirstTask = indexOfLastTask - tasksPerPage;

	let slicedTasksCopy = tasksCopy.slice(indexOfFirstTask, indexOfLastTask);

	if (loading) return <Loading />;

	const updateSorting = (Event) => {
		toggleSort(Event);

		const sortedData = sortFn(tasksCopy);

		setTasksCopy(sortedData);
	};

	const sortExists = (header) => {
		const { sortBy, orderBy } = JSON.parse(
			localStorage.getItem('sort'),
		) || {
			sortBy: 'priority',
			orderBy: 'desc',
		};
		return sortBy === header && orderBy === 'asc'
			? 'sorted-asc'
			: 'sorted-desc';
	};

	return (
		<>
			{slicedTasksCopy.map((task) => (
				<table key={task._id}>
					<thead>
						<tr>
							<th>
								<TaskFilterModal target={'priority'} />
								<span>
									Priority
									<i
										title="Sort"
										onClick={(Event) => {
											updateSorting(Event);
										}}
										className={sortExists('priority')}
									/>
								</span>
							</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td className="priority">{task.priority}</td>
						</tr>
					</tbody>
					<thead>
						<tr>
							<th>
								<TaskFilterModal target={'task'} />
								<span>
									Task
									<i
										title="Sort"
										onClick={(Event) => {
											updateSorting(Event);
										}}
										className={sortExists('task')}
									/>
								</span>
							</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td className="task">{task.task}</td>
						</tr>
					</tbody>
					<thead>
						<tr>
							<th>
								<TaskFilterModal target={'status'} />
								<TaskOptionsModal taskId={task._id} />
								<span>
									Status
									<i
										title="Sort"
										onClick={(Event) => {
											updateSorting(Event);
										}}
										className={sortExists('status')}
									/>
								</span>
							</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td className="status">{task.status}</td>
						</tr>
					</tbody>
				</table>
			))}
		</>
	);
};
