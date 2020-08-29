import axios from 'axios';
import {API_HOST_PROD, API_PORT_PROD, API_HOST_DEV, API_PORT_DEV}
    from '../constants.js';
import getTasksGet from './getTasksGet.js';

const createTaskPost = async (data, setTasks, setTasksCopy, callback) => {
    let host;
    let port;

    if (process.env.NODE_ENV === 'production') {
        host = API_HOST_PROD;
        port = API_PORT_PROD;
    } else {
        host = API_HOST_DEV;
        port = API_PORT_DEV;
    }

    const url = `http://${host}:${port}/api/task/create_task`;

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
