import React, { useContext, useEffect, useState } from 'react';
import { TasksContext, ModalsContext, LoadingContext } from '../../../context';
import { fetchFn } from '../../../static/js/requests/fetch-fn/fetch-fn';
import { FilterSearch } from '../../FilterSearch/FilterSearch';
import { InvalidFilter } from '../InvalidFilter/InvalidFilter';
import { MobileNoTasks } from '../MobileNoTasks/MobileNoTasks';
import { MobilePagination } from '../MobilePagination/MobilePagination';
import { MobileTasks } from '../MobileTasks/MobileTasks';
import { CreateTaskModal } from '../modals/CreateTaskModal/CreateTaskModal';
import { EditTaskModal } from '../modals/EditTaskModal/EditTaskModal';
import { NoTasks } from '../NoTasks/NoTasks';
import { OnePager } from '../OnePager/OnePager';
import { Pagination } from '../Pagination/Pagination';
import { Tasks } from '../Tasks/Tasks';


export const TasksContainer = () => {
	const { tasks, setTasks, tasksCopy, setTasksCopy } =
		useContext(TasksContext);
	const { loading, startLoading, stopLoading } = useContext(LoadingContext);
	const { createTaskModalOpen, editTaskModalOpen } =
		useContext(ModalsContext);
	const [screenSize, setScreenSize] = useState(window.innerWidth);

	const responsivePagination = () => {
		if (screenSize <= 768) {
			return <MobilePagination />;
		} else {
			return <Pagination />;
		}
	};

	const responsiveTasks = () => {
		if (screenSize <= 768) {
			return <MobileTasks />;
		} else {
			return <Tasks />;
		}
	};

	const responsiveNoTasks = () => {
		if (screenSize <= 768) {
			return <MobileNoTasks />;
		} else {
			return <NoTasks />;
		}
	};

	useEffect(() => {
		startLoading();

		(async () => {
			const getTasksUrl = `${process.env.REACT_APP_API_TASK}/get-tasks`;
			const getTasksOptions = {
				method: 'GET',
				credentials: 'include',
			};

			const { data } = await fetchFn(getTasksUrl, getTasksOptions);

			const filteredData = persistFilter(data);
			const sortedData = sortFn(filteredData);

			setTasks(sortedData);
			setTasksCopy(sortedData);
		})();

		stopLoading();
	}, []);

	useEffect(() => {
		window.addEventListener('resize', () => {
			setScreenSize(window.innerWidth);
		});
	}, []);

	if (loading) return <Loading />;

	const filterBySearchWrapper = (Event) => {
		filterBySearch(Event.target.value.toLowerCase(), tasks, setTasksCopy);
	};

	const noTasks = () => {
		return tasks.length === 0 && tasksCopy.length === 0;
	};

	const noTasksCopy = () => {
		return tasksCopy.length === 0 && tasks.length !== 0;
	};

	return (
		<div className="tasks-container">
			{createTaskModalOpen && <CreateTaskModal />}
			{editTaskModalOpen && <EditTaskModal />}
			<FilterSearch
				maxLength="80"
				autoFocus={true}
				label="Filter"
				name="Filter"
				type="text"
				autoComplete="on"
				placeholder={'Filter'}
				disabled={noTasks()}
				title={noTasks() ? 'Filter Is Unavailable On Draft' : null}
				className={noTasks() ? 'primary-input draft' : 'primary-input'}
				onChange={(Event) => filterBySearchWrapper(Event)}
			/>
			{noTasksCopy() && <InvalidFilter />}
			{noTasks() && !noTasksCopy()
				? responsiveNoTasks()
				: responsiveTasks()}
			{noTasks() || noTasksCopy() ? <OnePager /> : responsivePagination()}
		</div>
	);
};
