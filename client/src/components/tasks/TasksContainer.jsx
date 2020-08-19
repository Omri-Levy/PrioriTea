import React, {useContext, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import {AuthContext} from '../../context/AuthContext.jsx';
import {LoadingContext} from '../../context/LoadingContext.jsx';
import {TasksContext} from '../../context/TasksContext.jsx';
import {filterBySearch} from '../../static/js/filter.js';
import {toggleCreateTaskModal} from '../../static/js/handlers.js';
import getTasksGet from '../../static/js/requests/getTasksGet.js';
import {FilterSearch} from '../fields/FilterSearch.jsx';
import Loading from '../loading/Loading.jsx';
import CreateTaskModal from './modals/CreateTaskModal.jsx';
import EditTaskModal from './modals/EditTaskModal.jsx';
import Pagination from './Pagination.jsx';
import Tasks from './Tasks.jsx';

const TasksContainer = () => {
    const {tasks, setTasks, tasksCopy, setTasksCopy} = useContext(TasksContext);
    const {loading, startLoading, stopLoading} = useContext(LoadingContext);
    const {isLoggedIn} = useContext(AuthContext);
    const redirectLink = {redirect: '/signin'};

    const apiRes = () => {
        setTimeout(() => {
            stopLoading();
        }, 120);
    };

    useEffect(() => {
        startLoading();
        getTasksGet(setTasks, setTasksCopy).catch(err => console.error(err));
        apiRes();
    }, []);


    if (!isLoggedIn) return <Redirect to={redirectLink}/>;

    if (loading) return <Loading/>
    const filterBySearchWrapper = (Event) => {
        filterBySearch(Event.target.value.toLowerCase(), tasks, setTasksCopy);
    }
    return (
        <div className='tasks-container'>
            <CreateTaskModal/>
            <EditTaskModal/>
            <FilterSearch
                maxLength='80'
                autoFocus={true}
                label='Filter'
                name='Filter'
                type='text'
                autoComplete='on'
                placeholder='Filter'
                onChange={(Event) => filterBySearchWrapper(Event)}
            />
            <Tasks/>
            <Pagination tasksCopyLength={tasksCopy.length}/>
        </div>
    );
}

export default TasksContainer;
