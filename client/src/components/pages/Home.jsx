import React, {useContext, useEffect, useState} from 'react';
import Tasks from '../tasks/Tasks.jsx';
import Pagination from '../tasks/Pagination.jsx';
import Loading from '../loading/Loading.jsx';
import {AppContext} from '../AppContext.jsx';
import getTasksGet from '../../static/js/requests/getTasksGet.js';
import filter from '../../static/js/filter.js';
import {CustomInput} from '../fields/CustomInput.jsx';

const Home = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [tasks, setTasks] = useState([]);
    const [tasksCopy, setTasksCopy] = useState([]);
    const [loading, setLoading] = useContext(AppContext);
    const [tasksPerPage] = useState(1);
    const [isLogged, setIsLogged] = useState(true);

    const apiRes = () => {
        setTimeout(() => {
            console.log('TIMEOUT')
            setLoading(false);
        }, 120)
    }

    useEffect(() => {
        localStorage.setItem('isLogged', JSON.stringify(isLogged))
    }, [isLogged]);

    useEffect(() => {
        setIsLogged(JSON.parse(localStorage.getItem('isLogged')));
    }, []);

    useEffect(() => {
        setLoading(true);
        getTasksGet(setTasks, setTasksCopy)
            .then(apiRes)
            .catch((error => console.log(error)))
    }, []);

    useEffect(() => {
        const storedPage = parseInt(localStorage.getItem('currentPage'));
        storedPage && setCurrentPage(storedPage);
    }, []);

    useEffect(() => {
        const storePage = currentPage.toString();
        localStorage.setItem('currentPage', storePage)
    }, [currentPage]);

    if (!isLogged) location.href = '/signin';

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
                        filter(Event.target.value.toLowerCase(),
                            setTasksCopy, tasks)
                    }}
                />
                <Tasks
                    currentPage={currentPage}
                    tasksPerPage={tasksPerPage}
                    tasksCopy={tasksCopy}
                    setTasksCopy={setTasksCopy}
                    setTasks={setTasks}
                />
                <Pagination
                    tasksPerPage={tasksPerPage}
                    totalTasks={tasks.length}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </div>
    );
}

export default Home;
