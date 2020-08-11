import React, {useEffect, useContext} from 'react';
import axios from 'axios';
import Tasks from '../../tasks/Tasks.js';
import Pagination from '../../tasks/Pagination.js';
import Loading from '../../loading/Loading.js';
import {displayCreateTaskModal} from '../../../static/js/handlers.js';
import {AppContext} from '../../context/AppContext';

const Home = () => {
    const [
        tasks, setTasks,
        tasksCopy, setTasksCopy,
        loading, setLoading,
        currentPage, setCurrentPage,
        tasksPerPage
    ] = useContext(AppContext);
    const getTasks = async () => {
        const res = (
            await axios
                .get('http://localhost:4000/api/task/get_tasks')
                .catch((err => console.log(err))
                ));
        setTasks(res.data);
        setTasksCopy(res.data);
        res.data.length === 0 && displayCreateTaskModal();
    }
    useEffect(() => {
        const isLogged = JSON.parse(localStorage.getItem('isLogged'));
        if (!isLogged) location.href = '/signin';

    }, []);
    useEffect(() => {
        setLoading(true);
        getTasks().then(() => setLoading(false));
    }, []);
    useEffect(() => {
        const storedPage = parseInt(localStorage.getItem('currentPage'));
        storedPage && setCurrentPage(storedPage);
    }, []);
    useEffect(() => {
        const storePage = currentPage.toString();
        localStorage.setItem('currentPage', storePage)
    }, [currentPage]);

    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;

    const filter = async (value) => {
        const valueIncluded = (task) => {
            return (
                task.priority.includes(value) ||
                task.task.includes(value) ||
                task.status.includes(value)
            );
        }

        const filteredTasks = tasks.filter(task => valueIncluded(task));

        setTasksCopy(filteredTasks);
    }

    let currentTasks = tasksCopy.slice(indexOfFirstTask, indexOfLastTask);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) return <Loading/>
    else return (
        <div className='body-container'>
            <input
                id='search-input'
                className='primary-input'
                type='text'
                onChange={(Event) => filter(Event.target.value.toLowerCase())}
            />
            <div className='tasks-container'>
                <Tasks
                    tasks={currentTasks}
                    loading={loading}
                    getTasks={getTasks}
                />
                <Pagination
                    tasksPerPage={tasksPerPage}
                    totalTasks={tasks.length}
                    paginate={paginate}
                    currentPage={currentPage}
                />
            </div>
        </div>
    );
}

export default Home;
