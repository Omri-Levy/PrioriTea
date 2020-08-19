import axios from 'axios';
import {persistFilter} from '../filter.js';
import sortFn from '../sortFn.js';

const getTasksGet = async (setTasks, setTasksCopy) => {
    const res = await axios.get(
        'http://localhost:4000/api/task/get_tasks');
    if (res.data.length > 0) {
        await setTasks(res.data);
        await setTasksCopy(res.data);
        sortFn(res.data, setTasks, setTasksCopy);
        persistFilter(res.data, setTasksCopy);
    }
}

export default getTasksGet;
