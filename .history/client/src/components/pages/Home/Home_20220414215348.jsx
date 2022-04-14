import React from 'react';
import { ModalsProvider } from '../../../context/ModalsContext.jsx';
import { PaginationProvider } from '../../../context/PaginationContext.jsx';
import { TasksProvider } from '../../../context/TasksContext.jsx';
import TasksContainer from '../../tasks/MobileNoTasks copy 8/TasksContainer.jsx';

export const Home = () => {
	return (
		<main className="body-container">
			<TasksProvider>
				<PaginationProvider>
					<ModalsProvider>
						<TasksContainer />
					</ModalsProvider>
				</PaginationProvider>
			</TasksProvider>
		</main>
	);
};
