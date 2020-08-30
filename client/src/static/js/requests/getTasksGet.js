import axios from 'axios';
import {persistFilter} from '../filter.js';
import sortFn from '../sortFn.js';

const getTasksGet = async (setTasks, setTasksCopy, sort) => {
    let url;

    if (process.env.NODE_ENV === 'production') {
        url = `${process.env.REACT_APP_API_PROD}/task/get_tasks`;
    } else {
        url = `${process.env.REACT_APP_API_DEV}/task/get_tasks`;
    }

    try {
        const res = await axios.get(url, {withCredentials: true});

        if (res.data.length > 0) {
            await setTasks(res.data);
            await setTasksCopy(res.data);

            sortFn(res.data, setTasks, setTasksCopy, true, sort);
            persistFilter(res.data, setTasksCopy);
        }
    } catch (err) {
        console.error(err);
    }
};

export default getTasksGet;
