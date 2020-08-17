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
    const [currentPage, setCurrentPage] = useState(1);
    const [tasksOriginal, setTasksOriginal] = useState([]);
    const [tasksCopy, setTasksCopy] = useState([]);
    const {loading, startLoading, stopLoading} = useContext(LoadingContext);
    const [tasksPerPage] = useState(1);
    const {isLoggedIn} = useContext(AuthContext);
    const [redirectLink] = useState({redirect: '/signin'});

    const apiRes = () => {
        setTimeout(() => {
            stopLoading();
        }, 120)
    }

    useEffect(() => {
        let totalPages = parseInt(localStorage.getItem('totalPages'));
        let pageToStore = currentPage;
        if (pageToStore > totalPages) pageToStore = totalPages;
        localStorage.setItem('currentPage', JSON.stringify(pageToStore));
    }, [currentPage]);

    useEffect(() => {
        setCurrentPage(parseInt(localStorage.getItem('currentPage')));
    }, []);

    useEffect(() => {
        startLoading();
        getTasksGet(setTasksOriginal, setTasksCopy)
            .catch(err => console.error(err));
        apiRes();
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
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                tasksPerPage={tasksPerPage}
                tasksCopy={tasksCopy}
                setTasksCopy={setTasksCopy}
                tasksOriginal={tasksCopy}
                setTasksOriginal={setTasksCopy}
            />
            <Pagination
                tasksPerPage={tasksPerPage}
                tasksOriginal={tasksOriginal.length}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </div>
    );
}

export default TasksContainer;
