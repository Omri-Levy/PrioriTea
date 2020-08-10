import axios from 'axios';
import {hideEditTaskModal} from '../handlers.js';

const editTaskPatch = async (data, getTasks, editTaskId) => {
    const url = 'http://localhost:4000/api/task/edit_task';
    try {
        const res = (
            await axios
                .patch(url, {
                    _id: editTaskId,
                    title: data.title,
                    owner: data.owner
                })
        );
        console.log(res);
        hideEditTaskModal();
        getTasks();
    } catch (err) {
        console.log(err);
    }
}

export default editTaskPatch;
