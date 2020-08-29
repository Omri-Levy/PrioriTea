import axios from 'axios';
import {persistFilter} from '../filter.js';
import sortFn from '../sortFn.js';

const getTasksGet = async (setTasks, setTasksCopy, sort) => {
    const url = 'http://localhost:4000/api/task/get_tasks';

    const res = await axios.get(url, {withCredentials: true});

    if (res.data.length > 0) {
        await setTasks(res.data);
        await setTasksCopy(res.data);

        sortFn(res.data, setTasks, setTasksCopy, true, sort);
        persistFilter(res.data, setTasksCopy);
    }
};

export default getTasksGet;
