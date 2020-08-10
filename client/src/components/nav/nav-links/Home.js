import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Tasks from '../../tasks/Tasks.js';
import Pagination from '../../tasks/Pagination';
import Loading from '../../loading/Loading.js';
import {displayCreateTaskModal} from '../../../static/js/handlers.js';

const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [tasksPerPage] = useState(1);

    const getTasks = async () => {
        try {
            const res = (
                await axios
                    .get('http://localhost:4000/api/task/get_tasks')
            );
            setTasks(res.data);
            res.data.length === 0 && displayCreateTaskModal();
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        const isLogged = JSON.parse(localStorage.getItem('isLogged'));
        if (!isLogged) {
            location.href = '/signin';
        }
    }, []);
    useEffect(() => {
        setLoading(true);
        getTasks().catch(err => console.log(err));
        setLoading(false);

    }, []);
    useEffect(() => {
        const storedPage = parseInt(localStorage.getItem('currentPage'));
        if (storedPage) {
            setCurrentPage(storedPage);
        }
    }, []);
    useEffect(() => {
        const storePage = currentPage.toString();
        localStorage.setItem('currentPage', storePage)
    }, [currentPage]);
    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }
    if (loading) {
        return (
            <Loading/>
        );
    } else {
        return (
            <div className='body-container'>
                <div className='tasks-container'>
                    <Tasks
                        tasks={currentTasks}
                        loading={loading}
                        getTasks={getTasks}
                        setTasks={setTasks}
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
}

export default Home;
