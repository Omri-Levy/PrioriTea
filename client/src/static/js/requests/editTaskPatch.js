import axios from 'axios';
import {toggleEditTaskModal} from '../handlers.js';
import getTasksGet from './getTasksGet';

const editTaskPatch = async (data, editTaskId, setTasksOriginal,
                             setTasksCopy
) => {
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
        toggleEditTaskModal();
        await getTasksGet(setTasksOriginal, setTasksCopy);
    } catch (err) {
        console.error(err);
    }
}

export default editTaskPatch;
