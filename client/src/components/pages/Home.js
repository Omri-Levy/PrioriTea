import React, {useEffect, useState} from 'react';
import Tasks from '../tasks/Tasks.js';
import Pagination from '../tasks/Pagination.js';
import Loading from '../loading/Loading.js';
import getTasksGet from '../../static/js/requests/getTasksGet';
import filter from '../../static/js/filter';

const Home = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [tasks, setTasks] = useState([]);
    const [tasksCopy, setTasksCopy] = useState([]);
    const [loading, setLoading] = useState(true);
    const [tasksPerPage] = useState(1);

    useEffect(() => {
        const isLogged = JSON.parse(localStorage.getItem('isLogged'));
        if (!isLogged) history.push('/signin');

    }, []);

    useEffect(() => {
        setLoading(true);
        getTasksGet(setTasks, setTasksCopy)
            .then(() => setLoading(false));
    }, []);

    useEffect(() => {
        const storedPage = parseInt(localStorage.getItem('currentPage'));
        storedPage && setCurrentPage(storedPage);
    }, []);

    useEffect(() => {
        const storePage = currentPage.toString();
        localStorage.setItem('currentPage', storePage)
    }, [currentPage]);

    if (loading) return <Loading/>

    return (
        <div className='body-container'>
            <input
                id='search-input'
                className='primary-input'
                type='text'
                onChange={(Event) => filter(Event.target.value.toLowerCase(),
                    setTasksCopy, tasks)}
            />
            <div className='tasks-container'>
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
