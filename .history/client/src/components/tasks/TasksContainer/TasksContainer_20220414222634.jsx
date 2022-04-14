import React, { useContext, useEffect, useState } from 'react';
import { LoadingContext } from '../../../context/LoadingContext.jsx';
import { ModalsContext } from '../../../context/ModalsContext.jsx';
import { TasksContext } from '../../../context/TasksContext.jsx';
import {
	filterBySearch,
	persistFilter,
} from '../../../static/js/filter/filter.js';
import fetchFn from '../../../static/js/requests/fetch-fn/fetch-fn.js';
import sortFn from '../../../static/js/sortFn.js';
import FilterSearch from '../fields/FilterSearch.jsx';
import Loading from '../loading/Loading.jsx';
import InvalidFilter from './InvalidFilter.jsx.js';
import MobileNoTasks from './MobileNoTasks.jsx.js';
import MobilePagination from './MobilePagination.jsx.js';
import MobileTasks from './MobileTasks.jsx.js';
import CreateTaskModal from '../modals/CreateTaskModal/CreateTaskModal.jsx';
import EditTaskModal from '../modals/EditTaskModal/EditTaskModal.jsx';
import NoTasks from './NoTasks.jsx.js';
import OnePager from '../OnePager/OnePager.jsx';
import Pagination from './Pagination.jsx.js';
import Tasks from './Tasks.jsx.js';

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
