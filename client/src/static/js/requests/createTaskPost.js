import axios from 'axios';
import {toggleCreateTaskModal} from '../handlers.js';
import getTasksGet from './getTasksGet';

const createTaskPost = async (data, setTasks, setTasksCopy) => {
    const url = 'http://localhost:4000/api/task/create_task';
    try {
        const res = (
            await axios
                .post(url, {
                    priority: data.priority,
                    task: data.task,
                })
        );
        console.log(res);
        toggleCreateTaskModal();
        await getTasksGet(setTasks, setTasksCopy);
    } catch (err) {
        console.log(err);
    }
}

export default createTaskPost;
