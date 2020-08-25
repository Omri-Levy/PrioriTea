import React, {useContext, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import {AuthContext} from '../../context/AuthContext.jsx';
import {LoadingContext} from '../../context/LoadingContext.jsx';
import {ModalsContext} from '../../context/ModalsContext.jsx';
import {PaginationContext} from '../../context/PaginationContext.jsx';
import {TasksContext} from '../../context/TasksContext.jsx';
import {filterBySearch} from '../../static/js/filter.js';
import getTasksGet from '../../static/js/requests/getTasksGet.js';
import FilterSearch from '../fields/FilterSearch.jsx';
import Loading from '../loading/Loading.jsx';
import InvalidFilter from './InvalidFilter.jsx';
import CreateTaskModal from './modals/CreateTaskModal.jsx';
import EditTaskModal from './modals/EditTaskModal.jsx';
import NoTasks from './NoTasks.jsx';
import OnePager from './OnePager.jsx';
import Pagination from './Pagination.jsx';
import Tasks from './Tasks.jsx';

const TasksContainer = () => {
    const {tasks, setTasks, tasksCopy, setTasksCopy, sort} =
        useContext(TasksContext);
    const {loading, startLoading, stopLoading} = useContext(LoadingContext);
    const {createTaskModalOpen, editTaskModalOpen} =
        useContext(ModalsContext);

    const apiRes = () => {
        setTimeout(() => {
            stopLoading();
        }, 120);
    };

    useEffect(() => {
        startLoading();
        getTasksGet(setTasks, setTasksCopy, sort)
            .catch(err => console.error(err));
        apiRes();
    }, []);

    if (loading) return <Loading/>
    const filterBySearchWrapper = (Event) => {
        filterBySearch(Event.target.value.toLowerCase(), tasks, setTasksCopy);
    }
    const noTasks = () => {
        return tasks.length === 0 && tasksCopy.length === 0;
    }
    const noTasksCopy = () => {
        return tasksCopy.length === 0 && tasks.length !== 0;
    }
    return (
        <div className='tasks-container'>
            {createTaskModalOpen ? <CreateTaskModal/> : null}
            {editTaskModalOpen ? <EditTaskModal/> : null}
            <FilterSearch
                maxLength='80'
                autoFocus={true}
                label='Filter'
                name='Filter'
                type='text'
                autoComplete='on'
                placeholder={'Filter'}
                disabled={noTasks()}
                title={noTasks() ? 'Filter Is Unavailable On Draft' : null}
                className={noTasks() ? 'primary-input draft' : 'primary-input'}
                onChange={(Event) => filterBySearchWrapper(Event)}
            />
            {noTasksCopy() && <InvalidFilter/>}
            {noTasks() && !noTasksCopy() ? <NoTasks/> : <Tasks/>}
            {noTasks() || noTasksCopy() ? <OnePager/> : <Pagination/>}
        </div>
    );
}

export default TasksContainer;
