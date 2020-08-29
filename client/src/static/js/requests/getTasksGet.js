import axios from 'axios';
import {
    API_HOST_DEV,
    API_HOST_PROD,
    API_PORT_DEV,
    API_PORT_PROD,
    ENCRYPTION_DEV,
    ENCRYPTION_PROD
} from '../constants.js';
import {persistFilter} from '../filter.js';
import sortFn from '../sortFn.js';

const getTasksGet = async (setTasks, setTasksCopy, sort) => {
    let host;
    let port;
    let encryption;

    if (process.env.NODE_ENV === 'production') {
        host = API_HOST_PROD;
        port = API_PORT_PROD;
        encryption = ENCRYPTION_PROD;
    } else {
        host = API_HOST_DEV;
        port = API_PORT_DEV;
        encryption = ENCRYPTION_DEV;
    }

    const url = `${encryption}://${host}:${port}/api/task/get_tasks`;

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
