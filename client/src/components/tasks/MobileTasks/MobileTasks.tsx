import { useContext } from 'react';
import { useLoadingContext } from '../../../context/LoadingContext/useLoadingContext';
import { usePaginationContext } from '../../../context/PaginationContext/usePaginationContext';
import { useTasksContext } from '../../../context/TasksContext/useTasksContext';


export const MobileTasks = () => {
	const { tasksCopy, setTasksCopy } = useTasksContext();
	const { loading } = useLoadingContext();
	const { currentPage, tasksPerPage } = usePaginationContext();
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
