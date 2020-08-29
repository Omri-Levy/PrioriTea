import axios from 'axios';
import getTasksGet from './getTasksGet.js';

const createTaskPost = async (data, setTasks, setTasksCopy, callback) => {
    const url = 'http://localhost:4000/api/task/create_task';
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
