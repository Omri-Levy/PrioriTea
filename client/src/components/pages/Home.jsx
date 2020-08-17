import React, {useContext, useEffect, useState} from 'react';
import {Redirect} from 'react-router-dom';
import Tasks from '../tasks/Tasks.jsx';
import Pagination from '../tasks/Pagination.jsx';
import Loading from '../loading/Loading.jsx';
import {LoadingContext} from '../../context/LoadingContext.jsx';
import getTasksGet from '../../static/js/requests/getTasksGet.js';
import {filterBySearch} from '../../static/js/filter.js';
import {CustomInput} from '../fields/CustomInput.jsx';

const Home = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [tasksOriginal, setTasksOriginal] = useState([]);
    const [tasksCopy, setTasksCopy] = useState([]);
    const {loading, startLoading, stopLoading} = useContext(LoadingContext);
    const [tasksPerPage] = useState(1);
    const [isLogged, setIsLogged] = useState(true);
    const [redirectLink] = useState({redirect: '/signin'});

    const apiRes = () => {
        setTimeout(() => {
            stopLoading();
        }, 120)
    }

    useEffect(() => {
        localStorage.setItem('isLogged', JSON.stringify(isLogged))
    }, [isLogged]);

    useEffect(() => {
        let totalPages = parseInt(localStorage.getItem('totalPages'));
        let pageToStore = currentPage;
        if (pageToStore > totalPages) pageToStore = totalPages;
        localStorage.setItem('currentPage', JSON.stringify(pageToStore));
    }, [currentPage]);

    useEffect(() => {
        setIsLogged(JSON.parse(localStorage.getItem('isLogged')));
        setCurrentPage(parseInt(localStorage.getItem('currentPage')));
    }, []);

    useEffect(() => {
        startLoading();
        getTasksGet(setTasksOriginal, setTasksCopy)
            .catch(err => console.error(err));
        apiRes();
    }, []);


    if (!isLogged) return <Redirect to={redirectLink}/>;

    if (loading) return <Loading/>
    return (
        <div className='body-container'>
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
        </div>
    );
}

export default Home;
