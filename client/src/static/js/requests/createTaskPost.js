import axios from 'axios';
import getTasksGet from './getTasksGet.js';

const createTaskPost = async (data, setTasks, setTasksCopy, callback) => {
    const url = 'http://localhost:4000/api/task/create_task';
    try {
        const res = (
            await axios
                .post(url, {
                    priority: data.priority,
                    task: data.task,
                }, {
                    withCredentials: true
                })
        );
        console.log(res);
        getTasksGet(setTasks, setTasksCopy).catch(err => console.error(err));
        callback();
    } catch (err) {
        console.error(err);
    }
}

export default createTaskPost;
