import axios from 'axios';
import {API_HOST_DEV, API_HOST_PROD, API_PORT_DEV, API_PORT_PROD}
    from '../constants.js';

const editTaskPatch = async (data, editTaskId, tasks, setTasks, setTasksCopy,
                             callback) => {
    let host;
    let port;

    if (process.env.NODE_ENV === 'production') {
        host = API_HOST_PROD;
        port = API_PORT_PROD;
    } else {
        host = API_HOST_DEV;
        port = API_PORT_DEV;
    }

    const url = `http://${host}:${port}/api/task/edit_task`;

    try {
        await axios.patch(url, {
            _id: editTaskId,
            priority: data.priority,
            task: data.task,
            status: data.status
        }, {
            withCredentials: true
        });

        for (let i in tasks) {
            if (tasks.hasOwnProperty(i) && tasks[i]._id === editTaskId) {
                tasks[i].priority = data.priority ? data.priority : tasks[i]
                    .priority;
                tasks[i].task = data.task ? data.task : tasks[i].task;
                tasks[i].status = data.status ? data.status : tasks[i].status;

                break;
            }
        }

        setTasks(tasks);
        setTasksCopy(tasks);

        callback();

    } catch (err) {
        console.error(err);
    }
};

export default editTaskPatch;
