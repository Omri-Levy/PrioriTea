import axios from 'axios';
import {hideCreateTaskModal} from '../handlers.js';

const createTaskPost = async (data, getTasks) => {
    const url = 'http://localhost:4000/api/task/create_task';
    try {
        const res = (
            await axios
                .post(url, {
                    priority: data.priority,
                    task: data.task,
                })
        );
        hideCreateTaskModal();
        getTasks();
    } catch (err) {
        console.log(err);
    }
}

export default createTaskPost;
