import React from 'react';
import {
	TasksProvider,
	PaginationProvider,
	ModalsProvider,
} from '../../../context';
import { TasksContainer } from '../../../components';

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
