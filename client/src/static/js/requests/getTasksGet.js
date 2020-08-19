import axios from 'axios';
import {persistFilter} from '../filter.js';

const getTasksGet = async (setTasks, setTasksCopy) => {
    const res = await axios.get(
        'http://localhost:4000/api/task/get_tasks');
    if (res.data.length > 0) {
        let tasks = res.data;
        tasks = tasks.sort((a, b) => {
            return a.priority - b.priority;
        })
        await setTasks(tasks);
        await setTasksCopy(tasks);
        persistFilter(tasks, setTasksCopy);
    }
}

export default getTasksGet;
