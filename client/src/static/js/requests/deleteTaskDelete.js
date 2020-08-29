import axios from 'axios';
import {
    API_HOST_DEV,
    API_HOST_PROD,
    API_PORT_DEV,
    API_PORT_PROD,
    ENCRYPTION_DEV, ENCRYPTION_PROD
}
    from '../constants.js';

const deleteTaskDelete = async (taskId, tasks, setTasks, setTasksCopy) => {
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

    const url = `${encryption}://${host}:${port}/api/task/delete_task`;

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
