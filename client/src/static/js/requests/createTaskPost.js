import axios from 'axios';
import getTasksGet from './getTasksGet.js';

const createTaskPost = async (data, setTasks, setTasksCopy, callback) => {
    let url;

    if (process.env.NODE_ENV === 'production') {
        url = `${process.env.REACT_APP_API_PROD}/task/create_task`;
    } else {
        url = `${process.env.REACT_APP_API_DEV}/task/create_task`;
    }

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
