import axios from 'axios';
import {API_HOST_DEV, API_HOST_PROD, API_PORT_DEV, API_PORT_PROD}
    from '../constants.js';

const deleteTaskDelete = async (taskId, tasks, setTasks, setTasksCopy) => {
    let host;
    let port;

    if (process.env.NODE_ENV === 'production') {
        host = API_HOST_PROD;
        port = API_PORT_PROD;
    } else {
        host = API_HOST_DEV;
        port = API_PORT_DEV;
    }

    const url = `http://${host}:${port}/api/task/delete_task`;

    try {
        await axios.delete(url, {
            data: {_id: taskId},
            withCredentials: true
        });

        const updatedTasks = tasks.filter(task => task._id !== taskId);

        setTasks(updatedTasks);
        setTasksCopy(updatedTasks);

    } catch (err) {
        console.error(err);
    }
};

export default deleteTaskDelete;
