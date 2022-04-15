import React, { useContext } from 'react';
import { TasksContext } from '../../../../context';
import { filterByBtn } from '../../../../static/js';
import {
	displayTaskFilterTooltip,
	hideTaskFilterTooltip,
} from '../../../../static/js';

export const TaskFilterModal = ({ target, noTasks }) => {
	const { tasks, setTasksCopy } = useContext(TasksContext);

	const filterSet = () => {
		const tempArr = [];
		tasks.forEach((item) => {
			switch (target) {
				case 'priority':
					tempArr.push(item.priority);
					break;
				case 'task':
					tempArr.push(item.task);
					break;
				case 'status':
					tempArr.push(item.status);
					break;
				default:
					return false;
			}
		});
		return new Set(tempArr);
	};
	const mySet = filterSet();
	const filterByBtnWrapper = (Event) => {
		filterByBtn(Event, tasks, setTasksCopy);
	};
	const filterObj = localStorage.getItem('filter');
	const resetFilter = () => {
		localStorage.removeItem('filter');
		setTasksCopy(tasks);
	};

	return (
		<>
			<em
				title={noTasks ? 'Filter Is Unavailable On Draft' : 'Filter'}
				className={
					noTasks
						? 'task-filter-tooltip-btn draft'
						: 'task-filter-tooltip-btn'
				}
				onMouseEnter={noTasks ? null : displayTaskFilterTooltip}
				onMouseLeave={hideTaskFilterTooltip}
			>
				{filterObj && (
					<em
						title="Clear Filter"
						className="clear-filter"
						onClick={resetFilter}
					/>
				)}
				<div>
					<div
						onMouseLeave={hideTaskFilterTooltip}
						id="hidden-filter-modal"
						className="task-filter-modal hidden"
					>
						<ul>
							{[...mySet].map((item) => {
								return (
									<li
										onClick={(Event) =>
											filterByBtnWrapper(Event)
										}
										key={item}
									>
										{item}
									</li>
								);
							})}
						</ul>
					</div>
				</div>
			</em>
		</>
	);
};
