import axios from 'axios';
import {toggleCreateTaskModal} from '../handlers.js';
import getTasksGet from './getTasksGet';

const createTaskPost = async (data, setTasksOriginal,
                              setTasksCopy) => {
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
        await getTasksGet(setTasksOriginal, setTasksCopy);
    } catch (err) {
        console.error(err);
    }
}

export default createTaskPost;
