import axios from 'axios';
import {persistFilter} from '../filter.js';
import {toggleCreateTaskModal} from '../handlers';

const getTasksGet = async (setTasks, setTasksCopy) => {
    const res = await axios.get(
        'http://localhost:4000/api/task/get_tasks');
    res.data.length === 0 && toggleCreateTaskModal();
    const tasks = res.data;
    await setTasks(tasks);
    await setTasksCopy(tasks);
    persistFilter(tasks, setTasksCopy);
}

export default getTasksGet;
