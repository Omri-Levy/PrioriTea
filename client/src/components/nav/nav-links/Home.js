import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Tasks from '../../tasks/Tasks.js';
import Pagination from '../../tasks/Pagination';
import Loading from '../../loading/Loading.js';
import {displayCreateTaskModal} from '../../../static/js/handlers.js';

const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [tasksCopy, setTasksCopy] = useState([]);
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
            setTasksCopy(res.data);
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

    const filter = async (Event) => {
        const filteredTasks = []
        const value = Event.target.value.toLowerCase();

        for (let i = 0; i < tasks.length; i++) {
            const priority = tasks[i].priority.toLowerCase();
            const task = tasks[i].task.toLowerCase();
            const status = tasks[i].status.toLowerCase();
            const includes = [priority, task, status]

            for (let j = 0; j < includes.length; j++) {
                if (includes[j].includes(value)) {
                    filteredTasks.push(tasks[i]);
                    break;
                }
            }
        }
        setTasksCopy(filteredTasks);
    }

    let currentTasks = tasksCopy.slice(indexOfFirstTask, indexOfLastTask);

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
                <input
                    id='search-input'
                    className='primary-input'
                    type='text'
                    onChange={filter}
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
}

export default Home;
