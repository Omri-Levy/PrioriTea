import React, { useContext, useEffect, useState } from 'react';
import { TasksContext, ModalsContext, LoadingContext } from '../../../context';
import {
	sortFn,
	fetchFn,
	filterBySearch,
	persistFilter,
} from '../../../static/js';
import {
	Tasks,
	Pagination,
	OnePager,
	NoTasks,
	EditTaskModal,
	CreateTaskModal,
	MobileTasks,
	MobilePagination,
	MobileNoTasks,
	InvalidFilter,
	Loading,
	FilterSearch,
} from '../../../components';

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
			const getTasksUrl = `${process.env.REACT_APP_API_TASK}/get_tasks`;
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
