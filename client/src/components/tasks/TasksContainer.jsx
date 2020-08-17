import React, {useContext, useEffect, useState} from 'react';
import {Redirect} from 'react-router-dom';
import {AuthContext} from '../../context/AuthContext.jsx';
import {LoadingContext} from '../../context/LoadingContext.jsx';
import {filterBySearch} from '../../static/js/filter.js';
import getTasksGet from '../../static/js/requests/getTasksGet.js';
import {CustomInput} from '../fields/CustomInput.jsx';
import Loading from '../loading/Loading.jsx';
import Pagination from './Pagination.jsx';
import Tasks from './Tasks.jsx';

const TasksContainer = () => {
    const [tasksOriginal, setTasksOriginal] = useState([]);
    const [tasksCopy, setTasksCopy] = useState([]);
    const {loading, startLoading, stopLoading} = useContext(LoadingContext);
    const {isLoggedIn} = useContext(AuthContext);
    const redirectLink = {redirect: '/signin'};

    const apiRes = () => {
        setTimeout(() => {
            stopLoading();
        }, 120)
    }

    useEffect(() => {
        startLoading();
        getTasksGet(setTasksOriginal, setTasksCopy)
            .then(() => apiRes())
            .catch(err => console.error(err))

    }, []);


    if (!isLoggedIn) return <Redirect to={redirectLink}/>;

    if (loading) return <Loading/>

    return (
        <div className='tasks-container'>
            <CustomInput
                id='filter-search'
                maxLength='80'
                autoFocus={true}
                label='Filter'
                name='Filter'
                type='text'
                autoComplete='on'
                placeholder='Filter'
                onChange={(Event) => {
                    filterBySearch(
                        Event.target.value.toLowerCase(),
                        tasksOriginal,
                        setTasksCopy
                    )
                }}
            />
            <Tasks
                tasksOriginal={tasksCopy}
                setTasksOriginal={setTasksCopy}
                tasksCopy={tasksCopy}
                setTasksCopy={setTasksCopy}
            />
            <Pagination
                tasksOriginal={tasksOriginal.length}
            />
        </div>
    );
}

export default TasksContainer;
