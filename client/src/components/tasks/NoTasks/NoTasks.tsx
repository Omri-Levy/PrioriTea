import { useEffect } from 'react';
import { useModalsContext } from '../../../context/ModalsContext/useModalsContext';
import { useLocalStorage } from '../MobileNoTasks/useLocalStorage';
import { TaskFilterModal } from '../modals/TaskFilterModal/TaskFilterModal';
import { TaskOptionsModal } from '../modals/TaskOptionsModal/TaskOptionsModal';

export const NoTasks = () => {
	const { openCreateTaskModal } = useModalsContext();
	const [counter] = useLocalStorage(0, 'counter');

	useEffect(() => {
		counter === 0 && openCreateTaskModal();
	}, [counter, openCreateTaskModal]);

	return (
		<table>
			<thead>
				<tr>
					<th>
						<TaskFilterModal noTasks={true} target={'priority'} />
						<span>
							Priority
							<i
								title="Sorting Is Unavailable On Draft"
								className="sorted-desc draft"
							/>
						</span>
					</th>
					<th>
						<TaskFilterModal noTasks={true} target={'task'} />
						<span>
							Task
							<i
								title="Sorting Is Unavailable On Draft"
								className="sorted-desc draft"
							/>
						</span>
					</th>
					<th>
						<TaskFilterModal noTasks={true} target={'status'} />
						<TaskOptionsModal noTasks={true} taskId="draft" />
						<span>
							Status
							<i
								title="Sorting Is Unavailable On Draft"
								className={'sorted-desc draft'}
							/>
						</span>
					</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td className="priority">No Available Tasks</td>
					<td className="task">No Available Tasks</td>
					<td className="status">No Available Tasks</td>
				</tr>
			</tbody>
		</table>
	);
};
