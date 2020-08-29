import axios from 'axios';
import {
    API_HOST_PROD, API_PORT_PROD, ENCRYPTION_PROD, API_HOST_DEV,
    API_PORT_DEV, ENCRYPTION_DEV
}
    from '../constants.js';
import getTasksGet from './getTasksGet.js';

const createTaskPost = async (data, setTasks, setTasksCopy, callback) => {
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

    const url = `${encryption}://${host}:${port}/api/task/create_task`;

    try {
        await axios.post(url, {
            priority: data.priority, task:
            data.task,
        }, {
            withCredentials: true
        });

        getTasksGet(setTasks, setTasksCopy).catch(err => console.error(err));

        callback();

    } catch (err) {
        console.error(err);
    }
}

export default createTaskPost;
