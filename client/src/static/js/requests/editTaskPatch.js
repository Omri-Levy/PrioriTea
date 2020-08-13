import axios from 'axios';
import {hideEditTaskModal} from '../handlers.js';
import getTasksGet from './getTasksGet';

const editTaskPatch = async (data, setTasks, setTasksCopy, editTaskId) => {
    const url = 'http://localhost:4000/api/task/edit_task';
    try {
        const res = (
            await axios
                .patch(url, {
                    _id: editTaskId,
                    priority: data.priority,
                    task: data.task,
                    status: data.status
                })
        );
        console.log(res);
        hideEditTaskModal();
        await getTasksGet(setTasks, setTasksCopy);
    } catch (err) {
        console.log(err);
    }
}

export default editTaskPatch;
